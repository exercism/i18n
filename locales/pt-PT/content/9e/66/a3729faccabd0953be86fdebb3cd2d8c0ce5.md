# Sobre

- O Elixir tem tipagem dinâmica.
  - O tipo de uma variável só é verificado em tempo de execução.
- Com o operador de correspondência [`=`][match], podemos associar um valor de qualquer tipo a um nome de variável:
  - É possível voltar a associar variáveis.
  - Uma variável pode ter associado um valor de qualquer tipo.

## Módulos

- Os [módulos][modules] são a base da organização do código em Elixir.
  - Um módulo é visível para todos os outros módulos.
  - Um módulo é definido com [`defmodule`][defmodule].

## Funções nomeadas

- Todas as [funções nomeadas][functions] têm de ser definidas num módulo.

  - As funções nomeadas são definidas com [`def`][def].
  - Uma função nomeada pode ser tornada privada usando [`defp`][defp] em vez disso.
  - O valor da última expressão de uma função é _devolvido implicitamente_.
  - As funções curtas também podem ser escritas com uma sintaxe de uma linha.

  ```elixir
  def increment(n) do
    n + 1
  end

  defp private_increment(n) do
    n + 1
  end

  def short_increment(n), do: n + 1
  ```

- As funções são chamadas usando o nome completo da função com o nome do módulo.
  - Se forem chamadas dentro do próprio módulo, o nome do módulo pode ser omitido.
- A aridade de uma função é frequentemente usada quando nos referimos a uma função nomeada.

  - A aridade refere-se ao número de argumentos que a função aceita.

  ```elixir
  # add/3, because the arity is 3
  def add(x, y, z), do: x + y + z
  ```

## Convenções de nomenclatura

Os nomes dos módulos devem usar `PascalCase`. Um nome de módulo tem de começar com uma letra maiúscula `A-Z` e pode conter letras `a-zA-Z`, números `0-9` e sublinhados `_`.

Os nomes de variáveis e funções devem usar `snake_case`. Um nome de variável ou função tem de começar com uma letra minúscula `a-z` ou um sublinhado `_`, pode conter letras `a-zA-Z`, números `0-9` e sublinhados `_`, e pode terminar com um ponto de interrogação `?` ou um ponto de exclamação `!`.

## Números inteiros

Os valores inteiros são números inteiros escritos com um ou mais algarismos. Podes efetuar [operações matemáticas básicas][operators] sobre eles.

## Strings

Os literais de [string][string] são sequências de carateres entre aspas duplas.

```elixir
string = "this is a string! 1, 2, 3!"
```

## Biblioteca padrão

- A documentação está disponível online em [hexdocs.pm/elixir][docs].
- A maioria dos tipos de dados incorporados tem um módulo correspondente, por exemplo `Integer`, `Float`, `String`, `Tuple`, `List`.
- O módulo `Kernel` é um módulo especial.
  - Fornece as capacidades básicas sobre as quais assenta o resto da biblioteca padrão.
  - É importado automaticamente.
  - As suas funções podem ser usadas sem o prefixo `Kernel.`

## Comentários no código

Os comentários servem para deixar notas a outros programadores que estejam a ler o código-fonte. Em Elixir, os comentários de uma linha são precedidos de `#`.

[match]: https://elixirschool.com/en/lessons/basics/pattern_matching/
[operators]: https://hexdocs.pm/elixir/basic-types.html#basic-arithmetic
[modules]: https://elixirschool.com/en/lessons/basics/modules/#modules
[functions]: https://elixirschool.com/en/lessons/basics/functions/#named-functions
[def]: https://hexdocs.pm/elixir/Kernel.html#def/2
[defp]: https://hexdocs.pm/elixir/Kernel.html#defp/2
[defmodule]: https://hexdocs.pm/elixir/Kernel.html#defmodule/2
[string]: https://hexdocs.pm/elixir/basic-types.html#strings
[docs]: https://hexdocs.pm/elixir/Kernel.html#content
