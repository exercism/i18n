# Pistas

## General

- [Tutorial sobre fechas y horas de csharp.net][csharp.net-datetimes-working-with-datetimes-time]

## 1. Analizar la fecha de la cita

- La clase `DateTime` tiene varios métodos para [analizar][docs.microsoft.com_parsing-date] un `string` y convertirlo en un `DateTime`.

## 2. Comprobar si una cita ya ha pasado

- Los objetos `DateTime` se pueden comparar con los [operadores de comparación][docs.microsoft.com_datetime-operators] predeterminados.
- Hay una [propiedad][docs.microsoft.com_datetime-properties] para obtener la fecha y la hora actuales.

## 3. Comprobar si la cita es por la tarde

- Se puede acceder a la parte de la hora de un objeto `DateTime` a través de una de sus [propiedades][docs.microsoft.com_datetime-properties].

## 4. Describir la hora y la fecha de la cita

- Los tests se ejecutan como si lo hicieran en una máquina de Estados Unidos, lo que significa que al convertir un `DateTime` en un `string` se devolverán fechas y horas en formato estadounidense.
- Al convertir una instancia de `DateTime` en un `string`, puedes usar una [cadena de formato estándar][docs.microsoft.com_standard-date-and-time-format-strings] o una [cadena de formato personalizada][docs.microsoft.com_custom-date-and-time-format-strings].

## 5. Devolver la fecha del aniversario

- Usa uno de los distintos [constructores][constructors] de `DateTime` para crear una nueva instancia de `DateTime`.
- Puedes usar una de las [propiedades][docs.microsoft.com_datetime-properties] de la fecha y hora actuales para obtener el año actual.

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
