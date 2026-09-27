# Introducción

## Documentación

La documentación en Elixir es un ciudadano de primera clase.

Hay dos atributos de módulo que se usan comúnmente para documentar tu código: `@moduledoc` para documentar un módulo y `@doc` para documentar una función que sigue al atributo. El atributo `@moduledoc` suele aparecer en la primera línea del módulo, y el atributo `@doc` suele aparecer justo antes de la definición de una función, o de la especificación de tipos de la función, si la tiene. La documentación se suele escribir en un string multilínea usando la sintaxis heredoc.

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

Elixir es un lenguaje de tipado dinámico, lo que significa que no proporciona comprobaciones de tipos en tiempo de compilación. Aun así, las especificaciones de tipos pueden usarse como una forma de documentación.

Se puede añadir una especificación de tipos a una función usando el atributo de módulo `@spec` justo antes de la definición de la función. A `@spec` le sigue el nombre de la función y una lista con los tipos de todos sus argumentos, entre paréntesis y separados por comas. El tipo del valor devuelto se separa de los argumentos de la función con un doble dos puntos `::`.

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### Tipos

Los tipos más usados son:

- booleanos: `boolean()`
- strings: `String.t()`
- números: `integer()`, `non_neg_integer()`, `pos_integer()`, `float()`
- listas: `list()`
- un valor de cualquier tipo: `any()`

Algunos tipos también se pueden parametrizar; por ejemplo, `list(integer)` es una lista de enteros.

Los valores literales también se pueden usar como tipos.

Una unión de tipos se puede escribir usando la barra vertical `|`. Por ejemplo, `integer() | :error` significa un entero o el literal de átomo `:error`.

Puedes encontrar una lista completa de todos los tipos en la [sección «Typespecs» de la documentación oficial][types].

### Nombrar los argumentos

Los argumentos también se pueden nombrar en la especificación de tipos, lo cual es útil para distinguir varios argumentos del mismo tipo. El nombre del argumento, seguido de un doble dos puntos, va antes del tipo del argumento.

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### Tipos personalizados

Las especificaciones de tipos no se limitan a los tipos integrados. Los tipos personalizados se pueden definir usando el atributo de módulo `@type`. La definición de un tipo personalizado empieza con el nombre del tipo, seguido de un doble dos puntos y, a continuación, el propio tipo.

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

Un tipo personalizado se puede usar desde el mismo módulo donde se define, o desde otro módulo.

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
