# Instrucciones

Una organización de investigación se ha dado cuenta de que algunos de sus investigadores junior han estado usando métodos poco óptimos en sus análisis.
Uno de estos métodos consiste en convertir de inmediato las probabilidades discretas en números de punto flotante (es decir, números reales) antes de hacer más cálculos.

Los investigadores senior prefieren usar números racionales en los cálculos, lo que puede dar mayor precisión, y quieren saber si las malas prácticas de los investigadores junior han afectado los resultados de los estudios.

Se hicieron dos tipos de estudios:
- Se realizaron muchas pruebas, cada una de las cuales devolvía una probabilidad discreta de éxito, y luego se calculó la media de estas probabilidades.
- Se probaron muchos eventos independientes, y la probabilidad total de que ocurrieran todos los eventos se calculó multiplicando sus probabilidades entre sí.

Los investigadores senior te piden que escribas funciones que les ayuden a determinar si hay errores de redondeo en los análisis al usar números de punto flotante, y que les proporciones un número racional preciso para el resultado en caso de que haya errores.

## 1. Da la razón entre éxitos y ensayos

La función `rationalize(successes, trials)` recibe dos arrays, `successes` y `trials`.
Para un índice `i`, `successes[i]` corresponde al número de éxitos que ocurrieron en `trials[i]` ensayos.
La función devuelve un array de números racionales de los éxitos sobre el número de ensayos, en el mismo orden que los arrays originales.

```julia-repl
julia> rationalize([1, 2, 3], [4, 5, 6])
3-element Vector{Rational{Int64}}:
 1//4
 2//5
 1//2
```

## 2. Encuentra las probabilidades reales asociadas a la razón entre éxitos y ensayos

De manera similar, la función `probabilities(successes, trials)` recibe dos arrays, `successes` y `trials`.
Devuelve un array de números de punto flotante de los éxitos sobre el número de ensayos, en el mismo orden que los arrays originales.

```julia-repl
julia> probabilities([1, 2, 3], [4, 5, 6])
3-element Vector{Float64}:
 0.25
 0.4
 0.5
```

## 3. Comprueba la media de las probabilidades

La función `checkmean(successes, trials)` recibe los dos arrays, `successes` y `trials`.
Compara la media de las probabilidades reales con la media de las probabilidades racionales.
- Si las dos probabilidades son iguales, `checkmean` devuelve `true`
- Si las dos probabilidades son diferentes, `checkmean` devuelve la probabilidad racional.

```julia-repl
julia> successes, trials = [9, 4, 7, 8, 6], [22, 22, 11, 17, 12];
julia> checkmean(successes, trials)
true

julia> successes, trials = [6, 5, 9, 8, 9], [21, 19, 13, 25, 22];
julia> checkmean(successes, trials)
1873629//4754750
```

## 4. Comprueba la probabilidad de eventos independientes

La función `checkprob(successes, trials)` recibe los dos arrays, `successes` y `trials`.
Compara la probabilidad total de las probabilidades de punto flotante con la probabilidad total de las probabilidades racionales.
- Si las dos probabilidades son iguales, `checkprob` devuelve `true`
- Si las dos probabilidades son diferentes, `checkprob` devuelve la probabilidad racional.

```julia-repl
julia> successes, trials = [2, 9, 4, 4, 5], [15, 11, 17, 19, 15];
julia> checkprob(successes, trials)
true

julia> successes, trials = [9, 8, 5, 4, 3], [22, 14, 19, 25, 18];
julia> checkprob(sucesses, trials)
12//7315
```
