# Einführung

Wenn du mit Arrays arbeitest, möchtest du manchmal Code für jeden Wert im Array ausführen.
Das nennt man Iteration oder das Durchlaufen des Arrays in einer Schleife.

Hier sehen wir uns den Fall an, in dem du das Array dabei nicht verändern möchtest.
Wie du Arrays transformierst, erfährst du stattdessen unter [Konzept Array-Transformationen][concept-array-transformations].

## Die `for`-Schleife

Die einfachste Möglichkeit, über ein Array zu iterieren, ist eine `for`-Schleife, siehe [Konzept for-Schleifen][concept-for-loops].

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## Die `for...of`-Schleife

Wenn du in jeder Iteration direkt mit dem Wert arbeiten möchtest und den Index überhaupt nicht brauchst, kannst du eine `for...of`-Schleife verwenden.

`for...of` funktioniert wie die oben gezeigte einfache `for`-Schleife, aber statt dich mit dem _Index_ als Variable in der Schleife befassen zu müssen, wird dir der _Wert_ direkt bereitgestellt.

```javascript
const numbers = [6.0221515, 10, 23];

// Because re-assigning number inside the loop will be very
// confusing, disallowing that via const is preferable.
for (const number of numbers) {
  console.log(number);
}
// => 6.0221515
// => 10
// => 23
```

Genau wie bei normalen `for`-Schleifen kannst du `continue` verwenden, um die aktuelle Iteration zu beenden, und `break`, um die Ausführung der Schleife vollständig zu stoppen.

## Die `forEach`-Methode

Jedes Array enthält eine `forEach`-Methode, mit der du über die Elemente im Array iterieren kannst.

`forEach` akzeptiert einen [Callback][concept-callbacks] als Parameter.
Die Callback-Funktion wird einmal für jedes Element im Array aufgerufen.
Das aktuelle Element, sein Index und das vollständige Array werden dem Callback als Argumente übergeben.
Oft wird nur das aktuelle Element oder der Index verwendet.

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

Es gibt keine Möglichkeit, die Iteration zu stoppen, sobald die `forEach`-Schleife gestartet wurde.
Die Anweisungen `break` und `continue` gibt es in diesem Zusammenhang nicht.

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
