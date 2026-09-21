# Tippek

## 1. A jóváhagyás definiálása

- [Definiáld az algebrai adattípust][ADT] `Approval` néven, a szükséges lehetőségekhez tartozó konstruktorokkal.

## 2. A konyha definiálása

- [Definiáld az algebrai adattípust][ADT] `Cuisine` néven, a szükséges lehetőségekhez tartozó konstruktorokkal.

## 3. A filmműfajok definiálása

- [Definiáld az algebrai adattípust][ADT] `Genre` néven, a szükséges lehetőségekhez tartozó konstruktorokkal.

## 4. A tevékenység definiálása

- [Definiálj egy algebrai adattípust asszociált adatokkal][ADT-with-data], hogy magába foglalja a különböző tevékenységeket.

## 5. A tevékenység értékelése

- A tevékenység értékén alapuló logika végrehajtásának legjobb módja a [case-kifejezések][case-expression] használata.
- Ha mintaillesztést végzel egy algebrai adattípus valamelyik esetén, hozzáférsz annak asszociált adataihoz.
- Ha további feltételt szeretnél adni egy mintához, használhatsz egy [őrt][guards] a `case` kifejezésen belül.
- Ha az összes többi lehetséges értéket el szeretnéd kapni egyetlen esetben, használhatod a `_` wildcard-mintát.

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
