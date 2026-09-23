# Introduction

Quand on [parcourt par récursion][exercism-recursion] des énumérables (listes, _bitstrings_, _strings_), deux préoccupations reviennent souvent :

- la quantité de mémoire nécessaire pour stocker la trace des appels de fonction récursifs
- la manière de construire la solution de façon efficace

Pour répondre à ces préoccupations, on peut utiliser un _accumulateur_.

Un accumulateur est une variable que l'on transmet en plus des données. Il sert à transmettre l'état courant de l'exécution de la fonction, d'un appel de fonction à l'autre, jusqu'à atteindre le _cas de base_. Dans le cas de base, l'accumulateur sert à renvoyer la valeur finale de l'appel de fonction récursif.

C'est à l'auteur de la fonction d'initialiser l'accumulateur, pas à la personne qui l'utilise. Pour y parvenir, déclare deux fonctions : une fonction publique qui ne prend que les données nécessaires en arguments et qui initialise l'accumulateur, et une fonction privée qui prend aussi un accumulateur. En Elixir, il est courant de préfixer le nom de la fonction privée par `do_`.

```elixir
# Count the length of a list without an accumulator
def count([]), do: 0
def count([_head | tail]), do: 1 + count(tail)

# Count the length of a list with an accumulator
def count(list), do: do_count(list, 0)

defp do_count([], count), do: count
defp do_count([_head | tail], count), do: do_count(tail, count + 1)
```

L'utilisation d'un accumulateur permet de transformer des fonctions récursives en fonctions _récursives terminales_. Une fonction est récursive terminale si la _dernière_ chose exécutée par la fonction est un appel à elle-même.

[exercism-recursion]: https://exercism.org/tracks/elixir/concepts/recursion
