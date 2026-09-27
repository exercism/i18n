# Introdução

## Use

A macro `use` permite-nos estender rapidamente o nosso módulo com funcionalidade fornecida por outro módulo. Quando usas `use` num módulo, esse módulo pode injetar código no nosso: pode, por exemplo, definir funções, fazer `import` ou `alias` de outros módulos, ou definir atributos do módulo.

Se alguma vez olhaste para os ficheiros de teste de alguns dos exercícios de Elixir aqui no Exercism, deves ter reparado que começam todos com `use ExUnit.Case`. É esta única linha de código que torna as macros `test` e `assert` disponíveis no módulo de teste.

```elixir
defmodule LasagnaTest do
  use ExUnit.Case

  test "expected minutes in oven" do
    assert Lasagna.expected_minutes_in_oven() === 40
  end
end
```

### A macro `__using__/1`

O que acontece exatamente quando usas `use` num módulo é ditado pela macro `__using__/1` desse módulo. Esta macro recebe um argumento, uma lista de palavras-chave com opções, e devolve uma [expressão citada][concept-ast]. O código dessa expressão citada é inserido no nosso módulo quando chamas `use`.

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

As opções podem ser indicadas como segundo argumento ao chamar `use`, por exemplo, `use ExUnit.Case, async: true`. Quando não são indicadas explicitamente, o valor por omissão é uma lista vazia.

## Comportamentos

Os comportamentos permitem-nos definir interfaces (conjuntos de funções e macros) num _módulo de comportamento_ que pode depois ser implementado por diferentes _módulos de callback_. Graças à interface partilhada, esses módulos de callback podem ser usados de forma intercambiável.

~~~~exercism/note
Repara na grafia britânica de "behaviours".
~~~~

### Definir comportamentos

Para definir um comportamento, temos de criar um novo módulo e especificar uma lista de funções que fazem parte da interface pretendida. Cada função tem de ser definida com o atributo de módulo `@callback`. A sintaxe é idêntica à de uma [especificação de tipo de função][concept-typespecs] (`@spec`). Temos de especificar o nome da função, uma lista de tipos de argumentos e todos os tipos que a função pode devolver.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer
end
```

### Implementar comportamentos

Para adicionar um comportamento existente ao nosso módulo (criar um módulo de callback), usamos o atributo de módulo `@behaviour`. O seu valor deve ser o nome do módulo de comportamento que estamos a adicionar.

Depois, temos de definir todas as funções (callbacks) que esse módulo de comportamento exige. Se estivermos a implementar o comportamento de outra pessoa, como os comportamentos `Access` ou `GenServer` incluídos no Elixir, encontraremos a lista de todos os callbacks desse comportamento na documentação em [hexdocs.pm][hexdocs].

Um módulo de callback não está limitado a implementar apenas as funções que fazem parte do seu comportamento. Também é possível que um único módulo implemente vários comportamentos.

Para assinalar que função vem de que comportamento, devemos usar o atributo de módulo `@impl` antes de cada função. O seu valor deve ser o nome do módulo de comportamento que define este callback.

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

### Implementações de callback por omissão

Ao definir um comportamento, é possível fornecer uma implementação por omissão de um callback. Essa implementação deve ser definida na expressão citada da macro `__using__/1`. Para que quem usa o módulo de comportamento possa substituir a implementação por omissão, chama a macro `defoverridable/1` depois da implementação da função. Esta macro aceita uma lista de palavras-chave em que as chaves são nomes de funções e os valores são as aridades dessas funções.

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

Nota que definir funções dentro de `__using__/1` é desaconselhado para qualquer fim que não seja definir implementações de callback por omissão, mas podes sempre definir funções noutro módulo e importá-las na macro `__using__/1`.

[concept-ast]: https://exercism.org/tracks/elixir/concepts/ast
[concept-typespecs]: https://exercism.org/tracks/elixir/concepts/typespecs
[hexdocs]: https://hexdocs.pm
