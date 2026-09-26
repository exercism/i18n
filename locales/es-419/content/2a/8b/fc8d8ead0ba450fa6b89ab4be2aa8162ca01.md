# Pistas

## General

- [Tutorial sobre fechas y horas de csharp.net][csharp.net-datetimes-working-with-datetimes-time]

## 1. Analizar la fecha de la cita

- La clase `DateTime` tiene varios métodos para [analizar][docs.microsoft.com_parsing-date] un `string` a un `DateTime`.

## 2. Verificar si una cita ya pasó

- Los objetos `DateTime` se pueden comparar usando los [operadores de comparación][docs.microsoft.com_datetime-operators] predeterminados.
- Hay una [propiedad][docs.microsoft.com_datetime-properties] para obtener la fecha y la hora actuales.

## 3. Verificar si la cita es por la tarde

- Puedes acceder a la parte de la hora de un objeto `DateTime` a través de una de sus [propiedades][docs.microsoft.com_datetime-properties].

## 4. Describir la hora y la fecha de la cita

- Las pruebas se ejecutan como si se ejecutaran en una máquina en Estados Unidos, lo que significa que al convertir un `DateTime` a un `string` se devolverán las fechas y las horas en el formato de EE. UU.
- Al convertir una instancia de `DateTime` a un `string`, puedes usar una [cadena de formato estándar][docs.microsoft.com_standard-date-and-time-format-strings] o una [cadena de formato personalizado][docs.microsoft.com_custom-date-and-time-format-strings].

## 5. Devolver la fecha del aniversario

- Usa uno de los diversos [constructores][constructors] de `DateTime` para crear una nueva instancia de `DateTime`.
- Puedes usar una de las [propiedades][docs.microsoft.com_datetime-properties] de la fecha y hora actuales para obtener el año actual.

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
