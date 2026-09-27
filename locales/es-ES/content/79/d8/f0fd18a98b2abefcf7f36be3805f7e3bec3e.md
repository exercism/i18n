# Introducción

## Use

La macro `use` nos permite ampliar rápidamente nuestro módulo con funcionalidad que ofrece otro módulo. Cuando hacemos `use` de un módulo, ese módulo puede inyectar código en el nuestro; por ejemplo, puede definir funciones, hacer `import` o `alias` de otros módulos, o establecer atributos de módulo.

Si alguna vez has mirado los ficheros de test de alguno de los ejercicios de Elixir aquí en Exercism, lo más probable es que te hayas dado cuenta de que todos empiezan con `use ExUnit.Case`. Esta única línea de código es lo que hace que las macros `test` y `assert` estén disponibles en el módulo de test.

```elixir
defmodule LasagnaTest do
  use ExUnit.Case

  test "expected minutes in oven" do
    assert Lasagna.expected_minutes_in_oven() === 40
  end
end
```

### La macro `__using__/1`

Lo que ocurre exactamente cuando haces `use` de un módulo lo dicta la macro `__using__/1` de ese módulo. Recibe un argumento, una lista de palabras clave con opciones, y devuelve una [expresión citada][concept-ast]. El código de esta expresión citada se inserta en nuestro módulo al llamar a `use`.

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

Las opciones se pueden pasar como segundo argumento al llamar a `use`, por ejemplo `use ExUnit.Case, async: true`. Cuando no se indican explícitamente, toman por defecto el valor de una lista vacía.

## Behaviours

Los behaviours nos permiten definir interfaces (conjuntos de funciones y macros) en un _módulo de behaviour_ que más tarde pueden implementar distintos _módulos de callback_. Gracias a la interfaz compartida, esos módulos de callback se pueden usar de forma intercambiable.

~~~~exercism/note
Fíjate en la ortografía británica de «behaviours».
~~~~

### Definición de behaviours

Para definir un behaviour, tenemos que crear un módulo nuevo y especificar una lista de funciones que forman parte de la interfaz deseada. Cada función debe definirse con el atributo de módulo `@callback`. La sintaxis es idéntica a la de un [typespec de función][concept-typespecs] (`@spec`). Tenemos que indicar el nombre de la función, una lista de tipos de argumento y todos los posibles tipos de retorno.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer
end
```

### Implementación de behaviours

Para añadir un behaviour existente a nuestro módulo (crear un módulo de callback) usamos el atributo de módulo `@behaviour`. Su valor debe ser el nombre del módulo de behaviour que estamos añadiendo.

Después, tenemos que definir todas las funciones (callbacks) que requiere ese módulo de behaviour. Si implementamos el behaviour de otra persona, como los behaviours integrados de Elixir `Access` o `GenServer`, encontraremos la lista de todos los callbacks del behaviour en la documentación de [hexdocs.pm][hexdocs].

Un módulo de callback no se limita a implementar solo las funciones que forman parte de su behaviour. También es posible que un mismo módulo implemente varios behaviours.

Para marcar qué función procede de qué behaviour, debemos usar el atributo de módulo `@impl` antes de cada función. Su valor debe ser el nombre del módulo de behaviour que define este callback.

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

### Implementaciones de callback por defecto

Al definir un behaviour, es posible proporcionar una implementación por defecto de un callback. Esta implementación debe definirse en la expresión citada de la macro `__using__/1`. Para que los usuarios del módulo de behaviour puedan sobrescribir la implementación por defecto, llama a la macro `defoverridable/1` después de la implementación de la función. Acepta una lista de palabras clave con nombres de función como claves y aridades de función como valores.

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

Ten en cuenta que definir funciones dentro de `__using__/1` no es recomendable para ningún otro propósito que no sea definir implementaciones de callback por defecto, pero siempre puedes definir funciones en otro módulo e importarlas en la macro `__using__/1`.

[concept-ast]: https://exercism.org/tracks/elixir/concepts/ast
[concept-typespecs]: https://exercism.org/tracks/elixir/concepts/typespecs
[hexdocs]: https://hexdocs.pm
