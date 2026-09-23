# Instructions

Pour devenir magicienne, Elyse doit s'entraîner sur quelques bases.
Elle a une pile de cartes qu'elle souhaite manipuler.

Pour simplifier un peu les choses, elle n'utilise que les cartes de 1 à 10, ce qui permet de représenter sa pile de cartes par un tableau de nombres.
La position d'une carte donnée correspond à l'indice dans le tableau.
Autrement dit, la position 0 correspond à la première carte, la position 1 à la deuxième, et ainsi de suite.

~~~~exercism/note
Toutes les fonctions doivent modifier le tableau de cartes puis renvoyer le tableau modifié. C'est une façon courante de travailler, connue sous le nom de _Builder pattern_, qui permet d'enchaîner élégamment les fonctions les unes aux autres.
~~~~

## 1. Récupère une carte d'une pile

Pour piocher une carte, renvoie la carte à l'indice `position` de la pile donnée.

Implémente la fonction `getCard(at:from:)` qui prend deux arguments : `at`, qui est la position de la carte dans la pile, et `from`, qui est la pile de cartes.
La fonction doit renvoyer la carte à la position `index` de la pile donnée.

```swift
let index = 2
getCard(at: index, from: [1, 2, 4, 1])
// returns 4
```

## 2. Change une carte dans la pile

Fais un tour de passe-passe et échange la carte à l'indice `position` avec la carte de remplacement fournie.

Implémente la fonction `setCard(at:in:to)` qui prend trois arguments : `at`, qui est la position de la carte dans la pile, `in`, qui est la pile de cartes, et `to`, qui est la nouvelle carte destinée à remplacer la carte à la position `index`.
La fonction doit renvoyer une copie de la pile dans laquelle la carte à la position `index` est remplacée par la nouvelle carte.
Si `index` n'est pas un indice valide dans la pile, la pile d'origine doit être renvoyée, inchangée.

```swift
let index = 2
let newCard = 6
setCard(at: index, in: [1, 2, 4, 1], to: newCard)
// returns [1, 2, 6, 1]
```

## 3. Insère une carte au sommet de la pile

Fais apparaître une carte en insérant une nouvelle carte au sommet de la pile.

Implémente la fonction `insert(_:atTopOf:)` qui prend deux arguments : la nouvelle carte à insérer et la pile de cartes.
La fonction doit renvoyer une copie de la pile, avec la nouvelle carte fournie ajoutée au sommet de la pile.

```swift
let newCard = 8
insert(newCard, atTopOf: [5, 9, 7, 1])
// returns [5, 9, 7, 1, 8]
```

## 4. Retire une carte de la pile

Fais disparaître une carte en retirant de la pile la carte à la `position` donnée.

Implémente la fonction `removeCard(at:from:)` qui prend deux arguments : `at`, qui est la position de la carte dans la pile, et `from`, qui est la pile de cartes.
La fonction doit renvoyer une copie de la pile dans laquelle la carte à la position `index` a été retirée.
Si `index` n'est pas un indice valide dans la pile, la pile d'origine doit être renvoyée, inchangée.

```swift
let index = 2
removeCard(at: index, from: [3, 2, 6, 4, 8])
// returns [3, 2, 4, 8]
```

## 5. Insère une carte dans la pile

Fais apparaître une carte en insérant une nouvelle carte à la `position` donnée dans la pile.

Implémente la fonction `insert(_:at:from:)` qui prend trois arguments : la nouvelle carte à insérer, la position à laquelle la nouvelle carte doit être insérée, et la pile de cartes.
La fonction doit renvoyer une copie de la pile avec la nouvelle carte fournie ajoutée à la position donnée.
Si `index` n'est pas un indice valide dans la pile, la pile d'origine doit être renvoyée, inchangée.

```swift
let newCard = 8
insert(newCard, at: 2, from: [5, 9, 7, 1])
// returns [5, 9, 8, 7, 1]
```

## 6. Vérifie la taille de la pile

Vérifie si la taille de la pile est égale à `stackSize` ou non.

Implémente la fonction `checkSizeOfStack(_:_:)` qui prend deux arguments : `stack`, qui est la pile de cartes, et `stackSize`, qui est la taille de la pile.
La fonction doit renvoyer `true` si la taille de la pile est égale à `stackSize` et `false` sinon.

```swift
let stackSize = 4
checkSizeOfStack([3, 2, 6, 4, 8], stackSize)
// returns false
```
