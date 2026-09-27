# Introdução

Há, basicamente, dois tipos de ciclos:

1. Repetir até que uma condição seja satisfeita.
2. Percorrer os elementos de uma coleção.

Ambos são possíveis em Julia, embora o segundo possa ser mais comum.

## O ciclo `while`

Para problemas em aberto, em que o número de repetições do ciclo não se conhece à partida, Julia tem o ciclo `while`.

A forma básica é bastante simples:

```julia
while condition
    do_something()
end
```

Neste caso, o programa continua a percorrer o ciclo até `condition` deixar de ser `true`.

Há duas formas de sair do ciclo antecipadamente:

- Um `break` faz com que o ciclo termine, continuando a execução na linha seguinte ao `end` do ciclo.
- Um `return x` interrompe a execução da função atual e devolve o valor `x` a quem a chamou.

Com estas opções disponíveis, por vezes pode ser conveniente criar um ciclo «infinito» com `while true ... end` e depois contar com uma condição de paragem dentro do corpo do ciclo para acionar um `break` ou um `return`.

## Percorrer uma coleção

O exemplo mais simples é percorrer um intervalo.

Se quisermos fazer algo 10 vezes:

```julia
for n in 1:10
    do_something(n)
end
```

Se a iteração atual não satisfizer alguma condição, é possível saltar imediatamente para a iteração seguinte com um `continue`:

```julia
for n in 1:10
    if is_useless(n)
        continue
    end
    
    # we decided this iteration could be useful
    do_something_slow(n)
end
```

Numa forma mais curta, o bloco `if` poderia ser substituído por `is_useless(n) && continue`.

É possível percorrer muitos outros tipos de coleções: elementos de um array, carateres de uma string, chaves de um dicionário...

Os exemplos até aqui percorrem o intervalo `1:10`, em que o valor é também o índice do ciclo.

De um modo mais geral, pode ser preciso o índice e não apenas o valor.
Para isso, usa-se a função `eachindex()`, por exemplo `for i in eachindex(my_array) ... end`.

## Compreensões

Escrever ciclos explícitos tende a ser menos comum em Julia do que em muitas linguagens tradicionais, porque existem várias opções mais concisas.

Uma situação especialmente comum é quando precisamos de construir um novo vetor a partir dos elementos de outra coleção qualquer (vetor, string, conjunto... há muitas possibilidades).

Quem gosta de compreensões de listas em Python vai ficar satisfeito por saber que Julia permite usar uma sintaxe semelhante.

A essência disto é montar um ciclo muito compacto dentro de um vetor.

A sintaxe mais simples tem a forma `result = [f(x) for x in some_collection]`.

Com um ciclo tradicional, isso poderia ser escrito assim:

```julia
result = []
for x in some_collection
    push!(result, f(x))
end
```

Opcionalmente, pode acrescentar-se uma condição no fim, para selecionar apenas os elementos da coleção que correspondam:

```julia-repl
# multiples of 3
julia> [n^2 for n in 1:10 if n%3 == 0]
3-element Vector{Int64}:
  9
 36
 81
```
