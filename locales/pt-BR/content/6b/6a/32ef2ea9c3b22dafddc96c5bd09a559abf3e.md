# Instruções

Uma organização de pesquisa percebeu que alguns de seus pesquisadores júnior vêm usando métodos pouco ideais em suas análises.
Um desses métodos é converter imediatamente probabilidades discretas em números de ponto flutuante (ou seja, números reais) antes de fazer mais cálculos.

Os pesquisadores sênior preferem usar números racionais nos cálculos, o que pode oferecer maior precisão, e gostariam de saber se as práticas ruins dos pesquisadores júnior afetaram os resultados dos estudos.

Foram feitos dois tipos de estudo:
- Muitos testes foram rodados, cada um retornando uma probabilidade discreta de sucesso, e então a média dessas probabilidades foi calculada.
- Muitos eventos independentes foram testados, e a probabilidade total de todos os eventos ocorrerem foi calculada multiplicando-os entre si.

Os pesquisadores sênior estão pedindo que você escreva funções que os ajudem a determinar se há erros de arredondamento nas análises por usar números de ponto flutuante, e pedem que você forneça um número racional preciso para o resultado, caso haja erros.

## 1. Dê a razão entre sucessos e tentativas

A função `rationalize(successes, trials)` recebe dois arrays, `successes` e `trials`.
Para um índice `i`, `successes[i]` corresponde ao número de sucessos que ocorreram em `trials[i]` tentativas.
A função retorna um array de números racionais das razões entre os sucessos e o número de tentativas, na mesma ordem dos arrays de entrada.

```julia-repl
julia> rationalize([1, 2, 3], [4, 5, 6])
3-element Vector{Rational{Int64}}:
 1//4
 2//5
 1//2
```

## 2. Encontre as probabilidades reais associadas às razões entre sucessos e tentativas

De forma semelhante, a função `probabilities(successes, trials)` recebe dois arrays, `successes` e `trials`.
Ela retorna um array de números de ponto flutuante das razões entre os sucessos e o número de tentativas, na mesma ordem dos arrays de entrada.

```julia-repl
julia> probabilities([1, 2, 3], [4, 5, 6])
3-element Vector{Float64}:
 0.25
 0.4
 0.5
```

## 3. Verifique a média das probabilidades

A função `checkmean(successes, trials)` recebe os dois arrays, `successes` e `trials`.
Ela compara a média das probabilidades reais com a média das probabilidades racionais.
- Se as duas probabilidades forem iguais, `checkmean` retorna `true`
- Se as duas probabilidades forem diferentes, `checkmean` retorna a probabilidade racional.

```julia-repl
julia> successes, trials = [9, 4, 7, 8, 6], [22, 22, 11, 17, 12];
julia> checkmean(successes, trials)
true

julia> successes, trials = [6, 5, 9, 8, 9], [21, 19, 13, 25, 22];
julia> checkmean(successes, trials)
1873629//4754750
```

## 4. Verifique a probabilidade independente

A função `checkprob(successes, trials)` recebe os dois arrays, `successes` e `trials`.
Ela compara a probabilidade total das probabilidades em ponto flutuante com a probabilidade total das probabilidades racionais.
- Se as duas probabilidades forem iguais, `checkprob` retorna `true`
- Se as duas probabilidades forem diferentes, `checkprob` retorna a probabilidade racional.

```julia-repl
julia> successes, trials = [2, 9, 4, 4, 5], [15, 11, 17, 19, 15];
julia> checkprob(successes, trials)
true

julia> successes, trials = [9, 8, 5, 4, 3], [22, 14, 19, 25, 18];
julia> checkprob(sucesses, trials)
12//7315
```
