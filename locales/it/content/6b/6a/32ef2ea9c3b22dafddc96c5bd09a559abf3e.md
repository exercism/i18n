# Istruzioni

Un'organizzazione di ricerca ha notato che alcuni dei suoi ricercatori junior hanno usato metodi poco ottimali nelle loro analisi.
Uno di questi metodi consiste nel convertire immediatamente le probabilità discrete in numeri in virgola mobile (cioè numeri reali) prima di eseguire ulteriori calcoli.

I ricercatori senior preferiscono usare numeri razionali nei calcoli, che possono garantire una precisione maggiore, e vorrebbero sapere se le pratiche scadenti dei ricercatori junior hanno influenzato gli esiti degli studi.

Sono stati condotti due tipi di studi:
- Sono stati eseguiti molti test, ciascuno restituiva una probabilità discreta di successo, poi è stata calcolata la media di queste probabilità.
- Sono stati testati molti eventi indipendenti, e la probabilità totale che tutti gli eventi si verificassero è stata calcolata moltiplicando tra loro le rispettive probabilità.

I ricercatori senior ti chiedono di scrivere funzioni che li aiutino a determinare se ci sono errori di arrotondamento nelle analisi dovuti all'uso dei numeri in virgola mobile, e di fornire un numero razionale preciso per il risultato qualora ci siano errori.

## 1. Fornisci il rapporto tra successi e prove

La funzione `rationalize(successes, trials)` prende due array, `successes` e `trials`.
Per un indice `i`, `successes[i]` corrisponde al numero di successi che si sono verificati in `trials[i]` prove.
La funzione restituisce un array di numeri razionali dei successi sul numero di prove, nello stesso ordine degli array di input.

```julia-repl
julia> rationalize([1, 2, 3], [4, 5, 6])
3-element Vector{Rational{Int64}}:
 1//4
 2//5
 1//2
```

## 2. Trova le probabilità reali associate al rapporto tra successi e prove

Allo stesso modo, la funzione `probabilities(successes, trials)` prende due array, `successes` e `trials`.
Restituisce un array di numeri in virgola mobile dei successi sul numero di prove, nello stesso ordine degli array di input.

```julia-repl
julia> probabilities([1, 2, 3], [4, 5, 6])
3-element Vector{Float64}:
 0.25
 0.4
 0.5
```

## 3. Controlla la media delle probabilità

La funzione `checkmean(successes, trials)` prende i due array, `successes` e `trials`.
Confronta la media delle probabilità reali con la media delle probabilità razionali.
- Se le due probabilità sono uguali, `checkmean` restituisce `true`
- Se le due probabilità sono diverse, `checkmean` restituisce la probabilità razionale.

```julia-repl
julia> successes, trials = [9, 4, 7, 8, 6], [22, 22, 11, 17, 12];
julia> checkmean(successes, trials)
true

julia> successes, trials = [6, 5, 9, 8, 9], [21, 19, 13, 25, 22];
julia> checkmean(successes, trials)
1873629//4754750
```

## 4. Controlla la probabilità di eventi indipendenti

La funzione `checkprob(successes, trials)` prende i due array, `successes` e `trials`.
Confronta la probabilità totale calcolata con i numeri in virgola mobile con quella calcolata con i numeri razionali.
- Se le due probabilità sono uguali, `checkprob` restituisce `true`
- Se le due probabilità sono diverse, `checkprob` restituisce la probabilità razionale.

```julia-repl
julia> successes, trials = [2, 9, 4, 4, 5], [15, 11, 17, 19, 15];
julia> checkprob(successes, trials)
true

julia> successes, trials = [9, 8, 5, 4, 3], [22, 14, 19, 25, 18];
julia> checkprob(sucesses, trials)
12//7315
```
