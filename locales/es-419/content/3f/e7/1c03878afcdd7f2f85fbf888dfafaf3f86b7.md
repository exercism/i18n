# Acerca de Wren

Wren es un lenguaje de scripting pequeño, rápido, basado en clases y concurrente. Piensa en
Smalltalk en un paquete del tamaño de Lua, con una pizca de Erlang y envuelto en una
sintaxis familiar y moderna.

- **Pequeño.** La VM ocupa menos de 4.000 puntos y coma de C legible y comentado con cariño.

- **Rápido.** Un compilador inteligente de una sola pasada produce bytecode compacto y eficiente.

- **Basado en clases.** Las clases y los objetos son los protagonistas.

- **Concurrente.** Las fibras ligeras están integradas en el lenguaje.

- **Scripting.** Se puede incrustar, no tiene dependencias, tiene una biblioteca estándar pequeña y una API de C fácil de usar.


### La VM

El corazón de Wren es la VM. La máquina virtual de Wren es el núcleo del lenguaje y ejecuta
todo el código fuente de Wren. Es solo una biblioteca, no una aplicación independiente.
Está diseñada para incrustarse en una aplicación anfitriona más grande.

Puedes encontrar Wren incrustado en proyectos como:

* [TIC-80](https://tic80.com): una computadora de fantasía para crear, jugar y compartir juegos diminutos (similar a PICO8).
* [DOME](https://domeengine.com): un framework multiplataforma para crear juegos.
* [luxe](https://luxeengine.com): un motor de juegos multiplataforma para desarrollo rápido.
* [Wren Console][wren-console]: un REPL y una CLI de Wren escritos en gran medida en el propio Wren.

Incluso puedes incrustar Wren dentro de tus propios proyectos. Para los fines de Exercism,
la aplicación anfitriona que usaremos es [Wren Console][wren-console], lo que nos permite
ejecutar y probar nuestros scripts de Wren desde la terminal.


### ¿Por qué Wren?

Wren fue creado originalmente por [Bob Nystrom](http://journal.stuffwithstuff.com), conocido
por [Crafting Interpreters](http://craftinginterpreters.com). Tiene más de unos cuantos
lenguajes a sus espaldas, pero explica concretamente qué lo llevó a crear Wren:

> Hay unos cuantos lenguajes de scripting que se usan para incrustar en aplicaciones. Lua es
> el principal. TCL lo era antes. También está Guile, cada vez más JavaScript, y algunas
> aplicaciones incrustan Python. Fui desarrollador de videojuegos, así que cuando pienso en
> «scripting», tiendo a pensar en «scripting de juegos».

> Lua es agradable: es pequeño, simple y rápido. Pero (y no lo digo como crítica) también
> resulta raro si estás acostumbrado a lenguajes como C++ y Java. La sintaxis es diferente.
> La semántica, sobre todo el modelo de objetos, es inusual. Cualquiera se acostumbra a los
> índices que empiezan en 1, pero cosas como las metatablas demuestran que los objetos se
> agregaron a Lua después, a la fuerza.

> Creo que hay espacio para un lenguaje tan simple como Lua, pero que se sienta natural para
> alguien con una base de programación orientada a objetos. Wren es mi intento de lograrlo.

### Probar Wren

Puedes [probarlo rápidamente][try-it] desde tu navegador web (sin instalar nada). Si quieres
experimentar con Wren envuelto en una interfaz atractiva, puedes echar un vistazo a
[Wren Playground][wren-playground].

[wren]: https://wren.io
[wren-console]: https://github.com/joshgoebel/wren-console
[wren-playground]: https://github.com/ninjascl/wren-playground
[try-it]: https://wren.io/try/
