# Hinweise

## Allgemein

- [Tutorial zu Datum und Uhrzeit von csharp.net][csharp.net-datetimes-working-with-datetimes-time]

## 1. Das Datum des Termins parsen

- Die Klasse `DateTime` hat mehrere Methoden, um einen `string` in ein `DateTime` zu [parsen][docs.microsoft.com_parsing-date].

## 2. Prüfen, ob ein Termin bereits vorbei ist

- `DateTime`-Objekte können mit den Standard-[Vergleichsoperatoren][docs.microsoft.com_datetime-operators] verglichen werden.
- Es gibt eine [Eigenschaft][docs.microsoft.com_datetime-properties], um das aktuelle Datum und die aktuelle Uhrzeit abzurufen.

## 3. Prüfen, ob der Termin am Nachmittag liegt

- Auf den Uhrzeitanteil eines `DateTime`-Objekts kannst du über eine seiner [Eigenschaften][docs.microsoft.com_datetime-properties] zugreifen.

## 4. Uhrzeit und Datum des Termins beschreiben

- Die Tests laufen so, als würden sie auf einem Rechner in den Vereinigten Staaten laufen. Das bedeutet, dass die Umwandlung eines `DateTime` in einen `string` Datum und Uhrzeit im US-Format zurückgibt.
- Wenn du eine `DateTime`-Instanz in einen `string` umwandelst, kannst du entweder eine [Standardformatzeichenfolge][docs.microsoft.com_standard-date-and-time-format-strings] oder eine [benutzerdefinierte Formatzeichenfolge][docs.microsoft.com_custom-date-and-time-format-strings] verwenden.

## 5. Das Datum des Jahrestags zurückgeben

- Verwende einen der verschiedenen `DateTime`-[Konstruktoren][constructors], um eine neue `DateTime`-Instanz zu erstellen.
- Du kannst eine der [Eigenschaften][docs.microsoft.com_datetime-properties] des aktuellen `DateTime`-Objekts verwenden, um das aktuelle Jahr zu erhalten.

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
