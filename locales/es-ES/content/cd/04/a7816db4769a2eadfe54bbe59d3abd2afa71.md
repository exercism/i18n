**Aviso de spoilers: este artículo contiene spoilers sobre el ejercicio Granos en general y, en concreto, sobre el ejercicio Granos del track de Bash. Si aún no lo has completado por tu cuenta y no quieres que te enseñen algunas soluciones, ¡vuelve cuando lo hayas terminado!**

Es tu primer día en una empresa nueva. Has hecho todo el papeleo, has conocido al equipo y por fin llega el momento de sentarte y empezar a leer parte del código en el que vas a trabajar. Empiezas a leer las distintas funciones, clases y módulos y, mientras lees, te descubres entrecerrando los ojos ante la pantalla, confundido. Sigues leyendo y una sola palabra se escapa de tu boca, apenas pronunciada, casi exhalada: «¿Quéeeeeeeee...?»[^1] Cuanto más avanzas, más veces ocurre, y te vas quedando cada vez más desconcertado e incluso un poco enfadado.

> ¿Qué está pasando en este código?

Siempre que más de una persona trabaja en un mismo fragmento de código, la cantidad de cuidado y de deliberación necesarios para mantenerlo manejable se dispara. Ya no se trata del concepto que vive en tu cabeza y del código que solo tiene que hacer realidad ese concepto. Ahora el concepto tiene que vivir *dentro del código*, donde todos los colaboradores puedan verlo y cambiarlo si hace falta.

*Cómo* implementas algo no significa gran cosa para el usuario final, pero debería decir *muchísimo* a cualquier ingeniero que toque tu diseño en algún momento. A menudo hay muchas formas de lograr la misma funcionalidad, y puede parecer que cualquiera de las opciones bastaría para hacer el trabajo. Sin embargo, yo creo que cada decisión que tomas debería tener un motivo (aunque sea una decisión pequeña con un motivo pequeño), y ese motivo debería comunicar un objetivo o un requisito.

La idea de que los detalles de implementación deberían ayudar a quienes leen el código a discernir el proceso de pensamiento, los objetivos y las prioridades se llama **intención de diseño**. Cómo nombras tus variables, qué parámetros recibe tu función y cómo se abstraen las cosas son lugares donde se puede expresar la intención de diseño, bien o mal.

Estoy firmemente convencido de que la intención de diseño es una de las cosas más importantes que hay que tener en cuenta al implementar un diseño de ingeniería. Es una de las cosas que distingue la Ingeniería de Software de la programación.

 > La ingeniería de software es lo que le pasa a la programación cuando le añades tiempo y otros programadores.
 >
 > [Russ Cox](https://research.swtch.com/vgo-eng)

## La intención de diseño es interdisciplinar

Trabajo como ingeniero mecánico, diseñando [moldes de inyección](https://youtu.be/WHwTHarf8Ck?t=51), sobre todo para dispositivos médicos. Todos mis diseños, una vez terminados, salen directamente por la puerta hacia el taller mecánico, donde empiezan a fabricar todas las piezas y a montarlas. Como no saben todo lo que pasó por mi cabeza mientras creaba cada diseño, tengo que encontrar la forma de *mostrar* mi intención a través del propio diseño.

Muchas veces, algunas características son especialmente críticas. O bien el cliente ha dicho que necesita tolerancias muy ajustadas ahí, o bien la forma en que encaja el molde requiere una precisión extrema por algún motivo. Así que, para ayudar a los mecánicos a fabricar las piezas de manera que den prioridad a la precisión en las partes importantes, tengo que dejar zonas que sean específicamente cuadradas o fáciles de sujetar en un tornillo de banco de una manera concreta. De ese modo, el camino más fácil para ellos produce los mejores resultados para mí.

También hay zonas donde las dimensiones no son tan críticas. Por ejemplo, si hago un agujero en el diseño que solo sirve para una salida de aire, le doy un tamaño corriente y redondo, como 6 mm.

Cuando están mecanizando este agujero y van a medir cómo ha quedado, si ven un número como 5,99 mm, pensarán: «Vale, esto probablemente debía ser 6 mm, así que estoy bastante cerca», y ni siquiera tendrán que ir a comprobar las dimensiones en el CAD o en el plano de especificaciones. En cambio, si yo le hubiera dado un tamaño poco común, como 5,87 mm, lo mirarían y tendrían esta reacción inicial:

1. Vaya, ¿me he quedado muy por debajo de la medida? ¿Se suponía que eran 6 mm?
2. (Van a comprobar el CAD y ven que su agujero está bien y que simplemente es un tamaño poco común).
3. Mmm. Seguro que este agujero tiene un tamaño poco común por algún motivo. Quizá sea muy importante, o quizá el cliente pidió un agujero especial aquí. Tendré que ir a hablar con Ryan y ver qué tiene de importante este agujero.
4. (¡PUM! Dejan el pedazo de aluminio sobre mi mesa con toda la delicadeza.)
5. (Descubren que este agujero no tiene nada de importante, que simplemente elegí un tamaño raro y que todo ese trabajo y esa preocupación extra no servían para nada.)
6. Vaya, ese Ryan, menudo elemento. (refunfuño, taco, refunfuño)

Todo esto ocurre porque cada decisión de mi diseño comunica algo a las demás personas que lo miran y trabajan con él, tanto si quiero como si no. ¡*Tienen* que verle un significado, porque es la única información de la que disponen! Así que es mucho mejor que me tome el tiempo de poner en mi diseño información *significativa* e **intencionada**.

## Granos: una introducción

Ahora vamos a hablar de cómo se puede comunicar la intención de diseño en el código, usando un ejemplo de uno de los ejercicios de Exercism. Hace poco trabajé con un estudiante en su solución al ejercicio *Granos* del track de Bash. *Granos* es un ejercicio que aborda el [problema del trigo y el tablero de ajedrez](https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem). En resumen, se coloca un grano de trigo en la primera casilla de un tablero de ajedrez. En la siguiente casilla van dos granos. En la siguiente, cuatro granos. Y así sucesivamente, de modo que cada casilla tiene el doble de granos que la anterior. Se pide a los estudiantes que encuentren la forma de calcular el valor de cada casilla concreta, así como el total de granos del tablero.

Este estudiante en concreto ideó una forma bastante ingeniosa de calcular el total.

```bash
bc <<< 'ibase=16;FFFFFFFFFFFFFFFF'
```

`bc` es una calculadora de línea de comandos. Puedes pasarle cadenas de operaciones aritméticas y las evaluará, incluso para números enteros muy grandes y números en coma flotante. Hay otras formas de hacer cálculos sin usar `bc` en Bash, pero, para simplificar, vamos a ver cómo se puede comunicar la intención (o no) al usar `bc`.

Esta solución funciona porque todo el ejercicio gira en torno a las potencias de dos, y donde hay potencias de dos hay binario, y donde hay binario hay hexadecimal[^2].

Es una solución ingeniosa, pero ¿qué nos está diciendo el código? ¿Que el hexadecimal es importante aquí? ¿Que el problema gira fundamentalmente en torno al 16? Después de releer el enunciado del problema, queda bastante claro que ninguno de los dos es el caso. El estudiante y yo hicimos una lluvia de ideas sobre cómo comunicar la intención con más claridad. Estas son algunas de las que se nos ocurrieron:

### Primera opción: binario

Como tenemos un montón de cosas que se van duplicando (y, por tanto, un montón de potencias de 2), vamos a ver qué ocurre en binario para comprobar si eso nos ayuda.

---

La primera casilla tiene 1 grano. En binario, esto también sería `0b1` (donde `0b` solo significa «este es un número binario», y el número en sí es `1`).

La segunda casilla tiene 2 granos. En binario, `0b10`. El total hasta ahora es 3 (o `0b11`).

La tercera casilla tiene 4 granos (`0b100`). Total hasta ahora: 7 (`0b111`).

La cuarta casilla tiene 8 granos (`0b1000`). Total hasta ahora: 15 (`0b1111`).

---

¿Ves el patrón?

Cada casilla representa otro dígito binario, y sumarlos todos juntos solo produce un montón de unos.

En la solución del estudiante, podríamos sustituir las F por 64 unos (uno por cada casilla)?

```bash
bc <<< "ibase=2;1111111111111111111111111111111111111111111111111111111111111111"
```

Más intencionada, porque se ajusta mejor a lo que nos da el problema. Pero no hablamos robot. Una cadena larga de unos, prácticamente incontable, quizá no sea una mejora.

### Segunda opción: el cálculo por fuerza bruta

Vale, quizá abandonemos del todo los sistemas de numeración no decimales. ¿Por qué no hacemos que el código se parezca a cómo sumaríamos a mano el número de granos de un tablero de ajedrez, contando los granos de cada casilla?

```bash
total=0
current_grains=1
for square in {1..64}; do
  total=$( bc <<< "$total + $current_grains" )
  current_grains=$( bc <<< "$current_grains * 2" )
done
echo "$total"
```

Es mucho más legible y comprensible. El código muestra claramente que el número de casillas del tablero de ajedrez es un factor determinante, así como el efecto de duplicación de cada casilla. Creo que es mejor que la solución inicial.

Sin embargo.

Es lento. ¿Repetir un bucle, sumar y llamar una y otra vez a un comando externo? Todo eso se acumula y da un tiempo de ejecución más bien lento. Ahora bien, ¿es un gran problema? No. Si estás escribiendo este script en Bash, probablemente ya has decidido que no tienes restricciones de velocidad. Pero ¿podría ser mejor? Sí.

### Tercera opción: el cálculo directo

Entonces, ¿cómo sumamos todo esto sin iterar?

Consideremos una versión *más pequeña* del mismo problema: un tablero de ajedrez con 5 casillas[^3].

Las cinco casillas tendrían el siguiente número de granos:

```txt
---------------------
| 1 | 2 | 4 | 8 |16 |
---------------------
```

Y el total aquí sería: 1 + 2 + 4 + 8 + 16 = 31. Mmm. El 31 todavía no me dice nada obvio. Vamos un poco más allá.

Vale, ¿y qué me dices de un tablero de ajedrez de 6 casillas? Esta vez mostraré el total acumulado debajo de cada casilla para ayudarnos a sumarlo.

```txt
-------------------------
| 1 | 2 | 4 | 8 |16 |32 |
|   | 3 | 7 |15 |31 |63 |
-------------------------
```

Y la suma: 1 + 2 + 4 + 8 + 16 + 32 = 63. Mmm... la verdad es que empiezo a vislumbrar un patrón, pero haremos uno más para asegurarnos.

7 casillas:

```txt
-----------------------------
| 1 | 2 | 4 | 8 |16 |32 |64 |
|   | 3 | 7 |15 |31 |63 |127|
-----------------------------
```

1 + 2 + 4 + 8 + 16 + 32 + 64 = 127. ¿Lo ves? ¿Te suenan de algo los valores 31, 63, 127?

Son *casi* potencias de 2. De hecho, son *una menos* que la *siguiente* potencia de dos.

Un ejemplo más, para que quede claro. Imagina un tablero de ajedrez de 12 casillas. Eso es uno, duplicado 11 veces (que, en el mundillo de las matemáticas, es 2^11): 2048. Duplícalo otra vez y obtienes 4096 (2^12). Así que... si hemos acertado con el patrón, el total acumulado sería *uno menos* que 4096, también conocido como 4095. Y si lo sumamos, eso es exactamente lo que obtenemos: 1 + 2 + 4 + 8 + 16 + 32 + 64 + 128 + 256 + 512 + 1024 + 2048 = 4095.

> Dicho de otro modo, para hallar el total de las `n` casillas, tienes que subir una potencia de dos y restar 1 al resultado.

El número de granos de la casilla 64 es 2^63 (indexación desde cero, ¿recuerdas?). Entonceeees... si queremos calcular el total de granos de todas las casillas hasta la 64 inclusive, tenemos que calcular 2^64 y restar 1.

¡Bingo!

En Bash, tendrá este aspecto:

```bash
bc <<< "2^64 - 1"
```

Esto tiene sentido cuando confirmas qué ocurre con el binario. En binario, ¿cuál era el total de las 64 casillas?

```txt
0b1111...  # 64 ones
```

¿Cuál es el número de granos de la teórica casilla 65?

```txt
0b10000... # 1 and 64 zeros
```

¿Cómo pasas de un 1 y 64 ceros a 64 unos? Restas 1.

¿Y qué beneficio adicional nos aporta esto? Pues que ahora tenemos una expresión bonita y legible para el total. No itera, así que el rendimiento es bueno. Y contiene el número 64, que es el número de casillas de un tablero de ajedrez, lo cual es un buen ejemplo de **intención de diseño** bien señalizada. Si por algún motivo, dentro de 1000 años, el mundo se estandariza en un tablero de ajedrez de 7x7, ese futuro ingeniero (que probablemente use Bash 6.1) revisará el script, verá lo que pretendías y cambiará el 64 por un 49. ¡Todo en orden!

## Seguid siendo intencionados, amigos

Cuando elaboras una implementación, es fácil ir probando cosas y aferrarte a la primera solución que funciona. Eso está bien mientras exploras el problema, pero, una vez que entiendes por completo los componentes críticos y si tienes tiempo para darle un buen repaso, asegúrate de que cada algoritmo, cada nombre de variable e incluso tus espacios en blanco dibujen una imagen del problema, de los requisitos críticos y de cómo encajan todas las piezas.

[^1]: Consulta también [el cómic de Thom Holwerda.](https://www.osnews.com/story/19266/wtfsm/)
[^2]: Si andas un poco oxidado con el conteo binario y hexadecimal, @kytrinyx recomienda el libro [How to Count](https://www.amazon.com/Count-Programming-Mere-Mortals-Book-ebook/dp/B005DPIKPE). Como autopromoción descarada, hace poco escribí [un par de entradas de blog sobre binario y hexadecimal](https://www.assertnotmagic.com/2018/09/10/binary-hexadecimal-part-1/).
[^3]: No sé cómo funcionaría eso. Quizá podríamos hacer que los peones se batieran en duelo entre sí.
