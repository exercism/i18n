# Introduction

En Go, les _slices_ sont similaires aux listes ou aux tableaux d'autres langages.
Ils contiennent plusieurs éléments d'un type donné (ou d'une interface).

Les _slices_ en Go reposent sur les tableaux.
Les tableaux ont une taille fixe.
Un _slice_, quant à lui, est une vue flexible et de taille dynamique sur les éléments d'un tableau.

Un _slice_ s'écrit `[]T`, où `T` est le type des éléments du _slice_ :

```go
var empty []int                 // an empty slice
withData := []int{0,1,2,3,4,5}  // a slice pre-filled with some data
```

On peut lire ou modifier un élément à un indice donné (compté à partir de zéro) grâce à la notation entre crochets :

```go
withData[1] = 5
x := withData[1] // x is now 5
```

On peut créer un nouveau _slice_ à partir d'un _slice_ existant en récupérant une plage d'éléments.
Là encore, on utilise la notation entre crochets, mais en précisant à la fois un indice de début (inclus) et un indice de fin (exclu).
Si on ne précise pas l'indice de début, il vaut 0 par défaut.
Si on ne précise pas l'indice de fin, il vaut par défaut la longueur du _slice_.

```go
newSlice := withData[2:4]
// => []int{2,3}
newSlice := withData[:2]
// => []int{0,1}
newSlice := withData[2:]
// => []int{2,3,4,5}
newSlice := withData[:]
// => []int{0,1,2,3,4,5}
```

On peut ajouter des éléments à un _slice_ grâce à la fonction `append`.
Ci-dessous, on ajoute `4` et `2` au _slice_ `a`.

```go
a := []int{1, 3}
a = append(a, 4, 2)
// => []int{1,3,4,2}
```

`append` renvoie toujours un nouveau _slice_, et lorsqu'on veut simplement ajouter des éléments à un _slice_ existant, il est courant de réaffecter le résultat à la variable de _slice_ passée en premier argument, comme on vient de le faire ci-dessus.

On peut aussi utiliser `append` pour fusionner deux _slices_ :

```go
nextSlice := []int{100,101,102}
newSlice  := append(withData, nextSlice...)
// => []int{0,1,2,3,4,5,100,101,102}
```

## Les indices dans les slices

Quand on manipule les indices d'un _slice_, il faut toujours se protéger d'une manière ou d'une autre par une vérification qui garantit que l'indice existe bel et bien.
Sans cela, c'est toute l'application qui plante.

## Les slices vides

Les _slices_ `nil` sont le _slice_ vide par défaut.
Ils n'ont aucun inconvénient par rapport à un _slice_ qui ne contient aucune valeur.
La fonction `len` fonctionne sur les _slices_ `nil`, on peut y ajouter des éléments sans l'initialiser, et ainsi de suite.
Si tu dois créer un nouveau _slice_, préfère `var s []int` (_slice_ `nil`) à `s := []int{}` (_slice_ vide, non `nil`).

## Performances

Lorsqu'on crée des _slices_ que l'on va remplir de façon itérative, il existe un gain facile à saisir pour améliorer les performances, à condition de connaître la taille finale du _slice_.
L'astuce consiste à minimiser le nombre de fois où de la mémoire doit être allouée, ce qui est plutôt coûteux et se produit quand le _slice_ dépasse l'espace mémoire qui lui a été alloué.
La façon la plus sûre de faire est de préciser une capacité `cap` pour le _slice_ avec `s := make([]int, 0, cap)`, puis d'utiliser `append` sur le _slice_ comme d'habitude.
Ainsi, l'espace pour `cap` éléments est alloué immédiatement, alors que la longueur du _slice_ est nulle.
En pratique, `cap` est souvent la longueur d'un autre _slice_ : `s := make([]int, 0, len(otherSlice))`.

## `append` n'est pas une fonction pure

La fonction `append` de Go est optimisée pour les performances et ne fait donc pas de copie du _slice_ en entrée.
Cela signifie que le _slice_ d'origine (le premier paramètre de `append`) sera parfois modifié.
