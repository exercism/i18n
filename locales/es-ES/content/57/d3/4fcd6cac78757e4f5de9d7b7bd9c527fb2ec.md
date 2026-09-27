# Elegir una solución para mentorizar

[video:vimeo/595885125]()

La primera decisión que debes tomar como mentor es qué solución mentorizar.

## Trabajar con la cola

Puedes encontrar una lista de todas las soluciones que se han enviado para recibir mentoría en la [cola de mentoría](/mentoring/queue).
La interfaz debería parecerse a esto:

![Cola de mentoría](https://exercism-static.s3.eu-west-1.amazonaws.com/docs/mentor_queue.png)

En la parte superior del panel de la cola encontrarás un cuadro de texto que te permite filtrar por el nombre del estudiante.
A la derecha de este, puedes ordenar las solicitudes por más antiguas primero, más recientes primero, nombre del estudiante o nombre del ejercicio.
En el lado derecho de la interfaz, puedes filtrar por lenguaje o por nombre del ejercicio.
También puedes elegir mostrar solo los ejercicios que hayas completado tú, lo cual suele ser sensato, ya que puede resultarte difícil dar buenos comentarios si no te has enfrentado tú mismo a resolver el ejercicio.
La lista de ejercicios con solicitudes de mentoría pendientes puede utilizarse para filtrar aún más la lista de solicitudes.
Para ello, selecciona el nombre del ejercicio (visible en la sección inferior derecha de la captura de pantalla anterior).

La tabla principal muestra el ejercicio, el estudiante y cuándo solicitaron mentoría.
Si pasas el ratón por encima de una fila, verás más detalles sobre el estudiante.
Puedes ver su nombre, su ubicación y su reputación (que es un indicador de si son colaboradores o mentores ellos mismos), así como cuántas veces han recibido mentoría antes.
También verás un breve texto de presentación que han escrito explicando qué esperan obtener del track.
A medida que empieces a mentorizar a personas, también verás si ya les has dado mentoría antes y si les has añadido a favoritos.

El texto de presentación de la ventana emergente es un primer indicio de si este estudiante es adecuado para ti.
¿Se ajusta tu experiencia a sus lagunas de conocimiento?
Si dicen que quieren llegar a dominar la programación funcional, ¿puedes ayudarles con eso?
Si son nuevos en el lenguaje y quieren aprender lo básico, probablemente puedas ayudarles aunque solo tengas **algo** de experiencia real, pero si llevan años programando en ese lenguaje e intentan alcanzar un nivel experto, tendrás que dominar el lenguaje bastante bien tú mismo.

Una vez que hayas encontrado una solución que parezca encajar bien contigo para mentorizarla, podemos dar el siguiente paso y echar un vistazo al código.
Así que haz clic en esa solución y entra en la interfaz de conversación de mentoría.

## La interfaz de conversación de mentoría

En este punto estás viendo la solución de alguien, pero aún no te has comprometido a mentorizarla.
Primero tienes la oportunidad de leer su código y obtener algo más de información antes de empezar.

**Si es la primera vez que usas esta interfaz, puede resultarte un poco abrumadora porque hay mucha información, pero no te preocupes: pronto te resultará familiar.**

### El código del estudiante

En el lado izquierdo de la pantalla verás el código del estudiante.
La interfaz tendrá un aspecto parecido a este:

<img src="https://raw.githubusercontent.com/exercism/docs/main/.imgs/mentor-discussion-area.png" height="100">

1. La parte principal del lado izquierdo contiene el código del estudiante.
   De forma predeterminada verás su iteración más reciente.
   Si han enviado varias iteraciones, puedes ir cambiando entre ellas con los números dentro de círculos de la parte inferior izquierda o con los botones `Previous` y `Next` situados en la parte inferior derecha de este panel.
   Si solo han enviado una iteración, no verás esos iconos.

2. En la parte superior del código del estudiante, puedes usar las pestañas para cambiar entre el código del estudiante, las instrucciones y las pruebas.
   Esto resulta útil para recordar qué se le ha pedido al estudiante en este ejercicio.

3. También verás un indicador de si las pruebas han pasado o han fallado (situado en la parte superior derecha de este panel izquierdo), así como botones para descargar el código del estudiante o copiarlo al portapapeles.
   Si han fallado, al hacer clic en este indicador se abrirá una ventana modal que te mostrará los detalles concretos de su ejecución de pruebas, para que veas qué han hecho mal.

El lado derecho de la pantalla contiene un panel con la interacción de mentoría. En la parte superior de este panel verás tres pestañas.
La pestaña «**Conversación**» contiene la información sobre el usuario (nombre de usuario, nombre, reputación y texto de presentación personal).
Debajo hay un comentario del usuario sobre lo que quiere aprender con esta solución en concreto.
(En algunas soluciones antiguas puede que no aparezca).
Es un indicio clave de si esta solución es adecuada para ti.
¿Puedes responder a su pregunta?
¿Puedes satisfacer sus expectativas con este ejercicio?

La segunda pestaña es tu «**Bloc de notas**».
Puedes escribir código en ella para poder hacer referencia a él en tu comentario.
Puede ayudarte a identificar el código que es importante al revisar este ejercicio.
Esto puede ayudarte a que tus explicaciones sean más sencillas y claras.
Las notas que escribas aquí son privadas y las verás cada vez que mentorices la solución del ejercicio en cuestión.

La tercera pestaña se llama «**Orientación**».
Si haces clic en ella, verás información que puede resultarte útil:

- **La solución ejemplar:** intenta guiar al estudiante hacia esta solución.
  Es el mejor punto al que pueden llegar en este momento del track.
  Puede que descubras que tu enfoque difiere bastante de la solución ejemplar.
  Puede deberse a que conoces técnicas más avanzadas que el estudiante.
  Ten en cuenta que solo puedes esperar que el estudiante conozca los conceptos que ha aprendido al completar el recorrido de aprendizaje hasta el ejercicio en el que está trabajando.
  Tenlo en cuenta al dar tus comentarios e intenta no agobiar al estudiante con conocimientos para los que quizá aún no esté preparado.
- **Notas para mentores:** son notas escritas por la comunidad que ayudan a otros mentores a orientarse sobre la mejor manera de mentorizar un ejercicio.
  Nos encantaría que aportaras tu experiencia a estas notas.
- **Comentarios automatizados:** son comentarios que nuestros analizadores han determinado que podrían resultarte útiles para dar a un estudiante.
  Hablaremos de esto más adelante.
- **Tu solución:** un enlace a tu propia solución, que puedes usar como referencia de cómo resolviste el ejercicio.

## Empezar a mentorizar

Si has leído el código, has consultado la orientación y crees que puedes ser de ayuda, ¡es el momento de ponerse en marcha!
Haz clic en el botón «Empezar a mentorizar» y se te pedirá que escribas tus comentarios.

A continuación, échale un vistazo a [Cómo dar buenos comentarios](/docs/mentoring/how-to-give-great-feedback).
