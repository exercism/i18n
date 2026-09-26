# Introducción

Go incluye un paquete integrado llamado `fmt` (paquete de formato) que ofrece una variedad de funciones para manipular el formato de la entrada y la salida.
La función más usada es `Sprintf`, que utiliza _verbos_ como `%s` para interpolar valores dentro de un string y devuelve ese string.

```go
import "fmt"

food := "taco"
fmt.Sprintf("Bring me a %s", food)
// Returns: Bring me a taco
```

En Go, formatear valores de punto flotante es muy cómodo con los verbos de Sprintf: `%g` (representación compacta), `%e` (exponente) o `%f` (sin exponente).
Los tres verbos permiten controlar el ancho del campo y la posición numérica.

```go
import "fmt"

number := 4.3242
fmt.Sprintf("%.2f", number)
// Returns: 4.32
```

Puedes encontrar una lista completa de los verbos disponibles en la [documentación del paquete de formato][fmt-docs].

`fmt` contiene otras funciones para trabajar con strings, como `Println`, que simplemente imprime en la consola los argumentos que recibe, y `Printf`, que formatea sus argumentos de la misma manera que `Sprintf` antes de imprimirlos.

[fmt-docs]: https://pkg.go.dev/fmt
