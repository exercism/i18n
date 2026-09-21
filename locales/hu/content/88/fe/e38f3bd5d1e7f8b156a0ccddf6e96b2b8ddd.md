# Tippek

## Általános

## 1. Vásárolj egy vadonatúj távirányítós autót

- [Ezen az oldalon megtudhatod, hogyan hozhatsz létre egy új példányt egy osztályból][creating-objects].

## 2. Jelenítsd meg a megtett távolságot

- A megtett távolságot egy [mezőben][fields] tartsd nyilván.
- Gondold meg, milyen láthatóságot használj a mezőhöz (kell-e az osztályon kívülről is használni?).
- A visszaadandó string formázásához érdemes lehet [string-interpolációt][string-interpolation] használni.

## 3. Jelenítsd meg az akkumulátor töltöttségét

- Az akkumulátor kezdeti töltöttségét egy [mezőben][fields] tartsd nyilván.
- A mezőt egy konkrét értékre állítsd be, amely megfelel a várt kezdeti akkumulátortöltöttségnek.
- Gondold meg, milyen láthatóságot használj a mezőhöz (kell-e az osztályon kívülről is használni?).
- A visszaadandó string formázásához érdemes lehet [string-interpolációt][string-interpolation] használni.

## 4. Vezetéskor frissítsd a megtett méterek számát

- Frissítsd a megtett távolságot tároló mezőt.

## 5. Vezetéskor frissítsd az akkumulátor töltöttségét

- Frissítsd az akkumulátor töltöttségét tároló mezőt.

## 6. Akadályozd meg a vezetést, ha lemerült az akkumulátor

- Adj hozzá egy elágazást, hogy a távolságot és az akkumulátort csak akkor frissítse, ha az akkumulátor még nem merült le.
- Adj hozzá egy elágazást, amely megjeleníti a lemerült akkumulátorról szóló üzenetet, ha az akkumulátor lemerült.

[creating-objects]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/classes#creating-objects
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[string-interpolation]: https://christianfindlay.com/2019/10/04/c-string-interpolation/
