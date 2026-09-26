# Introducción

## Documentación

La documentación en Elixir es un ciudadano de primera clase.

Existen dos atributos de módulo que se usan comúnmente para documentar tu código: `@moduledoc` para documentar un módulo y `@doc` para documentar una función que sigue al atributo. El atributo `@moduledoc` suele aparecer en la primera línea del módulo, y el atributo `@doc` suele aparecer justo antes de la definición de una función, o de la especificación de tipos de la función si tiene una. La documentación se suele escribir en un string de varias líneas usando la sintaxis heredoc.

La documentación de Elixir se escribe en [**Markdown**][markdown].

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

## Especificaciones de tipos

Elixir es un lenguaje de tipado dinámico, lo que significa que no ofrece comprobaciones de tipos en tiempo de compilación. Aun así, las especificaciones de tipos se pueden usar como una forma de documentación.

Se puede agregar una especificación de tipos a una función usando el atributo de módulo `@spec` justo antes de la definición de la función. A `@spec` le siguen el nombre de la función y una lista de los tipos de todos sus argumentos, entre paréntesis y separados por comas. El tipo del valor de retorno se separa de los argumentos de la función con dos puntos dobles `::`.

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### Tipos

Los tipos más usados son:

- Boolean: `boolean()`
- strings: `String.t()`
- números: `integer()`, `non_neg_integer()`, `pos_integer()`, `float()`
- listas: `list()`
- un valor de cualquier tipo: `any()`

Algunos tipos también se pueden parametrizar; por ejemplo, `list(integer)` es una lista de enteros.

Los valores literales también se pueden usar como tipos.

Se puede escribir una unión de tipos usando la barra vertical `|`. Por ejemplo, `integer() | :error` significa un entero o el literal de átomo `:error`.

Puedes encontrar una lista completa de todos los tipos en la [sección «Especificaciones de tipos» de la documentación oficial][types].

### Nombrar los argumentos

Los argumentos de la especificación de tipos también se pueden nombrar, lo cual es útil para distinguir varios argumentos del mismo tipo. El nombre del argumento, seguido de dos puntos dobles, va antes del tipo del argumento.

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### Tipos personalizados

Las especificaciones de tipos no se limitan a los tipos integrados. Los tipos personalizados se pueden definir usando el atributo de módulo `@type`. Una definición de tipo personalizado empieza con el nombre del tipo, seguido de dos puntos dobles y luego el tipo en sí.

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

Un tipo personalizado se puede usar desde el mismo módulo donde se define, o desde otro módulo.

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
