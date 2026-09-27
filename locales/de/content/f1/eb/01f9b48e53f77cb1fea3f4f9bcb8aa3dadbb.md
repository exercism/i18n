# Hinweise

## Allgemein

- Versuche, ein Problem in einen Basisfall und einen rekursiven Fall aufzuteilen. Angenommen, du willst mit einem rekursiven Ansatz zählen, wie viele Kekse in der Keksdose sind. Ein Basisfall ist eine leere Dose: Sie enthält null Kekse. Ist die Dose nicht leer, dann ist die Anzahl der Kekse in der Dose gleich einem Keks plus der Anzahl der Kekse in der Dose, nachdem du einen Keks entfernt hast.

## 1. Definiere die Pizzatypen und Optionen

- Der Typ `Pizza` ist ein rekursiver Typ, bei dem die Fälle `ExtraSauce` und `ExtraToppings` eine `Pizza` enthalten.

## 2. Berechne den Preis der Pizza

- Da der Typ `Pizza` ein rekursiver Typ ist, definiere eine rekursive Funktion.

## 3. Berechne den Preis einer Bestellung

- Du kannst die genaue Länge der Liste per Pattern Matching prüfen, um festzustellen, ob die zusätzliche Gebühr anfällt.
- Nutze Endrekursion, um beim Berechnen des Preises einer Bestellung nicht zu viel Speicher zu verbrauchen.
