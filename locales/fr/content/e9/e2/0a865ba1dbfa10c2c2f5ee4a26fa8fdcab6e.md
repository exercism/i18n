# Introduction

## Les opérateurs arithmétiques

JavaScript propose 6 opérateurs différents pour effectuer les opérations arithmétiques de base sur les nombres.

- `+` : l'opérateur d'addition permet de calculer la somme de deux nombres.
- `-` : l'opérateur de soustraction permet de calculer la différence entre deux nombres.
- `*` : l'opérateur de multiplication permet de calculer le produit de deux nombres.
- `/` : l'opérateur de division permet de diviser deux nombres.

```javascript
2 - 1.5; //=> 0.5
19 / 2; //=> 9.5
```

- `%` : l'opérateur modulo permet de trouver le reste d'une division.

  ```javascript
  40 % 4; // => 0
  -11 % 4; // => -3
  ```

- `**` : l'opérateur d'exponentiation permet d'élever un nombre à une puissance.

  ```javascript
  4 ** 3; // => 64
  4 ** 1 / 2; // => 2
  ```

## L'ordre des opérations

Lorsque l'on utilise plusieurs opérateurs sur une même ligne, JavaScript suit un ordre de priorité, comme le montre [ce tableau des priorités][mdn-operator-precedence].
Pour faire simple, dans notre contexte, JavaScript applique la règle PEDMAS (Parenthèses, Exposants, Division/Multiplication, Addition/Soustraction) que l'on apprend en cours de mathématiques à l'école primaire.

<!-- prettier-ignore-start -->
```javascript
const result = 3 ** 3 + 9 * 4 / (3 - 1);
// => 3 ** 3 + 9 * 4/2
// => 27 + 9 * 4/2
// => 27 + 18
// => 45
```
<!-- prettier-ignore-end -->

## Les opérateurs d'affectation raccourcis

Les opérateurs d'affectation raccourcis permettent d'écrire plus brièvement du code qui effectue une opération arithmétique sur une variable et qui affecte la nouvelle valeur à cette même variable.
Par exemple, prenons deux variables `x` et `y`.
Alors, `x += y` équivaut à `x = x + y`.
Souvent, on utilise un nombre à la place de la variable `y`.
Les 5 autres opérations peuvent aussi s'écrire de la même façon.

```javascript
let x = 5;
x += 25; // x is now 30

let y = 31;
y %= 3; // y is now 1
```

[mdn-operator-precedence]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table
