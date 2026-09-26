## Introducción
¡Hola a todos! Espero que estén todos bien.

Han sido unas semanas muy emocionantes en Exercism, con el lanzamiento de Exercism Premium y Exercism Insiders. También hemos tenido excelentes llamadas de la comunidad, y hemos desplegado muchas mejoras del sitio, y otras llegarán pronto. Hay mucho de qué emocionarse en este momento, pero nada más emocionante que entrar en el mes 6 de #12in23: el verano de las expresiones S, o más simpáticamente abreviado como el Summer of Sexps.

Como siempre, me acompaña el sabio del mundo de la programación, Erik.

Este mes tenemos cinco lenguajes: Clojure, Common Lisp, Emacs Lisp, Racket y Scheme. Cada uno de estos lenguajes es un dialecto del lenguaje Lisp, así que, en lugar de centrarnos demasiado en los diferentes lenguajes en este video, vamos a ver un poco más el propio Lisp y qué lo hace único. Y luego terminaremos repasando los lenguajes brevemente.

Pero antes de eso, ¡algunos recordatorios! Para obtener la insignia Summer of Sexps, debes completar cinco ejercicios cualesquiera en uno de esos lenguajes durante junio.

## Las insignias

También está la insignia 12in23 de todo el año. Para obtenerla, debes resolver cinco de nuestros ejercicios destacados en el lenguaje. Si estás viendo esto después de junio, puedes hacer esta parte en cualquier momento del año, así que no te has perdido nada. Como muchas personas nunca habrán trabajado con un Lisp, intentamos elegir ejercicios relativamente sencillos que te den una idea de cómo es un lenguaje Lisp.
- **Año bisiesto:** trabaja con condiciones booleanas y valores de verdad (y, opcionalmente, ámbito léxico)
- **Dos por uno:** formatea un string y trabaja con un parámetro opcional
- **Diferencia de cuadrados:** llama a funciones definidas por el usuario y haz cálculos en notación prefija
- **Nombre de robot:** trabaja con aleatoriedad, átomos y datos estructurados
- **Paréntesis coincidentes:** usa recursión para validar un string

Estos ejercicios y los de meses anteriores se pueden encontrar en la página de #12in23.

## Panorama general

Entonces, lenguajes basados en Lisp. Supongo que deberíamos empezar por entender un poco sobre Lisp. Empecemos con una pequeña introducción general a Lisp.

### Lisp
- Lo primero que hay que señalar es que Lisp es uno de los lenguajes más antiguos.
- Fue creado por John McCarthy en el MIT en 1958, cuando las computadoras todavía ocupaban salas enteras de arriba abajo 🙂
- El nombre Lisp significa LISt Processing (o LISt Processor), lo que muestra la importancia de la estructura de datos de lista.
- Fue diseñado con el propósito de hacer investigación en inteligencia artificial.
- Lisp se basó en el cálculo lambda, inventado por Alonzo Church, que es un sistema formal para describir la computación en matemáticas (simplificado).

- Es un lenguaje increíblemente influyente, por varias razones:
- Es el segundo lenguaje de programación de alto nivel más antiguo que todavía se usa comúnmente (después de Fortran).
- Fue el primer lenguaje de programación funcional de alto nivel e introdujo muchas de las funcionalidades que ahora asociamos con la programación funcional.
- Ten en cuenta que Lisp también admitía programación imperativa.
- Fue el primer lenguaje con un recolector de basura, lo que liberaba al autor de tener que hacer gestión manual de memoria.
- Su sintaxis comparativamente escasa y su semántica relativamente simple lo hacen ideal con fines educativos.
- Por eso, Lisp (o mejor dicho, uno de sus dialectos) se usa a menudo para enseñar programación.
- Ha generado (¡y sigue generando!) muchísimos dialectos de lenguaje (y hablaremos de los que son compatibles con Exercism).
- En otras palabras, en el árbol de los lenguajes de programación hay una rama separada para los lenguajes similares a Lisp (igual que hay una rama de lenguajes similares a C).

Cuando hablé recientemente con Simon Peyton Jones, uno de los creadores de Haskell, hablaba de la diferencia entre los lenguajes construidos en torno a las máquinas de Turing y los lenguajes construidos en torno al cálculo lambda. Así que vale la pena ver esa entrevista si quieres saber más sobre eso.

### Paréntesis

Hay muchos paréntesis en los Lisp, pero eso no es necesariamente malo (igual que tener muchas llaves no es necesariamente malo en los lenguajes similares a C).
Los Lisp se basan en algo que se llama: expresiones S.
Una expresión S (abreviatura de expresión simbólica, abreviada como sexpr o sexp, de ahí el nombre del reto de este mes) es una expresión para representar datos. Fueron inventadas para el lenguaje Lisp original y popularizadas por él.
Una expresión S puede tener una de dos formas:

- Un átomo (p. ej., «x»). Piensa en ellos como «valores» no anidados o las hojas del árbol.
- Una expresión x . y, donde x e y son expresiones S. Piensa en ellas como pares, donde y puede ser el siguiente elemento de la lista (si lo hay), o nodos de un árbol. Ten en cuenta que esta es una definición recursiva, que termina en el nivel de las hojas. Normalmente, se usan paréntesis para este tipo de expresión S.


### Expresiones S
Las expresiones S se usan para representar tanto datos como listas en Lisp.
Por lo tanto, cada vez que definas una lista, usarás paréntesis.
Si combinas esto con el hecho de que:
la lista es la estructura de datos central de Lisp (de ahí su nombre),
en algunos Lisp es la única estructura de datos,
terminarás con muchos paréntesis.
Para mostrar lo centrales que son las listas, si quieres llamar a una función en Lisp, lo haces creando una lista.

Curiosamente, el primer elemento de la lista (también conocido como la cabeza) representa la función que se llama, y los demás elementos (también conocidos como la cola) se pasan como argumentos.
Esto se conoce como notación prefija (donde el operador va antes que los operandos), que puede resultar algo extraño al principio, pero en realidad es muy útil:
- Puedes aplicar un operador a varios argumentos sin tener que repetir el operador (p. ej., (+ 1 2 3))
- La precedencia de operadores se hace explícita, ya que de todos modos tienes que definir una nueva expresión S para llamar a un operador diferente.

Curiosamente, las listas incluso se usan para representar el código fuente, pero volveremos a eso más adelante.

En general, la mayoría de los Lisp tienen una sintaxis bastante mínima y una semántica relativamente simple, lo que los hace relativamente fáciles de aprender, y entender el código también se vuelve más fácil.
¡Esta sintaxis mínima no los hace menos poderosos!
Combinar estas dos cosas (sintaxis mínima + semántica simple) hace que los Lisp sean ideales para escribir compiladores e intérpretes.
Si alguna vez quieres construir tu propio compilador, ¡construir un Lisp es una buena opción!

### Funcionalidades interesantes de Lisp

Como se mencionó antes, los Lisp usan los mismos tipos y estructuras de datos internamente para representar el código.
Esta propiedad se llama homoiconicidad (o homoicónico).
En otras palabras, un lenguaje es homoicónico si un programa escrito en él se puede manipular como datos usando el propio lenguaje, y por lo tanto la representación interna del programa se puede inferir con solo leer el programa.
Esta propiedad a menudo se resume diciendo que el lenguaje trata el código como datos.

## Lenguajes

### Scheme
- Creado durante la década de 1970 por Guy Steele y Gerald Sussman en el MIT AI Lab.
- Comenzó como un intento de entender el modelo de actores de Carl Hewitt mediante un pequeño intérprete de Lisp.
- El lenguaje en sí se presentó en una serie de memorandos de investigación de IA que colectivamente se conocen como los Lambda Papers.
- Primer dialecto de Lisp en usar ámbito léxico (los valores solo están en ámbito donde se definen) y uno de los primeros lenguajes en admitir continuaciones de primera clase.
- Estándar oficial IEEE y un estándar de facto llamado Revised Report on the Algorithmic Language Scheme (RnRS).
- Muchas implementaciones: ChezScheme, Guile (ambos admitidos en Exercism), MIT/GNU Scheme y Racket.
- Un lenguaje muy minimalista, con poca sintaxis, pero eso no fue intencional.
- Los autores intentaron construir algo complicado, pero terminaron diseñando algo mucho más simple de lo que pretendían.
- Recursión de cola adecuada. La forma idiomática de hacer iteración es mediante recursión.
- Scheme optimiza las llamadas recursivas de cola para no consumir espacio de pila ni otros recursos. Esto significa que la recursión se puede usar con datos arbitrariamente grandes o para un cálculo arbitrariamente largo.
- Tipos de datos numéricos potentes, incluidos números racionales y complejos.
- Evaluación diferida, que es como las promesas.
- Sistema de macros potente.
- Las macros higiénicas reducen la probabilidad de resultados inesperados al definir macros.

### Common Lisp
- El trabajo en Common Lisp comenzó en 1981 tras una iniciativa del gerente de ARPA Bob Engelmore para desarrollar un único dialecto de Lisp estándar para la comunidad, porque los diversos dialectos en uso a menudo eran incompatibles, lo que significaba que el código y el conocimiento no se podían compartir.
- El primer estándar se publicó en 1984 y el final en 1994 (una especificación muy estable).
- Al ser un estándar, hay diferentes implementaciones del estándar, como Steel Bank Common Lisp (que es el predeterminado de Exercism) y CLisp.
- También hay implementaciones comerciales, como Allegro CL y LispWorks, además de ECL (Embeddable Common Lisp), que se puede integrar en programas en C, y ABCL, que se ejecuta en la máquina virtual de Java.
- Definido por el estándar (ANSI INCITS 226-1994), así que el código escrito hace 30 años sigue funcionando bien hoy.
- Sistema de tipos rico y extensible.
- Diseñado para el desarrollo con imágenes y REPL, por lo que es muy introspectable.

### Emacs Lisp
- Desarrollado en 1985 con el propósito de tener un lenguaje eficiente para extender un editor de texto.
- De tipado dinámico.
- ~80 % de Emacs está escrito en Emacs Lisp (20 % en C por razones de rendimiento).
- Un poco diferente de otros Lisp:
- No está estandarizado, todavía evoluciona lentamente.
- Sin eliminación automática de llamadas de cola; se admite mediante la macro named-let (se transforma en un bucle while).
- Ámbito dinámico por defecto; se recomienda ámbito léxico para código nuevo.
- Buena documentación dentro del editor.
- Multiplataforma (se ejecuta donde sea que se ejecute Emacs).
- Aprende el lenguaje leyendo el código de las funcionalidades que usas a diario (Emacs Core + Packages).
- Un subconjunto de Common Lisp está disponible a través del paquete cl-lib. Mientras que Emacs Lisp es bastante minimalista, Common Lisp tiene muchas más funcionalidades. El paquete cl-lib hace que un subconjunto de Common Lisp esté disponible.

### Racket
- Matthias Felleisen fundó PLT Inc., que en enero de 1995 decidió desarrollar un entorno de programación pedagógico basado en Scheme. Originalmente llamado PLT Scheme, luego pasó a llamarse Racket.
- Además de ser un entorno de programación pedagógico, se diseñó como una plataforma para el diseño e implementación de lenguajes de programación.
- Lisp moderno, descendiente de Scheme.
- ¡Admite programación lógica!
- Sintaxis simple y expresiva, ideal para principiantes y poderosa en manos de expertos.
- Admite muchos paradigmas de programación: programación funcional, programación orientada a objetos, diseño por contrato, programación lógica, metaprogramación.
- Una biblioteca estándar completa.
- Viene con DrRacket, un entorno de desarrollo integrado (IDE) completo diseñado para aprender y explorar con un mínimo de complicaciones.
- Documentación excelente con abundante información de contexto y ejemplos.

### Clojure
- Desarrollado por Rich Hickey con el objetivo de tener un Lisp moderno que se ejecute en la máquina virtual de Java (JVM) y con una gran concurrencia.
- Un dialecto de Lisp, pero también algo diferente de otros Lisp en que no admite recursión de cola implícita (no te preocupes si no sabes qué es esto) y tiene más estructuras de datos que solo listas: mapas/conjuntos/vectores. Todas estas estructuras de datos tienen su propia sintaxis literal.
- Además, todas son inmutables, pero aún tienen un gran rendimiento con una búsqueda O(log32 n), que es «efectivamente» tiempo constante.
- Polimorfismo en tiempo de ejecución mediante multimétodos y protocolos.
- Excelente interoperabilidad con la JVM.
- El sistema de especificación de datos Clojure Spec (en tiempo de ejecución, no en tiempo de compilación) permite definir la estructura de los datos, generar datos, hacer pruebas basadas en propiedades y más.

## Casos de uso

### Scheme
- Se usa en educación para ayudar a enseñar ciencias de la computación (el influyente Structure and Interpretation of Computer Programs usa Scheme).
- Se usa en IA. Se usa como lenguaje de scripting, por ejemplo en GIMP (editor de gráficos), herramientas CAD (diseño asistido por computadora) y hasta en películas, con los scripts de gestión del motor de renderizado de Final Fantasy: The Spirit Within.

### Common Lisp
- Common Lisp se usa en muchos lugares, por ejemplo en inteligencia artificial e investigación, pero también en aplicaciones comerciales: NASA escribió el software de piloto automático de la nave espacial Deep Space One en Common Lisp, Viaweb se escribió en Common Lisp, que luego fue adquirida por Yahoo y rebautizada como Yahoo Store!, y la primera versión de Reddit.

### Emacs Lisp
- Emacs Lisp se usa en, bueno, ¡Emacs!
- En esencia, Emacs es un intérprete de Emacs Lisp, un dialecto del lenguaje de programación Lisp pero con extensiones añadidas para admitir la edición de texto.

### Racket
- Se usa en educación, ya que Racket se diseñó con énfasis en apoyar la creación, simplificación y análisis de lenguajes.
- Se usa en investigación, ya que su sintaxis y semántica extensibles lo hacen adecuado para diseñar y prototipar nuevos lenguajes y funcionalidades del lenguaje.
- Se usa en videojuegos, por ejemplo por John Carmack (famoso por Doom) en un entorno de scripting interactivo para realidad virtual, y el desarrollador Naughty Dog lo usó para scripting (por ejemplo, en Uncharted). Hacker News está escrito en Arc, también un Lisp, que a su vez está escrito en Racket.

### Clojure
- Clojure se usa para muchas cosas diferentes, incluida la adquisición de Atomist por parte de Docker en 2022, que es una plataforma de seguridad y automatización de contenedores implementada en Clojure.
- El mayor usuario de Clojure del mundo es Nubank, un banco nuevo, que lo adquirió hace unos años y ahora emplea al equipo central de Clojure.
- Se usa mucho para prototipado rápido, por ser dinámico y muy interactivo.

## Perspectiva de programación
Todos los lenguajes admiten los paradigmas funcional, imperativo y simbólico.
Algunos también admiten programación orientada a objetos, sobre todo Common Lisp.

Los Lisp son en su mayoría lenguajes dinámicos, aunque Racket admite tipado estático.

Esto no significa que todos sean interpretados, ya que hay una mezcla de opciones: interpretados (sin ningún paso de compilación), compilados a bytecode y luego interpretados, y compilados directamente a código máquina.

### Scheme
- Minimalista, con una semántica clara y simple y pocas formas diferentes de formar expresiones.
- Hace que sea fácil aprender el lenguaje y entender el código.
- Por esta razón, Scheme también se usa a menudo en muchos cursos introductorios de ciencias de la computación.
- Continuaciones de primera clase.
- Una continuación es una representación del estado de un programa.
- Las continuaciones se pueden usar para modelar el flujo de control (por ejemplo, una construcción `return`) o corrutinas (que permiten la multitarea).

### Common Lisp
- Sistema orientado a objetos extensible con combinaciones de métodos programables (tanto en cómo se combinan los métodos de subclases y superclases, como en métodos before, after y around que permiten extender sistemas sin modificarlos).
- Sistema de condiciones programable (un superconjunto de las «excepciones») que permite desacoplar el reconocimiento de las condiciones de la elección de cómo se manejan. El sistema de condiciones es más flexible que los sistemas de excepciones porque, en lugar de proporcionar una división en dos partes entre el código que señala un error1 y el código que lo maneja,2 el sistema de condiciones divide las responsabilidades en tres partes: señalar una condición, manejarla y reiniciar.
- Las macros permiten extender la sintaxis del lenguaje, no solo generar código repetitivo. Esto ayuda a construir un lenguaje que se ajuste al dominio y no al revés.

### Emacs Lisp
- Excelente soporte e integración con el editor.
- Se puede usar para personalizar Emacs mientras está en ejecución («como hacerte cirugía cerebral a ti mismo» :))
- Se puede usar en modo por lotes, en el que todas las capacidades del editor para procesar texto están disponibles para ti (como búferes y comandos de movimiento).

### Racket
- Sistema de macros potente. El azúcar sintáctico, como las macros de threading, se construye sobre esto. Las macros también son higiénicas, lo que responde a una pregunta simple: una macro genera código que se deposita en otro lugar. Cuando ese código se evalúa, ¿cómo deberíamos determinar los enlaces de los identificadores que contiene? Las macros higiénicas reducen la probabilidad de resultados inesperados al definir macros.
- Orientado a lenguajes.
- Racket viene con las herramientas para escribir tu propio lenguaje de programación o un lenguaje de dominio específico (DSL), construidas sobre las macros de Racket.
- Varios lenguajes integrados, como Typed Racket (que admite anotaciones de tipo comprobadas estáticamente), Datalog (un lenguaje similar a Prolog), que tiene soporte en el IDE DrRacket, y Scribble, una herramienta para crear documentos de prosa en formato HTML o PDF.
- REPL es una parte central del flujo de desarrollo, no solo para probar cosas o consultar la documentación.

### Clojure
- Sistema de macros potente.
- El azúcar sintáctico, como las macros de threading, se construye sobre esto.
- REPL es una parte central del flujo de desarrollo, no solo para probar cosas o consultar la documentación.

## Cuál probar

- Si nunca has probado un Lisp, Scheme y Racket son excelentes opciones, ya que ambos tienen una sintaxis muy mínima.
- Dicho esto, Common Lisp y Clojure tienen Modo de aprendizaje, así que probablemente sean los mejores para aprender en Exercism.
- Si ya usas Emacs, Emacs Lisp es una elección natural.
- De manera similar, si usas un lenguaje de la JVM, Clojure es una opción natural.
- Emacs Lisp (a través de Emacs), Clojure (a través de IntelliJ) y Racket (a través de DrRacket) tienen un excelente soporte de IDE.
- También hay buenos IDE para Common Lisp y Scheme, por supuesto.
- Si quieres un Lisp realmente completo, Common Lisp, Clojure y Racket son realmente extensos.
- Si quieres un Lisp algo diferente, Clojure tiene una sintaxis bastante única para un Lisp.
- Si te interesan las macros y la metaprogramación, ¡básicamente todas son buenas opciones! Pero si quieres construir nuevos lenguajes, Racket en particular es excelente.

Por supuesto, si tienes tiempo, te recomendaría probar un par.
Además, ¡no le tengas miedo a los paréntesis! Yo lo tenía, y por eso pospuse aprender Lisp durante bastante tiempo.
Sin embargo, te acostumbrarás rápido a ellos y quizá hasta llegues a apreciarlos, como me pasó a mí.
De hecho, ahora me encantan los lenguajes Lisp, con su sintaxis mínima, semántica sencilla y a la vez muy expresiva.
