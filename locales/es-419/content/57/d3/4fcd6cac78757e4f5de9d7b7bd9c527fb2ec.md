# Elegir una solución para dar mentoría

[video:vimeo/595885125]()

La primera decisión que debes tomar como mentor es de qué solución ser mentor.

## Trabajar con la cola

Puedes encontrar una lista de todas las soluciones que se han enviado a mentoría en la [Cola de mentoría](/mentoring/queue).
La interfaz debería verse más o menos así:

![Cola de mentoría](https://exercism-static.s3.eu-west-1.amazonaws.com/docs/mentor_queue.png)

En la parte superior del panel de la cola encontrarás un cuadro de texto que te permite filtrar por el nombre del estudiante.
A su derecha, puedes ordenar las solicitudes por más antiguas primero, más recientes primero, nombre del estudiante o nombre del ejercicio.
En el lado derecho de la interfaz puedes filtrar por lenguaje o por nombre del ejercicio.
También puedes elegir mostrar solo los ejercicios que hayas completado tú, lo cual suele ser prudente, ya que puede costarte dar buena retroalimentación si no te has enfrentado tú mismo a resolver el ejercicio.
La lista de ejercicios con solicitudes de mentoría pendientes sirve para filtrar aún más la lista de solicitudes.
Para hacerlo, selecciona el nombre del ejercicio (visible en la sección inferior derecha de la captura de pantalla de arriba).

La tabla principal muestra el ejercicio, el estudiante y cuándo solicitaron mentoría.
Si pasas el cursor sobre una fila, obtienes más detalles sobre el estudiante.
Puedes ver su nombre, su ubicación y su reputación (un indicador de si son colaboradores o mentores ellos mismos), además de cuántas veces han recibido mentoría antes.
También verás una breve descripción que escribieron explicando qué esperan obtener del track.
A medida que empieces a dar mentoría, también verás si ya les diste mentoría antes y si los marcaste como favoritos.

La descripción del tooltip es un primer indicador de si este estudiante es adecuado para ti.
¿Tu experiencia encaja con sus lagunas de conocimiento?
Si dicen que quieren mejorar en programación funcional, ¿puedes ayudarlos con eso?
Si son nuevos en el lenguaje y quieren aprender lo básico, entonces, si tienes **algo** de experiencia real, probablemente puedas ayudar; pero si llevan años programando en ese lenguaje y buscan alcanzar un nivel experto, necesitarás un dominio bastante sólido del lenguaje.

Una vez que hayas encontrado una solución que parezca adecuada para que le des mentoría, podemos pasar al siguiente paso y echar un vistazo al código.
Así que haz clic en esa solución y entra a la interfaz de discusión de mentoría.

## La interfaz de discusión de mentoría

En esta etapa estás viendo la solución de alguien, pero todavía no te has comprometido a darle mentoría.
Primero tienes la oportunidad de leer su código y obtener otra información antes de empezar.

**Si es tu primera vez con esta interfaz, puede parecer un poco abrumadora porque hay mucha información, pero no te preocupes: pronto te resultará familiar.**

### El código del estudiante

En el lado izquierdo de la pantalla verás el código del estudiante.
La interfaz se verá más o menos así:

<img src="https://raw.githubusercontent.com/exercism/docs/main/.imgs/mentor-discussion-area.png" height="100">

1. La parte principal del lado izquierdo contiene el código del estudiante.
   De forma predeterminada verás su iteración más reciente.
   Si enviaron varias iteraciones, puedes cambiar entre ellas con los números en círculos de la parte inferior izquierda o con los botones `Previous` y `Next` ubicados en la parte inferior derecha de este panel.
   Si solo enviaron una iteración, no verás esos íconos.

2. En la parte superior del código del estudiante puedes usar las pestañas para alternar entre el código del estudiante, las instrucciones y los tests.
   Esto es útil para recordar qué se le pidió al estudiante en este ejercicio.

3. También verás un indicador de si los tests pasaron o fallaron (ubicado en la parte superior derecha de este panel izquierdo), además de botones para descargar el código del estudiante o copiarlo a tu portapapeles.
   Si fallaron, al hacer clic en este indicador se abrirá una ventana modal que te muestra los detalles específicos de su ejecución de tests, para que veas en qué se equivocaron.

El lado derecho de la pantalla contiene un panel con la interacción de mentoría. En la parte superior de este panel verás tres pestañas.
La pestaña «**Discussion**» contiene la información sobre el usuario (nombre de usuario, nombre, reputación, descripción personal).
Debajo hay un comentario del usuario sobre qué es lo que quiere aprender de esta solución en concreto.
(En algunas soluciones más antiguas, puede que falte).
Este es un indicador clave de si esta solución es adecuada para ti.
¿Puedes responder su pregunta?
¿Puedes cumplir sus expectativas para este ejercicio?

La segunda pestaña es tu «**Scratchpad**».
Puedes escribir código ahí para referenciarlo en tu comentario.
Ayuda a identificar el código que es importante al revisar este ejercicio.
Esto puede hacer que tus explicaciones sean más simples y claras.
Las notas que escribas aquí son privadas y las verás cada vez que des mentoría a la solución del ejercicio correspondiente.

La tercera pestaña se llama «**Guidance**».
Si haces clic en ella, verás información que podría resultarte útil:

- **La solución ejemplar** Intenta guiar al estudiante hacia esta solución.
  Es el mejor punto al que puede llegar en este momento del track.
  Puede que descubras que tu enfoque difiere bastante de la solución ejemplar.
  Esto puede deberse a que conoces técnicas más avanzadas que el estudiante.
  Ten en cuenta que solo puedes esperar que el estudiante conozca los conceptos que ha aprendido mientras completaba la ruta de aprendizaje hacia el ejercicio en el que está trabajando.
  Considera esto al dar tu retroalimentación y trata de no abrumar a tu estudiante con conocimientos para los que quizá aún no esté preparado.
- **Notas para mentores:** son notas escritas por la comunidad que ayudan a orientar a otros mentores hacia la mejor manera de dar mentoría a un ejercicio.
  Nos encantaría que aportaras tu experiencia a estas notas.
- **Retroalimentación automatizada:** es retroalimentación que nuestros analizadores han determinado que podría serte útil darle a un estudiante.
  Hablaremos más de esto más adelante.
- **Tu solución:** un enlace de vuelta a tu propia solución, que puedes usar como referencia de cómo resolviste el ejercicio.

## Empieza a dar mentoría

Si ya leíste el código, revisaste la orientación y sientes que puedes ser de ayuda, ¡es hora de empezar!
Haz clic en el botón «Start mentoring» y se te pedirá que escribas tu retroalimentación.

Ahora, ¡lee [Cómo dar buena retroalimentación](/docs/mentoring/how-to-give-great-feedback)!
