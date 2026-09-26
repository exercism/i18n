# Octubre Orientado a Objetos

## Introducción

Hola a todos. Espero que estén bien. Tuvimos un mes ajetreado en septiembre. Publicamos un montón de mejoras y funcionalidades nuevas en el sitio, sobre todo en torno a mejorar la mentoría y los flujos relacionados. Como resultado, ahora recibimos el doble de solicitudes de mentoría que hace 4 semanas, lo cual es genial. Si aún no has probado que un mentor revise tu código, definitivamente hazlo: es una forma increíble de aprender. Y si buscas ayudar a otros, hay muchas solicitudes en las colas esperando tu ayuda. ¡Puedes registrarte como mentor en el enlace Mentoría del menú Contribuir! También hicimos una gran actualización de la base de datos, de MySQL 5.6 a MySQL 8, la cual grabé y está disponible en la sección Insiders, así que si eres Insider y aún no la viste, ¡échale un vistazo!

Bien, ahora vamos con #12in23. Septiembre fue un mes interesante, explorando lenguajes concisos y escuetos. Este mes vamos en la dirección opuesta y exploramos bestias mucho más grandes. Nos enfocamos en los lenguajes orientados a objetos y, en específico, en C#, Crystal, Java, Pharo, Ruby y PowerShell. Ya hablamos de Pharo y Java, en mayo y agosto respectivamente, así que no los volveremos a cubrir en este video, pero echa un vistazo a los videos de los meses anteriores si te interesan las introducciones a esos lenguajes. Pero en este video vamos a explorar C#, Crystal, Ruby y PowerShell y, como siempre, Erik nos va a contar qué hace que estos lenguajes sean interesantes y únicos.

## Las insignias

Como siempre, puedes ganar la insignia de Octubre Orientado a Objetos completando 5 ejercicios cualesquiera en estos lenguajes. También tenemos la insignia de Todo el Año, que sé que muchos de ustedes están buscando. Para esa insignia tenemos 5 ejercicios destacados para que completes, y todos se prestan bien para resolverse de una forma orientada a objetos. Estos son:

- **Árbol binario de búsqueda**: inserta y busca números en un árbol binario
- **Búfer circular**: implementa una estructura de datos conectada de extremo a extremo
- **Reloj**: implementa un reloj que maneja horas sin fechas
- **Matriz**: devuelve las filas y columnas de una matriz representada como string
- **Cifrado simple**: implementa un cifrado por sustitución

## Resúmenes

### C#
- Desarrollado por Anders Hejlsberg en Microsoft en el año 2000
- El lenguaje y la máquina virtual tienen especificaciones oficiales. Se convirtió en estándar oficial ECMA en 2002 y en estándar ISO en 2003
- El compilador, .NET Framework (biblioteca estándar) y Visual Studio (editor) eran inicialmente de código cerrado, pero el compilador y .NET Framework se volvieron de código abierto en 2014
- Aunque comparte mucha sintaxis con Java (que se había lanzado un par de años antes), C# no era una copia exacta de Java (por ejemplo, soporte para propiedades, tipos de valor y sin excepciones verificadas)
- Compila a bytecode, con compilación a código máquina soportada desde .NET 7 (todavía en mejora)
- Se usa en una gran cantidad de software, desde sitios web hasta sistemas embebidos, y desde aplicaciones (Xamarin) hasta juegos (Unity)

### Crystal
- Crystal fue desarrollado por Ary Borenszweig (que tiene una cuenta en Exercism), Juan Wajnerman y Brian Cardiff (originalmente se llamó Joy, pero lo renombraron a Crystal 3 días después :))
- Diseñado para tener la elegancia y productividad de Ruby, pero con la velocidad, eficiencia y seguridad de tipos de un lenguaje compilado moderno.
- Lenguaje de código abierto desarrollado por la organización Manas.
- La versión 1.0 se lanzó en 2021.
- Compila a código máquina usando LLVM (como Rust)
- El compilador se escribió inicialmente en Ruby, pero luego se convirtió a una versión autoalojada
- Lo usan la empresa de camiones Nikola, Manas y otras, principalmente para sitios web, pero también servicios en la nube, aplicaciones de línea de comandos y scripts

### PowerShell
- Creado por un equipo liderado por Jeffrey Snover en Microsoft, con su lanzamiento original en 2006.
- El desarrollo surgió por iniciativa de Intel, que quería mover sus scripts de KornShell de Sun RISC a otra plataforma para ayudar con el desarrollo de sus CPU. Al final, Intel eligió otra plataforma, pero Microsoft siguió trabajando en su nuevo shell: PowerShell, ya que ofrecía la posibilidad de mejorar la administración de sistemas Windows (que no era especialmente buena en ese entonces y a menudo requería GUIs)
- La sintaxis se inspiró en KornShell, pero también en PHP, Perl y otros
- La primera versión solo se ejecutaba en .NET Framework, lo que significaba que solo funcionaba en Windows. Pero PowerShell 6.0 (lanzada en 2018) se ejecutaba en .NET Core, que es multiplataforma y de código abierto.
- Se usa principalmente para administración de sistemas, pero también para proporcionar utilidades de CLI o envoltorios alrededor de otras herramientas. La hemos usado muchísimo para trabajar en masa con los repos de Exercism

### Ruby
- Desarrollado por Yukihiro Matsumoto (alias Matz) y lanzado por primera vez en 1995
- Matz quería trabajar con un lenguaje de scripting orientado a objetos de verdad, pero no le gustaban las opciones existentes (como Perl y Python), así que creó uno nuevo: Ruby
- Matz describe Ruby como un lenguaje Lisp simple en esencia, con un sistema de objetos como el de Smalltalk, bloques inspirados en funciones de orden superior y una utilidad práctica como la de Perl.
- Normalmente se interpreta, pero también se puede compilar justo a tiempo a código máquina
- Además del intérprete oficial, hay implementaciones alternativas, como JRuby (se ejecuta en la JVM), Rubinius (usa LLVM) y YJIT, un compilador justo a tiempo que se incluye como parte del paquete de instalación oficial
- Se usa mayormente en sitios web (con Ruby on Rails), por ejemplo GitHub, Stripe, Shopify y muchos más (¡incluidos Exercism y el foro de Exercism!). Ruby también se usa para propósitos de automatización

## Y desde una perspectiva de programación, ¿en qué se diferencian?

Todos son lenguajes orientados a objetos, aunque no todos lo implementan de la misma manera (por ejemplo, Crystal y Ruby usan el modelo de envío de mensajes de Smalltalk para invocar métodos).

### C#
- Tipado fuerte y estático
- También soporta los paradigmas imperativo y declarativo, y cada vez es más funcional

### Crystal
- Tipado fuerte y estático (a diferencia de Ruby)
- También soporta programación funcional e imperativa

### PowerShell
- Tipado fuerte
- También soporta programación imperativa, funcional y basada en pipelines.

### Ruby
- Tipado dinámico
- También soporta programación funcional e imperativa

Dicho esto, todos estos lenguajes son ante todo lenguajes orientados a objetos.

## ¿Qué hace que estos lenguajes sean geniales?

### C#
- Se ejecuta en (casi) todas partes, incluidas las aplicaciones vía Xamarin. Originalmente solo funcionaba en Windows, lo que dio origen a Mono, una implementación libre y de código abierto de un compilador y runtime de C# que era multiplataforma. En 2015 se introdujo .NET Core, que era totalmente multiplataforma y de código abierto.
- Propósito general: se puede usar para casi cualquier tipo de carga de trabajo, incluidas aplicaciones, sitios web y juegos
- Expresivo: puedes hacer mucho con relativamente poco código C#. LINQ en especial es un gran impulso a la productividad y muy divertido de usar
- Excelentes herramientas, tanto para IDE como para otras herramientas como sistemas de compilación. Mientras que Visual Studio es solo para Windows, JetBrains Rider y VS Code son multiplataforma
- La plataforma de compiladores de .NET (a menudo llamada Roslyn) es una forma fantástica de analizar, transformar y generar código C# (la usamos mucho en el test runner, el analyzer y el representer de C#)
- La documentación es extensa, detallada y está bien escrita
- Gran comunidad: hay muchos recursos disponibles, incluidos blogs, foros y más

### Crystal
- Sintaxis elegante y legible, lo que hace que el código Crystal sea fácil de leer y escribir
- Expresivo. Como Ruby, Crystal es muy expresivo, y puedes hacer mucho con poco código. Esto se debe en parte a su excelente y extensa biblioteca estándar.
- Rápido. El tipado estático permite compilar a código máquina eficiente usando LLVM, con una gestión de memoria simple mediante un recolector de basura.
- Increíble implementación orientada a objetos. Todo es un objeto, incluidas las clases y los tipos primitivos como números y valores Boolean
- Baterías incluidas: una gran biblioteca estándar, formateador integrado, motor de plantillas, framework de pruebas y más
- Interoperabilidad. Fácil interoperabilidad con bibliotecas de C
- Multiplataforma: se ejecuta en Linux, macOS y Windows, aunque Windows todavía no es un ciudadano de primera clase

### PowerShell
- Potente: PowerShell es una herramienta potente para administradores. Se integra bien con muchos otros sistemas, como el sistema operativo Windows (componentes, servicios y configuraciones), otros productos de Microsoft como Exchange, SharePoint, Azure, etc. También puede interactuar con muchas otras tecnologías como API REST, bases de datos, servicios web y más.
- Disponibilidad: PowerShell viene preinstalado en todos los sistemas operativos Windows modernos y se puede instalar en cualquier sistema que ejecute .NET (lo que incluye macOS, Linux y muchos sistemas Unix)
- Seguridad: PowerShell incluye funcionalidades para proteger scripts y restringir su ejecución según scripts firmados y directivas de ejecución. Esto es crucial para garantizar la seguridad de tus procesos de automatización.
- GUI: Puedes combinarlo con otros frameworks como Windows Forms o Windows Presentation Foundation para diseñar y crear interfaces gráficas para tus scripts de PowerShell y hacerlos más fáciles de usar.
- Pipeline: De forma similar a Bash en los sistemas Unix, PowerShell te permite encadenar cmdlets para realizar operaciones y tareas complejas pasando la salida de un cmdlet como argumento de otro

### Ruby
- Sintaxis elegante y legible, lo que hace que el código Ruby sea fácil de leer y escribir
- Expresivo. Ruby es un lenguaje muy expresivo, y puedes hacer mucho con poco código. Esto se debe en parte a su excelente y extensa biblioteca estándar
- Enorme ecosistema, con una cantidad masiva de bibliotecas disponibles (gemas)
- Increíble implementación orientada a objetos. Todo es un objeto, incluidas las clases y los tipos primitivos como números y valores Boolean.
- Pragmático. Ruby y la mayoría de sus bibliotecas son muy pragmáticos y se enfocan en resolver problemas del mundo real.
- Interoperabilidad. Fácil interoperabilidad con bibliotecas de C, que a menudo se usa cuando el rendimiento es especialmente importante. Por ejemplo, la gema Nokogiri permite trabajar con XML de forma muy eficiente al envolver bibliotecas de C que hacen el trabajo pesado
- Está pasando mucha innovación. Por ejemplo, Stripe creó Sorbet, un verificador de tipos para Ruby; Shopify desarrolló YJIT, un compilador justo a tiempo para Ruby (incluido en Ruby 3.1+) y se está trabajando en el soporte de WASM

## Características destacadas

### C#
- Gran rendimiento, especialmente para un lenguaje gestionado. Tanto el lenguaje como el runtime tienen un montón de funcionalidades para mejorar el rendimiento, por ejemplo, el tipo Span<T> y el acceso a instrucciones intrínsecas de la CPU (como las instrucciones AVX). El CLR es una máquina virtual madura, estable y de alto rendimiento que se mejora continuamente
- Enorme ecosistema, con una cantidad masiva de bibliotecas disponibles. Esas bibliotecas, al igual que C#, son maduras, estables y completas
- Moderno y en evolución: el lenguaje y el runtime siguen evolucionando, con actualizaciones muy regulares al lenguaje para hacerlo más moderno. Algunos ejemplos son:
- async/await para una concurrencia sencilla
- span<T> para un uso eficiente de la memoria
- Tipos de referencia anulables (corrigiendo el error de mil millones de dólares)
- El runtime también se actualiza con regularidad, por ejemplo, .NET AOT para compilar directamente a código máquina
- Menos alternativas que muchos otros lenguajes/ecosistemas. Para la mayoría de los propósitos, puedes arreglártelas con las soluciones predeterminadas que proporciona Microsoft, que a menudo incluyen también el IDE. También se podría argumentar que esto es una desventaja, pero puede ser genial, sobre todo cuando recién empiezas con un lenguaje

### Crystal
- Lo mejor de ambos mundos. La combinación de inferencia de tipos global y tipos unión hace que Crystal se sienta como un lenguaje de tipado dinámico, donde a menudo hay que especificar poco tipado, pero que aún conserva el rendimiento y las garantías adicionales de seguridad (incluida la verificación de nil en tiempo de compilación) de un lenguaje de tipado estático
- Metaprogramación. En lugar de la metaprogramación dinámica en tiempo de ejecución de Ruby, Crystal tiene macros, que se ejecutan en tiempo de compilación. Las macros operan sobre nodos del AST y producen código. Son bastante fáciles de definir y usar. Embedded Crystal (ECR) es un motor de plantillas integrado que usa macros para incrustar código Crystal en otro texto
- Gran concurrencia. La concurrencia es fácil de usar con un modelo similar al de Go que usa fibras (una unidad de ejecución ligera) que se comunican mediante canales
- Productivo y divertido. Ruby es famoso por estar diseñado para la productividad y la felicidad del desarrollador, con una sintaxis elegante y legible y una gran ergonomía. Como la sintaxis y el diseño de Crystal son muy similares a los de Ruby, esto también aplica a Crystal (dato curioso: bastante código Ruby es código Crystal válido).

### PowerShell

- Cmdlets: PowerShell usa cmdlets (se pronuncia «command-lets») como sus bloques de construcción. Son comandos pequeños, orientados a tareas, que envuelven funcionalidad existente y ofrecen una interfaz consistente (por ejemplo, Get-Help para mostrar la ayuda de cualquier cmdlet) y amigable para administradores. Hay cmdlets para una amplia variedad de «backends», como todas las clases de .NET, Windows Management Instrumentation, Azure y muchos más. Los cmdlets se pueden definir en cualquier lenguaje .NET y se definen de forma muy declarativa, con parámetros, su validación, requisitos (required true/false), nombres alternativos (switch) y demás, fáciles de definir.
- Orientado a objetos: Casi todo en PowerShell es un objeto con muchas propiedades diferentes. Los archivos, procesos, claves de registro e incluso tipos de datos simples como string y número se tratan como objetos. Este enfoque simplifica cómo trabajas e interactúas con distintos tipos de datos y servicios. Les resultará muy familiar a quienes hayan trabajado con .NET
- Administración remota: Admite la administración remota de servidores y sistemas Windows, e incluso de recursos en la nube en Azure, AWS y GCP, lo cual es esencial para gestionar automatización y despliegues a gran escala.
- Extensible: Tiene un gran sistema de módulos integrado, además de permitirte crear cmdlets, funciones y módulos personalizados, y trabajar con otros lenguajes de programación y bibliotecas para ampliar sus capacidades según lo necesites.

### Ruby

- Productivo y divertido. Ruby es famoso por estar diseñado para la productividad y la felicidad del desarrollador. Aunque es difícil de cuantificar, el entusiasmo de quienes han usado Ruby lo dice todo
- Metaprogramación. Ruby es muy dinámico y permite la metaprogramación en tiempo de ejecución. Ya sea hacer monkey-patching de clases existentes o agregar o llamar métodos de forma dinámica, Ruby te cubre
- Ruby on Rails es un framework fantástico y completo para crear sitios web. De fábrica incluye plantillas, caché, ActiveRecord (una forma de interactuar con una base de datos mediante objetos), migraciones, scaffolding, WebSockets y mucho más.

## Cuál elegir

- Si ya conoces la programación orientada a objetos pero quieres ver un enfoque diferente, prueba Pharo
- Si conoces Java o C# pero no los has tocado en un tiempo, dales otra oportunidad. Ambos lenguajes han evolucionado mucho, ¡así que échale un vistazo a esas brillantes funcionalidades nuevas!
- C# y Java (y Ruby en menor medida) también son grandes opciones si buscas trabajo, ya que son algunos de los lenguajes más solicitados por los empleadores
- Si conoces Ruby, prueba Crystal para ver cómo se vería y se sentiría un Ruby con tipado estático
- Si te gustan los lenguajes dinámicos pero también quieres un gran rendimiento, ve a ver Crystal
- Si conoces Bash o los archivos por lotes de Windows, prueba PowerShell para un enfoque distinto y orientado a objetos del scripting de shell
- Si te gustan los lenguajes de scripting en general, Ruby, Crystal y PowerShell son buenas opciones
- Pharo, Crystal y Ruby son geniales si quieres hacer algo de metaprogramación (C# también está incorporando algunas funcionalidades de metaprogramación)
- Si quieres experimentar cómo es programar en un lenguaje que no se basa en archivos de texto, prueba Pharo y su singular y potente IDE
- Si te gusta crear sitios web, vale la pena probar Ruby con su framework Ruby on Rails
