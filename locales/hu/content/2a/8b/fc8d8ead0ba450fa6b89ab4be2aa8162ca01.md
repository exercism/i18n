# Tippek

## Általános

- [Oktatóanyag a dátumokról és időkről a csharp.net oldalán][csharp.net-datetimes-working-with-datetimes-time]

## 1. Az időpont dátumának értelmezése

- A `DateTime` osztálynak több metódusa is van, amelyekkel egy `string`-et `DateTime`-má [értelmezhetsz][docs.microsoft.com_parsing-date].

## 2. Annak ellenőrzése, hogy az időpont már elmúlt-e

- A `DateTime` objektumok összehasonlíthatók az alapértelmezett [összehasonlító operátorokkal][docs.microsoft.com_datetime-operators].
- Létezik egy [tulajdonság][docs.microsoft.com_datetime-properties], amellyel lekérheted az aktuális dátumot és időt.

## 3. Annak ellenőrzése, hogy az időpont délutánra esik-e

- A `DateTime` objektum időrészét annak egyik [tulajdonságán][docs.microsoft.com_datetime-properties] keresztül érheted el.

## 4. Az időpont idejének és dátumának leírása

- A tesztek úgy futnak, mintha egy Egyesült Államokban lévő gépen futnának, ami azt jelenti, hogy amikor egy `DateTime`-ot `string`-gé alakítasz, a dátumot és az időt amerikai formátumban kapod vissza.
- Amikor egy `DateTime` példányt `string`-gé alakítasz, használhatsz [szabványos formátumú stringet][docs.microsoft.com_standard-date-and-time-format-strings] vagy [egyéni formátumú stringet][docs.microsoft.com_custom-date-and-time-format-strings] is.

## 5. Az évforduló dátumának visszaadása

- Új `DateTime` példány létrehozásához használd a `DateTime` egyik [konstruktorát][constructors].
- Az aktuális dátum és idő egyik [tulajdonságával][docs.microsoft.com_datetime-properties] lekérheted az aktuális évet.

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
