# Introduzione

Go mette a disposizione un pacchetto integrato chiamato `fmt` (pacchetto di formattazione) che offre varie funzioni per gestire il formato dell'input e dell'output.
La funzione più usata è `Sprintf`, che usa dei _verbi_ come `%s` per interpolare valori in una stringa e restituisce quella stringa.

```go
import "fmt"

food := "taco"
fmt.Sprintf("Bring me a %s", food)
// Returns: Bring me a taco
```

In Go i numeri in virgola mobile si formattano comodamente con i verbi di Sprintf: `%g` (rappresentazione compatta), `%e` (esponente) o `%f` (senza esponente).
Tutti e tre i verbi permettono di controllare la larghezza del campo e la posizione numerica.

```go
import "fmt"

number := 4.3242
fmt.Sprintf("%.2f", number)
// Returns: 4.32
```

Puoi trovare un elenco completo dei verbi disponibili nella [documentazione del pacchetto di formattazione][fmt-docs].

`fmt` contiene altre funzioni per lavorare con le stringhe, come `Println`, che stampa semplicemente sulla console gli argomenti che riceve, e `Printf`, che formatta l'input allo stesso modo di `Sprintf` prima di stamparlo.

[fmt-docs]: https://pkg.go.dev/fmt
