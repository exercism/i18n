# Introduzione

«Statistics» è un argomento ampio e complesso, con molti aspetti.

Alcuni aspetti sono stati affrontati nel concetto [`Randomness`][randomness], un argomento separato ma correlato.

Nel caso più semplice, la statistica può includere modi per riassumere una collezione iterabile di dati in un unico valore.
Chi si avvicina a Julia per la prima volta potrebbe sorprendersi di quante poche funzioni siano integrate nel linguaggio per impostazione predefinita:

- [`sum`][sum], per sommare numeri.
- [`min`][min] e [`max`][max], per ottenere i valori estremi dei parametri dati.
- [`extrema`][extrema], per ottenere la tupla (min, max) di un iterabile.
- [`length`][length], per contare tutti i valori.
- [`count`][count], per contare solo i valori che soddisfano un certo criterio.

```julia-repl
julia> v = collect(1:0.2:3)
11-element Vector{Float64}:
 1.0
 1.2
 ... # display truncated
 3.0

julia> mean(v)
2.0

julia> extrema(v)
(1.0, 3.0)

julia> length(v)
11

julia> min('g', 'a', 'c')
'a': ASCII/Unicode U+0061 (category Ll: Letter, lowercase)

julia> count(isodd, 1:5)  # 1, 3, and 5 are odd
3
```

Questo insieme limitato di funzioni è una scelta deliberata per ridurre al minimo l'appesantimento di Julia base, spostando altre funzioni in una cascata di altri moduli e pacchetti.

## Il modulo `Statistics`

Essendo parte della libreria standard, è probabile che [`Statistics`][statistics] sia già installato: basta aggiungere `using Statistics` all'inizio del programma per portarlo nel namespace.

Questo modulo contiene il livello successivo di funzioni comuni, che probabilmente saranno ampiamente usate da una parte dei programmatori.

Molte delle funzioni in `Statistics` presuppongono una certa conoscenza di base dell'argomento.
Gli esempi più semplici includono:

- [`mean`][mean], che molti chiamerebbero media (stesso risultato di `sum / length`).
- [`median`][median], il valore centrale dopo l'ordinamento.
- [`std`][std], [deviazione standard][stddev]: una misura di quanto sono dispersi i valori.
- [`var`][var], varianza: il quadrato di `std`, che in genere è più veloce da calcolare.

Ogni funzione tende ad avere varie opzioni, e ci sono _molte_ altre funzioni: dai un'occhiata alla [documentazione][statistics] se ti interessa.

## Altri pacchetti

Come puoi immaginare, la statistica è un caso d'uso importante per Julia, e ci sono molti pacchetti disponibili per supportare lavori più specialistici.

Il gruppo JuliaStats mantiene un'utile [elenco online][juliastats].

[statistics]: https://docs.julialang.org/en/v1/stdlib/Statistics/
[randomness]: https://exercism.org/tracks/julia/concepts/randomness
[sum]: https://docs.julialang.org/en/v1/base/collections/#Base.sum
[min]: https://docs.julialang.org/en/v1/base/math/#Base.min
[max]: https://docs.julialang.org/en/v1/base/math/#Base.max
[extrema]: https://docs.julialang.org/en/v1/base/collections/#Base.extrema
[length]: https://docs.julialang.org/en/v1/base/collections/#Base.length
[count]: https://docs.julialang.org/en/v1/base/collections/#Base.count
[mean]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.mean
[median]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.median
[std]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.std
[var]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.var
[stddev]: https://en.wikipedia.org/wiki/Standard_deviation
[juliastats]: https://juliapackages.com/u/juliastats
