# Tippek

## Általános

- A napi madárszámot a `birdsPerDay` nevű [mező][fields] tárolja.
- A napi madárszám egy olyan tömb, amely pontosan 7 egész számot tartalmaz.

## 1. Ellenőrizd, mennyi volt a szám a múlt héten

- Mivel ez a metódus _nem_ függ az aktuális hét számától, [`static` metódusként][static-members] van definiálva.
- [Többféleképpen is definiálhatsz egy tömböt][single-dimensional-arrays].

## 2. Ellenőrizd, hány madár járt ma itt

- Ne feledd, hogy a számok a legrégebbitől a legutóbbiig, napok szerint követik egymást, és az utolsó elem a mai napot jelöli.
- Az utolsó elemhez kétféleképpen is hozzáférhetsz: használhatod a (rögzített) indexét (ne feledd, a számolás nullától indul), vagy kiszámolhatod az indexét a [tömb mérete][array-length] alapján.

## 3. Növeld a mai naphoz tartozó számot

- A mai napot jelképező elem értékét állítsd a mai nap számának értéke plusz 1-re.

## 4. Ellenőrizd, volt-e olyan nap, amikor egyetlen madár sem járt itt

- Az `Array` osztálynak van egy [beépített metódusa][array-indexof], amely annak az első indexét adja vissza, ahol az elem megtalálható, illetve -1-et, ha nincs egyező elem.

## 5. Számold ki a látogató madarak számát az első megadott számú napra

- A látogató madarak számát egy változóban tárolhatod.
- A tömbön egy [`for` ciklussal][for-statement] iterálhatsz.
- A változót a cikluson belül frissítheted.
- Ne feledd: a tömbök indexelése `0`-tól indul.

## 6. Számold ki a forgalmas napok számát

- A forgalmas napok számát egy változóban tárolhatod.
- A tömbön egy [`foreach` ciklussal][array-foreach] iterálhatsz.
- A változót a cikluson belül frissítheted.
- A cikluson belül [feltételes elágazást][if-statement] is használhatsz.

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
