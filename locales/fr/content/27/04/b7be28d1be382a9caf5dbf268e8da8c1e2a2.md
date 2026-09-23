# Introduction

Il existe essentiellement deux types de boucles :

1. Boucler jusqu'à ce qu'une condition soit satisfaite.
2. Parcourir les éléments d'une collection.

Les deux sont possibles en Julia, même si la seconde est sans doute la plus courante.

## La boucle `while`

Pour les problèmes ouverts, dont on ne connaît pas à l'avance le nombre de tours de boucle, Julia propose la boucle `while`.

La forme de base est assez simple :

```julia
while condition
    do_something()
end
```

Dans ce cas, le programme continue de tourner en boucle jusqu'à ce que `condition` ne soit plus `true`.

Il existe deux façons de quitter la boucle par anticipation :

- Un `break` fait sortir de la boucle, et l'exécution reprend à la ligne qui suit le `end` de la boucle.
- Un `return x` arrête l'exécution de la fonction en cours et renvoie la valeur de retour `x` à l'appelant.

Avec ces options, il peut parfois être pratique de créer une boucle « infinie » avec `while true ... end`, puis de chercher une condition d'arrêt à l'intérieur du corps de la boucle pour déclencher un `break` ou un `return`.

## Parcours une collection

L'illustration la plus simple consiste à parcourir un intervalle.

Si on veut faire quelque chose 10 fois :

```julia
for n in 1:10
    do_something(n)
end
```

Si l'itération en cours ne satisfait pas une condition, il est possible de passer immédiatement à l'itération suivante avec un `continue` :

```julia
for n in 1:10
    if is_useless(n)
        continue
    end
    
    # we decided this iteration could be useful
    do_something_slow(n)
end
```

Dans une forme plus courte, le bloc `if` pourrait être remplacé par `is_useless(n) && continue`.

On peut également parcourir de nombreux autres types de collections : les éléments d'un tableau, les caractères d'une _string_, les clés d'un dictionnaire…

Les exemples ci-dessus parcourent l'intervalle `1:10`, où la valeur est aussi l'indice de la boucle.

Plus généralement, on peut avoir besoin de l'indice et pas seulement de la valeur.
Pour cela, on utilise la fonction `eachindex()`, par exemple `for i in eachindex(my_array) ... end`.

## Compréhensions de listes

En Julia, écrire des boucles explicites est généralement moins courant que dans beaucoup de langages traditionnels, car il existe diverses options plus concises.

Une situation particulièrement courante est celle où l'on doit construire un nouveau vecteur à partir des éléments d'une autre collection (vecteur, _string_, ensemble… il y a de nombreuses possibilités).

Ceux qui aiment les compréhensions de listes en Python seront ravis d'apprendre que Julia utilise une syntaxe similaire.

L'essentiel consiste à écrire une boucle très compacte à l'intérieur d'un vecteur.

La syntaxe la plus simple est de la forme `result = [f(x) for x in some_collection]`.

Avec une boucle traditionnelle, on écrirait plutôt :

```julia
result = []
for x in some_collection
    push!(result, f(x))
end
```

On peut éventuellement ajouter une condition à la fin, pour ne sélectionner que les éléments correspondants de la collection :

```julia-repl
# multiples of 3
julia> [n^2 for n in 1:10 if n%3 == 0]
3-element Vector{Int64}:
  9
 36
 81
```
