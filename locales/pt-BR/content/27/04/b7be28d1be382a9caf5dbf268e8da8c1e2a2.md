# Introdução

Existem basicamente dois tipos de laços:

1. Repetir até que uma condição seja satisfeita.
2. Iterar sobre os elementos de uma coleção.

Os dois são possíveis em Julia, embora o segundo seja provavelmente mais comum.

## O laço `while`

Para problemas em aberto, em que o número de repetições do laço é desconhecido de antemão, Julia tem o laço `while`.

A forma básica é bem simples:

```julia
while condition
    do_something()
end
```

Neste caso, o programa continua dando voltas no laço até que `condition` deixe de ser `true`.

Existem duas formas de sair do laço antecipadamente:

- Um `break` faz o laço terminar, e a execução continua na próxima linha depois do `end` do laço.
- Um `return x` interrompe a execução da função atual e devolve o valor de retorno `x` para quem fez a chamada.

Com essas opções disponíveis, às vezes é conveniente criar um laço "infinito" com `while true ... end` e depois contar com a descoberta de uma condição de parada dentro do corpo do laço para disparar um `break` ou um `return`.

## Iterar sobre uma coleção

O exemplo mais simples é iterar sobre um intervalo.

Se quisermos fazer algo 10 vezes:

```julia
for n in 1:10
    do_something(n)
end
```

Se a iteração atual não satisfizer alguma condição, é possível pular imediatamente para a próxima iteração com um `continue`:

```julia
for n in 1:10
    if is_useless(n)
        continue
    end
    
    # we decided this iteration could be useful
    do_something_slow(n)
end
```

Em uma forma mais curta, o bloco `if` pode ser substituído por `is_useless(n) && continue`.

Muitos outros tipos de coleção podem ser percorridos: elementos em um array, caracteres em uma string, chaves em um dicionário...

Os exemplos até agora iteram sobre o intervalo `1:10`, em que o valor também é o índice do laço.

De modo mais geral, pode-se precisar do índice, e não apenas do valor.
Para isso, usa-se a função `eachindex()`, por exemplo `for i in eachindex(my_array) ... end`.

## Compreensões

Escrever laços explícitos tende a ser menos comum em Julia do que em muitas linguagens tradicionais, porque existem várias opções mais concisas.

Uma situação especialmente comum é quando precisamos construir um novo vetor a partir dos elementos de alguma outra coleção (vetor, string, conjunto... há muitas possibilidades).

Quem gosta de compreensões de listas em Python vai ficar contente em saber que Julia pode usar uma sintaxe parecida.

A essência disso é montar um laço bem compacto dentro de um vetor.

A sintaxe mais simples tem a forma `result = [f(x) for x in some_collection]`.

Com um laço tradicional, isso poderia ser escrito assim:

```julia
result = []
for x in some_collection
    push!(result, f(x))
end
```

Opcionalmente, pode-se adicionar uma condicional no final, para selecionar apenas os elementos da coleção que correspondem:

```julia-repl
# multiples of 3
julia> [n^2 for n in 1:10 if n%3 == 0]
3-element Vector{Int64}:
  9
 36
 81
```
