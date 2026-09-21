# Bevezetés

A függvények általában csak rögzített számú argumentumot fogadnak el.
Ha azonban a `...`-ot az utolsó paraméter típusa elé írod, a függvény tetszőleges számú, a végére írt argumentumot is elfogad.
Ezzel az utolsó paraméterből _variadikus paraméter_ lesz.

```go
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}
```

A függvényen belül a variadikus paraméter egy slice:

```go
sum(1, 2, 3)    // nums is []int{1, 2, 3}
sum(1, 2, 3, 4) // nums is []int{1, 2, 3, 4}
sum()           // nums is []int{}
```

A függvénynek a variadikus paraméter előtt lehetnek nem variadikus paraméterei is.
Egy függvénynek legfeljebb egy variadikus paramétere lehet, és annak az utolsó paraméternek kell lennie.

```go
func greet(greeting string, names ...string) {
    for _, name := range names {
        fmt.Printf("%s, %s!\n", greeting, name)
    }
}
```

## Slice szétszórása

Ha egy slice-ot a variadikus paraméternek akarsz átadni, írd utána a `...`-ot:

```go
nums := []int{1, 2, 3}
sum(nums...) // equivalent to sum(1, 2, 3)
```

A `...` csak akkor érvényes, ha slice-ot adsz át egy variadikus paraméternek.
