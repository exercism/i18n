**Alerta de spoilers: este artículo contiene spoilers sobre el ejercicio Granos en general y, en particular, sobre el ejercicio Granos del track de Bash. Si todavía no lo has completado y no quieres que te muestren algunas soluciones, ¡vuelve cuando lo hayas terminado!**

Es tu primer día en una empresa nueva. Ya hiciste todo el papeleo, conociste al equipo y por fin llega el momento de sentarte a leer un poco del código en el que vas a trabajar. Empiezas a leer las distintas funciones, clases y módulos y, mientras lees, te descubres entrecerrando los ojos frente a la pantalla, sin entender nada. Sigues leyendo y una sola palabra se te escapa de la boca, apenas pronunciada, casi suspirada: «¿Quéeeeeee...?»[^1] Cuanto más avanzas, más te pasa esto, y sientes cada vez más desconcierto y hasta un poco de enojo.

> ¿Qué está pasando en este código?

Cada vez que más de una persona trabaja en un mismo código, la cantidad de cuidado y de intención que hacen falta para mantener las cosas manejables aumenta *muchísimo*. Ya no se trata solo del concepto que vive en tu cabeza y del código que solo tiene que hacer que ese concepto ocurra. Ahora el concepto tiene que vivir *dentro del código*, donde todas las personas que colaboran puedan verlo y cambiarlo si hace falta.

La *forma* en que implementas algo no significa mucho para el usuario final, pero debería *decir muchísimo* a cualquier ingeniero que toque tu diseño en algún momento. Muchas veces hay muchas maneras de lograr la misma funcionalidad, y puede parecer que cualquiera de las opciones alcanzaría para hacer el trabajo. Sin embargo, yo creo que cada decisión que tomas debería tener una razón (aunque sea una decisión pequeña con una razón pequeña), y esa razón debería comunicar un objetivo o un requisito.

La idea de que los detalles de implementación deberían ayudar a quien lee el código a distinguir el proceso de pensamiento, los objetivos y las prioridades se llama **intención de diseño**. Cómo nombras tus variables, qué parámetros recibe tu función y cómo se abstraen las cosas son todos lugares donde se puede expresar la intención de diseño, bien o mal.

Creo firmemente que la intención de diseño es una de las cosas más importantes que hay que tener en cuenta al implementar un diseño de ingeniería. Es una de las cosas que distingue a la ingeniería de software de la programación.

> La ingeniería de software es lo que le pasa a la programación cuando le agregas tiempo y otros programadores.
>
> [Russ Cox](https://research.swtch.com/vgo-eng)

## La intención de diseño es transversal a las disciplinas

Trabajo como ingeniero mecánico, diseñando [moldes de inyección](https://youtu.be/WHwTHarf8Ck?t=51), en su mayoría para dispositivos médicos. Todos mis diseños, una vez terminados, salen directamente por la puerta hacia el taller de maquinado, donde empiezan a fabricar todas las piezas y a ensamblarlas. Como no saben todo lo que pasó por mi cabeza mientras creaba cada diseño, tengo que encontrar la manera de *mostrar* mi intención a través del diseño mismo.

Muchas veces, algunas características son especialmente críticas. O el cliente dijo que necesita tolerancias muy ajustadas justo ahí, o la forma en que el molde encaja requiere una precisión extrema por alguna razón. Así que, para ayudar a los maquinistas a crear las piezas de modo que prioricen la precisión en las partes importantes, tengo que dejar zonas específicamente cuadradas o fáciles de sujetar en una prensa de una manera determinada. De esa forma, el camino más fácil para ellos produce los mejores resultados para mí.

También hay zonas donde las dimensiones no son tan críticas. Por ejemplo, si pongo en el diseño un agujero que es solo para una ventilación de aire, lo hago de un tamaño común y corriente, como 6mm.

Cuando están maquinando este agujero y van a medir cómo quedó, si ven un número como 5.99mm, piensan: «Bien, seguramente debía ser 6mm, así que estoy bastante cerca», y ni siquiera tienen que ir a revisar de nuevo las dimensiones en el CAD o en el plano de especificaciones. En cambio, si yo lo hiciera de un tamaño poco común, como 5.87mm, lo mirarían y tendrían esta reacción inicial:

1. Ay, ¿quedé demasiado por debajo de la medida? ¿Debía ser de 6mm?
2. (Van a revisar el CAD y ven que su agujero está bien y que simplemente es un tamaño poco común.)
3. Mmm. Seguro que este agujero tiene un tamaño poco común por alguna razón. Quizá sea muy importante, o el cliente pidió un agujero especial aquí. Tendré que ir a hablar con Ryan y ver qué tiene de importante este agujero.
4. (¡PUM! Dejan el trozo de aluminio sobre mi escritorio con toda delicadeza.)
5. (Descubren que este agujero no tiene nada de importante, que yo simplemente elegí un tamaño raro y que todo ese trabajo y esa preocupación extra fueron en vano.)
6. Vaya, ese tal Ryan sí que es un caso. (refunfuños, una grosería, refunfuños)

Todo esto pasa porque cada decisión de mi diseño les comunica algo a las demás personas que lo miran y trabajan en él, lo quiera yo o no. Ellos *tienen* que ver un significado en él, ¡porque es la única información de la que disponen! Así que es mucho mejor que me tome el tiempo de poner en mi diseño información *significativa* e **intencional**.

## Granos: una introducción

Ahora hablemos de cómo se puede comunicar la intención de diseño en el código, con un ejemplo de uno de los ejercicios de Exercism. Hace poco trabajé con un estudiante en su solución al ejercicio *Granos* del track de Bash. *Granos* es un ejercicio sobre el [problema del trigo y el tablero de ajedrez](https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem). En pocas palabras, se pone un grano de trigo en la primera casilla de un tablero de ajedrez. Dos granos van en la siguiente casilla. Cuatro granos van en la que sigue. Y así sucesivamente, con cada casilla teniendo el doble de granos que la anterior. Se les pide a los estudiantes que encuentren la manera de calcular el valor de cada casilla individual y también el total de granos en el tablero.

A este estudiante en particular se le ocurrió una manera bastante ingeniosa de calcular el total.

```bash
bc <<< 'ibase=16;FFFFFFFFFFFFFFFF'
```

`bc` es una calculadora de línea de comandos. Puedes pasarle cadenas de operaciones aritméticas y las evaluará, incluso para números enteros muy grandes y números de punto flotante. Hay otras maneras de hacer cálculos sin usar `bc` en Bash, pero, por simplicidad, vamos a ver cómo se puede comunicar la intención (o no) al usar `bc`.

Esta solución funciona porque todo el ejercicio gira en torno a potencias de dos, y donde hay potencias de dos hay binario, y donde hay binario, ¡hay hexadecimal![^2]

Es una solución ingeniosa, pero ¿qué nos está diciendo el código? ¿Que el hexadecimal es importante aquí? ¿Que el problema gira fundamentalmente en torno al 16? Después de releer el enunciado del problema, queda bastante claro que ninguna de las dos cosas es cierta. El estudiante y yo hicimos una lluvia de ideas sobre cómo comunicar la intención con más claridad. Estas son algunas de las que se nos ocurrieron:

### Primera opción: binario

Como tenemos un montón de cosas que se duplican (y, por lo tanto, un montón de potencias de 2), veamos qué pasa en binario, a ver si eso nos ayuda.

---

La primera casilla tiene 1 grano. En binario, esto también sería `0b1` (donde `0b` solo significa «este es un número binario», y el número en sí es `1`).

La segunda casilla tiene 2 granos. En binario, `0b10`. El total hasta ahora es 3 (o `0b11`).

La tercera casilla tiene 4 granos (`0b100`). Total hasta ahora: 7 (`0b111`).

La cuarta casilla tiene 8 granos (`0b1000`). Total hasta ahora: 15 (`0b1111`).

---

¿Puedes ver el patrón?

Cada casilla representa otro dígito binario, y sumarlos todos juntos solo produce un montón de 1.

En la solución del estudiante, podríamos reemplazar las F por 64 unos (uno por cada casilla).

```bash
bc <<< "ibase=2;1111111111111111111111111111111111111111111111111111111111111111"
```

Más intencional, porque se acerca más a lo que nos da el problema. Pero nosotros no hablamos robot. Una cadena larga y prácticamente incontable de 1 quizá no sea una mejora.

### Segunda opción: el cálculo por fuerza bruta

Bien, quizá abandonemos del todo los sistemas de numeración que no son decimales. ¿Por qué no hacemos que el código se parezca a cómo sumaríamos a mano la cantidad de granos de un tablero de ajedrez, contando los granos de cada casilla?

```bash
total=0
current_grains=1
for square in {1..64}; do
  total=$( bc <<< "$total + $current_grains" )
  current_grains=$( bc <<< "$current_grains * 2" )
done
echo "$total"
```

Eso es mucho más legible y comprensible. El código muestra claramente que la cantidad de casillas del tablero de ajedrez es un factor determinante, igual que el efecto de duplicación de cada casilla. Creo que esto es mejor que la solución inicial.

Sin embargo.

Es lento. ¿Un bucle, sumas y llamadas repetidas a un comando externo? Todo eso se acumula en un tiempo de ejecución más bien lento. Ahora bien, ¿es un gran problema? No. Si estás escribiendo esto como script en Bash, probablemente ya decidiste que no tienes restricciones de velocidad. ¿Pero podría ser mejor? Sí.

### Tercera opción: cálculo directo

Entonces, ¿cómo sumamos todo esto sin iterar?

Consideremos una versión *más pequeña* del mismo problema: un tablero de ajedrez con 5 casillas[^3].

Las cinco casillas tendrían la siguiente cantidad de granos:

```txt
---------------------
| 1 | 2 | 4 | 8 |16 |
---------------------
```

Y el total aquí sería: 1 + 2 + 4 + 8 + 16 = 31. Mmm. El 31 todavía no me grita nada obvio. Vamos un poco más grande.

Bien, ¿y qué tal un tablero de ajedrez de 6 casillas? Esta vez voy a mostrar el total acumulado debajo de cada casilla para ayudarnos a sumar.

```txt
-------------------------
| 1 | 2 | 4 | 8 |16 |32 |
|   | 3 | 7 |15 |31 |63 |
-------------------------
```

Y la suma: 1 + 2 + 4 + 8 + 16 + 32 = 63. Mmm... En realidad ya empiezo a ver un atisbo de patrón, pero haremos uno más solo para estar seguros.

7 casillas:

```txt
-----------------------------
| 1 | 2 | 4 | 8 |16 |32 |64 |
|   | 3 | 7 |15 |31 |63 |127|
-----------------------------
```

1 + 2 + 4 + 8 + 16 + 32 + 64 = 127. ¿Lo ves? ¿Te dicen algo los valores 31, 63, 127?

Son *casi* potencias de 2. De hecho, son *uno menos* que la *siguiente* potencia de dos.

Un ejemplo más, para que quede claro. Imagina un tablero de ajedrez de 12 casillas. Eso es uno, duplicado 11 veces (lo que, en el mundo de las matemáticas, es 2^11): 2048. Duplícalo otra vez y obtienes 4096 (2^12). Entonces... si le atinamos al patrón, el total acumulado estaría *uno por debajo* de 4096, también conocido como 4095. Y si lo sumamos, eso es exactamente lo que obtenemos: 1 + 2 + 4 + 8 + 16 + 32 + 64 + 128 + 256 + 512 + 1024 + 2048 = 4095.

> Dicho de otra forma, para encontrar el total de las `n` casillas, tienes que subir una potencia de dos y restar 1 al resultado.

La cantidad de granos en la casilla 64 es 2^63 (indexación desde cero, ¿recuerdas?). Así queeee... si queremos calcular el total de granos de todas las casillas hasta la 64 *inclusive*, tenemos que calcular 2^64 y restar 1.

¡Pum!

En Bash, se verá así:

```bash
bc <<< "2^64 - 1"
```

Esto tiene sentido cuando confirmas qué está pasando con el binario. En binario, ¿cuál era el total de las 64 casillas?

```txt
0b1111...  # 64 ones
```

¿Cuál es la cantidad de granos en la teórica casilla 65?

```txt
0b10000... # 1 and 64 zeros
```

¿Cómo pasas de 1 y 64 ceros a 64 unos? Restas 1.

¿Y qué beneficio adicional nos da esto? Bueno, ahora tenemos una expresión bonita y legible para el total. No itera, así que el rendimiento es bueno. Y contiene el número 64, que es la cantidad de casillas de un tablero de ajedrez, lo cual es un buen ejemplo de **intención de diseño** bien señalizada. Si por alguna razón, dentro de 1000 años, el mundo se estandariza en un tablero de ajedrez de 7x7, ese ingeniero del futuro (que probablemente use Bash 6.1) revisará el script, verá hacia dónde ibas y cambiará el 64 por un 49. ¡Todo bien!

## Mantengan la intención, amigos

Cuando estás desarrollando una implementación, es fácil tirar cosas por aquí y por allá y quedarte con la primera solución que funciona. Eso está bien mientras exploras el problema, pero una vez que entiendes por completo los componentes críticos (si tienes tiempo para darles un buen pulido), asegúrate de que cada algoritmo, cada nombre de variable e incluso tus espacios en blanco dibujen un retrato del problema, de los requisitos críticos y de cómo encajan todas las piezas.

[^1]: Ver también [la tira cómica de Thom Holwerda.](https://www.osnews.com/story/19266/wtfsm/)
[^2]: Si andas un poco oxidado con el conteo en binario y hexadecimal, @kytrinyx recomienda el libro [How to Count](https://www.amazon.com/Count-Programming-Mere-Mortals-Book-ebook/dp/B005DPIKPE). Como autopromoción desvergonzada, hace poco escribí [un par de entradas de blog sobre binario y hexadecimal también.](https://www.assertnotmagic.com/2018/09/10/binary-hexadecimal-part-1/)
[^3]: No sé cómo funcionaría eso. Quizá podríamos hacer que los peones se enfrenten en una justa.
