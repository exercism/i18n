# Introduzione

JavaScript ha un operatore `...` integrato che rende più facile lavorare con un numero indefinito di elementi. A seconda del contesto, viene chiamato _operatore rest_ oppure _operatore spread_.

## L'operatore rest

### Gli elementi rest

Quando `...` compare sul lato sinistro di un'assegnazione, quei tre punti sono noti come operatore `rest`. I tre punti insieme a un nome di variabile formano quello che si chiama elemento rest. Raccoglie zero o più valori e li memorizza in un unico array.

```javascript
const [a, b, ...everythingElse] = [0, 1, 1, 2, 3, 5, 8];
a;
// => 0
b;
// => 1
everythingElse;
// => [1, 2, 3, 5, 8]
```

Nota che in JavaScript, a differenza di altri linguaggi, un elemento `rest` non può avere una virgola finale. _Deve_ essere l'ultimo elemento in un'assegnazione con destrutturazione. L'esempio seguente genera un `SyntaxError`:

```javascript
const [...items, last] = [2, 4, 8, 16]
```

### Le proprietà rest

Come per gli array, l'operatore rest può essere usato anche per raccogliere una o più proprietà di un oggetto e memorizzarle in un unico oggetto.

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

## I parametri rest

Quando `...` compare nella definizione di una funzione accanto al suo ultimo argomento, quel parametro si chiama _parametro rest_. Permette alla funzione di accettare un numero indefinito di argomenti sotto forma di array.

```javascript
function concat(...strings) {
  return strings.join(' ');
}
concat('one');
// => 'one'
concat('one', 'two', 'three');
// => 'one two three'
```

## Lo spread

### Gli elementi spread

Quando `...` compare sul lato destro di un'assegnazione, è noto come operatore `spread`. Espande un array in un elenco di elementi. A differenza dell'elemento rest, può comparire in qualsiasi posizione in un'espressione letterale di array, e possono essercene più di uno.

```javascript
const oneToFive = [1, 2, 3, 4, 5];
const oneToTen = [...oneToFive, 6, 7, 8, 9, 10];
oneToTen;
// => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const woow = ['A', ...oneToFive, 'B', 'C', 'D', 'E', ...oneToFive, 42];
woow;
// =>  ["A", 1, 2, 3, 4, 5, "B", "C", "D", "E", 1, 2, 3, 4, 5, 42]
```

### Le proprietà spread

Come per gli array, l'operatore spread può essere usato anche per copiare le proprietà da un oggetto a un altro.

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
