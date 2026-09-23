# Introduction

## Utilisation

La macro `use` permet d'étendre rapidement notre module avec des fonctionnalités fournies par un autre module. Quand on `use` un module, ce module peut injecter du code dans notre module : il peut par exemple définir des fonctions, faire un `import` ou un `alias` d'autres modules, ou définir des attributs de module.

Si tu as déjà jeté un œil aux fichiers de test de certains exercices Elixir ici, sur Exercism, tu as sans doute remarqué qu'ils commencent tous par `use ExUnit.Case`. Cette seule ligne de code suffit à rendre les macros `test` et `assert` disponibles dans le module de test.

```elixir
defmodule LasagnaTest do
  use ExUnit.Case

  test "expected minutes in oven" do
    assert Lasagna.expected_minutes_in_oven() === 40
  end
end
```

### La macro `__using__/1`

Ce qui se passe exactement quand on `use` un module est dicté par la macro `__using__/1` de ce module. Elle prend un argument, une liste de mots-clés contenant les options, et renvoie une [expression quotée][concept-ast]. Le code de cette expression quotée est inséré dans notre module lors de l'appel à `use`.

```elixir
defmodule ExUnit.Case do
  defmacro __using__(opts) do
    # some real-life ExUnit code omitted here
    quote do
      import ExUnit.Assertions
      import ExUnit.Case, only: [describe: 2, test: 1, test: 2, test: 3]
    end
  end
end
```

Les options peuvent être passées en deuxième argument lors de l'appel à `use`, par exemple `use ExUnit.Case, async: true`. Si on ne les fournit pas explicitement, elles valent par défaut une liste vide.

## Les _behaviours_

Les _behaviours_ permettent de définir des interfaces (des ensembles de fonctions et de macros) dans un module de _behaviour_ qui peut ensuite être implémenté par différents modules de _callback_. Grâce à l'interface partagée, ces modules de _callback_ sont interchangeables.

~~~~exercism/note
Notez l'orthographe britannique de « behaviours ».
~~~~

### Définis des _behaviours_

Pour définir un _behaviour_, il faut créer un nouveau module et préciser la liste des fonctions qui font partie de l'interface souhaitée. Chaque fonction doit être définie à l'aide de l'attribut de module `@callback`. La syntaxe est identique à celle d'une [spécification de type de fonction][concept-typespecs] (`@spec`). Il faut préciser le nom de la fonction, une liste de types d'arguments et tous les types de retour possibles.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer
end
```

### Implémente des _behaviours_

Pour ajouter un _behaviour_ existant à notre module (et donc créer un module de _callback_), on utilise l'attribut de module `@behaviour`. Sa valeur doit être le nom du module de _behaviour_ que l'on ajoute.

Ensuite, il faut définir toutes les fonctions (_callbacks_) exigées par ce module de _behaviour_. Si on implémente le _behaviour_ de quelqu'un d'autre, comme les _behaviours_ `Access` ou `GenServer` fournis avec Elixir, on trouve la liste de tous les _callbacks_ de ce _behaviour_ dans la documentation sur [hexdocs.pm][hexdocs].

Un module de _callback_ n'est pas limité aux fonctions qui font partie de son _behaviour_. Un même module peut aussi implémenter plusieurs _behaviours_.

Pour indiquer de quel _behaviour_ vient chaque fonction, on utilise l'attribut de module `@impl` avant chaque fonction. Sa valeur doit être le nom du module de _behaviour_ qui définit ce _callback_.

```elixir
defmodule BookCollection do
  @behaviour Countable

  defstruct [:list, :owner]

  @impl Countable
  def count(collection) do
    Enum.count(collection.list)
  end

  def mark_as_read(collection, book) do
    # other function unrelated to the Countable behaviour
  end
end
```

### Implémentations par défaut des _callbacks_

Lorsqu'on définit un _behaviour_, il est possible de fournir une implémentation par défaut d'un _callback_. Cette implémentation doit être définie dans l'expression quotée de la macro `__using__/1`. Pour permettre aux utilisateurs du module de _behaviour_ de remplacer l'implémentation par défaut, appelle la macro `defoverridable/1` après l'implémentation de la fonction. Elle prend une liste de mots-clés dont les clés sont des noms de fonctions et les valeurs des arités de fonctions.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer

  defmacro __using__(_) do
    quote do
      @behaviour Countable
      def count(collection), do: Enum.count(collection)
      defoverridable count: 1
    end
  end
end
```

Note que définir des fonctions à l'intérieur de `__using__/1` est déconseillé pour tout autre usage que définir des implémentations de _callbacks_ par défaut, mais tu peux toujours définir des fonctions dans un autre module et les importer dans la macro `__using__/1`.

[concept-ast]: https://exercism.org/tracks/elixir/concepts/ast
[concept-typespecs]: https://exercism.org/tracks/elixir/concepts/typespecs
[hexdocs]: https://hexdocs.pm
