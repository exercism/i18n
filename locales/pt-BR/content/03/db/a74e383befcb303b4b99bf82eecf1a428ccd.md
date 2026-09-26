# Introdução

Ao fazer [recursão][exercism-recursion] em enumeráveis (listas, bitstrings, strings), muitas vezes há duas preocupações:

- quanta memória é necessária para armazenar o rastro das chamadas de função recursivas
- como construir a solução de forma eficiente

Para lidar com essas preocupações, pode-se usar um _acumulador_.

Um acumulador é uma variável que é passada junto com os dados. Ele é usado para passar o estado atual da execução da função, de chamada em chamada, até que o _caso base_ seja alcançado. No caso base, o acumulador é usado para retornar o valor final da chamada recursiva da função.

Os acumuladores devem ser inicializados por quem escreve a função, e não por quem a usa. Para isso, declare duas funções: uma função pública que recebe apenas os dados necessários como argumentos e inicializa o acumulador, e uma função privada que também recebe um acumulador. No Elixir, é um padrão comum prefixar o nome da função privada com `do_`.

```elixir
# Count the length of a list without an accumulator
def count([]), do: 0
def count([_head | tail]), do: 1 + count(tail)

# Count the length of a list with an accumulator
def count(list), do: do_count(list, 0)

defp do_count([], count), do: count
defp do_count([_head | tail], count), do: do_count(tail, count + 1)
```

O uso de um acumulador nos permite transformar funções recursivas em funções _recursivas de cauda_. Uma função é recursiva de cauda se a _última_ coisa executada pela função for uma chamada a ela mesma.

[exercism-recursion]: https://exercism.org/tracks/elixir/concepts/recursion
