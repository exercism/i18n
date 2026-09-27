# Introdução

Ao [recursar][exercism-recursion] sobre enumeráveis (listas, bitstrings, strings), há frequentemente duas preocupações:

- quanta memória é necessária para guardar o rasto das chamadas recursivas à função
- como construir a solução de forma eficiente

Para lidar com estas preocupações, pode usar-se um _acumulador_.

Um acumulador é uma variável que é passada a par dos dados. É usado para passar o estado atual da execução da função, de chamada em chamada, até se atingir o _caso base_. No caso base, o acumulador é usado para devolver o valor final da chamada recursiva.

Os acumuladores devem ser inicializados por quem escreve a função, e não por quem a usa. Para o conseguir, declara duas funções: uma função pública que recebe apenas os dados necessários como argumentos e inicializa o acumulador, e uma função privada que recebe também um acumulador. Em Elixir, é um padrão comum começar o nome da função privada com `do_`.

```elixir
# Count the length of a list without an accumulator
def count([]), do: 0
def count([_head | tail]), do: 1 + count(tail)

# Count the length of a list with an accumulator
def count(list), do: do_count(list, 0)

defp do_count([], count), do: count
defp do_count([_head | tail], count), do: do_count(tail, count + 1)
```

A utilização de um acumulador permite transformar funções recursivas em funções _recursivas em cauda_. Uma função é recursiva em cauda se a _última_ coisa executada pela função for uma chamada a si própria.

[exercism-recursion]: https://exercism.org/tracks/elixir/concepts/recursion
