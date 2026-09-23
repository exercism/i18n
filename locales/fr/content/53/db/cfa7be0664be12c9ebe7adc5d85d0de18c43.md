# Introduction

JavaScript dispose d'un opérateur `...` intégré qui facilite le travail avec un nombre indéfini d'éléments. Selon le contexte, on l'appelle soit _rest operator_, soit _spread operator_.

## L'opérateur _rest_

### Les éléments _rest_

Quand `...` apparaît du côté gauche d'une affectation, ces trois points sont appelés l'opérateur `rest`. Les trois points accompagnés d'un nom de variable forment ce qu'on appelle un élément _rest_. Il collecte zéro ou plusieurs valeurs et les stocke dans un seul tableau.

```javascript
const [a, b, ...everythingElse] = [0, 1, 1, 2, 3, 5, 8];
a;
// => 0
b;
// => 1
everythingElse;
// => [1, 2, 3, 5, 8]
```

À noter qu'en JavaScript, contrairement à certains autres langages, un élément `rest` ne peut pas être suivi d'une virgule finale. Il _doit_ être le dernier élément d'une affectation par déstructuration. L'exemple ci-dessous lève une `SyntaxError` :

```javascript
const [...items, last] = [2, 4, 8, 16]
```

### Les propriétés _rest_

Comme pour les tableaux, l'opérateur _rest_ peut aussi servir à collecter une ou plusieurs propriétés d'un objet et à les stocker dans un seul objet.

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

## Les paramètres _rest_

Quand `...` apparaît dans la définition d'une fonction, à côté de son dernier argument, ce paramètre est appelé _rest parameter_. Il permet à la fonction d'accepter un nombre indéfini d'arguments sous forme de tableau.

```javascript
function concat(...strings) {
  return strings.join(' ');
}
concat('one');
// => 'one'
concat('one', 'two', 'three');
// => 'one two three'
```

## _Spread_

### Les éléments _spread_

Quand `...` apparaît du côté droit d'une affectation, on l'appelle l'opérateur `spread`. Il déploie un tableau en une liste d'éléments. Contrairement à l'élément _rest_, il peut apparaître n'importe où dans une expression littérale de tableau, et il peut y en avoir plusieurs.

```javascript
const oneToFive = [1, 2, 3, 4, 5];
const oneToTen = [...oneToFive, 6, 7, 8, 9, 10];
oneToTen;
// => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const woow = ['A', ...oneToFive, 'B', 'C', 'D', 'E', ...oneToFive, 42];
woow;
// =>  ["A", 1, 2, 3, 4, 5, "B", "C", "D", "E", 1, 2, 3, 4, 5, 42]
```

### Les propriétés _spread_

Comme pour les tableaux, l'opérateur _spread_ peut aussi servir à copier les propriétés d'un objet vers un autre.

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
