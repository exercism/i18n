# Consejos para la mentoría

## Notas de mentoría

Una de las mayores ayudas para la mentoría puede ser tener un archivo donde guardar notas para cada ejercicio que mentorizas.
Puede que descubras que muchas soluciones se benefician de las mismas sugerencias, así que, si guardas notas, no tendrás que escribir una y otra vez las mismas sugerencias de memoria.
Y, al tener las sugerencias en un solo sitio, puedes ir refinándolas con el tiempo para que sean más claras.

Si no sabes por dónde empezar con tus notas, puedes encontrar un archivo `mentoring.md` para el ejercicio de tu track en [exercism/website-copy/tracks][website-copy].
Si existe, puede incluir ejemplos de soluciones razonables, junto con sugerencias habituales y puntos de conversación para fomentar el debate.
Si no existe, quizá quieras volver más adelante y crear uno después de haber hecho tu propio archivo de notas para ese ejercicio.

Además, aunque ahora solo mentorices un lenguaje, es posible que en el futuro mentorices más.
Puede ayudarte organizar tus notas de mentoría por track y también por nombre de ejercicio, ya que es probable que distintos tracks necesiten sugerencias diferentes para el mismo ejercicio.

Las notas de mentoría son útiles tanto si mentorizas el ejercicio con frecuencia como si no.
Si mentorizas el ejercicio con frecuencia, te ahorran tener que escribir mucho desde cero, ya que puedes limitarte a copiar y pegar desde tus notas.
Si mentorizas el ejercicio con poca frecuencia, pueden recordarte sugerencias que quizá hayas olvidado en las semanas o meses transcurridos desde la última vez que lo mentorizaste.

No pasa nada porque las notas de mentoría sean distintas entre mentores.
Aquí tienes una forma de estructurarlas, pero no es la _única_.

Felicita al mentorado por haber pasado los tests (si los ha pasado).

Si el ejercicio lleva unos días en la cola, quizá puedas mencionarlo con algo como:

>Siento que hayas tenido que esperar un rato a que alguien te respondiera.
>Ahora mismo hay escasez de mentores activos de JavaScript para `Resistor Color Duo`.

Enumera lo que te gusta de la solución del mentorado.
Por ejemplo:

- Me gusta que esta solución sea concisa y legible.

- Me gusta el uso de `indexOf`.

- Me gusta que use el enfoque `(first * 10) + second` para evitar conversiones de número a string y de vuelta a número.

- Me gusta que no use bucles ni iteración.

- Me gusta el parámetro desestructurado.

A continuación pueden venir tus sugerencias más frecuentes.

~~~~exercism/note
Puede ser muy útil para el mentorado que incluyas un enlace para cada nueva característica del lenguaje que presentes.
Por ejemplo:

>No es necesario para este ejercicio, pero quizá puedas plantearte convertir la función en una [función flecha](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
~~~~

Aunque no queremos desvelar la solución, a veces el mentorado aprende mejor con un ejemplo.
Incluir un fragmento de código en una sección de detalles plegada puede servir como ejemplo, que el mentorado puede decidir si despliega o no.
Por ejemplo:

&lt;details&gt;&lt;summary&gt;Ejemplo con spoiler&lt;/summary&gt;

&lt;pre&gt;

export const decodedValue = ([firstColor, secondColor]) =>
  COLORS.indexOf(firstColor) * 10 + COLORS.indexOf(secondColor)

&lt;/pre&gt;

&lt;/details&gt;

Hacia el final de las notas puedes incluir un enlace a una solución publicada que recoja todas las sugerencias en su conjunto.

Justo al final de tus notas, quizá quieras incluir explicaciones más extensas que a veces piden los mentorados.
Estas explicaciones no surgen a menudo, pero aun así puede ser bueno anotarlas la primera vez que las usas, para que la próxima vez, que podría ser semanas o meses después, no tengas que inventarte la explicación desde cero.
Por ejemplo, a veces un mentorado pregunta cómo funcionaría el enfoque de la multiplicación para Dúo de colores de resistencia si el negro fuera la primera banda y representara un cero a la izquierda:

>Que el negro sea la primera banda es un buen punto a tener en cuenta, así que vamos a considerarlo.
>El color de la resistencia representa la cantidad de ohmios de la resistencia,
>y no se usaría un cero a la izquierda en una resistencia de varias bandas.
>Así que el negro no sería la primera banda.
>Además, `parseInt` o `Number` también eliminan el cero a la izquierda.

Una categoría opcional de datos que puedes guardar en las notas de mentoría es un registro de benchmarks de distintas soluciones o enfoques.

## Benchmarks

Una preocupación habitual entre los mentorados es el rendimiento de su solución.
Esto ocurre sobre todo con lenguajes «de bajo nivel» como C, C++, Go y Rust.
Además de lo idiomático que sea su código, los mentorados de otros lenguajes también suelen preocuparse por la eficiencia de su código.

~~~~exercism/note
Hacer benchmarks no es algo que se _espere_ de un mentor.
Sin embargo, a los mentorados suele impresionarles especialmente ver cómo se compara el benchmark de su solución con otros enfoques.
~~~~

Go es un track especialmente favorable para hacer benchmarks, ya que los benchmarks suelen incluirse en el archivo de tests.
Otros lenguajes pueden requerir algo de investigación para determinar qué método te funcionaría mejor.
Por ejemplo, si solo usas el editor en línea, tendrás que buscar un sitio donde ejecutar benchmarks en línea.
Por ejemplo, [JSBench.me][jsbench-me] es una herramienta en línea para hacer benchmarks de JavaScript.

Si ejecutas el código en local, tienes la opción de descargar software de benchmark que puedes ejecutar en tu máquina.
Por ejemplo, Rust puede usar [Criterion][criterion], o [cargo bench][cargo-bench] con [tests de benchmark][rust-benchmark-tests].

Hay al menos un par de formas de llevar un registro de los benchmarks.
Una forma es llevar una lista continua de todos los que hagas benchmark, pero puede volverse inmanejable si la lista se hace larga.
Otra forma es llevar una lista de benchmarks representativos de distintos enfoques.
Los mentorados a menudo quieren ver el código de los enfoques más rápidos, así que, si un enfoque más rápido está publicado, seguramente agradecerán mucho que les facilites el enlace.

~~~~exercism/caution
Si facilitas un enlace a una solución a la que has hecho benchmark, asegúrate de enlazar a la solución publicada y no a la sesión de mentoría.
No todas las soluciones que reciben mentoría se publican.
~~~~

## Notas de mentoría que no son específicas de un ejercicio

Puede haber características del lenguaje que te encuentres explicando en más de un ejercicio.
Cuando estés a punto de copiar y pegar una sugerencia de un archivo a otro, quizá te convenga ponerla en su propio archivo.
De nuevo, una ventaja de guardar una sugerencia en un solo sitio es que resulta más fácil refinarla con el tiempo.
También resulta más fácil de encontrar cuando la usas para un ejercicio en el que no la habías usado antes.
En lugar de intentar recordar en qué ejercicio explicaste antes la sugerencia, puedes ir directamente al archivo propio de esa sugerencia.

## Cuando un mentorado tiene una pregunta

Se anima a los mentorados a especificar qué esperan obtener de la sesión de mentoría.
A menudo lo expresan en forma de pregunta.
Si la pregunta es algo cuya respuesta no conoces y que no te interesa, no pasa nada por dejar la solicitud de mentoría para otro mentor.

Si no sabes la respuesta pero quieres averiguarla, quizá lo mejor sea no aceptar la solicitud de mentoría hasta que la hayas descubierto.
Si para entonces la solicitud de mentoría ya no está, al menos habrás aprendido algo y no habrás hecho esperar al mentorado.

Una excepción a esto puede ser que la solicitud de mentoría lleve ya varios días o más en la cola.
En esa situación, quizá quieras aceptar la solicitud de mentoría y dar el feedback que puedas, y avisar al mentorado de que le responderás sobre su pregunta.
Por supuesto, es importante hacer un seguimiento, ya sea para informar al mentorado de la respuesta o para avisarle de que no la has encontrado.
Si no has podido encontrar la respuesta, puede ser útil para el mentorado que le describas los caminos que seguiste para intentar encontrarla.
Puede que el mentorado te responda con otras formas de intentar encontrar la respuesta.
Entre los dos puede que encontréis la respuesta.

Si has agotado todas las formas que conoces de encontrar la respuesta, puedes sugerir al mentorado que cierre la conversación y vuelva a enviar su solicitud por si otro mentor puede dar con la respuesta.
Si quiere, el mentorado puede publicar en la conversación finalizada para compartir contigo la respuesta cuando la descubra.
Y del mismo modo, si tú descubres la respuesta más tarde, puedes volver a la conversación finalizada y avisar al mentorado.

Si conoces la respuesta y quieres abordarla, un buen momento para hacerlo es entre decirle al mentorado qué te gusta de su solución y ofrecerle sugerencias sobre otros enfoques.

### Código que falla

El código puede fallar porque no pasa todos los tests o porque no compila o no satisface al intérprete.

Cada mentor tiene más o menos predisposición o paciencia para lidiar con código que falla, lo cual puede depender en cierta medida de cómo se presente, ya que el código que falla no siempre se presenta de la misma manera.

A veces un mentorado dirá que probó otro enfoque y no funcionó, y preguntará por qué no funcionó.
Puede que ni siquiera incluya el código, o que lo publique en un comentario prácticamente ilegible en lugar de en una iteración.

Una solución probada en el editor web solo se puede enviar para una solicitud de mentoría si ha pasado todos los tests.
Una de las razones es que así el mentor puede centrarse en sugerir mejoras u otros enfoques sobre el código que ya funciona.
El _debugging_ del código no es necesariamente algo que un mentor quiera hacer ni que se espere de él.
Sin embargo, una solución que falla y se envía a través de la CLI sí se puede enviar para una solicitud de mentoría, si el mentorado pide ayuda para resolverla.

Si no se ha proporcionado el código que falla y el enfoque fallido que se describe no parece bueno, puede bastar con sugerir que, en lugar de usar el enfoque fallido, otro enfoque posible sería uno que no sea ni el fallido ni el que usó y sí pasó.
O puede bastar con explicar por qué el enfoque que usó es mejor que el fallido, sin entrar en los detalles de qué bug tenía el enfoque fallido.

Por ejemplo, es habitual que los mentorados tengan problemas con Nombre del robot.
O bien los tests se agotan por tiempo de espera, o bien no consiguen generar suficientes nombres, y quieren saber cómo arreglarlo.
Si tienes la predisposición y la paciencia, puedes analizar su código y sugerir cómo abordar el problema.
O puedes explicar que comprobar nombres generados aleatoriamente provoca más colisiones a medida que se generan más nombres, y sugerir que otro enfoque podría ser generar los nombres de forma secuencial y luego mezclarlos.

Si el código que falla se ha pegado en un comentario prácticamente ilegible, quizá quieras dar el feedback que puedas sobre la solución que pasa y sugerir que envíen el código del comentario como otra iteración.
También puedes sugerir al mentorado que revise los errores de la iteración que falla como guía para localizar el problema.

Si el código está en una iteración que falla, puede ser útil indicar al mentorado que revise los errores de la ejecución de los tests.
Algunos lenguajes necesitan algo más de orientación sobre cómo leer los errores o los resultados de los tests que otros.
Puede ser útil citar una o varias partes de los errores y explicar al mentorado qué significan.

En última instancia, no es responsabilidad del mentor arreglar el código que falla del mentorado, pero el mentor, si quiere, puede sugerirle formas de arreglarlo por sí mismo.

## Cómo afrontar el flujo continuo de la cola

Puede ocurrir que te apuntes como mentor de un track, pero nunca veas ejercicios en su cola para mentorizar.
Puede que pienses que algo va mal, pero hay al menos un par de razones para ello.
Una razón es que puede que ahora mismo nadie esté solicitando mentoría en ese track.
A veces un track puede tener periodos de inactividad.
Otra razón es que puede que otros mentores acepten las solicitudes antes de que tú las veas.
Es probable que esto ocurra en un track popular con muchos mentores activos.

Si hay muchas solicitudes en la cola, hay varias formas de abordar su mentoría.
Puede que quieras ir de las más antiguas a las más recientes, para atender primero a quienes llevan más tiempo esperando.
O puedes optar por ir de las más recientes a las más antiguas, sobre todo si las más antiguas ya llevan mucho tiempo esperando.
Así, quienes han estado activos recientemente no tienen que esperar a que se resuelva el trabajo acumulado.

Si hay varias solicitudes para el mismo ejercicio, quizá quieras ir resolviéndolas por lotes del mismo ejercicio para mantener la concentración, en lugar de pasar del ejercicio A al ejercicio B y de vuelta al ejercicio A.

Puede que una solicitud de un ejercicio que no te interesa lleve ahí días o semanas.
Puedes optar por no atenderla con la esperanza de que otro mentor la acepte, o puede servirte de motivación para probar el ejercicio tú mismo.
Algo que puede ayudarte es echar un vistazo a la solución enviada.
Puede que use un enfoque en el que no habías pensado, y ese enfoque puede hacer que resolver el ejercicio te resulte más atractivo.
Pero si miras el código y sigues sin tener interés en resolver el ejercicio, no pasa nada.
El hecho de mirar una solicitud de mentoría no significa que tengas que hacer clic en el botón «Empezar a mentorizar».

[website-copy]: https://github.com/exercism/website-copy/tree/main/tracks
[jsbench-me]: https://jsbench.me/
[criterion]: https://crates.io/crates/criterion
[cargo-bench]: https://doc.rust-lang.org/cargo/commands/cargo-bench.html
[rust-benchmark-tests]: https://doc.rust-lang.org/unstable-book/library-features/test.html
