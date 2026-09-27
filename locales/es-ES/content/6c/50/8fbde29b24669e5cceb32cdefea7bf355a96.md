# Introducción

En Cairo, los arrays son estructuras de datos fundamentales diseñadas para almacenar colecciones de elementos del mismo tipo de forma estructurada.
De forma similar a los arrays de otros lenguajes de programación, se accede a cada elemento mediante su índice, lo que permite recuperarlos y manipularlos de manera eficiente.

Los arrays de Cairo son estructuras de datos inmutables.
Solo se pueden añadir elementos al final o eliminar elementos del principio del array.
Este diseño garantiza la integridad y la estabilidad de los datos, en consonancia con el enfoque de Cairo para la gestión de memoria.
Los arrays se inicializan con `ArrayTrait::new()` y admiten declaraciones específicas de tipo para almacenar elementos.
Se puede acceder a los elementos con los métodos `get()` o `at()`, así como mediante el operador de subíndice `arr[index]`.
Solo puedes eliminar elementos del principio de un array con la función `pop_front()`.
Estas características hacen que los arrays de Cairo sean adecuados para tareas de almacenamiento y recuperación de datos estructurados.
