# Introduction

## Documentation

En Elixir, la documentation est un élément de premier ordre.

Deux attributs de module servent couramment à documenter le code : `@moduledoc` pour documenter un module, et `@doc` pour documenter la fonction qui suit l'attribut. L'attribut `@moduledoc` apparaît généralement sur la première ligne du module, tandis que l'attribut `@doc` apparaît juste avant la définition d'une fonction, ou avant la spécification de type de la fonction si elle en a une. La documentation s'écrit généralement dans une _string_ multiligne avec la syntaxe _heredoc_.

La documentation Elixir s'écrit en [**Markdown**][markdown].

```elixir
defmodule String do
  @moduledoc """
  Strings in Elixir are UTF-8 encoded binaries.
  """

  @doc """
  Converts all characters in the given string to uppercase according to `mode`.

  ## Examples

      iex> String.upcase("abcd")
      "ABCD"

      iex> String.upcase("olá")
      "OLÁ"
  """
  def upcase(string, mode \\ :default)
end
```

## Spécifications de types

Elixir est un langage à typage dynamique, ce qui signifie qu'il ne fournit pas de vérification de type à la compilation. On peut toutefois utiliser des spécifications de types comme une forme de documentation.

Une spécification de type peut être ajoutée à une fonction à l'aide de l'attribut de module `@spec`, juste avant la définition de la fonction. `@spec` est suivi du nom de la fonction et d'un tableau des types de tous ses arguments, entre parenthèses et séparés par des virgules. Le type de la valeur de retour est séparé des arguments de la fonction par un double deux-points `::`.

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### Types

Voici les types les plus couramment utilisés :

- les booléens : `boolean()`
- les _strings_ : `String.t()`
- les nombres : `integer()`, `non_neg_integer()`, `pos_integer()`, `float()`
- les tableaux : `list()`
- une valeur de n'importe quel type : `any()`

Certains types peuvent aussi être paramétrés ; par exemple, `list(integer)` est un tableau d'entiers.

Des valeurs littérales peuvent aussi être utilisées comme types.

Une union de types peut s'écrire à l'aide de la barre verticale `|`. Par exemple, `integer() | :error` désigne soit un entier, soit le littéral d'atome `:error`.

Tous les types sont répertoriés dans la section « Typespecs » de la [documentation officielle][types].

### Nommer les arguments

Dans une spécification de type, les arguments peuvent aussi être nommés, ce qui est utile pour distinguer plusieurs arguments de même type. Le nom de l'argument, suivi de deux deux-points, précède le type de l'argument.

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### Types personnalisés

Les spécifications de types ne se limitent pas aux types intégrés. On peut définir des types personnalisés à l'aide de l'attribut de module `@type`. La définition d'un type personnalisé commence par le nom du type, suivi de deux deux-points, puis du type lui-même.

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

Un type personnalisé peut être utilisé depuis le module où il est défini, ou depuis un autre module.

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
