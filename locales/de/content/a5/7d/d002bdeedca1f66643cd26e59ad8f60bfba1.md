# Hinweise

## 1. Ermittle, ob du einen Führerschein brauchst

- Verwende den [Operator für strikte Gleichheit][mdn-equality-operators], um zu prüfen, ob deine Eingabe gleich einem bestimmten String ist.
- Kombiniere die beiden Anforderungen mit einem der beiden [logischen Operatoren][mdn-logical-operators], die du im Konzept zu booleschen Werten kennengelernt hast.
- Du brauchst **keine** if-Anweisung, um diese Aufgabe zu lösen. Du kannst den booleschen Ausdruck, den du baust, direkt zurückgeben.

## 2. Wähle zwischen zwei möglichen Fahrzeugen zum Kauf

- Verwende einen [Vergleichsoperator][mdn-relational-operators], um festzustellen, welche Option in der Wörterbuchreihenfolge zuerst kommt.
- Setze dann den Wert einer Hilfsvariable abhängig vom Ergebnis dieses Vergleichs, und zwar mit Hilfe einer [if-else-Anweisung][mdn-if-statement].
- Zum Schluss baust du den Empfehlungssatz. Dafür kannst du den [Additionsoperator][mdn-addition] verwenden, um die beiden Strings zu verketten.

## 3. Berechne eine Schätzung für den Preis eines gebrauchten Fahrzeugs

- Bestimme zuerst den Prozentsatz auf Basis des Alters des Fahrzeugs. Speichere ihn in einer Hilfsvariable. Verwende eine [if-else if-else-Anweisung][mdn-if-statement], wie in den Anweisungen erwähnt.
- Verwende in den beiden if-Bedingungen [Vergleichsoperatoren][mdn-relational-operators], um das Alter des Autos mit den Schwellenwerten zu vergleichen.
- Um das Ergebnis zu berechnen, wende den Prozentsatz auf den ursprünglichen Preis an. Zum Beispiel kannst du `30% of x` berechnen, indem du `30` durch `100` teilst und mit `x` multiplizierst.

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
