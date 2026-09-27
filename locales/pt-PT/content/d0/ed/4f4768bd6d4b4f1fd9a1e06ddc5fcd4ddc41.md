# Introdução

Um [`Time`][time] em Go é um tipo que descreve um momento no tempo.
A informação de data e hora pode ser acedida, comparada e manipulada através dos seus métodos, mas também há algumas funções que são chamadas no próprio pacote `time`.
A data e hora atuais podem ser obtidas através da função [`time.Now`][now].

A função [`time.Parse`][parse] analisa strings e devolve valores do tipo `Time`.
Go tem uma forma especial de definir o layout que esperas para a análise.
Tens de escrever um exemplo do layout usando os valores desta marca temporal especial:
`Mon Jan 2 15:04:05 -0700 MST 2006`.

Por exemplo:

```go
import "time"

func parseTime() time.Time {
    date := "Tue, 09/22/1995, 13:00"
    layout := "Mon, 01/02/2006, 15:04"

    t, err := time.Parse(layout,date) // time.Time, error
}

// => 1995-09-22 13:00:00 +0000 UTC
```

O método [`Time.Format()`][format] devolve uma representação em string do tempo.
Tal como na função `Parse`, o layout de destino é novamente definido através de um exemplo que usa os valores da marca temporal especial.

Por exemplo:

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

## Opções de layout

Para um layout personalizado, usa uma combinação destas opções.
Em Go, também estão disponíveis [constantes de formato][const] predefinidas para datas e marcas temporais.

| Componente  | Opções                                         |
| ----------- | ---------------------------------------------- |
| Ano         | 2006 ; 06                                      |
| Mês         | Jan ; January ; 01 ; 1                         |
| Dia         | 02 ; 2 ; \_2 (para o 0 à esquerda)             |
| Dia da semana | Mon ; Monday                                 |
| Hora        | 15 ( formato de 24 horas ) ; 3 ; 03 (AM ou PM) |
| Minuto      | 04 ; 4                                         |
| Segundo     | 05 ; 5                                         |
| Marca AM/PM | PM                                             |
| Dia do ano  | 002 ; \_\_2                                    |

O tipo `time.Time` tem vários métodos para aceder a uma parte específica da data e hora. Por exemplo, a hora: [`Time.Hour()`][hour], o mês: [`Time.Month()`][month].
Podes saber mais sobre como isto funciona na [documentação oficial][time].

O [`time`][time] inclui outro tipo, [`Duration`][duration], que representa o tempo decorrido, para além de suporte para localizações/fusos horários, temporizadores e outras funcionalidades relacionadas que serão abordadas noutro conceito.

[time]: https://golang.org/pkg/time/#Time
[now]: https://golang.org/pkg/time/#Now
[const]: https://pkg.go.dev/time#pkg-constants
[format]: https://pkg.go.dev/time#Time.Format
[hour]: https://pkg.go.dev/time#Time.Hour
[month]: https://pkg.go.dev/time/#Time.Month
[duration]: https://pkg.go.dev/time#Duration
[parse]: https://golang.org/pkg/time/#Parse
