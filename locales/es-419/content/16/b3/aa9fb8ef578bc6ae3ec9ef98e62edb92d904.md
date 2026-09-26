# Introducción

Normalmente, las funciones aceptan solo un número fijo de argumentos.
Sin embargo, si antepones `...` al tipo del último parámetro, la función puede aceptar cualquier cantidad de argumentos finales.
Esto convierte al último parámetro en un _parámetro variádico_.

```go
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}
```

Dentro de la función, el parámetro variádico es un slice:

```go
sum(1, 2, 3)    // nums is []int{1, 2, 3}
sum(1, 2, 3, 4) // nums is []int{1, 2, 3, 4}
sum()           // nums is []int{}
```

Una función puede tener parámetros no variádicos antes del variádico.
Una función puede tener como máximo un parámetro variádico y debe ser el último parámetro.

```go
func greet(greeting string, names ...string) {
    for _, name := range names {
        fmt.Printf("%s, %s!\n", greeting, name)
    }
}
```

## Expandir un slice

Para pasar un slice al parámetro variádico, escríbelo seguido de `...`:

```go
nums := []int{1, 2, 3}
sum(nums...) // equivalent to sum(1, 2, 3)
```

`...` solo es válido cuando pasas un slice a un parámetro variádico.
