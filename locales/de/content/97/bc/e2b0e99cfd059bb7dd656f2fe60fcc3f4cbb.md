# Hinweise

## 1. Definiere die Zustimmung

- [Definiere den algebraischen Datentyp][ADT] `Approval` mit Konstruktoren für die erforderlichen Optionen.

## 2. Definiere die Küche

- [Definiere den algebraischen Datentyp][ADT] `Cuisine` mit Konstruktoren für die erforderlichen Optionen.

## 3. Definiere die Filmgenres

- [Definiere den algebraischen Datentyp][ADT] `Genre` mit Konstruktoren für die erforderlichen Optionen.

## 4. Definiere die Aktivität

- [Definiere einen algebraischen Datentyp mit zugehörigen Daten][ADT-with-data], um die verschiedenen Aktivitäten zu kapseln.

## 5. Bewerte die Aktivität

- Der beste Weg, Logik basierend auf dem Wert der Aktivität auszuführen, ist die Verwendung von [Case-Ausdrücken][case-expression].
- Pattern Matching auf einen Fall eines algebraischen Datentyps ermöglicht den Zugriff auf dessen zugehörige Daten.
- Um einem Muster eine zusätzliche Bedingung hinzuzufügen, kannst du einen [Guard][guards] in einem Case-Ausdruck verwenden.
- Wenn du alle anderen möglichen Werte in einem Fall abfangen möchtest, kannst du das Wildcard-Muster `_` verwenden.

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
