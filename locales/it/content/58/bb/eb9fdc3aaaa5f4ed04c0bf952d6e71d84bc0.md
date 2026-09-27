# Introduzione

Il pacchetto `math/rand` fornisce il supporto per la generazione di numeri pseudo-casuali.

Ecco come generare un numero intero casuale tra `0` e `99`:

```go
import "math/rand"

n := rand.Intn(100) // n is a random int, 0 <= n < 100
```

La funzione `rand.Float64` restituisce un numero in virgola mobile casuale tra `0.0` e `1.0`:

```go
f := rand.Float64() // f is a random float64, 0.0 <= f < 1.0
```

C'è anche il supporto per mescolare uno slice (o altre strutture dati):

```go
x := []string{"a", "b", "c", "d", "e"}
// shuffling the slice put its elements into a random order
rand.Shuffle(len(x), func(i, j int) {
	x[i], x[j] = x[j], x[i]
})
```

## Semi

Le sequenze di numeri generate dal pacchetto `math/rand` non sono veramente casuali.
Dato un valore «seme» specifico, i risultati sono del tutto deterministici.

In Go 1.20 e versioni successive il seme viene scelto automaticamente a caso, quindi ogni volta che esegui il programma vedrai una sequenza diversa di numeri casuali.

Nelle versioni precedenti di Go, invece, il seme era `1` per impostazione predefinita.
Per ottenere sequenze diverse nelle varie esecuzioni del programma, quindi, dovevi impostare manualmente il seme del generatore di numeri casuali, ad esempio con l'ora corrente, prima di ottenere qualsiasi numero casuale.

```go
rand.Seed(time.Now().UnixNano())
```
