# Instrucciones

Una organización de investigación ha notado que algunos de sus investigadores júnior han estado utilizando métodos poco óptimos en sus análisis.
Uno de estos métodos consiste en convertir de inmediato las probabilidades discretas en números de coma flotante (es decir, números reales) antes de hacer más cálculos.

Los investigadores sénior prefieren usar números racionales en los cálculos, ya que pueden proporcionar una mayor precisión, y les gustaría saber si las malas prácticas de los investigadores júnior han afectado a los resultados de los estudios.

Se realizaron dos tipos de estudios:
- Se hicieron muchas pruebas, cada una de las cuales devolvía una probabilidad discreta de éxito, y después se calculó la media de esas probabilidades.
- Se probaron muchos sucesos independientes y se calculó la probabilidad total de que ocurrieran todos los sucesos multiplicando sus probabilidades entre sí.

Los investigadores sénior te piden que escribas funciones que les ayuden a determinar si hay errores de redondeo en los análisis por usar números de coma flotante, y te piden que proporciones un número racional preciso para el resultado si hay errores.

## 1. Da la razón entre éxitos y ensayos

La función `rationalize(successes, trials)` recibe dos arrays, `successes` y `trials`.
Para un índice `i`, `successes[i]` corresponde al número de éxitos que ocurrieron en `trials[i]` ensayos.
La función devuelve un array de números racionales de los éxitos sobre el número de ensayos, en el mismo orden que los arrays de entrada.

```julia-repl
julia> rationalize([1, 2, 3], [4, 5, 6])
3-element Vector{Rational{Int64}}:
 1//4
 2//5
 1//2
```

## 2. Halla las probabilidades reales correspondientes a los éxitos sobre los ensayos

Del mismo modo, la función `probabilities(successes, trials)` recibe dos arrays, `successes` y `trials`.
Devuelve un array de números de coma flotante de los éxitos sobre el número de ensayos, en el mismo orden que los arrays de entrada.

```julia-repl
julia> probabilities([1, 2, 3], [4, 5, 6])
3-element Vector{Float64}:
 0.25
 0.4
 0.5
```

## 3. Comprueba la media de las probabilidades

La función `checkmean(successes, trials)` recibe los dos arrays, `successes` y `trials`.
Comprueba la media de las probabilidades reales frente a la media de las probabilidades racionales.
- Si las dos probabilidades son iguales, `checkmean` devuelve `true`
- Si las dos probabilidades son distintas, `checkmean` devuelve la probabilidad racional.

```julia-repl
julia> successes, trials = [9, 4, 7, 8, 6], [22, 22, 11, 17, 12];
julia> checkmean(successes, trials)
true

julia> successes, trials = [6, 5, 9, 8, 9], [21, 19, 13, 25, 22];
julia> checkmean(successes, trials)
1873629//4754750
```

## 4. Comprueba la probabilidad independiente

La función `checkprob(successes, trials)` recibe los dos arrays, `successes` y `trials`.
Comprueba la probabilidad total de las probabilidades de coma flotante frente a la probabilidad total de las probabilidades racionales.
- Si las dos probabilidades son iguales, `checkprob` devuelve `true`
- Si las dos probabilidades son distintas, `checkprob` devuelve la probabilidad racional.

```julia-repl
julia> successes, trials = [2, 9, 4, 4, 5], [15, 11, 17, 19, 15];
julia> checkprob(successes, trials)
true

julia> successes, trials = [9, 8, 5, 4, 3], [22, 14, 19, 25, 18];
julia> checkprob(sucesses, trials)
12//7315
```
