# Introducción

Un [`Time`][time] en Go es un tipo que describe un momento en el tiempo.
Se puede acceder a la información de fecha y hora, compararla y manipularla a través de sus métodos, pero también hay algunas funciones que se llaman sobre el propio paquete `time`.
La fecha y la hora actuales se pueden obtener con la función [`time.Now`][now].

La función [`time.Parse`][parse] analiza strings y los convierte en valores de tipo `Time`.
Go tiene una forma especial de definir el formato que esperas para ese análisis.
Debes escribir un ejemplo del formato usando los valores de esta marca de tiempo especial:
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

El método [`Time.Format()`][format] devuelve una representación del tiempo como string.
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
En Go también hay [constantes de formato][const] predefinidas para fechas y marcas de tiempo.

| Componente    | Opciones                                       |
| ----------- | ---------------------------------------------- |
| Año         | 2006 ; 06                                      |
| Mes         | Jan ; January ; 01 ; 1                         |
| Día         | 02 ; 2 ; \_2 (para el 0 inicial)               |
| Día de la semana | Mon ; Monday                              |
| Hora        | 15 (formato de 24 horas) ; 3 ; 03 (AM o PM)    |
| Minuto      | 04 ; 4                                         |
| Segundo     | 05 ; 5                                         |
| Indicador AM/PM | PM                                         |
| Día del año | 002 ; \_\_2                                    |

El tipo `time.Time` tiene varios métodos para acceder a una parte concreta del tiempo. Por ejemplo: hora, [`Time.Hour()`][hour]; mes, [`Time.Month()`][month].
Puedes encontrar más sobre cómo funciona esto en la [documentación oficial][time].

El paquete [`time`][time] incluye otro tipo, [`Duration`][duration], que representa el tiempo transcurrido, además de soporte para ubicaciones y zonas horarias, temporizadores y otras funcionalidades relacionadas que se cubrirán en otro concepto.

[time]: https://golang.org/pkg/time/#Time
[now]: https://golang.org/pkg/time/#Now
[const]: https://pkg.go.dev/time#pkg-constants
[format]: https://pkg.go.dev/time#Time.Format
[hour]: https://pkg.go.dev/time#Time.Hour
[month]: https://pkg.go.dev/time/#Time.Month
[duration]: https://pkg.go.dev/time#Duration
[parse]: https://golang.org/pkg/time/#Parse
