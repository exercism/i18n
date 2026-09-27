# Istruzioni

La stagione di netball è finita e la classifica decide chi gioca le finali.

Il codice di partenza ti fornisce una classe `TEAM`. Scrivi `FINALS_LADDER` sotto di essa.

## 1. Chi sta sopra a chi?

`higher` prende due squadre e dice se la prima va sopra la seconda. Chi ha più
punti viene prima. Le squadre a pari punti si separano con la differenza reti:
prima quella più alta.

```sather
FINALS_LADDER::higher(#TEAM("Vixens", 24, 40), #TEAM("Magpies", 20, 90))
-- => true
```

## 2. La classifica

`ladder` prende le squadre in qualsiasi ordine e le restituisce ordinate in
classifica. L'array passato deve restare invariato.

```sather
FINALS_LADDER::ladder(teams)
-- => the same teams, best first
```

## 3. Leggere la classifica

`names` prende un array di squadre e restituisce i loro nomi uniti con `", "`.

```sather
FINALS_LADDER::names(FINALS_LADDER::ladder(teams))
-- => "Vixens, Magpies, Swifts"
```

## 4. I campioni

`premiers` prende le squadre in qualsiasi ordine e restituisce il nome della
squadra in testa. Se non ci sono squadre, la risposta è `""`.

```sather
FINALS_LADDER::premiers(teams)
-- => "Vixens"
```

## 5. Un ordine del tutto diverso

`shortest_first` prende un array di stringhe e le restituisce ordinate per
lunghezza, dalla più corta alla più lunga. Le stringhe della stessa lunghezza
vanno in ordine alfabetico.

```sather
FINALS_LADDER::shortest_first(|"Magpies", "Vixens", "Swifts"|)
-- => "Swifts", "Vixens", "Magpies"
```

Il criterio di spareggio non è un ornamento. L'ordinamento non è stabile,
quindi senza di esso due nomi della stessa lunghezza potrebbero uscire in un
ordine o nell'altro.

È la stessa routine di ordinamento del compito 2, con una regola diversa
passata ad essa. Questo è il punto dell'esercizio.
