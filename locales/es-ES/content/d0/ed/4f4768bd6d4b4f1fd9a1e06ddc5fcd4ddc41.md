# Introducción

Un [`Time`][time] en Go es un tipo que describe un momento en el tiempo.
Se puede acceder a la información de fecha y hora, compararla y manipularla a través de sus métodos, pero también hay algunas funciones que se llaman directamente sobre el propio paquete `time`.
La fecha y hora actuales se pueden obtener con la función [`time.Now`][now].

La función [`time.Parse`][parse] analiza strings y los convierte en valores de tipo `Time`.
Go tiene una forma especial de definir el formato que esperas para el análisis.
Tienes que escribir un ejemplo del formato usando los valores de esta marca de tiempo especial:
`Mon Jan 2 15:04:05 -0700 MST 2006`.

Por ejemplo:

```go
import "time"

func parseTime() time.Time {
    date := "Tue, 09/22/1995, 13:00"
    layout := "Mon, 01/02/2006, 15:04"

    t, err := time.Parse(layout,date) // time.Time, error
}

// => 1995-09-22 13:00:00 +0000 UTC
```

El método [`Time.Format()`][format] devuelve una representación de la hora como string.
Igual que con la función `Parse`, el formato de destino se define de nuevo mediante un ejemplo que usa los valores de la marca de tiempo especial.

Por ejemplo:

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

## Opciones de formato

Para un formato personalizado, usa una combinación de estas opciones.
En Go también hay disponibles [constantes de formato][const] de fecha y marca de tiempo predefinidas.

| Componente      | Opciones                                       |
| --------------- | ---------------------------------------------- |
| Year            | 2006 ; 06                                      |
| Month           | Jan ; January ; 01 ; 1                         |
| Day             | 02 ; 2 ; \_2 (For preceding 0)                 |
| Weekday         | Mon ; Monday                                   |
| Hour            | 15 ( 24 hour time format ) ; 3 ; 03 (AM or PM) |
| Minute          | 04 ; 4                                         |
| Second          | 05 ; 5                                         |
| AM/PM Mark      | PM                                             |
| Day of Year     | 002 ; \_\_2                                    |

El tipo `time.Time` tiene varios métodos para acceder a una parte concreta de la hora, por ejemplo, la hora: [`Time.Hour()`][hour], o el mes: [`Time.Month()`][month].
Puedes encontrar más información sobre cómo funciona esto en la [documentación oficial][time].

El paquete [`time`][time] incluye otro tipo, [`Duration`][duration], que representa el tiempo transcurrido, además de compatibilidad con ubicaciones y zonas horarias, temporizadores y otras funcionalidades relacionadas que se tratarán en otro concepto.

[time]: https://golang.org/pkg/time/#Time
[now]: https://golang.org/pkg/time/#Now
[const]: https://pkg.go.dev/time#pkg-constants
[format]: https://pkg.go.dev/time#Time.Format
[hour]: https://pkg.go.dev/time#Time.Hour
[month]: https://pkg.go.dev/time/#Time.Month
[duration]: https://pkg.go.dev/time#Duration
[parse]: https://golang.org/pkg/time/#Parse
