# Acerca de

En Go, toda variable tiene un valor.
Declarar una variable sin asignarle un valor la establece en el valor cero para su tipo.

Los tipos básicos, incluidos `bool`, los tipos numéricos y `string`, tienen cada uno un valor cero fijo:

| Tipo                   | Valor cero |
| ---------------------- | ---------- |
| bool                   | `false`    |
| int, int8, int64, etc. | `0`        |
| float32, float64       | `0`        |
| complex64, complex128  | `0+0i`     |
| string                 | `""`       |

Los tipos que hacen referencia a datos subyacentes, incluidos los punteros, las funciones, las interfaces, los slices, los canales y los mapas, tienen cada uno un valor cero de `nil`.
Sin embargo, los arrays y las estructuras nunca son `nil` porque contienen los datos directamente, no una referencia a ellos.
Cada elemento de un array y cada campo de una estructura se inicializa con el valor cero de su propio tipo.
Por ejemplo, `var a [3]int` crea el array `[0, 0, 0]`.

## Declaración de valores cero

`var` sin un valor inicial da el valor cero para cualquier tipo:

```go
var myBool bool   // false
var mySlice []int // nil
var p Person      // Person{Name: "", Age: 0}
```

Para las estructuras, un literal compuesto `T{}` es una alternativa:

```go
myPerson := Person{} // equivalent to var myPerson Person
```

`new(T)` devuelve un puntero al valor cero de cualquier tipo.
Se usa más comúnmente con estructuras, aunque también funciona para tipos básicos:

```go
p := new(Person) // *Person, pointing to Person{Name: "", Age: 0}
s := new(string) // *string, pointing to ""
i := new(int)    // *int, pointing to 0
```

## Por qué importan los valores cero

En Go, un valor cero representa un estado inicial natural y útil.

Un `bool` toma el valor `false` por defecto, lo que puede funcionar como una bandera:

```go
var done bool // action not done yet
done = true   // action now done
```

Un entero toma el valor `0` por defecto, lo que puede funcionar como un contador:

```go
var count int
count++ // 1
count++ // 2
```

Para las estructuras, cada campo comienza con el valor cero de su propio tipo.
Un `Stack` con un único campo `[]string` ya es una pila vacía funcional cuando se declara.
Como `append` asigna un nuevo array subyacente cuando se llama en un slice nil, no se necesita un constructor:

```go
type Stack struct {
    items []string
}

func (s *Stack) Push(v string) {
    s.items = append(s.items, v)
}

func (s *Stack) IsEmpty() bool {
    return len(s.items) == 0
}

var s Stack
fmt.Println(s.IsEmpty()) // true
s.Push("a") // append allocates a new backing array
fmt.Println(s.IsEmpty()) // false
```

## Trabajar con nil

La mayoría de los tipos con valor cero `nil` requieren inicialización antes de usarse o entran en pánico.
Un slice `nil` es la excepción: puedes recorrerlo, añadirle elementos y pasarlo a `len` y `cap` de forma segura.

Un mapa debe inicializarse antes de almacenar un valor:

```go
var m map[string]int
m["key"] = 1 // panic
```

Un mapa se inicializa comúnmente de dos maneras diferentes:

```go
m1 := make(map[string]int)
m2 := map[string]int{}
m1["key"] = 1 // ok
m2["key"] = 1 // ok
```

Verifica que un puntero no sea `nil` antes de usarlo:

```go
var p *int

if p == nil {
    fmt.Println("no value assigned")
    return
}

fmt.Println(*p) // p is not nil
```

Los tipos básicos siempre contienen un valor concreto, por lo que compararlos con `nil` es un error de compilación:

```go
var myString string

if myString == nil {
    // compile error: mismatched types
}
```
