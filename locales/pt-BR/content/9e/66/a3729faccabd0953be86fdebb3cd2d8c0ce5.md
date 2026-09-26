# Sobre

- Elixir é dinamicamente tipada.
  - O tipo de uma variável só é verificado em tempo de execução.
- Com o operador de correspondência [`=`][match], podemos vincular um valor de qualquer tipo a um nome de variável:
  - É possível vincular variáveis novamente.
  - Uma variável pode ter um valor de qualquer tipo vinculado a ela.

## Módulos

- Os [módulos][modules] são a base da organização do código em Elixir.
  - Um módulo é visível para todos os outros módulos.
  - Um módulo é definido com [`defmodule`][defmodule].

## Funções nomeadas

- Todas as [funções nomeadas][functions] precisam ser definidas em um módulo.

  - As funções nomeadas são definidas com [`def`][def].
  - Uma função nomeada pode ser tornada privada usando [`defp`][defp].
  - O valor da última expressão de uma função é _retornado implicitamente_.
  - Funções curtas também podem ser escritas com uma sintaxe de uma linha.

  ```elixir
  def increment(n) do
    n + 1
  end

  defp private_increment(n) do
    n + 1
  end

  def short_increment(n), do: n + 1
  ```

- As funções são chamadas usando o nome completo da função junto com o nome do módulo.
  - Se chamada de dentro do próprio módulo, o nome do módulo pode ser omitido.
- A aridade de uma função costuma ser usada quando se fala de uma função nomeada.

  - A aridade se refere ao número de argumentos que ela aceita.

  ```elixir
  # add/3, because the arity is 3
  def add(x, y, z), do: x + y + z
  ```

## Convenções de nomenclatura

Nomes de módulos devem usar `PascalCase`. Um nome de módulo precisa começar com uma letra maiúscula `A-Z` e pode conter letras `a-zA-Z`, números `0-9` e sublinhados `_`.

Nomes de variáveis e funções devem usar `snake_case`. Um nome de variável ou função precisa começar com uma letra minúscula `a-z` ou um sublinhado `_`, pode conter letras `a-zA-Z`, números `0-9` e sublinhados `_`, e pode terminar com um ponto de interrogação `?` ou um ponto de exclamação `!`.

## Números inteiros

Valores inteiros são números inteiros escritos com um ou mais dígitos. Você pode realizar [operações matemáticas básicas][operators] com eles.

## Strings

Os literais [String][string] são sequências de caracteres entre aspas duplas.

```elixir
string = "this is a string! 1, 2, 3!"
```

## Biblioteca padrão

- A documentação está disponível online em [hexdocs.pm/elixir][docs].
- A maioria dos tipos de dados embutidos tem um módulo correspondente, por exemplo `Integer`, `Float`, `String`, `Tuple`, `List`.
- O módulo `Kernel` é um módulo especial.
  - Oferece os recursos básicos sobre os quais o restante da biblioteca padrão é construído.
  - É importado automaticamente.
  - Suas funções podem ser usadas sem o prefixo `Kernel.`.

## Comentários no código

Os comentários podem ser usados para deixar anotações para quem for ler o código-fonte. Comentários de uma linha em Elixir são precedidos por `#`.

[match]: https://elixirschool.com/en/lessons/basics/pattern_matching/
[operators]: https://hexdocs.pm/elixir/basic-types.html#basic-arithmetic
[modules]: https://elixirschool.com/en/lessons/basics/modules/#modules
[functions]: https://elixirschool.com/en/lessons/basics/functions/#named-functions
[def]: https://hexdocs.pm/elixir/Kernel.html#def/2
[defp]: https://hexdocs.pm/elixir/Kernel.html#defp/2
[defmodule]: https://hexdocs.pm/elixir/Kernel.html#defmodule/2
[string]: https://hexdocs.pm/elixir/basic-types.html#strings
[docs]: https://hexdocs.pm/elixir/Kernel.html#content
