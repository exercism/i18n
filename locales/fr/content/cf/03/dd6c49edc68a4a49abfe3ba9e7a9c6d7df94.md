# Introduction

Un `vector` en R est une collection de valeurs de même `mode` : `numeric`, `character`, etc. Si on lui donne des entrées de types mélangés, R les convertit silencieusement vers un type commun, généralement character, ce qui peut donner des résultats inattendus.

## Crée des vecteurs

Si tu as déjà toutes les valeurs, utilise `c()` (abréviation de « concatenate » ou « combine ») :

```R
x <- 10
v <- c(4, 7, x)
```

La fonction `c()` est très flexible, et les entrées peuvent inclure d'autres vecteurs et des plages de valeurs. `c()` accepte n'importe quel nombre d'entrées, de types variés, et les aplatit en un seul vecteur.

## Plages de valeurs

Pour une plage de valeurs consécutives (croissantes ou décroissantes), tu peux utiliser la notation `:` :

```R
v <- 1:5 # equivalent to c(1, 2, 3, 4, 5)
w <- 10:7 # c(10, 9, 8, 7)
```

## Accède aux éléments d'un vecteur

Comme dans beaucoup de langages, on peut utiliser l'indice entre crochets :

```R
> v <- 4:7
> v[2]
[1] 5
> v[2:4]
[1] 5 6 7
```

Mais attention : ***R utilise par défaut une indexation qui commence à 1***.

C'est courant pour les langages scientifiques (Fortran, Matlab, Julia), mais cela diffère de l'indexation à partir de zéro du langage C et de ses nombreux successeurs.

On peut utiliser des plages de valeurs, comme dans l'exemple ci-dessus, mais aussi dans la fonction `c()`, qui est très flexible :

```R
v <- c(4, 7, 10)
w <- c(2, v[2:3], 11) # c(2, 7, 10, 11)
```

Les `vectors` (comme la plupart des choses en R) peuvent être considérés comme mutables, avec une syntaxe tout aussi souple pour écrire dans un seul élément ou dans plusieurs :

```R
> v <- 1:10
> v[2] <- 42
> v[4:6] <- c(11, 12, 13)
> v
 [1]  1 42  3 11 12 13  7  8  9 10
```

## Indices négatifs

Les programmeurs habitués à d'autres langages pourraient penser que `v[-1]` permet d'accéder au dernier élément d'un vecteur.
Faux !

Les indices négatifs sont en fait un moyen de ***supprimer*** un élément, ce qui renvoie un vecteur plus court :

```R
> v <- c(2, 4, 6)
> v[-2]
[1] 2 6  # second element gone
```
