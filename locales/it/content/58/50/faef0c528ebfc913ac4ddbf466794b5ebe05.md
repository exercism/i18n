# Introduzione

Le slice in Go sono simili alle liste o agli array di altri linguaggi.
Contengono diversi elementi di un tipo specifico (o di un'interfaccia).

Le slice in Go si basano sugli array.
Gli array hanno una dimensione fissa.
Una slice, invece, è una vista flessibile e di dimensione dinamica sugli elementi di un array.

Una slice si scrive come `[]T`, dove `T` è il tipo degli elementi della slice:

```go
var empty []int                 // an empty slice
withData := []int{0,1,2,3,4,5}  // a slice pre-filled with some data
```

Puoi leggere o assegnare un elemento in corrispondenza di un indice che parte da zero usando la notazione con parentesi quadre:

```go
withData[1] = 5
x := withData[1] // x is now 5
```

Puoi creare una nuova slice a partire da una slice esistente prendendo un intervallo di elementi.
Anche in questo caso si usa la notazione con parentesi quadre, specificando però sia un indice iniziale (incluso) che un indice finale (escluso).
Se non specifichi un indice iniziale, il valore predefinito è 0.
Se non specifichi un indice finale, il valore predefinito è la lunghezza della slice.

```go
newSlice := withData[2:4]
// => []int{2,3}
newSlice := withData[:2]
// => []int{0,1}
newSlice := withData[2:]
// => []int{2,3,4,5}
newSlice := withData[:]
// => []int{0,1,2,3,4,5}
```

Puoi aggiungere elementi a una slice usando la funzione `append`.
Qui sotto aggiungiamo `4` e `2` alla slice `a`.

```go
a := []int{1, 3}
a = append(a, 4, 2)
// => []int{1,3,4,2}
```

`append` restituisce sempre una nuova slice. Quando vogliamo semplicemente aggiungere elementi a una slice esistente, è comune riassegnarla alla variabile slice che passiamo come primo argomento, come abbiamo fatto qui sopra.

`append` può essere usata anche per unire due slice:

```go
nextSlice := []int{100,101,102}
newSlice  := append(withData, nextSlice...)
// => []int{0,1,2,3,4,5,100,101,102}
```

## Indici nelle slice

Lavorare con gli indici delle slice dovrebbe sempre essere protetto in qualche modo da un controllo che verifichi che l'indice esista davvero.
In caso contrario, l'intera applicazione andrà in crash.

## Slice vuote

Le slice `nil` sono la slice vuota predefinita.
Non hanno alcuno svantaggio rispetto a una slice senza valori al suo interno.
La funzione `len` funziona sulle slice `nil`, si possono aggiungere elementi senza inizializzarla, e così via.
Se devi creare una nuova slice, preferisci `var s []int` (slice `nil`) a `s := []int{}` (slice vuota, non `nil`).

## Prestazioni

Quando si creano slice da riempire in modo iterativo, c'è un'ottimizzazione semplice da mettere in pratica per migliorare le prestazioni, se si conosce la dimensione finale della slice.
La chiave è ridurre al minimo il numero di volte in cui la memoria deve essere allocata, un'operazione piuttosto costosa che avviene quando la slice cresce oltre lo spazio di memoria che le è stato allocato.
Il modo più sicuro per farlo è specificare una capacità `cap` per la slice con `s := make([]int, 0, cap)` e poi usare `append` sulla slice come al solito.
In questo modo lo spazio per `cap` elementi viene allocato immediatamente, mentre la lunghezza della slice è zero.
In pratica, `cap` è spesso la lunghezza di un'altra slice: `s := make([]int, 0, len(otherSlice))`.

## Append non è una funzione pura

La funzione `append` di Go è ottimizzata per le prestazioni e quindi non fa una copia della slice di input.
Questo significa che la slice originale (primo parametro di `append`) a volte verrà modificata.
