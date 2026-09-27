# Introducción

Go incluye un paquete integrado llamado `fmt` (paquete de formato) que ofrece varias funciones para manipular el formato de la entrada y la salida.
La función más utilizada es `Sprintf`, que usa _verbos_ como `%s` para interpolar valores en un string y devuelve ese string.

```go
import "fmt"

food := "taco"
fmt.Sprintf("Bring me a %s", food)
// Returns: Bring me a taco
```

En Go, los valores de coma flotante se pueden formatear fácilmente con los verbos de Sprintf: `%g` (representación compacta), `%e` (exponente) o `%f` (sin exponente).
Los tres verbos permiten controlar el ancho del campo y la posición numérica.

```go
import "fmt"

number := 4.3242
fmt.Sprintf("%.2f", number)
// Returns: 4.32
```

Puedes encontrar una lista completa de los verbos disponibles en la [documentación del paquete de formato][fmt-docs].

`fmt` contiene otras funciones para trabajar con strings, como `Println`, que simplemente imprime en la consola los argumentos que recibe, y `Printf`, que da formato a la entrada igual que `Sprintf` antes de imprimirla.

[fmt-docs]: https://pkg.go.dev/fmt
