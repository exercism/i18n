# Introduction

L'arbre syntaxique abstrait (AST), aussi appelé _quoted expression_, est une façon de représenter du code sous forme de données.

Chaque nœud de l'AST est un tuple à trois éléments.

```elixir
# AST representation of:
# 2 + 3
{:+, [], [2, 3]}
```

Le premier élément, un atome, est l'opération. Le deuxième élément, une liste de mots-clés, correspond aux métadonnées. Le troisième élément est une liste d'arguments, qui contient d'autres nœuds. Les valeurs littérales telles que les entiers, les atomes et les _strings_ sont représentées dans l'AST telles quelles, plutôt que sous forme de tuples à trois éléments.

## Transforme du code en AST

Convertir du code Elixir en AST et inversement fait partie de la bibliothèque standard. Tu trouveras des fonctions pour manipuler les AST dans les modules `Code` (par exemple pour convertir une _string_ contenant du code en AST) et `Macro` (par exemple pour parcourir l'AST ou le convertir en _string_).

Note que toutes les fonctions de la bibliothèque standard utilisent le nom « quoted » pour désigner l'AST (abréviation de _quoted expression_).

La forme spéciale pour transformer du code en AST s'appelle `quote`. Elle prend un bloc de code et renvoie son AST.

```elixir
quote do
  2 + 3 - 1
end

# => {:-, [], [
#      {:+, [], [2, 3]},
#      1
#    ]}
```

## Cas d'utilisation

La capacité de représenter du code sous forme d'AST est au cœur de la métaprogrammation en Elixir. Les _macros_, qui permettent d'écrire du code Elixir produisant du code Elixir, fonctionnent en renvoyant des AST en sortie.

Un autre cas d'utilisation des AST est l'analyse statique de code, comme l'outil d'Exercism, l'analyseur, que tu connais peut-être déjà comme le petit bot qui laisse des commentaires sur tes solutions.
