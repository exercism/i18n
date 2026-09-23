# Introduction

Tout le parcours Julia te demandera de traiter ta solution comme de petites bibliothèques, c'est-à-dire que tu devras définir des fonctions, des types, etc. qui seront ensuite exécutés face à une suite de tests.
C'est pourquoi on va commencer par les fonctions nommées, notre tout premier concept.

Julia est un langage de programmation dynamique et fortement typé.
Son style de programmation est principalement fonctionnel, mais avec davantage de souplesse que dans des langages comme Haskell.

## Variables et affectation

Il n'est pas nécessaire de déclarer une variable à l'avance.
Il suffit d'affecter une valeur à un nom approprié :

```julia-repl
julia> myvar = 42  # an integer
42

julia> name = "Maria"  # strings are surrounded by double-quotes ""
"Maria"
```

## Constantes

Si une valeur doit être disponible dans tout le programme sans pour autant changer, il vaut mieux la marquer comme constante.

Faire précéder une affectation du mot-clé `const` permet au compilateur de générer un code plus efficace que ce qui est possible pour une variable.

Les constantes t'aident aussi à te protéger contre les erreurs de codage.
Si tu essaies de modifier la valeur `const` par inadvertance, tu obtiendras un avertissement :

```julia-repl
julia> const answer = 42
42

julia> answer = 24
WARNING: redefinition of constant Main.answer. This may fail, cause incorrect answers, or produce other errors.
24
```

À noter qu'une `const` ne peut être déclarée qu'*en dehors* de toute fonction.
Elle se trouve généralement près du début du fichier `*.jl`, avant les définitions de fonctions.

## Opérateurs arithmétiques

Ce sont les mêmes que dans beaucoup d'autres langages :

```julia
2 + 3  # 5 (addition)
2 - 3  # -1 (subtraction)
2 * 3  # 6 (multiplication)
8 / 2  # 4.0 (division with floating-point result)
8 % 3  # 2 (remainder)
```

## Fonctions

Il y a deux façons courantes de définir une fonction nommée en Julia :

1. Avec le mot-clé `function`

    ```julia
    function muladd(x, y, z)
        x * y + z
    end
    ```

    L'indentation de 4 espaces est conventionnelle pour la lisibilité, mais le compilateur l'ignore.
    Le mot-clé `end` est indispensable.

    Note que l'on aurait pu écrire `return x * y + z`.
    Cependant, les fonctions Julia renvoient toujours la dernière expression évaluée, donc le mot-clé `return` est facultatif.
    Beaucoup de développeurs préfèrent l'ajouter pour rendre leurs intentions plus explicites.

2. Avec la « forme d'affectation »

    ```julia
    muladd(x, y, z) = x * y + z
    ```

    Cette forme sert le plus souvent à écrire des fonctions concises à une seule expression.

    Le mot-clé `return` n'est *jamais* utilisé dans la forme d'affectation.

Les deux formes sont équivalentes et s'utilisent exactement de la même manière : choisis celle qui te semble la plus lisible.

Pour appeler une fonction, on écrit son nom puis on passe un argument pour chacun de ses paramètres :

```julia
# invoking a function
muladd(10, 5, 1)

# and of course you can invoke a function within the body of another function:
square_plus_one(x) = muladd(x, x, 1)
```

## Conventions de nommage

Comme beaucoup de langages, Julia exige que les noms (de variables, de fonctions et de bien d'autres choses) commencent par une lettre, suivie de n'importe quelle combinaison de lettres, de chiffres et de tirets bas.

Par convention, les noms de variables, de constantes et de fonctions s'écrivent *en minuscules*, avec le moins de tirets bas raisonnablement possible.