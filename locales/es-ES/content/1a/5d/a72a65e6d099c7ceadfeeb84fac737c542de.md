# Pistas

## General

- El recuento de pájaros por día se almacena en un [campo][fields] llamado `birdsPerDay`.
- El recuento de pájaros por día es un array que contiene exactamente 7 números enteros.

## 1. Comprueba cuáles fueron los recuentos la semana pasada

- Como este método _no_ depende del recuento de la semana actual, se define como un [método `static`][static-members].
- Hay [varias formas de definir un array][single-dimensional-arrays].

## 2. Comprueba cuántos pájaros han visitado hoy

- Recuerda que los recuentos están ordenados por día, del más antiguo al más reciente, y el último elemento representa el día de hoy.
- Se puede acceder al último elemento utilizando su índice (fijo) (recuerda empezar a contar desde cero) o calculando su índice usando el [tamaño del array][array-length].

## 3. Incrementa el recuento de hoy

- Establece el elemento que representa el recuento de hoy al recuento de hoy más 1.

## 4. Comprueba si hubo un día sin pájaros visitantes

- La clase `Array` tiene un [método integrado][array-indexof] que devuelve el primer índice donde se encuentra el elemento, o -1 si no se encontró ningún elemento coincidente.

## 5. Calcula el número de pájaros visitantes durante los primeros días

- Se puede usar una variable para almacenar el recuento del número de pájaros visitantes.
- Se puede iterar sobre el array usando un [bucle `for`][for-statement].
- La variable se puede actualizar dentro del bucle.
- Recuerda: los arrays se indexan desde `0`.

## 6. Calcula el número de días ocupados

- Se puede usar una variable para almacenar el número de días ocupados.
- Se puede iterar sobre el array usando un [bucle `foreach`][array-foreach].
- La variable se puede actualizar dentro del bucle.
- Se puede usar un [condicional][if-statement] dentro del bucle.

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
