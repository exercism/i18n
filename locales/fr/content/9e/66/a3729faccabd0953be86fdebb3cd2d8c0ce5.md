# À propos

- Elixir est un langage à typage dynamique.
  - Le type d'une variable n'est vérifié qu'à l'exécution.
- Avec l'opérateur de [correspondance][match] `=`, on peut lier une valeur de n'importe quel type à un nom de variable :
  - Il est possible de lier à nouveau des variables.
  - Une variable peut être liée à une valeur de n'importe quel type.

## Modules

- Les [modules][modules] constituent la base de l'organisation du code en Elixir.
  - Un module est visible par tous les autres modules.
  - Un module se définit avec [`defmodule`][defmodule].

## Fonctions nommées

- Toutes les [fonctions nommées][functions] doivent être définies dans un module.

  - Les fonctions nommées se définissent avec [`def`][def].
  - Une fonction nommée peut être rendue privée en utilisant [`defp`][defp] à la place.
  - La valeur de la dernière expression d'une fonction est _renvoyée implicitement_.
  - Les fonctions courtes peuvent aussi s'écrire avec une syntaxe sur une seule ligne.

  ```elixir
  def increment(n) do
    n + 1
  end

  defp private_increment(n) do
    n + 1
  end

  def short_increment(n), do: n + 1
  ```

- Les fonctions s'invoquent en utilisant le nom complet de la fonction, qui inclut le nom du module.
  - Si on l'invoque depuis son propre module, le nom du module peut être omis.
- L'arité d'une fonction est souvent utilisée pour désigner une fonction nommée.

  - L'arité correspond au nombre d'arguments qu'elle accepte.

  ```elixir
  # add/3, because the arity is 3
  def add(x, y, z), do: x + y + z
  ```

## Conventions de nommage

Les noms de modules doivent utiliser le `PascalCase`. Un nom de module doit commencer par une lettre majuscule `A-Z` et peut contenir des lettres `a-zA-Z`, des chiffres `0-9` et des tirets bas `_`.

Les noms de variables et de fonctions doivent utiliser le `snake_case`. Un nom de variable ou de fonction doit commencer par une lettre minuscule `a-z` ou un tiret bas `_`, peut contenir des lettres `a-zA-Z`, des chiffres `0-9` et des tirets bas `_`, et peut se terminer par un point d'interrogation `?` ou un point d'exclamation `!`.

## Nombres entiers

Une valeur entière est un nombre entier qui s'écrit avec un ou plusieurs chiffres. Tu peux effectuer des [opérations mathématiques de base][operators] sur ces valeurs.

## Strings

Les littéraux de _[string][string]_ sont des séquences de caractères entourées de guillemets doubles.

```elixir
string = "this is a string! 1, 2, 3!"
```

## Bibliothèque standard

- La documentation est disponible en ligne sur [hexdocs.pm/elixir][docs].
- La plupart des types de données intégrés ont un module correspondant, par exemple `Integer`, `Float`, `String`, `Tuple`, `List`.
- Le module `Kernel` est un module particulier.
  - Il fournit les capacités de base sur lesquelles repose le reste de la bibliothèque standard.
  - Il est importé automatiquement.
  - Ses fonctions peuvent être utilisées sans le préfixe `Kernel.`.

## Commentaires du code

Les commentaires permettent de laisser des notes aux autres développeurs qui lisent le code source. En Elixir, les commentaires sur une seule ligne sont précédés d'un `#`.

[match]: https://elixirschool.com/en/lessons/basics/pattern_matching/
[operators]: https://hexdocs.pm/elixir/basic-types.html#basic-arithmetic
[modules]: https://elixirschool.com/en/lessons/basics/modules/#modules
[functions]: https://elixirschool.com/en/lessons/basics/functions/#named-functions
[def]: https://hexdocs.pm/elixir/Kernel.html#def/2
[defp]: https://hexdocs.pm/elixir/Kernel.html#defp/2
[defmodule]: https://hexdocs.pm/elixir/Kernel.html#defmodule/2
[string]: https://hexdocs.pm/elixir/basic-types.html#strings
[docs]: https://hexdocs.pm/elixir/Kernel.html#content
