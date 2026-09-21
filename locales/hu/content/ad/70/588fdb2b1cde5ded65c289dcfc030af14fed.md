# Tippek

## Általános

## 1. Vásárolj egy vadonatúj távirányítós autót

- [Ez az oldal megmutatja, hogyan hozz létre egy osztály új példányát][creating-objects].

## 2. Jelenítsd meg a megtett távolságot

- A megtett távolságot egy [mezőben][fields] kövesd nyomon.
- Gondold át, milyen láthatóságot használj a mezőhöz (kell-e az osztályon kívülről is használni?).

## 3. Jelenítsd meg az akkumulátor töltöttségi szintjét

- A megtett távolságot egy [mezőben][fields] kövesd nyomon.
- A mezőt állítsd be a kezdeti akkumulátortöltésnek megfelelő értékre.
- Gondold át, milyen láthatóságot használj a mezőhöz (kell-e az osztályon kívülről is használni?).

## 4. Frissítsd a megtett méterek számát vezetés közben

- Frissítsd a megtett távolságot tároló mezőt.

## 5. Frissítsd az akkumulátor töltöttségi szintjét vezetés közben

- Frissítsd az akkumulátor töltöttségi szintjét tároló mezőt.

## 6. Akadályozd meg a vezetést, ha az akkumulátor lemerült

- Adj hozzá egy feltételt, hogy a távolságot és az akkumulátort csak akkor frissítsd, ha az akkumulátor még nem merült le.
- Adj hozzá egy feltételt, hogy megjelenjen a lemerült akkumulátor üzenete, ha az akkumulátor lemerült.

[creating-objects]: https://docs.oracle.com/javase/tutorial/java/javaOO/objectcreation.html
[fields]: https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html
