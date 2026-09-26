**Importante: Esta información ya está desactualizada. Consulta nuestra [publicación más reciente en el blog](https://exercism.org/blog/contribution-guidelines-nov-2023) para ver los detalles actualizados.**

---

_TL;DR; Vamos a pasar unos meses rediseñando nuestro modelo de voluntariado y dándoles un respiro a nuestros voluntarios clave de la tarea de revisar las colaboraciones de la comunidad.
Si usas Exercism solo para aprender o para ser mentor, aquí no hay nada que necesites saber (¡aunque si te interesa, léelo!).
Si eres mantenedor de un track, quieres colaborar con Exercism o quieres reportar un error o un problema, entonces considera esto una lectura esencial 🙂_

---

Durante los últimos 6 meses hemos dedicado mucho tiempo a explorar el futuro de Exercism, imaginando cómo sería que cada track de lenguaje fuera lo mejor que puede ser.
Estamos increíblemente orgullosos de lo que hemos construido hasta ahora.
Los 85.000 testimonios que se han dado hablan del increíble trabajo que ha hecho nuestra comunidad al construir nuestros tracks de lenguaje y al acompañar como mentores a tantos estudiantes a través de ellos.
Y lo más importante: creemos que apenas estamos arañando la superficie de lo que es posible.
Tenemos grandes ideas, esperanzas e ilusión por todo lo que Exercism puede llegar a ser.
Pero para lograrlo, primero tenemos que resolver algunos problemas fundamentales que siguen ahí, ocultos bajo la superficie.

El más importante de todos es la necesidad de resolver el reto de escalar nuestra comunidad de voluntarios de una forma sana y sostenible.
Exercism se ha construido sobre los hombros de cientos de voluntarios dedicados, pero una gran parte de ellos ahora se siente agotada y muchos se han ido como consecuencia.
Hay infinidad de razones, algunas directamente relacionadas con Exercism, otras por las presiones de tiempo de la vida y otras por el telón de fondo de todo lo que está pasando en el mundo en este momento.
Pero tenemos muy claro que necesitamos diseñar y desarrollar una mejor manera de construir nuestra plataforma entre todos.

Históricamente hemos intentado construir Exercism con un modelo de software de código abierto (OSS, por sus siglas en inglés) en el que hay mantenedores que revisan las colaboraciones de la comunidad en general.
Esto nos ha causado muchos problemas y ha frustrado tanto a mantenedores como a colaboradores.
Si quieres más detalle, lo explico más abajo, pero en resumen: nuestros voluntarios clave ahora dedican su tiempo a actuar como guardianes reactivos en lugar de creadores innovadores.
Eso es mucho menos divertido para ellos y significa que Exercism pierde la magia que esas personas antes aportaban a la plataforma.

Hay dos cosas que tenemos que hacer para arreglar esto:
1. Necesitamos diseñar un nuevo sistema de voluntariado que le vaya mejor a Exercism que el modelo tradicional de OSS.
  Ya hemos gastado bastante energía intentándolo, y no lo hemos conseguido.
  Así que vamos a tomarnos un tiempo para trabajar con nuestros voluntarios y diseñarlo bien durante los próximos meses.
2. Vamos a pausar en gran medida las colaboraciones de la comunidad en general durante los próximos meses, para dejar que nuestros voluntarios clave se centren en construir y desarrollar los tracks como ellos quieran (¡o tomarse un sabático si solo quieren respirar un poco!).

Mi esperanza es que, dando un paso atrás y diseñando esto de verdad bien, junto con la recaudación de fondos para ampliar nuestro equipo educativo, podamos hacer de Exercism un lugar fantástico para ser voluntario y ayudar a asegurar su futuro.
Mientras tanto, estos cambios deberían hacer que los tracks puedan mejorar y crecer más de lo que han podido en el último año, y que nuestros mantenedores dejen de agotarse y, en cambio, se sientan más felices, con más energía y más conectados al trabajar en Exercism.

## Cambios concretos

Hay tres cambios concretos que vamos a implementar.

### Usa el foro, no GitHub Issues

Vamos a liberar GitHub por completo para que nuestros mantenedores trabajen en los issues que quieran abordar.
Vamos a cerrar un montón de issues que habíamos creado antes para que los trabajara la comunidad (y añadiremos una etiqueta para poder reabrirlos fácilmente en el futuro si queremos), a la vez que no permitiremos nuevos issues ni PR no solicitados en la mayoría de los repositorios.
Si quieres comentar o reportar algo, usa el [foro](https://forum.exercism.org) en su lugar.
Si abres un issue o un PR no solicitado, se cerrará automáticamente y se te dirigirá al foro.

### Pausamos las colaboraciones de la comunidad en general

Los tracks se dividirán en tres categorías:
- La mayoría de los tracks con mantenedores activos tendrán las colaboraciones de la comunidad pausadas, para permitir que los mantenedores sean autónomos o se tomen un descanso.
  (Los mantenedores de estos tracks pueden pedir que se elimine el requisito obligatorio de una revisión.
  Habla con Erik en Slack para esto)
- Algunos tracks con mantenedores activos que quieran seguir aceptando colaboraciones de la comunidad permanecerán abiertos (si eres mantenedor y prefieres este modo en vez del (1), contacta a Jonathan Middleton en Slack para hablarlo).
- En los tracks que no tienen mantenedores activos, el desarrollo del track quedará prácticamente pausado durante este periodo.

En todos los casos, Erik y yo seguiremos dando el visto bueno a los PR de los repositorios de herramientas antes de fusionarlos.

La única excepción es que seguiremos aceptando PR para enfoques y artículos, y aplicaremos una política de fusión optimista en toda la organización, cuyo objetivo es llenar una base de enfoques en todo Exercism y permitir mejoras incrementales, con las siguientes reglas:
1. Si el código resuelve el ejercicio y es idiomático sintáctica y semánticamente (es decir, se ve como código de $LANG), debería fusionarse.
  Si no, el autor del PR debería corregirlo.
2. Si un mantenedor quiere hacer cambios en el contenido (por ejemplo, mejorar el consejo, ajustar cosas, resaltar enfoques mejores, alternativos o más idiomáticos), eso debería hacerse en un PR de seguimiento.

### Diseñamos un nuevo sistema de voluntariado

Vamos a formar un Consejo de la Comunidad para codiseñar un marco de voluntariado sostenible y sano para nuestro futuro, que desbloquee el potencial de Exercism.
Si estás comprometido con el futuro de Exercism y quieres formar parte de este proceso, ponte en contacto con [Jonathan](mailto:jonathan@exercism.org).

Vamos a seguir con estas acciones durante los próximos meses.
Lo iremos considerando todo a lo largo del periodo y tenemos previsto tomar algunas decisiones nuevas para junio de 2023.
Si tienes alguna idea, ¡abre un tema en el [foro](https://forum.exercism.org)!

## Posdata: por qué nuestro modelo de OSS está roto

Nuestro modelo histórico se ha construido en torno al modelo de OSS.
Se ha apoyado en voluntarios que llegaron a Exercism, hicieron un gran trabajo construyendo tracks y luego recibieron privilegios de mantenedor, con los que pueden aceptar colaboraciones de nuestra base de usuarios en general para mejorarlos.

Aunque sobre el papel parece genial, tiene algunos problemas importantes.
El principal es que las personas que más magia aportan a Exercism terminan sin tiempo para programar o crear en Exercism, porque su tiempo se va en responder a las colaboraciones de la comunidad.
Casi nunca es por esto por lo que los mantenedores se involucraron en Exercism al principio, y no es trabajo que disfruten.
Es un poco como cuando alguien que ama desarrollar es «ascendido» a líder de equipo, donde gestiona personas en lugar de programar.
Puede parecer un buen ascenso en su momento, pero a menudo resulta que la gente no disfruta siendo jefe ni la mitad de lo que disfruta programando.

También se basa en la suposición de que la suma de las colaboraciones de la comunidad en general es mayor que la contribución individual que un mantenedor determinado podría hacer por su cuenta.
Pero en Exercism, casi nunca es así.
Exercism es complejo, y la educación es difícil, y juntos hacen que colaborar con Exercism sea algo complejo y difícil de construir.
Hay muchísimo que aprender y entender sobre cómo funciona Exercism a nivel técnico y sobre su enfoque de la educación, así que la mayoría de las primeras colaboraciones son de personas que están encontrando su camino.
Esto significa que sus colaboraciones iniciales son relativamente pequeñas, pero también que casi siempre necesitan mucho trabajo de revisión y ajustes.
Es un trabajo que consume mucho tiempo para los mantenedores.
De hecho, el tiempo total dedicado a revisar (además del cambio de contexto necesario) hace que el mantenedor ponga generalmente más esfuerzo en revisar el PR que si lo hubiera hecho él mismo.
Por supuesto, hay algunas excepciones, pero es cierto en el 99 % de los casos.
Y a menudo esto es aún más doloroso para el mantenedor, porque el problema que resuelve el PR no estaba entre lo primero de su lista de prioridades, por lo que las cosas que sabe que son realmente esenciales no se llegan a hacer.

Por último, el modelo de OSS se basa en que los colaboradores empiecen poco a poco y con el tiempo adquieran suficiente conocimiento y regularidad como para convertirse en mantenedores.
En proyectos de OSS como las bibliotecas de software, esto funciona relativamente bien (por ejemplo, alguien usa una biblioteca en producción y no deja de añadirle mejoras, hasta que llega a tener tanto conocimiento como el creador original).
Sin embargo, en Exercism eso simplemente no ha ocurrido.
A pesar de haber fusionado PR de miles de colaboradores en los últimos 12 meses, solo un puñado muy pequeño ha pasado a ser colaborador habitual, y aún menos se han convertido en mantenedores.
Esto se debe de nuevo sobre todo a la complejidad de Exercism, pero también a que no es una pieza de software acotada, donde este modelo funciona tradicionalmente.

Todo esto es increíblemente desmoralizador para los mantenedores y perjudicial para Exercism.

Los tracks se han estancado, y nuestros voluntarios principales, que tenían pasión por construir, perdieron en gran medida esa pasión cuando su trabajo pasó a ser revisar el trabajo de otros, negociar prioridades contrapuestas y atender solicitudes inesperadas.
Durante la construcción de la v3, los mantenedores pudieron trabajar con relativa autonomía, ya que su trabajo estaba en gran medida entre bastidores, lo que llevó a un enorme nivel de productividad e hizo que la mayoría de la gente disfrutara de verdad colaborando.
Desde el lanzamiento de la v3, a pesar de que muchos voluntarios han dedicado tanto tiempo como antes a Exercism, ha sido un periodo mucho menos agradable y productivo, en gran parte por la cantidad de energía que se ha ido en responder a las colaboraciones o los issues de otros.
Nuestros voluntarios ahora dedican su tiempo a actuar como guardianes reactivos en lugar de innovadores, y eso es mucho menos divertido.

Estos son los retos que tenemos que resolver, y no son nada fáciles.
Necesitamos encontrar la forma de que las personas que quieren dedicar cientos de horas a construir los tracks de lenguaje de Exercism puedan hacerlo y disfrutarlo.
Necesitamos encontrar la forma de que las correcciones de errores y las pequeñas colaboraciones lleguen a nuestro código sin que esos voluntarios clave tengan que prestarles atención.
Y necesitamos encontrar la forma de atraer a nuevos voluntarios a Exercism y apoyarlos si deciden comprometerse con colaboraciones continuas.
Necesitamos reducir en general ese papel de guardián y, a la vez, respetar que quienes han puesto tanto esfuerzo en los tracks tienen opiniones firmes y muy bien fundamentadas.
Necesitamos que sea divertido gestionar y dirigir todo ese sistema de voluntariado.
Y también necesitamos resolver un montón de otras cosas.
Va a llevar tiempo, y será todo un reto, pero cuando lo logremos, será increíble.
