# Einführung

JavaScript hat einen eingebauten `...`-Operator, mit dem du einfacher mit einer unbestimmten Anzahl von Elementen arbeiten kannst. Je nach Kontext wird er entweder _Rest-Operator_ oder _Spread-Operator_ genannt.

## Rest-Operator

### Rest-Elemente

Wenn `...` auf der linken Seite einer Zuweisung steht, werden diese drei Punkte als `rest`-Operator bezeichnet. Die drei Punkte zusammen mit einem Variablennamen nennt man ein Rest-Element. Es sammelt null oder mehr Werte und speichert sie in einem einzigen Array.

```javascript
const [a, b, ...everythingElse] = [0, 1, 1, 2, 3, 5, 8];
a;
// => 0
b;
// => 1
everythingElse;
// => [1, 2, 3, 5, 8]
```

Beachte, dass in JavaScript, anders als in manchen anderen Sprachen, ein `rest`-Element kein abschließendes Komma haben darf. Es _muss_ das letzte Element in einer destrukturierenden Zuweisung sein. Das folgende Beispiel wirft einen `SyntaxError`:

```javascript
const [...items, last] = [2, 4, 8, 16]
```

### Rest-Eigenschaften

Ähnlich wie bei Arrays kann der Rest-Operator auch verwendet werden, um eine oder mehrere Eigenschaften eines Objekts zu sammeln und in einem einzigen Objekt zu speichern.

```javascript
const { street, ...address } = {
  street: 'Platz der Republik 1',
  postalCode: '11011',
  city: 'Berlin',
};
street;
// => 'Platz der Republik 1'
address;
// => {postalCode: '11011', city: 'Berlin'}
```

## Rest-Parameter

Wenn `...` in einer Funktionsdefinition neben dem letzten Argument steht, nennt man diesen Parameter einen _Rest-Parameter_. Er ermöglicht es der Funktion, eine unbestimmte Anzahl von Argumenten als Array zu akzeptieren.

```javascript
function concat(...strings) {
  return strings.join(' ');
}
concat('one');
// => 'one'
concat('one', 'two', 'three');
// => 'one two three'
```

## Spread

### Spread-Elemente

Wenn `...` auf der rechten Seite einer Zuweisung steht, wird es als `spread`-Operator bezeichnet. Er erweitert ein Array zu einer Liste von Elementen. Anders als das Rest-Element kann es überall in einem Array-Literal-Ausdruck stehen, und es können mehr als eines vorkommen.

```javascript
const oneToFive = [1, 2, 3, 4, 5];
const oneToTen = [...oneToFive, 6, 7, 8, 9, 10];
oneToTen;
// => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const woow = ['A', ...oneToFive, 'B', 'C', 'D', 'E', ...oneToFive, 42];
woow;
// =>  ["A", 1, 2, 3, 4, 5, "B", "C", "D", "E", 1, 2, 3, 4, 5, 42]
```

### Spread-Eigenschaften

Ähnlich wie bei Arrays kann der Spread-Operator auch verwendet werden, um Eigenschaften von einem Objekt in ein anderes zu kopieren.

```javascript
let address = {
  postalCode: '11011',
  city: 'Berlin',
};
address = { ...address, country: 'Germany' };
// => {
//   postalCode: '11011',
//   city: 'Berlin',
//   country: 'Germany',
// }
```
