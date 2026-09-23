# En-tête fictif

## Bibliothèque de fonctions

C'est le premier exercice que l'on rencontre où la solution que l'on écrit n'est pas un script « main ». On écrit ici une bibliothèque destinée à être « sourcée » dans d'autres scripts qui appelleront nos fonctions.

### Les namerefs en Bash

Cet exercice nécessite l'utilisation de variables `nameref`. Cela demande une version de bash au moins égale à 4.0. Si tu utilises le bash par défaut sur MacOS, tu devras en installer une autre version : voir [Installation de Bash](https://exercism.io/tracks/bash/installation)

Les namerefs permettent de passer une variable à une fonction _par référence_. Ainsi, la variable peut être modifiée dans la fonction et sa valeur mise à jour est disponible dans la portée de l'appelant. Voici un exemple :
```bash
prependElements() {
    local -n __array=$1
    shift
    __array=( "$@" "${__array[@]}" )
}

my_array=( a b c )
echo "before: ${my_array[*]}"    # => before: a b c

prependElements my_array d e f
echo "after: ${my_array[*]}"     # => after: d e f a b c
```
