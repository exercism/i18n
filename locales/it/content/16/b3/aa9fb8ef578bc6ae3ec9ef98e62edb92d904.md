# Introduzione

Di solito, le funzioni accettano solo un numero fisso di argomenti.
Tuttavia, se fai precedere da `...` il tipo dell'ultimo parametro, la funzione può accettare un numero qualsiasi di argomenti finali.
Questo rende l'ultimo parametro un _parametro variadico_.

```go
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}
```

All'interno della funzione, il parametro variadico è uno slice:

```go
sum(1, 2, 3)    // nums is []int{1, 2, 3}
sum(1, 2, 3, 4) // nums is []int{1, 2, 3, 4}
sum()           // nums is []int{}
```

Una funzione può avere parametri non variadici prima di quello variadico.
Una funzione può avere al massimo un parametro variadico: deve essere l'ultimo parametro.

```go
func greet(greeting string, names ...string) {
    for _, name := range names {
        fmt.Printf("%s, %s!\n", greeting, name)
    }
}
```

## Espandere uno slice

Per passare uno slice al parametro variadico, scrivi `...` subito dopo:

```go
nums := []int{1, 2, 3}
sum(nums...) // equivalent to sum(1, 2, 3)
```

`...` è valido solo quando passi uno slice a un parametro variadico.
