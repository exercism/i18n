# Introduction

« Statistics » est un sujet vaste et complexe, aux multiples facettes.

Certains de ses aspects ont été effleurés dans le concept [`Randomness`][randomness], un sujet distinct mais étroitement lié.

Dans sa forme la plus simple, la statistique consiste à résumer une collection itérable de données en une seule valeur.
Les débutants en Julia peuvent être surpris du peu de fonctions intégrées par défaut au langage :

- [`sum`][sum], pour additionner des nombres.
- [`min`][min] et [`max`][max], pour obtenir les valeurs extrêmes des paramètres donnés.
- [`extrema`][extrema], pour obtenir le tuple (min, max) d'un itérable.
- [`length`][length], pour compter toutes les valeurs.
- [`count`][count], pour ne compter que les valeurs qui remplissent un certain critère.

```julia-repl
julia> v = collect(1:0.2:3)
11-element Vector{Float64}:
 1.0
 1.2
 ... # display truncated
 3.0

julia> mean(v)
2.0

julia> extrema(v)
(1.0, 3.0)

julia> length(v)
11

julia> min('g', 'a', 'c')
'a': ASCII/Unicode U+0061 (category Ll: Letter, lowercase)

julia> count(isodd, 1:5)  # 1, 3, and 5 are odd
3
```

Cet ensemble limité de fonctions est un choix délibéré visant à réduire l'encombrement de la base de Julia, en déplaçant les autres fonctions vers une cascade d'autres modules et paquets.

## Le module `Statistics`

Comme elle fait partie de la bibliothèque standard, [`Statistics`][statistics] est probablement déjà installée : il suffit donc d'ajouter `using Statistics` en haut du programme pour la faire entrer dans l'espace de noms.

Ce module contient le niveau suivant de fonctions courantes, qui sont probablement largement utilisées par une partie des programmeurs.

Bon nombre des fonctions de `Statistics` supposent un minimum de connaissances sur le sujet.
Les exemples les plus simples incluent :

- [`mean`][mean], que beaucoup appellent la moyenne (même résultat que `sum / length`).
- [`median`][median], la valeur médiane après tri.
- [`std`][std], l'[écart type][stddev] : une mesure de la dispersion des valeurs.
- [`var`][var], la variance : le carré de `std`, généralement plus rapide à calculer.

Chaque fonction tend à proposer diverses options, et il existe _beaucoup_ d'autres fonctions : consulte la [documentation][statistics] si ça t'intéresse.

## D'autres paquets

Comme on peut s'y attendre, les statistiques constituent un cas d'usage majeur pour Julia, et de nombreux paquets sont disponibles pour prendre en charge un travail plus spécialisé.

Le groupe JuliaStats maintient aimablement une [liste en ligne][juliastats].

[statistics]: https://docs.julialang.org/en/v1/stdlib/Statistics/
[randomness]: https://exercism.org/tracks/julia/concepts/randomness
[sum]: https://docs.julialang.org/en/v1/base/collections/#Base.sum
[min]: https://docs.julialang.org/en/v1/base/math/#Base.min
[max]: https://docs.julialang.org/en/v1/base/math/#Base.max
[extrema]: https://docs.julialang.org/en/v1/base/collections/#Base.extrema
[length]: https://docs.julialang.org/en/v1/base/collections/#Base.length
[count]: https://docs.julialang.org/en/v1/base/collections/#Base.count
[mean]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.mean
[median]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.median
[std]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.std
[var]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.var
[stddev]: https://en.wikipedia.org/wiki/Standard_deviation
[juliastats]: https://juliapackages.com/u/juliastats
