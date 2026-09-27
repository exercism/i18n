# Introdução

## Documentação

Em Elixir, a documentação é um cidadão de primeira classe.

Há dois atributos de módulo usados habitualmente para documentar o teu código: `@moduledoc` para documentar um módulo e `@doc` para documentar uma função que se segue ao atributo. O atributo `@moduledoc` aparece normalmente na primeira linha do módulo, e o atributo `@doc` aparece normalmente mesmo antes da definição de uma função, ou da especificação de tipo da função, se esta existir. A documentação é habitualmente escrita numa string com várias linhas, usando a sintaxe heredoc.

A documentação de Elixir é escrita em [**Markdown**][markdown].

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

## Especificações de tipo

Elixir é uma linguagem de tipagem dinâmica, o que significa que não faz verificações de tipos em tempo de compilação. Ainda assim, as especificações de tipo podem ser usadas como uma forma de documentação.

Uma especificação de tipo pode ser adicionada a uma função com o atributo de módulo `@spec`, imediatamente antes da definição da função. Depois da `@spec` vem o nome da função e uma lista dos tipos de todos os seus argumentos, entre parênteses e separada por vírgulas. O tipo do valor devolvido é separado dos argumentos da função por dois pontos duplos `::`.

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### Tipos

Os tipos usados mais frequentemente incluem:

- booleans: `boolean()`
- strings: `String.t()`
- números: `integer()`, `non_neg_integer()`, `pos_integer()`, `float()`
- listas: `list()`
- um valor de qualquer tipo: `any()`

Alguns tipos também podem ser parametrizados, por exemplo `list(integer)` é uma lista de inteiros.

Valores literais também podem ser usados como tipos.

Uma união de tipos pode ser escrita com a barra vertical `|`. Por exemplo, `integer() | :error` significa um inteiro ou o átomo literal `:error`.

Podes encontrar uma lista completa de todos os tipos na [secção «Typespecs» da documentação oficial][types].

### Nomear argumentos

Os argumentos na especificação de tipo também podem ter nome, o que é útil para distinguir vários argumentos do mesmo tipo. O nome do argumento, seguido de dois pontos duplos, coloca-se antes do tipo do argumento.

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### Tipos personalizados

As especificações de tipo não se limitam aos tipos incorporados. Podes definir tipos personalizados com o atributo de módulo `@type`. A definição de um tipo personalizado começa com o nome do tipo, seguido de dois pontos duplos e depois o próprio tipo.

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

Um tipo personalizado pode ser usado a partir do mesmo módulo onde está definido, ou a partir de outro módulo.

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
