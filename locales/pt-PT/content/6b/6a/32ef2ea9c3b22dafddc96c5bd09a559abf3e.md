# Instruções

Uma organização de investigação notou que alguns dos seus investigadores juniores têm vindo a usar métodos menos que ideais nas suas análises.
Um desses métodos é converter imediatamente probabilidades discretas em números de vírgula flutuante (ou seja, números reais) antes de fazer mais cálculos.

Os investigadores seniores preferem usar números racionais nos cálculos, que podem proporcionar maior precisão, e gostariam de saber se as más práticas dos investigadores juniores afetaram os resultados dos estudos.

Foram feitos dois tipos de estudos:
- Foram executados muitos testes, cada um devolvendo uma probabilidade discreta de sucesso, e depois foi calculada a média dessas probabilidades.
- Foram testados muitos eventos independentes, e a probabilidade total de todos os eventos ocorrerem foi calculada multiplicando-os entre si.

Os investigadores seniores estão a pedir-te que escrevas funções que os ajudem a determinar se há erros de arredondamento nas análises por usarem números de vírgula flutuante, e pedem-te que forneças um número racional exato para o resultado, caso haja erros.

## 1. Dá a razão entre sucessos e tentativas

A função `rationalize(successes, trials)` recebe dois arrays, `successes` e `trials`.
Para um índice `i`, `successes[i]` corresponde ao número de sucessos que ocorreram em `trials[i]` tentativas.
A função devolve um array de números racionais dos sucessos sobre o número de tentativas, pela mesma ordem que os arrays de entrada.

```julia-repl
julia> rationalize([1, 2, 3], [4, 5, 6])
3-element Vector{Rational{Int64}}:
 1//4
 2//5
 1//2
```

## 2. Encontra as probabilidades reais associadas aos sucessos e às tentativas

De forma semelhante, a função `probabilities(successes, trials)` recebe dois arrays, `successes` e `trials`.
Devolve um array de números de vírgula flutuante dos sucessos sobre o número de tentativas, pela mesma ordem que os arrays de entrada.

```julia-repl
julia> probabilities([1, 2, 3], [4, 5, 6])
3-element Vector{Float64}:
 0.25
 0.4
 0.5
```

## 3. Verifica a média das probabilidades

A função `checkmean(successes, trials)` recebe os dois arrays, `successes` e `trials`.
Compara a média das probabilidades reais com a média das probabilidades racionais.
- Se as duas probabilidades forem iguais, `checkmean` devolve `true`
- Se as duas probabilidades forem diferentes, `checkmean` devolve a probabilidade racional.

```julia-repl
julia> successes, trials = [9, 4, 7, 8, 6], [22, 22, 11, 17, 12];
julia> checkmean(successes, trials)
true

julia> successes, trials = [6, 5, 9, 8, 9], [21, 19, 13, 25, 22];
julia> checkmean(successes, trials)
1873629//4754750
```

## 4. Verifica a probabilidade independente

A função `checkprob(successes, trials)` recebe os dois arrays, `successes` e `trials`.
Compara a probabilidade total obtida com números de vírgula flutuante com a probabilidade total obtida com números racionais.
- Se as duas probabilidades forem iguais, `checkprob` devolve `true`
- Se as duas probabilidades forem diferentes, `checkprob` devolve a probabilidade racional.

```julia-repl
julia> successes, trials = [2, 9, 4, 4, 5], [15, 11, 17, 19, 15];
julia> checkprob(successes, trials)
true

julia> successes, trials = [9, 8, 5, 4, 3], [22, 14, 19, 25, 18];
julia> checkprob(sucesses, trials)
12//7315
```
