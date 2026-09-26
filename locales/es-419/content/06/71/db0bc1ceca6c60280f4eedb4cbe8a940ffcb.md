# Acerca de

Los dígitos binarios se corresponden en última instancia con los transistores de tu CPU o tu RAM, y con si cada uno está «encendido» o «apagado».

La manipulación de bajo nivel, llamada informalmente «bit-twiddling», es especialmente importante en los lenguajes de sistema.

Los lenguajes de alto nivel como Julia suelen abstraer la mayor parte de este detalle.
Sin embargo, tienes [disponibles][bitwise] toda una gama de operaciones a nivel de bits en el lenguaje base.

***Nota:*** Para ver en el REPL una salida binaria legible para humanos, casi todos los ejemplos de abajo hay que envolverlos en una función [`bitstring()`][bitstring].
Eso distrae mucho visualmente, así que se han quitado casi todas las apariciones de esta función.

## Operaciones de desplazamiento de bits

Los tipos enteros, con signo o sin signo, se pueden representar como una cadena de unos y ceros.

```julia-repl
julia> bitstring(UInt8(5))
"00000101"
```

Los desplazamientos de bits simplemente mueven todo hacia la izquierda o hacia la derecha una cantidad de posiciones determinada.
Con los tipos `UInt`, algunos bits se salen por un extremo y el otro extremo se rellena con ceros:

```julia-repl
julia> ux::UInt8 = 5
5

julia> bitstring(ux)
"00000101"

julia> ux << 2 # left by 2
"00010100"

julia> ux >> 1 # right by 1
"00000010"
```

Cada desplazamiento a la izquierda duplica el valor y cada desplazamiento a la derecha lo reduce a la mitad (con posible truncamiento).
Esto se ve más claro en representación decimal:

```julia-repl
julia> 3 << 2
12

julia> 24 >> 3
3
```

Este tipo de desplazamiento de bits es mucho más rápido que la aritmética «normal», lo que hace que la técnica sea muy popular en la programación de bajo nivel.

Con los enteros con signo hay que tener un poco más de cuidado.

Los desplazamientos a la izquierda son relativamente sencillos:

```julia-repl
julia> sx = Int8(5)
5

julia> sx # positive integer
"00000101"

julia> sx << 2
"00010100"

julia> -sx # negative integer
"11111011"

julia> -sx << 2
"11101100"
```

Así, desplazar a la izquierda enteros con signo positivos es igual que con enteros sin signo.

Los valores negativos se guardan en forma de [complemento a dos][2complement], lo que significa que el bit más a la izquierda es 1.
Eso no es problema para un desplazamiento a la izquierda, pero al desplazar a la derecha, ¿cómo rellenamos los bits de la izquierda?

```julia-repl
julia> sx >> 2 # simple for positive values!
"00000001"

julia> -sx # negative integer
"11111011"

julia> -sx >> 2 # pad with repeated sign bit
"11111110"

julia> -sx >>> 2 # pad with 0
"00111110"
```

El operador `>>` hace un [desplazamiento aritmético][arithmetic], que conserva el bit de signo.

El operador `>>>` hace un [desplazamiento lógico][logical], rellenando con ceros como si el número no tuviera signo.

Si aun así te parece incompleto, también existe una función [`bitrotate()`][bitrotate].

## Lógica bit a bit

Vimos en un concepto anterior que los operadores `&&` (and), `||` (or) y `!` (not) se usan con valores Boolean.

Hay operadores equivalentes, `&` (and bit a bit), `|` (or bit a bit) y `~` (una tilde, not bit a bit), para comparar los bits de dos números enteros.

```julia-repl
julia> 0b1011 & 0b0010 # bit is 1 in both numbers
"00000010"

julia> 0b1011 | 0b0010 # bit is 1 in at least one number
"00001011"

julia> ~0b1011 # flip all bits
"11110100"

julia> xor(0b1011, 0b0010) # bit is 1 in exactly one number, not both
"00001001"
```

Aquí, `xor()` es el [o exclusivo][xor], usado como función (más abajo verás otra notación).

De paso, los operadores `&` y `|` también se pueden usar con valores Boolean.
A diferencia de `&&` y `||`, en ese caso se evalúan todas las partes de la expresión: no hay evaluación de cortocircuito.


## Otros símbolos

A Julia le encantan las matemáticas, y a los matemáticos les encantan los símbolos enigmáticos, así que tenemos más símbolos con los que jugar.

```julia-repl
julia> 0b1011 ⊻ 0b0010 # xor() in infix notation
"00001001"

julia> 0b1011 ⊼ 0b0010 # not and
"11111101"

julia> 0b1011 ⊽ 0b0010 # not or
"11110100"
```

En los editores que entienden Julia, se escriben como `\xor`, `\nand` y `\nor` y luego un tabulador en cada caso.

Estos símbolos no son muy conocidos, ni siquiera entre quienes han estudiado matemáticas en la universidad (quien escribió este concepto nunca los había visto antes).
Si quieres usarlos, ¡ten cuidado con quién eliges para que revise tu código!


[bitwise]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
[bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
[xor]: https://en.wikipedia.org/wiki/Exclusive_or
[2complement]: https://en.wikipedia.org/wiki/Two%27s_complement
[arithmetic]: https://en.wikipedia.org/wiki/Arithmetic_shift
[logical]: https://en.wikipedia.org/wiki/Logical_shift
[bitrotate]: https://docs.julialang.org/en/v1/base/math/#Base.bitrotate
