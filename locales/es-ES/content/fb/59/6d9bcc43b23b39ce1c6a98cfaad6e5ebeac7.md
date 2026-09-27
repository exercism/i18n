# Octubre orientado a objetos

## Introducción

Hola a todos. Espero que estéis bien. Hemos tenido un septiembre ajetreado. Hemos publicado un montón de mejoras y funcionalidades nuevas en el sitio, sobre todo en torno a mejorar la mentoría y los flujos relacionados. Como resultado, ahora nos llegan el doble de solicitudes de mentor que hace 4 semanas, lo cual es genial. Si aún no habéis probado a que un mentor os revise el código, hacedlo sin duda: es una forma increíble de aprender. Y si buscáis ayudar a los demás, hay un montón de solicitudes en las colas esperando vuestra ayuda. Podéis apuntaros como mentor en el enlace Mentoring del menú Contribute. También hicimos una gran actualización de la base de datos, de MySQL 5.6 a MySQL 8, que grabé y está disponible en la sección Insiders, así que si sois Insider y aún no lo habéis visto, ¡echadle un vistazo!

Bien, vamos con #12in23. Septiembre fue un mes interesante, explorando lenguajes concisos y escuetos. Este mes vamos en la dirección contraria y nos fijamos en bestias mucho más grandes. Nos centramos en los lenguajes orientados a objetos y, en concreto, en C#, Crystal, Java, Pharo, Ruby y PowerShell. Ya hemos hablado de Pharo y de Java, en mayo y agosto respectivamente, así que no volveremos a tratarlos en este vídeo, pero echad un vistazo a los vídeos de los meses anteriores si os interesan las introducciones a esos lenguajes. Pero en este vídeo vamos a explorar C#, Crystal, Ruby y PowerShell y, como siempre, Erik nos explicará qué hace que estos lenguajes sean interesantes y únicos.

## Las insignias

Como siempre, podéis ganar la insignia de Octubre orientado a objetos completando 5 ejercicios cualesquiera en estos lenguajes. También tenemos la insignia anual, hacia la que sé que muchos de vosotros estáis trabajando. Para esa insignia tenemos 5 ejercicios destacados que podéis completar, y todos se prestan bien a resolverse de una forma orientada a objetos. Son los siguientes:

- **Árbol binario de búsqueda**: insertar y buscar números en un árbol binario
- **Búfer circular**: implementar una estructura de datos conectada de extremo a extremo
- **Reloj**: implementar un reloj que gestione horas sin fechas
- **Matriz**: devolver las filas y las columnas de una matriz representada como un string
- **Cifrado simple**: implementar un cifrado por sustitución

## Resúmenes

### C#
- Desarrollado por Anders Hejlsberg en Microsoft en 2000
- El lenguaje y la máquina virtual tienen especificaciones oficiales. Se convirtió en un estándar oficial de ECMA en 2002 y en un estándar ISO en 2003
- El compilador, .NET Framework (biblioteca estándar) y Visual Studio (editor) eran todos de código cerrado al principio, pero el compilador y .NET Framework se abrieron como código abierto en 2014
- Aunque comparte mucha sintaxis con Java (que se había publicado un par de años antes), C# no era una copia exacta de Java (por ejemplo, soporte para propiedades, tipos de valor y ausencia de excepciones comprobadas)
- Compila a bytecode, con compilación a código máquina admitida desde .NET 7 (todavía en mejora)
- Se usa en una enorme cantidad de software, desde sitios web hasta sistemas embebidos, y desde aplicaciones (Xamarin) hasta juegos (Unity)

### Crystal
- Crystal fue desarrollado por Ary Borenszweig (que tiene cuenta en Exercism), Juan Wajnerman y Brian Cardiff (originalmente se llamó Joy, pero lo renombraron a Crystal 3 días después :))
- Diseñado para tener la elegancia y la productividad de Ruby, pero con la velocidad, la eficiencia y la seguridad de tipos de un lenguaje compilado moderno.
- Lenguaje de código abierto desarrollado por la organización Manas.
- La versión 1.0 se publicó en 2021.
- Compila a código máquina usando LLVM (como Rust)
- El compilador se escribió inicialmente en Ruby, pero después se convirtió en una versión autohospedada
- Lo usan la empresa de camiones Nikola, Manas y otras, sobre todo para sitios web, pero también servicios en la nube, aplicaciones de línea de comandos y scripts

### PowerShell
- Creado por un equipo dirigido por Jeffrey Snover en Microsoft y publicado originalmente en 2006.
- El desarrollo lo impulsó Intel, que quería trasladar sus scripts de KornShell de Sun RISC a otra plataforma para ayudar en el desarrollo de sus CPU. Al final, Intel eligió otra plataforma, pero Microsoft siguió trabajando en su nuevo shell, PowerShell, porque ofrecía la posibilidad de mejorar la administración de sistemas Windows (que no era especialmente buena en aquella época y a menudo requería interfaces gráficas de usuario (GUI))
- La sintaxis se inspiró en KornShell, pero también en PHP, Perl y otros
- La primera versión solo se ejecutaba en .NET Framework, lo que significaba que solo funcionaba en Windows. Pero PowerShell 6.0 (publicado en 2018) se ejecutaba en .NET Core, que es multiplataforma y de código abierto.
- Se usa principalmente para la administración de sistemas, pero también para proporcionar utilidades de CLI o envoltorios alrededor de otras herramientas. Lo hemos usado muchísimo para trabajar en masa con repositorios de Exercism

### Ruby
- Desarrollado por Yukihiro Matsumoto (alias Matz) y publicado por primera vez en 1995
- Matz quería trabajar con un lenguaje de scripting realmente orientado a objetos, pero no le gustaban las opciones existentes (como Perl y Python), así que creó un lenguaje nuevo: Ruby
- Matz describe Ruby como un lenguaje Lisp sencillo en esencia, con un sistema de objetos como el de Smalltalk, bloques inspirados en las funciones de orden superior y una utilidad práctica como la de Perl.
- Normalmente se interpreta, pero también se puede compilar justo a tiempo a código máquina
- Además del intérprete oficial, hay implementaciones alternativas, como JRuby (se ejecuta en la JVM), Rubinius (usa LLVM) e YJIT, un compilador justo a tiempo que se incluye como parte del paquete de instalación oficial
- Se usa sobre todo en sitios web (con Ruby on Rails), por ejemplo GitHub, Stripe, Shopify y muchos más (¡incluidos Exercism y el foro de Exercism!). Ruby también se usa con fines de automatización

## Y desde el punto de vista de la programación, ¿en qué se diferencian?

Todos son lenguajes orientados a objetos, aunque no todos lo implementan de la misma forma (por ejemplo, Crystal y Ruby usan el modelo de envío de mensajes de Smalltalk para invocar métodos).

### C#
- Tipado fuerte y estático
- También admite los paradigmas imperativo y declarativo, y es cada vez más funcional

### Crystal
- Tipado fuerte y estático (a diferencia de Ruby)
- También admite programación funcional e imperativa

### PowerShell
- De tipado fuerte
- También admite programación imperativa, funcional y basada en pipeline.

### Ruby
- Tipado dinámico
- También admite programación funcional e imperativa

Dicho esto, todos estos lenguajes son ante todo lenguajes orientados a objetos.

## ¿Qué hace que estos lenguajes sean geniales?

### C#
- Se ejecuta en (casi) todas partes, incluidas las aplicaciones con Xamarin. Al principio solo funcionaba en Windows, lo que dio lugar a Mono, una implementación libre y de código abierto de un compilador y un entorno de ejecución de C# que era multiplataforma. En 2015 se presentó .NET Core, que era totalmente multiplataforma y de código abierto.
- De propósito general: se puede usar para casi cualquier carga de trabajo, incluidas aplicaciones, sitios web y juegos
- Expresivo: se puede hacer mucho con relativamente poco código de C#. LINQ, en particular, es un gran impulso para la productividad y muy divertido de usar
- Excelentes herramientas, tanto para IDEs como para otras herramientas como los sistemas de compilación. Aunque Visual Studio solo funciona en Windows, JetBrains Rider y VS Code son multiplataforma
- .NET Compiler Platform (que a menudo se conoce como Roslyn) es una forma fantástica de analizar, transformar y generar código de C# (lo usamos mucho en el test runner, el analyzer y el representer de C#)
- La documentación es extensa, detallada y está bien escrita
- Gran comunidad: hay muchos recursos disponibles, incluidos blogs, foros y más

### Crystal
- Sintaxis elegante y legible, lo que hace que el código de Crystal sea fácil de leer y escribir
- Expresivo. Como Ruby, Crystal es muy expresivo, puedes hacer mucho con poco código. Esto se debe en parte a su excelente y extensa biblioteca estándar.
- Rápido. El tipado estático permite compilar a código máquina eficiente usando LLVM, con una gestión de memoria sencilla a través de un recolector de basura.
- Impresionante implementación orientada a objetos. Todo es un objeto, incluidas las clases y los tipos primitivos como los números y los booleanos
- Con todo incluido: una gran biblioteca estándar, formateador integrado, motor de plantillas, framework de pruebas y más
- Interoperabilidad. Fácil interoperabilidad con bibliotecas de C
- Multiplataforma: se ejecuta en linux, macOS y Windows, aunque Windows todavía no es un ciudadano de primera clase

### PowerShell
- Potente: PowerShell es una herramienta potente para administradores. Se integra bien con muchos otros sistemas, como el sistema operativo Windows (componentes, servicios y ajustes), otros productos de Microsoft como Exchange, SharePoint, Azure, etc. También puede interactuar con muchas otras tecnologías, como las API REST, bases de datos, servicios web y más.
- Disponibilidad: PowerShell viene preinstalado en todos los sistemas operativos Windows modernos y se puede instalar en cualquier sistema que ejecute .NET (lo que incluye macOS, Linux y muchos sistemas Unix)
- Seguridad: PowerShell incluye funcionalidades para proteger los scripts y restringir su ejecución basándose en scripts firmados y políticas de ejecución. Esto es crucial para garantizar la seguridad de vuestros procesos de automatización.
- GUI: podéis combinarlo con otros frameworks como Windows Forms o Windows Presentation Foundation para diseñar y crear interfaces gráficas para vuestros scripts de PowerShell y hacerlos más fáciles de usar.
- Pipeline: de forma similar a Bash en los sistemas Unix, PowerShell permite encadenar cmdlets para realizar operaciones y tareas complejas pasando la salida de un cmdlet como entrada a otro

### Ruby
- Sintaxis elegante y legible, lo que hace que el código de Ruby sea fácil de leer y escribir
- Expresivo. Ruby es un lenguaje muy expresivo, puedes hacer mucho con poco código. Esto se debe en parte a su excelente y extensa biblioteca estándar
- Enorme ecosistema, con una cantidad masiva de bibliotecas disponibles (gemas)
- Impresionante implementación orientada a objetos. Todo es un objeto, incluidas las clases y los tipos primitivos como los números y los booleanos.
- Pragmático. Ruby y la mayoría de sus bibliotecas son muy pragmáticos, se centran en resolver problemas del mundo real.
- Interoperabilidad. Fácil interoperabilidad con bibliotecas de C, que se usa a menudo cuando el rendimiento es especialmente importante. Por ejemplo, la gema Nokogiri permite trabajar con XML de forma muy eficiente envolviendo bibliotecas de C que hacen el trabajo pesado
- Está pasando mucha innovación. Por ejemplo, Stripe ha creado Sorbet, un comprobador de tipos para Ruby; Shopify ha desarrollado YJIT, un compilador justo a tiempo para Ruby (incluido en Ruby 3.1+) y se está trabajando en el soporte de WASM

## Características destacadas

### C#
- Gran rendimiento, especialmente para un lenguaje gestionado. Tanto el lenguaje como el entorno de ejecución tienen un montón de características para mejorar el rendimiento, por ejemplo el tipo Span<T> y el acceso a instrucciones intrínsecas de la CPU (como las instrucciones AVX). El CLR es una máquina virtual madura, estable y de gran rendimiento que se mejora continuamente
- Enorme ecosistema, con una cantidad masiva de bibliotecas disponibles. Esas bibliotecas, como C#, son maduras, estables y completas
- Moderno y en evolución: el lenguaje y el entorno de ejecución siguen evolucionando, con actualizaciones muy frecuentes del lenguaje para hacerlo más moderno. Algunos ejemplos son:
- async/await para una concurrencia sencilla
- span<T> para un uso eficiente de la memoria
- Tipos de referencia anulables (solucionando el error de los mil millones de dólares)
- El entorno de ejecución también se actualiza con regularidad, por ejemplo .NET AOT para compilar directamente a código máquina
- Menos alternativas que en muchos otros lenguajes y ecosistemas. Para la mayoría de los propósitos, basta con usar las soluciones predeterminadas que ofrece Microsoft, que a menudo incluyen también el IDE. También se podría argumentar que esto es una desventaja, pero puede ser estupendo, sobre todo cuando se empieza con un lenguaje

### Crystal
- Lo mejor de ambos mundos. La combinación de inferencia de tipos global y tipos unión hace que Crystal se sienta como un lenguaje de tipado dinámico en el que a menudo hay que especificar pocos tipos, pero que conserva el rendimiento y las garantías adicionales de seguridad (incluida la comprobación de nil en tiempo de compilación) de un lenguaje de tipado estático
- Metaprogramación. En lugar de la metaprogramación dinámica en tiempo de ejecución de Ruby, Crystal tiene macros, que se ejecutan en tiempo de compilación. Las macros operan sobre nodos del AST y producen código. Son bastante fáciles de definir y usar. Embedded Crystal (ECR) es un motor de plantillas integrado que usa macros para incrustar código de Crystal en otro texto
- Gran concurrencia. La concurrencia es fácil de usar con un modelo de concurrencia similar al de Go que usa fibers (unidad de ejecución ligera) que se comunican mediante canales
- Productivo y divertido. Ruby es famoso por estar diseñado para la productividad y la felicidad del desarrollador, con una sintaxis elegante y legible y una gran ergonomía. Como la sintaxis y el diseño de Crystal son muy similares a los de Ruby, esto también se aplica a Crystal (dato curioso: bastante código de Ruby es código válido de Crystal).

### PowerShell

- Cmdlets: PowerShell usa cmdlets (se pronuncian «command-lets») como sus bloques de construcción. Son comandos pequeños y orientados a tareas que envuelven funcionalidad existente, ofreciendo una interfaz coherente (por ejemplo, Get-Help para mostrar la ayuda de cualquier cmdlet) y amigable para los administradores de sistemas. Hay cmdlets para una amplia variedad de «backends», como todas las clases de .NET, Windows Management Instrumentation, Azure y muchos más. Los cmdlets se pueden definir en cualquier lenguaje de .NET y se definen de forma muy declarativa, con parámetros, su validación, requisitos (required true/false), nombres alternativos (switch), etc., definidos fácilmente.
- Orientado a objetos: casi todo en PowerShell es un objeto con muchas propiedades diferentes. Los archivos, los procesos, las claves del registro e incluso tipos de datos simples como string y number se tratan como objetos; este enfoque simplifica cómo trabajáis e interactuáis con distintos tipos de datos y servicios. Resultará muy familiar a cualquiera que haya trabajado con .NET
- Administración remota: admite la administración remota de servidores y sistemas Windows, e incluso de recursos en la nube en Azure, AWS y GCP, algo esencial para gestionar automatizaciones y despliegues a gran escala.
- Extensible: tiene un gran sistema de módulos integrado, además de permitiros crear cmdlets, funciones y módulos personalizados, y trabajar con otros lenguajes de programación y bibliotecas para ampliar aún más sus capacidades según sea necesario.

### Ruby

- Productivo y divertido. Ruby es famoso por estar diseñado para la productividad y la felicidad del desarrollador. Aunque es difícil de cuantificar, el entusiasmo de quienes han usado Ruby lo dice todo
- Metaprogramación. Ruby es muy dinámico y permite la metaprogramación en tiempo de ejecución. Ya sea aplicar monkey-patching a clases existentes o añadir o llamar métodos de forma dinámica, Ruby lo tiene cubierto
- Ruby on Rails es un framework fantástico y completo para crear sitios web. De serie, incluye plantillas, caché, ActiveRecord (una forma de interactuar con una base de datos a través de objetos), migraciones, scaffolding, WebSockets y mucho más.

## Cuál elegir

- Si estáis familiarizados con la programación orientada a objetos pero queréis ver un enfoque distinto, probad Pharo
- Si conocéis Java o C# pero no los habéis tocado desde hace tiempo, dadles otra oportunidad. Ambos lenguajes han evolucionado mucho, ¡así que echad un vistazo a esas flamantes características nuevas!
- C# y Java (y Ruby en menor medida) también son grandes opciones si buscáis trabajo, ya que son algunos de los lenguajes más solicitados por los empleadores
- Si conocéis Ruby, probad Crystal para ver cómo se vería y se sentiría un Ruby con tipado estático
- Si os gustan los lenguajes dinámicos pero también queréis un gran rendimiento, id a ver Crystal
- Si conocéis Bash o los archivos por lotes de Windows, probad PowerShell para ver un enfoque distinto y orientado a objetos del scripting de shell
- Si os van los lenguajes de scripting en general, Ruby, Crystal y PowerShell son buenas opciones
- Pharo, Crystal y Ruby son geniales si queréis hacer algo de metaprogramación (C# también está incorporando algunas características de metaprogramación)
- Si queréis experimentar cómo es programar en un lenguaje que no se basa en archivos de texto, probad Pharo y su único y potente IDE
- Si os interesa crear sitios web, merece la pena probar Ruby con su framework Ruby on Rails
