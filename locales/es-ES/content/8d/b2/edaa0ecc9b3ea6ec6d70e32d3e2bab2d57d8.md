**Importante: esta información ya está desactualizada. Consulta nuestra [entrada de blog más reciente](https://exercism.org/blog/contribution-guidelines-nov-2023) para ver los detalles actualizados.**

---

_En resumen: vamos a dedicar unos meses a rediseñar nuestro modelo de voluntariado y a dar un respiro a nuestros voluntarios principales, para que se libren del trabajo de revisar las colaboraciones de la comunidad.
Si usas Exercism solo para aprender o para hacer mentoría, aquí no hay nada que necesites saber (aunque te animamos a leerlo si te interesa).
Si eres mantenedor de un track, quieres colaborar con Exercism o quieres informar de un error o un problema, considera esto una lectura esencial 🙂_

---

Durante los últimos 6 meses hemos dedicado mucho tiempo a explorar el futuro de Exercism, imaginando cómo sería que cada track de un lenguaje fuera lo mejor posible.
Estamos increíblemente orgullosos de lo que hemos construido hasta ahora.
Los 85.000 testimonios que se han dejado hablan del increíble trabajo que ha hecho nuestra comunidad al construir los tracks de lenguajes y al acompañar con mentoría a tantos estudiantes a lo largo de ellos.
Y lo más importante: creemos que no hemos hecho más que arañar la superficie de lo que es posible.
Tenemos grandes ideas, esperanzas e ilusión por todo lo que Exercism puede llegar a ser.
Pero para lograrlo, primero tenemos que resolver algunos problemas fundamentales que siguen ahí, bajo la superficie.

El principal de ellos es la necesidad de resolver el reto de hacer crecer nuestra comunidad de voluntarios de una forma sana y sostenible.
Exercism se ha construido sobre los hombros de cientos de voluntarios entregados, pero una gran parte de ellos ahora está quemada y muchos se han marchado como consecuencia.
Hay infinidad de motivos: algunos directamente relacionados con Exercism, otros por las prisas y la falta de tiempo de la vida diaria, y otros por el contexto de todo lo que está pasando en el mundo ahora mismo.
Pero tenemos muy claro que necesitamos diseñar y desarrollar una forma mejor de construir nuestra plataforma entre todos.

Históricamente, hemos intentado construir Exercism con un modelo de software de código abierto (OSS, por sus siglas en inglés) en el que unos mantenedores revisan las colaboraciones del resto de la comunidad.
Esto nos ha causado muchos problemas y ha generado frustración tanto en los mantenedores como en los colaboradores.
Lo explico con más detalle más abajo si te interesa, pero el resumen es que nuestros voluntarios principales ahora se pasan el tiempo actuando como filtros reactivos en lugar de como creadores innovadores.
Eso es mucho menos divertido para ellos, y hace que Exercism pierda la magia que esas personas aportaban antes a la plataforma.

Hay dos cosas que tenemos que hacer para arreglar esto:
1. Necesitamos diseñar un nuevo sistema de voluntariado que encaje mejor en Exercism que el modelo tradicional de OSS.
  Hasta ahora hemos gastado bastante energía intentándolo, y hemos fracasado.
  Así que vamos a tomarnos un tiempo para trabajar con nuestros voluntarios y diseñarlo bien durante los próximos meses.
2. Vamos a pausar en gran medida las colaboraciones del resto de la comunidad durante los próximos meses, para que nuestros voluntarios principales puedan centrarse en construir y desarrollar los tracks como ellos quieran (¡o tomarse un año sabático si solo quieren descansar un poco!).

Mi esperanza es que, dando un paso atrás y diseñando esto de verdad, junto con la recaudación de fondos para ampliar nuestro equipo educativo, podamos hacer de Exercism un lugar estupendo para ser voluntario y ayudemos a asegurar su futuro.
Mientras tanto, estos cambios deberían hacer que los tracks puedan mejorar y crecer más de lo que han podido en el último año, y que nuestros mantenedores dejen de quemarse y se sientan, en cambio, más felices, con más energía y más conectados al trabajar en Exercism.

## Cambios concretos

Vamos a poner en marcha tres cambios concretos.

### Usa el foro, no las incidencias de GitHub

Vamos a dejar GitHub enteramente libre para que nuestros mantenedores trabajen en las incidencias que quieran abordar.
Vamos a cerrar multitud de incidencias que habíamos creado antes para que la comunidad trabajara en ellas (y añadiremos una etiqueta para poder reabrirlas fácilmente en el futuro si queremos), a la vez que dejaremos de permitir nuevas incidencias o PR no solicitados en la mayoría de los repositorios.
Si quieres comentar algo o informar de un problema, usa el [foro](https://forum.exercism.org) en su lugar.
Si abres una incidencia o un PR no solicitados, se cerrarán automáticamente y se te indicará que vayas al foro.

### Pausar las colaboraciones del resto de la comunidad

Los tracks se dividirán en tres categorías:
- En la mayoría de los tracks con mantenedores activos, se pausarán las colaboraciones de la comunidad para que los mantenedores puedan ser autónomos o tomarse un descanso.
  (Los mantenedores de estos tracks pueden pedir que se elimine el requisito obligatorio de una revisión.
  Para ello, habla con Erik en Slack).
- Algunos tracks con mantenedores activos que quieran seguir aceptando colaboraciones de la comunidad permanecerán abiertos. (Si eres mantenedor y prefieres este modo en lugar del de (1), ponte en contacto con Jonathan Middleton en Slack para hablarlo).
- En los tracks sin mantenedores activos, el desarrollo del track quedará básicamente en pausa durante este periodo.

En todos los casos, Erik y yo seguiremos revisando los PR de los repositorios de herramientas antes de fusionarlos.

La única excepción es que seguiremos aceptando PR para Enfoques y Artículos, y aplicaremos una política de fusión optimista en toda la organización, cuyo objetivo es crear una base de Enfoques en todo Exercism y permitir mejoras incrementales, con las siguientes reglas:
1. Si el código resuelve el ejercicio y es sintáctica y semánticamente idiomático (es decir, se parece al código de `$LANG`), debería fusionarse.
  Si no es así, quien haya enviado el PR debe corregirlo.
2. Si un mantenedor quiere hacer cambios en el contenido (por ejemplo, mejorar los consejos, retocar cosas o destacar enfoques mejores, alternativos o más idiomáticos), debería hacerlo en un PR posterior.

### Diseñar un nuevo sistema de voluntariado

Vamos a crear un Consejo de la Comunidad para codiseñar un marco de voluntariado sostenible y sano de cara al futuro, que libere todo el potencial de Exercism.
Si estás comprometido con el futuro de Exercism y quieres formar parte de este proceso, ponte en contacto con [Jonathan](mailto:jonathan@exercism.org).

Vamos a seguir adelante con estas acciones durante los próximos meses.
Iremos valorando todo durante ese periodo y tenemos previsto tomar nuevas decisiones en junio de 2023.
¡Si tienes alguna idea, abre un tema en el [foro](https://forum.exercism.org)!

## Epílogo: por qué nuestro modelo de OSS no funciona

Nuestro modelo histórico se ha construido en torno al modelo de OSS.
Se ha apoyado en voluntarios que llegan a Exercism, hacen un gran trabajo construyendo tracks y luego reciben privilegios de mantenedor, con los que pueden aceptar colaboraciones del resto de nuestros usuarios para mejorarlos.

Aunque sobre el papel parece estupendo, tiene problemas importantes.
El principal es que las personas que más magia aportan a Exercism acaban sin tiempo para programar o crear en Exercism, porque se les va el tiempo respondiendo a las colaboraciones de la comunidad.
Esto casi nunca es lo que llevó a los mantenedores a implicarse en Exercism, ni es un trabajo que disfruten.
Es un poco como cuando a alguien que adora programar lo «ascienden» a jefe de equipo y pasa a gestionar personas en lugar de programar.
Puede parecer un buen ascenso en su momento, pero a menudo resulta que la gente no disfruta siendo jefa ni la mitad de lo que disfruta programando.

También se basa en la suposición de que la suma de las colaboraciones del resto de la comunidad es mayor que la contribución individual que podría hacer un mantenedor concreto por su cuenta.
Pero en Exercism casi nunca es así.
Exercism es complejo y la educación es difícil, y juntos hacen que contribuir a Exercism sea algo complejo y difícil de construir.
Hay muchísimo que aprender y entender sobre cómo funciona Exercism a nivel técnico y sobre su enfoque de la educación, así que la mayoría de las primeras colaboraciones son de gente que todavía se está orientando.
Eso significa que sus primeras colaboraciones son relativamente pequeñas, pero también que casi siempre requieren mucho trabajo de revisión y ajuste.
Es un trabajo que consume mucho tiempo a los mantenedores.
De hecho, el tiempo total dedicado a la revisión (además del cambio de contexto que exige) hace que el mantenedor suela esforzarse más revisando el PR que si lo hubiera hecho él mismo.
Por supuesto, hay algunas excepciones, pero es cierto en el 99 % de los casos.
Y a menudo esto resulta aún más doloroso para el mantenedor, porque el problema que resuelve el PR no estaba ni de lejos entre sus prioridades, lo que hace que las cosas que sí sabe que son esenciales se queden sin hacer.

Por último, el modelo de OSS se basa en que los colaboradores empiecen poco a poco y acaben adquiriendo suficientes conocimientos y constancia como para convertirse en mantenedores.
En proyectos de OSS como las bibliotecas de software, esto funciona relativamente bien (por ejemplo, alguien usa una biblioteca en producción y no deja de añadirle mejoras, hasta que acaba sabiendo tanto como su creador original).
Sin embargo, en Exercism no ha ocurrido así.
A pesar de haber fusionado PR de miles de colaboradores en los últimos 12 meses, solo un puñado minúsculo ha llegado a ser colaborador habitual y aún menos se han convertido en mantenedores.
Esto se debe de nuevo sobre todo a la complejidad de Exercism, pero también a que no es una pieza de software contenida, que es donde este modelo funciona tradicionalmente.

Todo esto es increíblemente desmoralizador para los mantenedores y perjudicial para Exercism.

Los tracks se han estancado y nuestros voluntarios más importantes, que sentían pasión por construir, en gran medida la perdieron cuando su trabajo pasó a ser revisar el trabajo de otros, negociar prioridades contrapuestas y atender peticiones inesperadas.
Durante el desarrollo de la v3, los mantenedores pudieron trabajar con relativa autonomía, ya que su trabajo era en gran medida entre bastidores, lo que dio lugar a un nivel de productividad enorme y hizo que la mayoría de la gente disfrutara de verdad colaborando.
Desde el lanzamiento de la v3, y aunque muchos voluntarios dedican a Exercism el mismo tiempo que antes, ha sido un periodo mucho menos agradable y productivo, en gran parte por toda la energía que se ha ido en responder a las colaboraciones o incidencias de otros.
Nuestros voluntarios ahora se pasan el tiempo actuando como filtros reactivos en lugar de como innovadores, y eso es mucho menos divertido.

Estos son los retos que tenemos que resolver, y son difíciles.
Tenemos que encontrar la forma de que quienes quieren dedicar cientos de horas a construir los tracks de lenguajes de Exercism puedan hacerlo y disfrutarlo.
Tenemos que encontrar la forma de que las correcciones de errores y las colaboraciones pequeñas lleguen a nuestra base de código sin reclamar la atención de esos voluntarios clave.
Y tenemos que encontrar la forma de atraer a nuevos voluntarios a Exercism y de apoyarlos si deciden comprometerse con colaboraciones continuadas.
Tenemos que reducir en general ese papel de filtro, y a la vez respetar que quienes han puesto tanto esfuerzo en los tracks tienen opiniones firmes y muy bien fundamentadas.
Tenemos que lograr que gestionar y dirigir todo ese sistema de voluntariado sea divertido.
Y también tenemos que resolver un sinfín de cosas más.
Llevará tiempo y será todo un reto, pero cuando lo consigamos, será increíble.
