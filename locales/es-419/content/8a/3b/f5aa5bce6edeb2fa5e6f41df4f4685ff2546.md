# ¿Qué queda fuera del alcance del track de Rust de Exercism?

Este archivo pretende explicar qué puede y qué no puede enseñar el track de Rust de Exercism dentro de los límites del lenguaje, la comunidad y el ecosistema de Rust.

Cuando un ejercicio concreto cubra algún material en la sección «fuera del alcance» de _design.md_, no hay que repetirlo aquí, a menos que se considere que, por lo demás, el tema carece de suficiente relevancia.

## Los límites de la interfaz web

Quien usa la interfaz web está limitado por lo que permiten la interfaz web y el ejecutor de pruebas, así que las capacidades de la interfaz web funcionan en la práctica como un límite exterior para el track de Rust.

El estudiante puede:

- Editar un único archivo `.rs`
- Recibir la salida de `stdout` (por ejemplo, de `dbg!`)

En particular, esto significa que no puede editar Cargo.toml, así que cualquier ejercicio que dependa de un crate externo ya debe incluir todas sus dependencias en Cargo.toml.

## De qué no se trata Exercism

Exercism se trata de adquirir fluidez en un lenguaje de programación, no de enseñar habilidades más abstractas como el diseño de software o las ciencias de la computación. Por eso, cualquier tema que no sea especialmente relevante para el lenguaje de programación Rust queda fuera del alcance del track de Rust.

## Ejemplos de temas excluidos

Algunos ejemplos de temas excluidos son:

### Cargo

- editar Cargo.toml
- comandos de CLI, por ejemplo `new`, `update`, `bench`

### Frameworks

- Amethyst
- Yew, Iced, Sauron, etc.

### Interoperabilidad

- CFFI
- `asm!`

### En general:

- Manejo de archivos
- Redes
