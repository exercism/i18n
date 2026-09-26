# Introducción

En Cairo, los arrays son estructuras de datos fundamentales diseñadas para almacenar colecciones de elementos del mismo tipo de una manera estructurada.
De manera similar a las listas de otros lenguajes de programación, se accede a cada elemento de un array mediante su índice, lo que permite recuperar y manipular elementos de forma eficiente.

Los arrays de Cairo son estructuras de datos inmutables.
Los elementos solo se pueden agregar al final o eliminar del inicio del array.
Este diseño garantiza la integridad y la estabilidad de los datos, en línea con el enfoque de Cairo para el manejo de memoria.
Los arrays se inicializan con `ArrayTrait::new()` y admiten declaraciones específicas de tipo para el almacenamiento de elementos.
Se puede acceder a los elementos con los métodos `get()` o `at()`, así como con el operador de indexación `arr[index]`.
Solo puedes eliminar elementos del inicio de un array con la función `pop_front()`.
Estas características hacen que los arrays de Cairo sean adecuados para tareas de almacenamiento y recuperación de datos estructurados.
