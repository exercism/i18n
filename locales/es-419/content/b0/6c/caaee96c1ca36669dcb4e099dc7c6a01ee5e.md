# Introducción

Una sola instrucción puede parecer una acción indivisible sin serlo en absoluto.
Tomemos como ejemplo sumar cinco a un valor en memoria:

```x86asm
add qword [rel counter], 5
```

Por debajo, el procesador no tiene forma de sumar directamente a la memoria.
Divide esa única instrucción en tres pasos más pequeños, llamados **microoperaciones**:

1. **leer** el valor actual de la memoria;
2. **modificar** ese valor en un registro, sumándole cinco;
3. **escribir** el resultado de vuelta.

```x86asm
mov rax, qword [rel counter] ; 1. load the current value
add rax, 5                   ; 2. add five
mov qword [rel counter], rax ; 3. store the result back
```

Este es un patrón común llamado **lectura-modificación-escritura (RMW)**.

Fíjate que la lectura (o carga) y la escritura (o almacenamiento) son eventos separados, así que hay una ventana de tiempo entre ellos.
Normalmente no nos damos cuenta de esto porque, en un solo núcleo, cada instrucción tiene garantizado producir su efecto por completo antes de la siguiente.
Por eso esa ventana es invisible y `add` se comporta como una sola unidad.

Sin embargo, las CPU modernas rara vez tienen un solo núcleo, y las aplicaciones suelen ejecutarse en muchos núcleos a la vez, sin ningún orden entre ellos.
Con varios núcleos ejecutándose en el mismo instante, otro núcleo puede leer o escribir `counter` dentro de esa ventana, después de la carga de este núcleo y antes de su almacenamiento.
Dos hilos cargan cada uno el mismo valor antiguo, cada uno le suma cinco y cada uno almacena su resultado.
Ocurrieron dos sumas, pero el valor solo avanzó cinco.
Una actualización se perdió en silencio.

Esto es una **carrera de datos**, y es un problema común en el código multihilo.

No todos los valores quedan expuestos de esta manera.
Cada hilo tiene sus propios registros y su propia pila, así que un valor que está en un registro, o una variable local en la pila de un hilo, es exclusivo de ese hilo y no puede entrar en una carrera.
Solo la memoria que comparten los hilos, como `counter` arriba, necesita protección.

x86-64 ofrece un conjunto de instrucciones para resolver este problema: hacer que una instrucción sea indivisible.
Se comporta como una sola unidad no solo para el núcleo que la procesa, sino también para todos los demás núcleos.
Una operación que se mantiene unida, que ningún otro núcleo puede dividir, se llama **atómica**.

~~~~exercism/note
Es común referirse a las aplicaciones que se ejecutan en muchos núcleos como multihilo.
Sin embargo, un **hilo** no es lo mismo que un núcleo.
Dos hilos pueden ejecutarse de forma concurrente en el mismo núcleo, entrelazándose, o en paralelo en núcleos diferentes.

Los hilos entrelazados ya pueden entrar en una carrera en una lectura-modificación-escritura si esta se divide en varias instrucciones, ya que el sistema operativo puede cambiar de hilo entre dos instrucciones cualesquiera.
La ventana dentro de una _sola_ instrucción, en cambio, solo la expone el código verdaderamente paralelo.
Como el sistema operativo solo cambia de hilo entre instrucciones, nunca dentro de una, una sola instrucción es intrínsecamente segura en un solo núcleo.

La atomicidad real entre _varios_ núcleos es lo que ofrecen las instrucciones de abajo.
~~~~

## Intercambio atómico

La instrucción `xchg` intercambia dos operandos.
El operando destino pasa a ser igual al valor anterior del operando fuente, mientras que el operando fuente pasa a ser igual al valor anterior del operando destino.
Conceptualmente, puede pensarse como dos instrucciones `mov` que ocurren a la vez.

Como de costumbre, se puede usar con dos operandos de registro o con un operando de memoria y uno de registro:

```x86asm
mov  eax, 1
xchg dword [rdi], eax ; [rdi] = 1, eax = the old value of [rdi]
mov ecx, 2
mov edx, 3
xchg edx, ecx         ; edx = 2, ecx = 3
```

Cuando se usa con un operando de memoria, `xchg` es _siempre_ atómica.

~~~~exercism/caution
`xchg` es automáticamente atómica cuando uno de los operandos es una ubicación de memoria.
Eso también significa que la operación es mucho más lenta en esa situación.

Si no necesitas atomicidad, haz el intercambio a través de un registro libre con instrucciones `mov` simples.
~~~~

## El prefijo lock

La forma más común de hacer atómica una instrucción en x86-64 es agregarle el prefijo `lock`.
Fusiona la lectura, la modificación y la escritura en un solo paso indivisible.
Esto significa que el núcleo retiene la memoria en exclusiva durante todo el proceso, de modo que ningún otro núcleo puede leer o escribir esa ubicación en el intervalo.

```x86asm
lock add qword [rel counter], 5 ; the read, the modify, and the write are one step
```

`lock` solo funciona cuando el destino es memoria, y solo en instrucciones que leen, modifican y escriben esa memoria:

1. operaciones aritméticas, como `add`, `sub`, `inc`, `dec`, `neg`;
2. operaciones bit a bit, como `and`, `or`, `xor`, `not`;
3. las operaciones de bits `bts`, `btr`, `btc`;
4. algunas otras instrucciones dedicadas, como `xadd` y `cmpxchg`, que se describen más abajo.

~~~~exercism/caution
Retener una ubicación en exclusiva y dejar fuera a todos los demás núcleos no sale gratis.
Una operación con el prefijo `lock` es notablemente más lenta que su forma simple, y aún más lenta cuando varios núcleos compiten por la misma ubicación.

Este prefijo debería reservarse para memoria que se espera que sea modificada por más de un hilo.
Evita usarlo si la memoria no se comparte o si solo se lee.
~~~~

## Intercambio y suma

Un `lock add` simple actualiza la memoria, pero descarta el valor anterior.
A menudo el valor anterior es justo lo que se quiere, por ejemplo para darle a cada hilo un número de turno distinto.

La instrucción `xadd` (donde la `x` viene de exchange) devuelve el valor anterior a la vez que suma.
Escribe la suma en el destino y deja el valor original del destino en el registro fuente.

```x86asm
mov  rax, 1
lock xadd qword [rdi], rax ; [rdi] = [rdi] + rax = [rdi] + 1
                           ; rax = the old value of [rdi]
```

Con el prefijo `lock`, esto es un **fetch-and-add** atómico.
Cuando muchos hilos lo ejecutan sobre el mismo contador, cada llamada devuelve un valor anterior distinto.

Igual que con `lock add`, el contador termina en el número exacto de llamadas.
Sin embargo, a diferencia de `lock add`, también se devuelve cada valor intermedio, uno a cada llamador.

## Comparación e intercambio

`xadd` suma y `xchg` sobrescribe, pero ninguna de las dos puede hacer que el valor nuevo dependa del actual y aplicarlo solo si nada cambió por debajo.
Esa actualización condicional es lo que ofrece `cmpxchg`, comparar e intercambiar, y es la más general de estas primitivas.

`cmpxchg dest, src` usa `rax` como acumulador implícito y lo compara con `dest`:

- Si `dest == rax`, `dest = src` y `ZF = 1`.
- Si `dest != rax`, `rax = dest` y `ZF = 0`.

Fíjate que `dest` solo se actualiza cuando es igual al valor esperado, que se cargó antes en `rax`.
Esa igualdad garantiza que `dest` todavía contiene el valor a partir del cual se calculó el nuevo, así que nunca se aplica una actualización basada en una lectura obsoleta.
Eso convierte a `cmpxchg` en el bloque de construcción de una actualización atómica, también conocida como **compare-and-swap (CAS)**:

```x86asm
    mov rax, qword [rdi]          ; rax = the value we expect to find
.retry:
    lea rcx, [rax + 10]           ; rcx = the new value we want to install
    lock cmpxchg qword [rdi], rcx ; if [rdi] still equals rax, store rcx and set ZF
                                  ; otherwise reload rax with the current value, clear ZF
    jnz  .retry                   ; ZF is cleared, so another thread won the race. Recompute and retry
```

Este **bucle de reintento** es el corazón de las actualizaciones sin bloqueo.
La ventana entre la lectura y la comparación e intercambio es justo cuando otro hilo podría intervenir, y `cmpxchg` lo detecta al negarse a almacenar un valor calculado a partir de una lectura obsoleta.

## Ordenamiento de memoria

Todas las operaciones hasta ahora han tocado una sola ubicación.
Cuando los hilos se coordinan a través de más de una ubicación, aparece una nueva pregunta: ¿en qué orden se vuelven visibles para un hilo las escrituras de otro?
Las reglas que responden a esta pregunta son el **ordenamiento de memoria** del procesador.

El concepto de código sin bifurcaciones presentó la idea de que un núcleo moderno no avanza por las instrucciones de una en una.
Mantiene muchas en vuelo a la vez y se adelanta cuando puede.
Esto significa que una escritura puede volverse visible para los demás núcleos más tarde de lo que sugiere el programa, mientras que las instrucciones posteriores ya se adelantaron.

x86-64 mantiene un **ordenamiento de memoria fuerte** entre las cargas y los almacenamientos ordinarios, de modo que en cada núcleo:

1. una carga nunca se reordena después de una carga posterior;
2. un almacenamiento nunca se reordena después de un almacenamiento posterior;
3. una carga nunca se reordena después de un almacenamiento posterior.

El único reordenamiento posible es que un almacenamiento parezca completarse después de una carga posterior de una dirección _diferente_.

Una instrucción con el prefijo `lock`, o un `xchg` con un operando de memoria, es una barrera completa: nada parece moverse a través de ella en ninguna dirección.
Por eso bastan para garantizar un ordenamiento completo en la mayoría de las situaciones.

## Espera activa y `pause`

Las instrucciones que establecen una bandera y además devuelven su estado anterior se conocen como **test-and-set**.
Pueden usarse como base de un **spinlock**, que garantiza que un núcleo tenga acceso exclusivo a alguna parte del código.

Este es el algoritmo general, usando la instrucción `xchg` con una bandera binaria:

1. La bandera empieza en `0`.
2. Para adquirir el bloqueo, un núcleo intercambia el valor de la bandera con `1`.
3. Si el valor devuelto es `1`, significa que otro núcleo _retiene_ el bloqueo.
   Entonces el núcleo actual espera y vuelve a intentar adquirir el bloqueo.
4. Si el valor devuelto es `0`, significa que el bloqueo estaba libre.
   Ahora `xchg` lo puso en `1`, y los demás núcleos esperarán hasta que este núcleo lo libere.
5. Cuando el núcleo actual termina su trabajo, actualizar la bandera a `0` libera el bloqueo.

```x86asm
acquire:
    mov  eax, 1
    xchg dword [rdi], eax ; try to take the lock; eax = its old value
    test eax, eax
    jnz  .held            ; old value was 1: someone else holds it
    ret                   ; old value was 0: the lock is ours
.held:
    pause                 ; wait before trying again
    jmp  acquire
```

La instrucción `pause` en el bucle de espera no cambia lo que calcula el código.
Le indica al procesador que se trata de una espera activa.
La CPU puede entonces reducir el consumo de energía del hilo que espera y cederle el paso a un hilo hermano que comparte el mismo núcleo.
Un bucle de espera activa sin `pause` sigue siendo correcto, solo que desperdicia recursos.

Cuando el hilo termina su trabajo, puede liberar el bloqueo con un simple almacenamiento de `0` mediante `mov`.
No hace falta nada más que un `mov`, porque en x86-64 las cargas y los almacenamientos nunca se reordenan después de un almacenamiento posterior.
Se dice que un almacenamiento que nunca adelanta a los accesos anteriores tiene **ordenamiento de liberación**, y en x86 todo almacenamiento simple lo aporta.

~~~~exercism/note
Cualquier instrucción que pruebe y establezca atómicamente una ubicación de memoria puede usarse para un spinlock.
Por ejemplo, `lock bts` puede usarse en lugar de `xchg` para establecer un bit específico a la vez que se comprueba si ya estaba establecido.

Fíjate que las banderas, como `CF`, que `bts` modifica, son parte de `rflags`, un registro.
Esto significa que son exclusivas de cada hilo.
~~~~
