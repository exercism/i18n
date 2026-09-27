# Introduction

El paquete `math/rand` proporciona soporte para generar números pseudoaleatorios.

A continuación se muestra cómo generar un número entero aleatorio entre `0` y `99`:

```go
import "math/rand"

n := rand.Intn(100) // n is a random int, 0 <= n < 100
```

La función `rand.Float64` devuelve un número de coma flotante aleatorio entre `0.0` y `1.0`:

```go
f := rand.Float64() // f is a random float64, 0.0 <= f < 1.0
```

También hay soporte para mezclar un slice (u otras estructuras de datos):

```go
x := []string{"a", "b", "c", "d", "e"}
// shuffling the slice put its elements into a random order
rand.Shuffle(len(x), func(i, j int) {
	x[i], x[j] = x[j], x[i]
})
```

## Semillas

Las secuencias de números generadas por el paquete `math/rand` no son verdaderamente aleatorias.
Dado un valor de «semilla» específico, los resultados son completamente deterministas.

En Go 1.20+, la semilla se elige automáticamente al azar, así que verás una secuencia distinta de números aleatorios cada vez que ejecutes tu programa.

En versiones anteriores de Go, la semilla era `1` por defecto.
Así que, para obtener secuencias diferentes en distintas ejecuciones del programa, tenías que establecer manualmente la semilla del generador de números aleatorios, por ejemplo, con la hora actual, antes de obtener cualquier número aleatorio.

```go
rand.Seed(time.Now().UnixNano())
```
