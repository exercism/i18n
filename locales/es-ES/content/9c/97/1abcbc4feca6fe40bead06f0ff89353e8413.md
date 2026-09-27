## Introducción
¡Hola a todos! Espero que estéis todos bien.

Han sido unas semanas muy emocionantes en Exercism, con el lanzamiento de Exercism Premium y Exercism Insiders. También hemos tenido algunas llamadas de la comunidad geniales, y hemos desplegado muchas mejoras del sitio, con más en camino. Ahora mismo hay muchas cosas por las que emocionarse, pero ninguna más emocionante que entrar en el mes 6 de #12in23. El verano de las S-expressions, o, para abreviar de forma más bonita, el Summer of Sexps.

Como siempre, me acompaña el sabio del mundo de la programación: Erik.

Este mes tenemos cinco lenguajes: Clojure, Common Lisp, Emacs Lisp, Racket y Scheme. Cada uno de estos lenguajes es un dialecto de Lisp, así que, en lugar de centrarnos demasiado en los distintos lenguajes en este vídeo, vamos a fijarnos un poco más en el propio Lisp y en qué lo hace único. Y terminaremos repasando brevemente los lenguajes.

Pero antes, unas cuantas cuestiones prácticas. Para conseguir la insignia del Summer of Sexps, tienes que completar cinco ejercicios cualesquiera en uno de esos lenguajes durante junio.

## Las insignias

También está la insignia 12in23, que dura todo el año. Para conseguirla, tienes que resolver cinco de nuestros ejercicios destacados en el lenguaje. Si ves esto después de junio, puedes hacer esta parte en cualquier momento del año, así que no te has perdido nada. Como mucha gente no habrá trabajado nunca con un Lisp, hemos intentado elegir ejercicios relativamente sencillos que te den una idea de cómo es un lenguaje Lisp.
- **Salto:** trabaja con condiciones booleanas y con la veracidad de los valores (y, opcionalmente, el scope léxico)
- **Dos por uno:** da formato a un string y trabaja con un parámetro opcional
- **Diferencia de cuadrados:** llama a funciones definidas por el usuario y haz cálculos en notación prefija
- **Nombre del robot:** trabaja con aleatoriedad, átomos y datos estructurados
- **Corchetes coincidentes:** usa la recursión para validar un string

Estos ejercicios y los de meses anteriores se pueden encontrar en la página de #12in23.

## Visión general

Bien, los lenguajes basados en Lisp. Supongo que deberíamos empezar entendiendo un poco qué es Lisp. Empecemos con una pequeña introducción al Lisp en general.

### Lisp
- Lo primero que hay que saber es que Lisp es uno de los lenguajes más antiguos.
- Lo creó John McCarthy en el MIT en 1958, cuando los ordenadores todavía ocupaban habitaciones enteras de arriba abajo 🙂
- El nombre Lisp viene de LISt Processing (o LISt Processor), lo que demuestra la importancia de la estructura de datos de lista.
- Se diseñó con el propósito de hacer investigación en IA.
- Lisp se basaba en el cálculo lambda, inventado por Alonzo Church, que es un sistema formal para describir la computación en matemáticas (simplificado).

- Es un lenguaje increíblemente influyente, por varias razones:
- Es el segundo lenguaje de programación de alto nivel más antiguo que sigue usándose habitualmente (después de Fortran)
- Fue el primer lenguaje de programación funcional de alto nivel e introdujo muchas de las características que hoy asociamos con la programación funcional.
- Ten en cuenta que Lisp también admitía la programación imperativa
- Fue el primer lenguaje con un recolector de basura, lo que liberaba al autor de tener que gestionar la memoria manualmente
- Su sintaxis comparativamente escasa y su semántica relativamente sencilla lo hacen ideal con fines educativos.
- Por eso, Lisp (o mejor dicho, uno de sus dialectos) se usa a menudo para enseñar programación
- Ha dado lugar (¡y sigue dando lugar!) a muchísimos dialectos del lenguaje (y hablaremos de los que tienen soporte en Exercism).
- En otras palabras, en el árbol de los lenguajes de programación hay una rama aparte para los lenguajes tipo Lisp (igual que hay una rama de lenguajes tipo C).

Cuando hablé hace poco con Simon Peyton Jones, uno de los creadores de Haskell, me habló de la diferencia entre los lenguajes construidos en torno a las máquinas de Turing y los construidos en torno al cálculo lambda. Así que merece la pena echar un vistazo a esa entrevista si quieres saber más sobre el tema.

### Los paréntesis

En los Lisp hay muchísimos paréntesis, pero eso no es necesariamente malo (igual que tener muchas llaves no es necesariamente malo en los lenguajes tipo C).
Los Lisp se basan en algo que se llama: S-expressions.
Una S-expression (abreviatura de symbolic expression, abreviada como sexpr o sexp, de ahí el nombre del reto de este mes) es una expresión para representar datos. Las inventó y popularizó el Lisp original.
Una S-expression puede tener una de estas dos formas:

- Un átomo (por ejemplo, «x»). Piénsalos como «valores» no anidados, o como las hojas del árbol.
- Una expresión x . y, donde x e y son S-expressions. Piénsalas como pares, donde y puede ser el siguiente elemento de la lista (si lo hay), o como nodos de un árbol. Ten en cuenta que es una definición recursiva, que termina en el nivel de las hojas. Normalmente, para este tipo de S-expression se usan paréntesis.


### S-expressions
Las S-expressions se usan para representar tanto datos como listas en Lisp.
Por lo tanto, cada vez que definas una lista, usarás paréntesis.
Si además tenemos en cuenta que:
la lista es la estructura de datos central de Lisp (de ahí su nombre),
en algunos Lisp es la única estructura de datos,
acabarás con un montón de paréntesis.
Para que veas lo centrales que son las listas: si quieres llamar a una función en Lisp, lo haces creando una lista.

Curiosamente, el primer elemento de la lista (es decir, la cabeza) representa la función que se llama, y los demás elementos (es decir, la cola) se pasan como argumentos.
Esto se conoce como notación prefija (en la que el operador va antes que los operandos), que al principio puede resultar algo rara, pero que en realidad es muy útil:
- Puedes aplicar un operador a varios argumentos sin tener que repetir el operador (por ejemplo, (+ 1 2 3))
- La precedencia de operadores se hace explícita, ya que de todos modos tienes que definir una nueva S-expression para llamar a un operador distinto

Curiosamente, las listas se usan incluso para representar el código fuente, pero volveremos a eso más adelante.

En general, la mayoría de los Lisp tienen una sintaxis bastante mínima y una semántica relativamente sencilla, lo que hace que sean relativamente fáciles de aprender y que entender el código también resulte más fácil.
¡Esta sintaxis mínima no los hace menos potentes!
Combinar estas dos cosas (sintaxis mínima + semántica sencilla) hace que los Lisp sean ideales para escribir compiladores e intérpretes.
Si alguna vez quieres construir tu propio compilador, ¡construir un Lisp es una buena opción!

### Características geniales de Lisp

Como ya se ha mencionado, los Lisp usan internamente los mismos tipos y estructuras de datos para representar el código.
Esta propiedad se llama homoiconicidad (u homoicónico).
En otras palabras, un lenguaje es homoicónico si un programa escrito en él se puede manipular como datos usando el propio lenguaje, y por tanto la representación interna del programa se puede inferir con solo leer el programa.
Esta propiedad se resume a menudo diciendo que el lenguaje trata el código como datos.

## Los lenguajes

### Scheme
- Creado en la década de 1970 por Guy Steele y Gerald Sussman en el AI Lab del MIT.
- Empezó como un intento de entender el modelo de actores de Carl Hewitt mediante un pequeño intérprete de Lisp.
- El lenguaje propiamente dicho se presentó en una serie de AI Memos de investigación que en conjunto se conocen como los Lambda Papers.
- El primer dialecto de Lisp en usar scope léxico (los valores solo están dentro del scope donde se definen) y uno de los primeros lenguajes en admitir continuaciones de primera clase.
- Un estándar oficial del IEEE y un estándar de facto llamado Revised Report on the Algorithmic Language Scheme (RnRS).
- Muchas implementaciones: ChezScheme, Guile (ambas con soporte en Exercism), MIT/GNU Scheme y Racket
- Un lenguaje muy minimalista, con poca sintaxis, pero eso no fue intencionado.
- Los autores intentaron construir algo complicado, pero acabaron diseñando algo mucho más sencillo de lo que pretendían
- Recursión de cola adecuada. La forma idiomática de hacer iteración es mediante recursión.
- Scheme optimiza las llamadas recursivas de cola para no consumir espacio de pila ni otros recursos. Esto significa que la recursión se puede usar con datos arbitrariamente grandes o para un cálculo arbitrariamente largo
- Tipos de datos numéricos potentes, incluidos los números racionales y complejos
- Evaluación diferida, que es como las promesas.
- Un potente sistema de macros.
- Las macros higiénicas reducen la probabilidad de resultados inesperados al definir macros.

### Common Lisp
- El trabajo en Common Lisp comenzó en 1981 tras una iniciativa del directivo de ARPA Bob Engelmore para desarrollar un único dialecto de Lisp estándar para la comunidad, porque los distintos dialectos en uso a menudo eran incompatibles, lo que significaba que el código y el conocimiento no se podían compartir
- El primer estándar se publicó en 1984 y el definitivo en 1994 (una especificación muy estable)
- Al ser un estándar, existen distintas implementaciones del mismo, como Steel Bank Common Lisp (que es la predeterminada en Exercism) y CLisp.
- También hay implementaciones comerciales, como Allegro CL y LispWorks, además de ECL (Embeddable Common Lisp), que se puede incrustar en programas en C, y ABCL, que se ejecuta en la máquina virtual de Java.
- Definido por un estándar (ANSI INCITS 226-1994), así que el código escrito hace 30 años sigue funcionando perfectamente hoy
- Un sistema de tipos rico y extensible
- Diseñado para el desarrollo con imágenes y REPL, por lo que es muy introspectable.

### Emacs Lisp
- Desarrollado en 1985 con el propósito de contar con un lenguaje eficiente para extender un editor de texto
- Con tipado dinámico
- Alrededor del 80 % de Emacs está escrito en Emacs Lisp (el 20 % en C por motivos de rendimiento)
- Un poco distinto de otros Lisp:
- No está estandarizado, sigue evolucionando poco a poco
- Sin eliminación automática de llamadas de cola; hay soporte mediante la macro named-let (que se transforma en un bucle while)
- Con scope dinámico de forma predeterminada; se recomienda el scope léxico para el código nuevo
- Buena documentación dentro del editor
- Multiplataforma (se ejecuta en cualquier sitio donde se ejecute Emacs)
- Aprende el lenguaje leyendo el código de las funcionalidades que usas a diario (el núcleo de Emacs y sus paquetes)
- Hay un subconjunto de Common Lisp disponible mediante el paquete cl-lib. Mientras que Emacs Lisp es bastante minimalista, Common Lisp tiene muchas más funcionalidades. El paquete cl-lib pone a tu disposición un subconjunto de CL

### Racket
- Matthias Felleisen fundó PLT Inc., que en enero de 1995 decidió desarrollar un entorno de programación pedagógico basado en Scheme. Al principio se llamó PLT Scheme y más tarde pasó a llamarse Racket.
- Además de ser un entorno de programación pedagógico, se diseñó como plataforma para el diseño e implementación de lenguajes de programación.
- Un LISP moderno, descendiente de Scheme
- ¡Admite programación lógica!
- Una sintaxis sencilla y expresiva, ideal para principiantes y a la vez potente en manos de expertos
- Admite muchos paradigmas de programación: programación funcional, programación orientada a objetos, diseño por contrato, programación lógica y metaprogramación
- Una biblioteca estándar completa
- Incluye DrRacket, un IDE completo diseñado para aprender y explorar con el mínimo de complicaciones
- Una documentación excelente, con mucha información de contexto y ejemplos

### Clojure
- Desarrollado por Rich Hickey con el objetivo de tener un LISP moderno que se ejecute en la JVM y con una gran concurrencia
- Un dialecto de LISP, pero también algo distinto de otros LISP, ya que no admite recursión de cola implícita (no te preocupes si no sabes qué es) y tiene más estructuras de datos además de las listas: mapas, conjuntos y vectores. Todas estas estructuras de datos tienen su propia sintaxis literal.
- Además, todas son inmutables, pero aun así tienen un gran rendimiento, con una búsqueda de O(log32 n), que es un tiempo «efectivamente» constante
- Polimorfismo en tiempo de ejecución mediante multimétodos y protocolos
- Una gran interoperabilidad con la JVM
- El sistema de especificación de datos Clojure Spec (en tiempo de ejecución, no de compilación), que te permite definir la estructura de los datos, generar datos, hacer testing basado en propiedades y mucho más

## Casos de uso

### Scheme
- Se usa en la enseñanza para ayudar a enseñar ciencias de la computación (el influyente Structure and Interpretation of Computer Programs usa Scheme).
- Se usa en IA. Se usa como lenguaje de scripting, por ejemplo en GIMP (editor de gráficos), en herramientas CAD (diseño asistido por ordenador) e incluso en el cine, con los scripts de gestión del motor de renderizado de Final Fantasy: The Spirits Within

### Common Lisp
- Common Lisp se usa en muchos sitios, por ejemplo en inteligencia artificial e investigación, pero también en aplicaciones comerciales: la NASA escribió en Common Lisp el software de pilotaje automático de la nave Deep Space One, Viaweb se escribió en Common Lisp y más tarde Yahoo la adquirió y la rebautizó como Yahoo Store!, y también la primera versión de Reddit

### Emacs Lisp
- Emacs Lisp se usa en, bueno, ¡en Emacs!
- En esencia, Emacs es un intérprete de Emacs Lisp, un dialecto del lenguaje de programación Lisp pero con extensiones añadidas para admitir la edición de texto

### Racket
- Se usa en la enseñanza, ya que Racket se diseñó haciendo hincapié en facilitar la creación, la simplificación y el análisis de lenguajes.
- Se usa en la investigación, ya que su sintaxis y su semántica extensibles lo hacen adecuado para diseñar y prototipar nuevos lenguajes y nuevas características del lenguaje.
- Se usa en videojuegos, por ejemplo por John Carmack (el de Doom) en un entorno de scripting interactivo para realidad virtual, y el desarrollador Naughty Dog lo usó para scripting (por ejemplo, en Uncharted). Hacker News está escrito en Arc, que también es un Lisp, y que a su vez está escrito en Racket.

### Clojure
- Clojure se usa para muchas cosas distintas, incluida la adquisición de Atomist por parte de Docker en 2022, una plataforma de seguridad y automatización de contenedores implementada en Clojure.
- El mayor usuario de Clojure del mundo es Nubank, un banco nuevo que lo adquirió hace unos años y que ahora emplea al equipo principal de Clojure.
- Se usa mucho para el prototipado rápido, ya que es dinámico y muy interactivo.

## Perspectiva de programación
Todos los lenguajes admiten los paradigmas funcional, imperativo y simbólico.
Algunos también admiten la programación orientada a objetos (POO), sobre todo Common Lisp.

Los Lisp son en su mayoría lenguajes dinámicos, aunque Racket admite el tipado estático.

Esto no significa que todos sean interpretados, ya que hay una mezcla de opciones: interpretados (sin ningún paso de compilación), compilados a bytecode y luego interpretados, y compilados directamente a código máquina.

### Scheme
- Minimalista, con una semántica clara y sencilla y pocas formas distintas de construir expresiones.
- Hace que sea fácil aprender el lenguaje y entender el código.
- Por este motivo, Scheme también se usa a menudo en muchos cursos introductorios de ciencias de la computación
- Continuaciones de primera clase.
- Una continuación es una representación del estado de un programa.
- Las continuaciones se pueden usar para modelar el flujo de control (por ejemplo, una construcción `return`) o las corrutinas (que permiten la multitarea)

### Common Lisp
- Un sistema orientado a objetos extensible, con combinaciones de métodos programables (tanto en cómo se combinan los métodos de subclases y superclases como en los métodos before, after y around, que permiten extender sistemas sin modificarlos)
- Un sistema de condiciones programable (un superconjunto de las «excepciones») que permite desacoplar el reconocimiento de las condiciones de la elección de cómo se gestionan. El sistema de condiciones es más flexible que los sistemas de excepciones porque, en lugar de ofrecer una división en dos partes entre el código que señala un error1 y el código que lo gestiona,2 reparte las responsabilidades en tres partes: señalar una condición, gestionarla y reiniciar.
- Las macros permiten extender la sintaxis del lenguaje, no solo generar código repetitivo. Esto ayuda a construir un lenguaje que se adapte al dominio, en lugar de lo contrario.

### Emacs Lisp
- Un gran soporte e integración con el editor
- Se puede usar para personalizar Emacs mientras está en marcha («como hacerte cirugía cerebral a ti mismo» :))
- Se puede usar en modo por lotes, en el que tienes a tu disposición todas las capacidades del editor para procesar texto (como los búferes y los comandos de movimiento)

### Racket
- Un potente sistema de macros. Sobre él se construyen azúcares sintácticos como las macros de encadenamiento. Las macros también son higiénicas, lo que responde a una pregunta sencilla: una macro genera código que se deposita en otro lugar. Cuando ese código se evalúa, ¿cómo deberíamos determinar los enlaces de los identificadores que hay dentro? Las macros higiénicas reducen la probabilidad de resultados inesperados al definir macros.
- Orientado a los lenguajes.
- Racket incluye las herramientas para escribir tu propio lenguaje de programación o DSL, construidas sobre las macros de Racket.
- Varios lenguajes integrados, como el Racket tipado (que admite anotaciones de tipo comprobadas estáticamente), datalog (un lenguaje similar a Prolog) con soporte del IDE DrRacket, y scribble, una herramienta para crear documentos en prosa en formato HTML o PDF
- El REPL es una parte central del flujo de trabajo de desarrollo, no solo para probar cosas, sino para consultar la documentación

### Clojure
- Un potente sistema de macros.
- Sobre él se construyen azúcares sintácticos como las macros de encadenamiento
- El REPL es una parte central del flujo de trabajo de desarrollo, no solo para probar cosas, sino para consultar la documentación

## Cuál probar

- Si nunca has probado un Lisp, Scheme y Racket son grandes opciones, ya que ambos tienen una sintaxis muy mínima.
- Dicho esto, tanto Common Lisp como Clojure tienen modo de aprendizaje, así que probablemente sean los mejores para aprender en Exercism.
- Si ya usas Emacs, Emacs Lisp es una elección natural.
- Del mismo modo, si usas un lenguaje de la JVM, Clojure es una opción natural.
- Emacs Lisp (a través de Emacs), Clojure (a través de IntelliJ) y Racket (a través de DrRacket) tienen todos un excelente soporte de IDE.
- Por supuesto, también hay buenos IDE para Common Lisp y Scheme.
- Si quieres un Lisp realmente completo, Common Lisp, Clojure y Racket son muy completos
- Si quieres un Lisp algo distinto, Clojure tiene una sintaxis bastante única para ser un Lisp.
- Si te interesan las macros y la metaprogramación, ¡en principio todos son buenas opciones! Pero si quieres construir lenguajes nuevos, Racket en particular es genial

Por supuesto, si tienes tiempo, te recomendaría probar un par.
Además, ¡no le tengas miedo a los paréntesis! Yo lo tenía, y por eso tardé bastante en ponerme a aprender Lisp.
Aun así, te acostumbrarás rápido a ellos y puede que incluso llegues a apreciarlos, como me pasó a mí.
De hecho, ahora me encantan los lenguajes Lisp, con su sintaxis mínima y su semántica sencilla, pero muy expresivos a la vez.
