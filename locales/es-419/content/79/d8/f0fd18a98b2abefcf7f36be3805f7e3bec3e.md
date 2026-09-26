# Introducción

## Uso

La macro `use` nos permite extender rápidamente nuestro módulo con funcionalidad que proporciona otro módulo. Cuando hacemos `use` de un módulo, ese módulo puede inyectar código en el nuestro; por ejemplo, puede definir funciones, hacer `import` o `alias` de otros módulos, o establecer atributos de módulo.

Si alguna vez miraste los archivos de prueba de algunos de los ejercicios de Elixir aquí en Exercism, lo más probable es que hayas notado que todos comienzan con `use ExUnit.Case`. Esta sola línea de código es lo que hace que las macros `test` y `assert` estén disponibles en el módulo de prueba.

```elixir
defmodule LasagnaTest do
  use ExUnit.Case

  test "expected minutes in oven" do
    assert Lasagna.expected_minutes_in_oven() === 40
  end
end
```

### Macro `__using__/1`

Lo que sucede exactamente cuando haces `use` de un módulo lo dicta la macro `__using__/1` de ese módulo. Recibe un argumento, una lista de palabras clave con opciones, y devuelve una [expresión citada][concept-ast]. El código de esta expresión citada se inserta en nuestro módulo al llamar a `use`.

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

Las opciones se pueden pasar como segundo argumento al llamar a `use`, por ejemplo, `use ExUnit.Case, async: true`. Cuando no se dan de forma explícita, su valor predeterminado es una lista vacía.

## Comportamientos

Los comportamientos nos permiten definir interfaces (conjuntos de funciones y macros) en un _módulo de comportamiento_ que luego pueden implementar diferentes _módulos de callback_. Gracias a la interfaz compartida, esos módulos de callback se pueden usar de manera intercambiable.

~~~~exercism/note
Fíjate en la ortografía británica de «behaviours».
~~~~

### Definir comportamientos

Para definir un comportamiento, necesitamos crear un módulo nuevo y especificar una lista de funciones que forman parte de la interfaz deseada. Cada función se debe definir con el atributo de módulo `@callback`. La sintaxis es idéntica a la de una [especificación de tipo de función][concept-typespecs] (`@spec`). Necesitamos especificar un nombre de función, una lista de tipos de argumentos y todos los tipos de retorno posibles.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer
end
```

### Implementar comportamientos

Para agregar un comportamiento existente a nuestro módulo (crear un módulo de callback), usamos el atributo de módulo `@behaviour`. Su valor debe ser el nombre del módulo de comportamiento que estamos agregando.

Luego, debemos definir todas las funciones (callbacks) que requiere ese módulo de comportamiento. Si estamos implementando el comportamiento de otra persona, como los comportamientos integrados de Elixir `Access` o `GenServer`, encontraríamos la lista de todos los callbacks del comportamiento en la documentación en [hexdocs.pm][hexdocs].

Un módulo de callback no está limitado a implementar solo las funciones que forman parte de su comportamiento. También es posible que un solo módulo implemente varios comportamientos.

Para marcar qué función proviene de qué comportamiento, debemos usar el atributo de módulo `@impl` antes de cada función. Su valor debe ser el nombre del módulo de comportamiento que define este callback.

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

### Implementaciones de callback predeterminadas

Al definir un comportamiento, es posible proporcionar una implementación predeterminada de un callback. Esta implementación se debe definir en la expresión citada de la macro `__using__/1`. Para que los usuarios del módulo de comportamiento puedan sobrescribir la implementación predeterminada, llama a la macro `defoverridable/1` después de la implementación de la función. Acepta una lista de palabras clave con nombres de funciones como claves y aridades de funciones como valores.

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

Ten en cuenta que definir funciones dentro de `__using__/1` no se recomienda para ningún otro propósito que no sea definir implementaciones de callback predeterminadas, pero siempre puedes definir funciones en otro módulo e importarlas en la macro `__using__/1`.

[concept-ast]: https://exercism.org/tracks/elixir/concepts/ast
[concept-typespecs]: https://exercism.org/tracks/elixir/concepts/typespecs
[hexdocs]: https://hexdocs.pm
