# ¿Qué queda fuera del alcance del track de Rust de Exercism?

Este archivo pretende explicar qué puede y qué no puede enseñar el track de Rust de Exercism dentro de los límites del lenguaje Rust, su comunidad y su ecosistema.

Cuando un contenido figure bajo «fuera del alcance» en _design.md_ para un ejercicio concreto, no debe repetirse aquí a menos que se considere que, de otro modo, el tema no tiene la suficiente prominencia.

## Los límites de la interfaz web

Un estudiante que use la interfaz web está limitado a lo que permitan la interfaz web y el ejecutor de pruebas, por lo que las capacidades de la interfaz web sirven en la práctica como límite exterior para el track de Rust.

Un estudiante puede:

- Editar un único archivo `.rs`
- Recibir la salida de `stdout` (por ejemplo, de `dbg!`)

En particular, esto significa que no puede editar Cargo.toml, por lo que cualquier ejercicio que dependa de un crate externo debe incluir ya todas las dependencias en Cargo.toml.

## De qué no trata Exercism

Exercism trata de adquirir fluidez en un lenguaje de programación, no de enseñar habilidades más abstractas como el diseño de software o la informática. Por lo tanto, cualquier tema que no sea especialmente relevante para el lenguaje de programación Rust no entra dentro del alcance del track de Rust.

## Ejemplos de temas excluidos

Algunos ejemplos de temas excluidos son:

### Cargo

- editar Cargo.toml
- comandos de la CLI, por ejemplo, `new`, `update`, `bench`

### Frameworks

- Amethyst
- Yew, Iced, Sauron, etc.

### Interoperabilidad

- CFFI
- `asm!`

### En general:

- Manejo de archivos
- Redes
