# Introdução

## Uso

O macro `use` permite estender rapidamente nosso módulo com funcionalidades fornecidas por outro módulo. Quando usamos `use` em um módulo, esse módulo pode injetar código no nosso: ele pode, por exemplo, definir funções, fazer `import` ou `alias` de outros módulos, ou definir atributos de módulo.

Se você já olhou os arquivos de teste de alguns dos exercícios de Elixir aqui no Exercism, provavelmente notou que todos começam com `use ExUnit.Case`. É essa única linha de código que disponibiliza os macros `test` e `assert` no módulo de teste.

```elixir
defmodule LasagnaTest do
  use ExUnit.Case

  test "expected minutes in oven" do
    assert Lasagna.expected_minutes_in_oven() === 40
  end
end
```

### O macro `__using__/1`

O que exatamente acontece quando você usa `use` em um módulo é ditado pelo macro `__using__/1` desse módulo. Ele recebe um argumento, uma lista de palavras-chave com opções, e retorna uma [quoted expression][concept-ast]. O código dessa quoted expression é inserido no nosso módulo quando chamamos `use`.

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

As opções podem ser passadas como segundo argumento ao chamar `use`, por exemplo `use ExUnit.Case, async: true`. Quando não são passadas explicitamente, o padrão é uma lista vazia.

## Behaviours

Behaviours permitem definir interfaces (conjuntos de funções e macros) em um _módulo de behaviour_ que depois podem ser implementadas por diferentes _módulos de callback_. Graças à interface compartilhada, esses módulos de callback podem ser usados de forma intercambiável.

~~~~exercism/note
Repare na grafia britânica de "behaviours".
~~~~

### Definindo behaviours

Para definir um behaviour, precisamos criar um novo módulo e especificar uma lista de funções que fazem parte da interface desejada. Cada função precisa ser definida usando o atributo de módulo `@callback`. A sintaxe é idêntica à de uma [typespec de função][concept-typespecs] (`@spec`). Precisamos especificar o nome da função, uma lista de tipos de argumento e todos os tipos de retorno possíveis.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer
end
```

### Implementando behaviours

Para adicionar um behaviour existente ao nosso módulo (criar um módulo de callback), usamos o atributo de módulo `@behaviour`. Seu valor deve ser o nome do módulo de behaviour que estamos adicionando.

Depois, precisamos definir todas as funções (callbacks) exigidas por esse módulo de behaviour. Se estivermos implementando o behaviour de outra pessoa, como os behaviours `Access` ou `GenServer` nativos do Elixir, vamos encontrar a lista de todos os callbacks desse behaviour na documentação em [hexdocs.pm][hexdocs].

Um módulo de callback não se limita a implementar apenas as funções que fazem parte do seu behaviour. Também é possível que um único módulo implemente vários behaviours.

Para marcar de qual behaviour vem cada função, devemos usar o atributo de módulo `@impl` antes de cada função. Seu valor deve ser o nome do módulo de behaviour que define esse callback.

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

### Implementações padrão de callbacks

Ao definir um behaviour, é possível fornecer uma implementação padrão de um callback. Essa implementação deve ser definida na quoted expression do macro `__using__/1`. Para permitir que quem usa o módulo de behaviour substitua a implementação padrão, chame o macro `defoverridable/1` depois da implementação da função. Ele aceita uma lista de palavras-chave com nomes de funções como chaves e aridades de função como valores.

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

Vale notar que definir funções dentro de `__using__/1` não é recomendado para nenhum outro propósito além de definir implementações padrão de callbacks, mas você sempre pode definir funções em outro módulo e importá-las no macro `__using__/1`.

[concept-ast]: https://exercism.org/tracks/elixir/concepts/ast
[concept-typespecs]: https://exercism.org/tracks/elixir/concepts/typespecs
[hexdocs]: https://hexdocs.pm
