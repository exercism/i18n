# Introdução

Um [`Time`][time] em Go é um tipo que descreve um momento no tempo.
As informações de data e hora podem ser acessadas, comparadas e manipuladas por meio de seus métodos, mas também há algumas funções chamadas no próprio pacote `time`.
A data e a hora atuais podem ser obtidas pela função [`time.Now`][now].

A função [`time.Parse`][parse] converte strings em valores do tipo `Time`.
Go tem um jeito especial de definir o layout que você espera para a conversão.
Você precisa escrever um exemplo do layout usando os valores deste timestamp especial:
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

O método [`Time.Format()`][format] retorna uma representação em string do tempo.
Assim como na função `Parse`, o layout desejado também é definido por meio de um exemplo que usa os valores do timestamp especial.

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

Para um layout personalizado, use uma combinação destas opções.
Em Go, também há [constantes de formato][const] predefinidas para data e timestamp.

| Tempo       | Opções                                         |
| ----------- | ---------------------------------------------- |
| Ano         | 2006 ; 06                                      |
| Mês         | Jan ; January ; 01 ; 1                         |
| Dia         | 02 ; 2 ; \_2 (para o 0 à esquerda)             |
| Dia da semana | Mon ; Monday                                 |
| Hora        | 15 ( formato de 24 horas ) ; 3 ; 03 (AM ou PM) |
| Minuto      | 04 ; 4                                         |
| Segundo     | 05 ; 5                                         |
| Marcador AM/PM | PM                                          |
| Dia do ano  | 002 ; \_\_2                                    |

O tipo `time.Time` tem vários métodos para acessar um momento específico. Por exemplo, Hora: [`Time.Hour()`][hour] , Mês: [`Time.Month()`][month].
Você pode encontrar mais sobre como isso funciona na [documentação oficial][time].

O pacote [`time`][time] também inclui outro tipo, [`Duration`][duration], que representa tempo decorrido, além de suporte a localizações/fusos horários, temporizadores e outras funcionalidades relacionadas que serão abordadas em outro conceito.

[time]: https://golang.org/pkg/time/#Time
[now]: https://golang.org/pkg/time/#Now
[const]: https://pkg.go.dev/time#pkg-constants
[format]: https://pkg.go.dev/time#Time.Format
[hour]: https://pkg.go.dev/time#Time.Hour
[month]: https://pkg.go.dev/time/#Time.Month
[duration]: https://pkg.go.dev/time#Duration
[parse]: https://golang.org/pkg/time/#Parse
