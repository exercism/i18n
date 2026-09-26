# Consejos de mentoría

## Notas de mentoría

Una de las mayores ayudas para la mentoría puede ser tener un archivo donde guardar notas para cada ejercicio en el que das mentoría.
Es posible que descubras que muchas soluciones se benefician de las mismas sugerencias, así que, si mantienes notas,
no tienes que escribir una y otra vez las mismas sugerencias de memoria.
Y, al tener las sugerencias en un solo lugar, puedes irlas perfeccionando con el tiempo para que sean más claras.

Si no sabes cómo empezar con tus notas, puedes encontrar un archivo `mentoring.md` para el ejercicio de tu track
en [exercism/website-copy/tracks][website-copy].
Si existe, puede incluir ejemplos de soluciones razonables, junto con sugerencias comunes y puntos de conversación
para fomentar más discusión.
Si no existe, quizás quieras volver y crear uno después de haber hecho tu propio archivo de notas para ese ejercicio.

Además, aunque ahora solo des mentoría en un lenguaje, puede que en el futuro des mentoría en más.
Puede ayudarte a organizar tus notas de mentoría por track y también por nombre de ejercicio, ya que es probable que distintos tracks requieran
sugerencias distintas para el mismo ejercicio.

Las notas de mentoría son útiles, ya sea que des mentoría para el ejercicio con frecuencia o de vez en cuando.
Si lo haces con frecuencia, te ahorran muchísimo teclear desde cero, porque puedes simplemente copiar y pegar de tus notas.
Si lo haces de vez en cuando, pueden recordarte sugerencias que quizás hayas olvidado en las semanas o meses
desde la última vez que diste mentoría para ese ejercicio.

Está bien que las notas de mentoría sean distintas entre mentores.
Aquí tienes una forma de estructurarlas, pero no es la _única_ forma.

Felicita al aprendiz por haber pasado las pruebas (si las pasó).

Si el ejercicio lleva unos días en la cola, tal vez quieras mencionarlo con algo como:

>Perdón por la demora en responderte.
>Actualmente hay pocos mentores activos de JavaScript para `Resistor Color Duo`.

Enumera lo que te gusta de la solución del aprendiz.
Por ejemplo:

- Me gusta que esta solución sea concisa y legible.

- Me gusta el uso de `indexOf`.

- Me gusta que use el enfoque `(first * 10) + second` para evitar convertir de número a string y de nuevo a número.

- Me gusta que no use bucles ni iteración.

- Me gusta el parámetro desestructurado.

Después podrían venir tus sugerencias más frecuentes.

~~~~exercism/note
Puede ser muy útil para el aprendiz que incluyas un enlace para cada nueva característica del lenguaje que presentes.
Por ejemplo:

>No es necesario para este ejercicio, pero quizás quieras considerar convertir la función en una [función flecha](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
~~~~

Aunque no queremos revelar la solución, a veces el aprendiz aprende mejor con un ejemplo.
Poner un fragmento de código en una sección de detalles contraída puede servir como ese ejemplo, que el aprendiz puede expandir o no.
Por ejemplo:

&lt;details&gt;&lt;summary&gt;Ejemplo con spoiler&lt;/summary&gt;

&lt;pre&gt;

export const decodedValue = ([firstColor, secondColor]) =>
  COLORS.indexOf(firstColor) * 10 + COLORS.indexOf(secondColor)

&lt;/pre&gt;

&lt;/details&gt;

Hacia el final de las notas podrías incluir un enlace a una solución publicada que represente todas las sugerencias.

Al final del todo de tus notas, quizás quieras incluir explicaciones más extensas que los aprendices a veces piden.
Estas explicaciones no surgen con frecuencia, pero aun así puede ser bueno anotarlas la primera vez que las usas,
para que la próxima vez, que podría ser dentro de semanas o meses, no tengas que idear la explicación desde cero.
Por ejemplo, a veces un aprendiz pregunta cómo funcionaría el enfoque de multiplicación para Resistor Color Duo
si el negro fuera la primera banda para un cero inicial:

>Que el negro sea la primera banda es un buen punto a considerar, así que considerémoslo.
>El color de la resistencia representa la cantidad de ohmios de la resistencia,
>y un cero inicial no se usaría en una resistencia de varias bandas.
>Así que el negro no sería la primera banda.
>Además, `parseInt` o `Number` también eliminan el cero inicial.

Una categoría opcional de datos para guardar en las notas de mentoría es un registro de benchmarks de distintas soluciones o enfoques.

## Benchmarks

Una preocupación común de los aprendices es qué tan eficiente es su solución.
Esto ocurre especialmente con lenguajes de «bajo nivel» como C, C++, Go y Rust.
Además de qué tan idiomático es su código, los aprendices de otros lenguajes también suelen preocuparse por la eficiencia de su código.

~~~~exercism/note
Hacer benchmarks no es algo que se _espere_ de un mentor.
Sin embargo, a los aprendices suele impresionarles especialmente cómo se compara el benchmark de su solución con otros enfoques.
~~~~

Go es un track especialmente amigable para hacer benchmarks, ya que los benchmarks suelen estar incluidos en el archivo de pruebas.
Otros lenguajes pueden requerir algo de investigación para determinar qué método te funcionaría mejor.
Por ejemplo, si solo usas el editor en línea, tendrías que buscar un lugar para ejecutar benchmarks en línea.
Por ejemplo, [JSBench.me][jsbench-me] es un sitio para hacer benchmarks de JavaScript en línea.

Si ejecutas el código de forma local, tienes la opción de descargar software de benchmarking que puedes ejecutar en tu computadora.
Por ejemplo, Rust puede usar [Criterion][criterion], o [cargo bench][cargo-bench] con [pruebas de benchmark][rust-benchmark-tests].

Hay al menos un par de formas de llevar un registro de los benchmarks.
Una es mantener una lista continua de todos los que mides, pero puede volverse difícil de manejar si la lista se hace larga.
Otra es mantener una lista de benchmarks representativos de distintos enfoques.
Los aprendices a menudo quieren ver el código de los enfoques más rápidos, así que si un enfoque más rápido está publicado,
seguramente agradecerán mucho que les des el enlace.

~~~~exercism/caution
Si das un enlace a una solución a la que le hiciste un benchmark, asegúrate de dar el enlace a la solución publicada y no a la sesión de mentoría.
No todas las soluciones que reciben mentoría se publican.
~~~~

## Notas de mentoría que no son específicas de un ejercicio

Puede haber algunas características del lenguaje que te encuentres mencionando en más de un ejercicio.
Cuando estés por copiar y pegar una sugerencia de un archivo a otro, quizás convenga ponerla en su propio archivo.
De nuevo, una ventaja de mantener una sugerencia en un solo lugar es que es más fácil perfeccionarla con el tiempo.
También hace más fácil encontrarla cuando la usas para un ejercicio en el que no la habías usado antes.
En lugar de intentar recordar en qué ejercicio mencionaste la sugerencia antes,
puedes ir directamente al archivo de esa sugerencia.

## Cuando un aprendiz tiene una pregunta

Se anima a los aprendices a especificar qué esperan obtener de la sesión de mentoría.
A menudo lo expresan en forma de pregunta.
Si la pregunta es algo para lo que no conoces la respuesta y no te interesa,
está bien dejar la solicitud de mentoría para otro mentor.

Si no conoces la respuesta pero quieres encontrarla, quizás sea mejor no tomar la solicitud de mentoría hasta que hayas aprendido la respuesta.
Si para entonces la solicitud ya no está, al menos aprendiste algo y no hiciste esperar al aprendiz.

Una excepción a esto puede ser que la solicitud de mentoría ya lleve varios días o más en la cola.
En ese caso, quizás quieras tomar la solicitud y dar la retroalimentación que puedas,
y avisarle al aprendiz que le responderás su pregunta más adelante.
Por supuesto, es importante darle seguimiento, ya sea para informarle la respuesta o para decirle que no pudiste encontrarla.
Si no pudiste encontrar la respuesta, puede ser útil para el aprendiz que describas qué caminos tomaste para intentar encontrarla.
El aprendiz puede responder con otras formas de intentar encontrar la respuesta.
Entre los dos, puede que den con ella.

Si ya agotaste todas las formas que conoces de encontrar la respuesta, puedes sugerirle al aprendiz que termine la discusión y vuelva a enviar su solicitud,
con la posibilidad de que otro mentor pueda dar la respuesta.
Si quiere, el aprendiz puede publicar en la discusión terminada para compartir contigo la respuesta cuando la aprenda.
Y de igual manera, si tú aprendes la respuesta después, puedes volver a la discusión terminada y avisarle al aprendiz.

Si conoces la respuesta y quieres abordarla, un buen lugar para hacerlo es entre decirle al aprendiz qué te gusta de su solución
y ofrecer sugerencias de otros enfoques.

### Código que falla

El código puede fallar porque no pasa todas las pruebas o porque no compila o no satisface al intérprete.

Mentores distintos tendrán distintas inclinaciones o paciencia para lidiar con código que falla, lo que puede depender un poco de cómo se presente,
ya que el código que falla no siempre se presenta de la misma manera.

A veces un aprendiz dirá que intentó otro enfoque y no le funcionó, y preguntará por qué no funcionó.
Puede que ni siquiera incluya el código, o que lo publique en un comentario prácticamente ilegible en lugar de en una iteración.

Una solución probada en el editor web solo se puede enviar como solicitud de mentoría si pasó todas las pruebas.
Una de las razones es que así el mentor puede concentrarse en sugerir mejoras u otros enfoques para el código que ya funciona.
_Depurar_ código no es necesariamente algo que un mentor quiera hacer ni algo que se espere de él.
Sin embargo, una solución que falla enviada a través de la CLI sí se puede enviar como solicitud de mentoría, con el aprendiz pidiendo ayuda para resolverla.

Si no se proporcionó el código que falla y el enfoque fallido que se describe no suena bien, puede bastar con sugerir que,
en lugar de usar el enfoque que falla, otro enfoque podría ser uno que no sea ni el que falló ni el que usaron y sí pasó.
O puede bastar con explicar por qué el enfoque que usaron es mejor que el que falló,
sin entrar en los detalles de cuál era el bug del enfoque fallido.

Por ejemplo, es común que los aprendices tengan problemas con Robot Name.
O las pruebas se pasan del tiempo límite o no logran generar suficientes nombres, y quieren saber cómo arreglarlo.
Si tienes la inclinación y la paciencia, sin duda puedes analizar su código y sugerir cómo resolver el problema.
O puedes explicar que revisar nombres generados aleatoriamente provoca más colisiones a medida que se generan más nombres,
y sugerir que otro enfoque podría ser generar los nombres de forma secuencial y luego mezclarlos.

Si el código que falla se pegó en un comentario prácticamente ilegible,
quizás quieras dar la retroalimentación que puedas sobre la solución que pasa
y sugerir que envíe el código del comentario como otra iteración.
También puedes sugerirle al aprendiz que luego revise los errores de la iteración que falla como guía para saber dónde está el problema.

Si el código está en una iteración que falla, puede ser útil indicarle al aprendiz que revise los errores de la ejecución de las pruebas.
Algunos lenguajes necesitan un poco más de orientación que otros sobre cómo leer los errores o los resultados de las pruebas.
Puede ser útil citar una o más partes de los errores y explicarle al aprendiz qué significan.

En última instancia, no es responsabilidad del mentor arreglar el código que falla del aprendiz,
pero el mentor, si quiere, puede sugerirle al aprendiz formas de arreglarlo por su cuenta.

## Cómo lidiar con el continuo de la cola

Puede pasar que te registres para ser mentor de un track, pero nunca veas ejercicios en su cola esperando mentoría.
Quizás pienses que algo anda mal, pero hay al menos un par de razones para esto.
Una razón es que puede que por ahora nadie esté pidiendo mentoría en el track.
A veces un track puede tener periodos de inactividad.
Otra razón es que otros mentores pueden estar tomando las solicitudes antes de que las veas.
Es probable que esto ocurra en un track popular que tiene muchos mentores activos.

Si hay muchas solicitudes en la cola, hay varias formas de abordar la mentoría.
Puede que quieras trabajar de la más antigua a la más reciente, para atender primero a quienes han esperado más.
O puedes elegir trabajar de la más reciente a la más antigua, sobre todo si las más antiguas ya llevan mucho tiempo esperando.
Así, quienes han estado activos recientemente no tienen que esperar a que se resuelva el atraso.

Si hay varias solicitudes para el mismo ejercicio, quizás quieras atenderlas en grupos del mismo ejercicio para mantener la concentración,
en lugar de pasar del ejercicio A al ejercicio B y de vuelta al ejercicio A.

Puede pasar que una solicitud de un ejercicio que no te interesa haya estado ahí durante días o semanas.
Puedes elegir no atenderla con la esperanza de que otro mentor la tome, o puede servirte de motivación para intentar resolver el ejercicio tú mismo.
Algo que puede ser útil es mirar la solución enviada.
Puede usar un enfoque que no se te había ocurrido, y ese enfoque puede hacer que resolver el ejercicio te resulte más atractivo.
Pero si miras el código y sigues sin interés en resolver el ejercicio, no pasa nada.
Que mires una solicitud de mentoría no significa que tengas que hacer clic en el botón «Start mentoring».

[website-copy]: https://github.com/exercism/website-copy/tree/main/tracks
[jsbench-me]: https://jsbench.me/
[criterion]: https://crates.io/crates/criterion
[cargo-bench]: https://doc.rust-lang.org/cargo/commands/cargo-bench.html
[rust-benchmark-tests]: https://doc.rust-lang.org/unstable-book/library-features/test.html
