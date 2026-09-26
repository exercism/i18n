# Pistas

## General

- El conteo de aves por día se guarda en un [campo][fields] llamado `birdsPerDay`.
- El conteo de aves por día es un array que contiene exactamente 7 enteros.

## 1. Verifica cuáles fueron los conteos la semana pasada

- Como este método _no_ depende del conteo de la semana actual, se define como un [método `static`][static-members].
- Hay [varias formas de definir un array][single-dimensional-arrays].

## 2. Verifica cuántas aves visitaron hoy

- Recuerda que los conteos están ordenados por día, del más antiguo al más reciente, y que el último elemento representa hoy.
- Se puede acceder al último elemento usando su índice (fijo), recuerda empezar a contar desde cero, o calculando su índice a partir del [tamaño del array][array-length].

## 3. Incrementa el conteo de hoy

- Asigna al elemento que representa el conteo de hoy el valor del conteo de hoy más 1.

## 4. Verifica si hubo un día sin aves visitantes

- La clase `Array` tiene un [método integrado][array-indexof] que devuelve el primer índice donde se encuentra el elemento, o -1 si no se encontró ningún elemento coincidente.

## 5. Calcula el número de aves visitantes para los primeros días

- Se puede usar una variable para guardar el conteo del número de aves visitantes.
- Se puede recorrer el array con un [bucle `for`][for-statement].
- La variable se puede actualizar dentro del bucle.
- Recuerda: los índices de los arrays empiezan en `0`.

## 6. Calcula la cantidad de días ocupados

- Se puede usar una variable para guardar la cantidad de días ocupados.
- Se puede recorrer el array con un [bucle `foreach`][array-foreach].
- La variable se puede actualizar dentro del bucle.
- Se puede usar una [sentencia condicional][if-statement] dentro del bucle.

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
