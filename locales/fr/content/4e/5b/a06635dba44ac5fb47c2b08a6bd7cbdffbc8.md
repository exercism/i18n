# Introduction

Quand on travaille avec des tableaux, on veut parfois exécuter du code pour chaque valeur du tableau. C'est ce qu'on appelle itérer sur le tableau, ou le parcourir.

Ici, on va s'intéresser au cas où tu ne veux pas modifier le tableau au passage. Pour transformer des tableaux, consulte plutôt le concept [Transformations de tableaux][concept-array-transformations].

## La boucle `for`

La façon la plus simple d'itérer sur un tableau est d'utiliser une boucle `for` ; voir le concept [Boucles `for`][concept-for-loops].

```javascript
const numbers = [6.0221515, 10, 23];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
// => 6.0221515
// => 10
// => 23
```

## La boucle `for...of`

Quand tu veux travailler directement avec la valeur à chaque itération et que tu n'as pas besoin de l'indice du tout, tu peux utiliser une boucle `for...of`.

`for...of` fonctionne comme la boucle `for` de base montrée plus haut, mais au lieu de devoir gérer l'_indice_ comme variable de la boucle, c'est la _valeur_ qui t'est fournie directement.

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

Tout comme dans les boucles `for` classiques, tu peux utiliser `continue` pour arrêter l'itération en cours et `break` pour arrêter complètement l'exécution de la boucle.

## La méthode `forEach`

Chaque tableau possède une méthode `forEach` qui permet de parcourir ses éléments.

`forEach` prend une [fonction de rappel][concept-callbacks] en paramètre.
La fonction de rappel est appelée une fois pour chaque élément du tableau.
L'élément courant, son indice et le tableau complet sont passés à la fonction de rappel en arguments.
Souvent, seuls l'élément courant ou l'indice sont utilisés.

```javascript
const numbers = [6.0221515, 10, 23];

numbers.forEach((number, index) => console.log(number, index));
// => 6.0221515 0
// => 10 1
// => 23 2
```

Il n'y a aucun moyen d'arrêter l'itération une fois que la boucle `forEach` a commencé.
Les instructions `break` et `continue` n'existent pas dans ce contexte.

[concept-array-transformations]: /tracks/javascript/concepts/array-transformations
[concept-for-loops]: /tracks/javascript/concepts/for-loops
[concept-callbacks]: /tracks/javascript/concepts/callbacks
