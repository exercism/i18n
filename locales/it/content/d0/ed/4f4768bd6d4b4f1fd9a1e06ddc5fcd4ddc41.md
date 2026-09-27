# Introduzione

Un [`Time`][time] in Go è un tipo che descrive un momento nel tempo.
Le informazioni su data e ora si possono leggere, confrontare e modificare tramite i suoi metodi, ma esistono anche alcune funzioni richiamate direttamente sul pacchetto `time`.
La data e l'ora attuali si possono ottenere con la funzione [`time.Now`][now].

La funzione [`time.Parse`][parse] analizza le stringhe e le converte in valori di tipo `Time`.
Go ha un modo particolare di definire il layout che ti aspetti per l'analisi.
Devi scrivere un esempio del layout usando i valori di questo speciale timestamp:
`Mon Jan 2 15:04:05 -0700 MST 2006`.

Per esempio:

```go
import "time"

func parseTime() time.Time {
    date := "Tue, 09/22/1995, 13:00"
    layout := "Mon, 01/02/2006, 15:04"

    t, err := time.Parse(layout,date) // time.Time, error
}

// => 1995-09-22 13:00:00 +0000 UTC
```

Il metodo [`Time.Format()`][format] restituisce una rappresentazione del tempo sotto forma di stringa.
Proprio come per la funzione `Parse`, anche il layout di destinazione si definisce tramite un esempio che usa i valori dello speciale timestamp.

Per esempio:

```go
import (
    "fmt"
    "time"
)

func main() {
    t := time.Date(1995,time.September,22,13,0,0,0,time.UTC)
    formattedTime := t.Format("Mon, 01/02/2006, 15:04") // string
    fmt.Println(formattedTime)
}

// => Fri, 09/22/1995, 13:00
```

## Opzioni del layout

Per un layout personalizzato, usa una combinazione di queste opzioni.
In Go sono disponibili anche delle [costanti di formato][const] predefinite per date e timestamp.

| Tempo            | Opzioni                                        |
| ---------------- | ---------------------------------------------- |
| Anno             | 2006 ; 06                                      |
| Mese             | Jan ; January ; 01 ; 1                         |
| Giorno           | 02 ; 2 ; \_2 (per lo zero che precede)         |
| Giorno della settimana | Mon ; Monday                             |
| Ora              | 15 ( formato orario a 24 ore ) ; 3 ; 03 (AM o PM) |
| Minuto           | 04 ; 4                                         |
| Secondo          | 05 ; 5                                         |
| Indicatore AM/PM | PM                                             |
| Giorno dell'anno | 002 ; \_\_2                                    |

Il tipo `time.Time` ha vari metodi per accedere a una particolare ora. Ad esempio, per l'ora: [`Time.Hour()`][hour] , per il mese: [`Time.Month()`][month].
Per saperne di più su come funziona, consulta la [documentazione ufficiale][time].

Il pacchetto [`time`][time] comprende un altro tipo, [`Duration`][duration], che rappresenta il tempo trascorso, oltre al supporto per località e fusi orari, timer e altre funzionalità correlate che verranno trattate in un altro concetto.

[time]: https://golang.org/pkg/time/#Time
[now]: https://golang.org/pkg/time/#Now
[const]: https://pkg.go.dev/time#pkg-constants
[format]: https://pkg.go.dev/time#Time.Format
[hour]: https://pkg.go.dev/time#Time.Hour
[month]: https://pkg.go.dev/time/#Time.Month
[duration]: https://pkg.go.dev/time#Duration
[parse]: https://golang.org/pkg/time/#Parse
