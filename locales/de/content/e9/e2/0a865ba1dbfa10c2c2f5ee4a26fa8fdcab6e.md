# Einführung

## Arithmetische Operatoren

JavaScript bietet 6 verschiedene Operatoren, um grundlegende Rechenoperationen mit Zahlen durchzuführen.

- `+`: Mit dem Additionsoperator berechnest du die Summe von Zahlen.
- `-`: Mit dem Subtraktionsoperator berechnest du die Differenz zwischen zwei Zahlen.
- `*`: Mit dem Multiplikationsoperator berechnest du das Produkt zweier Zahlen.
- `/`: Mit dem Divisionsoperator dividierst du zwei Zahlen.

```javascript
2 - 1.5; //=> 0.5
19 / 2; //=> 9.5
```

- `%`: Mit dem Restoperator ermittelst du den Rest einer Division.

  ```javascript
  40 % 4; // => 0
  -11 % 4; // => -3
  ```

- `**`: Mit dem Potenzoperator potenzierst du eine Zahl.

  ```javascript
  4 ** 3; // => 64
  4 ** 1 / 2; // => 2
  ```

## Reihenfolge der Operationen

Wenn du mehrere Operatoren in einer Zeile verwendest, folgt JavaScript einer Rangfolge, wie sie in [dieser Rangfolgetabelle][mdn-operator-precedence] dargestellt ist.
Vereinfacht gesagt verwendet JavaScript die PEDMAS-Regel (Klammern, Exponenten, Division/Multiplikation, Addition/Subtraktion), die wir aus dem Matheunterricht kennen.

<!-- prettier-ignore-start -->
```javascript
const result = 3 ** 3 + 9 * 4 / (3 - 1);
// => 3 ** 3 + 9 * 4/2
// => 27 + 9 * 4/2
// => 27 + 18
// => 45
```
<!-- prettier-ignore-end -->

## Zuweisungsoperatoren in Kurzform

Zuweisungsoperatoren in Kurzform sind eine kürzere Art, Code zu schreiben, der eine Rechenoperation auf eine Variable anwendet und den neuen Wert derselben Variable zuweist.
Betrachte zum Beispiel zwei Variablen `x` und `y`.
Dann ist `x += y` dasselbe wie `x = x + y`.
Oft wird das mit einer Zahl statt mit der Variablen `y` verwendet.
Die 5 anderen Operationen lassen sich auf ähnliche Weise durchführen.

```javascript
let x = 5;
x += 25; // x is now 30

let y = 31;
y %= 3; // y is now 1
```

[mdn-operator-precedence]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table
