# Introdução

## Documentação

A documentação no Elixir é um cidadão de primeira classe.

Existem dois atributos de módulo comumente usados para documentar seu código: `@moduledoc` para documentar um módulo e `@doc` para documentar uma função que vem logo depois do atributo. O atributo `@moduledoc` geralmente aparece na primeira linha do módulo, e o atributo `@doc` geralmente aparece logo antes da definição de uma função, ou da especificação de tipo da função, se ela tiver uma. A documentação costuma ser escrita em uma string multilinha usando a sintaxe heredoc.

A documentação do Elixir é escrita em [**Markdown**][markdown].

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

O Elixir é uma linguagem de tipagem dinâmica, o que significa que ela não faz verificação de tipos em tempo de compilação. Ainda assim, especificações de tipo podem ser usadas como uma forma de documentação.

Uma especificação de tipo pode ser adicionada a uma função usando o atributo de módulo `@spec` logo antes da definição da função. `@spec` é seguido pelo nome da função e por uma lista com os tipos de todos os seus argumentos, entre parênteses, separados por vírgulas. O tipo do valor de retorno é separado dos argumentos da função por um dois-pontos duplo `::`.

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### Tipos

Os tipos mais usados incluem:

- booleanos: `boolean()`
- strings: `String.t()`
- números: `integer()`, `non_neg_integer()`, `pos_integer()`, `float()`
- listas: `list()`
- um valor de qualquer tipo: `any()`

Alguns tipos também podem ser parametrizados. Por exemplo, `list(integer)` é uma lista de inteiros.

Valores literais também podem ser usados como tipos.

Uma união de tipos pode ser escrita usando a barra vertical `|`. Por exemplo, `integer() | :error` significa ou um inteiro, ou o literal de átomo `:error`.

Uma lista completa de todos os tipos pode ser encontrada na [seção "Typespecs" da documentação oficial][types].

### Nomeando argumentos

Os argumentos na especificação de tipo também podem ser nomeados, o que é útil para distinguir vários argumentos do mesmo tipo. O nome do argumento, seguido de um dois-pontos duplo, vem antes do tipo do argumento.

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### Tipos personalizados

As especificações de tipo não se limitam aos tipos nativos. Tipos personalizados podem ser definidos usando o atributo de módulo `@type`. A definição de um tipo personalizado começa com o nome do tipo, seguido de um dois-pontos duplo e, depois, o próprio tipo.

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

Um tipo personalizado pode ser usado tanto no mesmo módulo onde foi definido quanto em outro módulo.

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
