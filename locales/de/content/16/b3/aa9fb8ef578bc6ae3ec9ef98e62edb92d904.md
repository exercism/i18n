# Einführung

Normalerweise akzeptieren Funktionen nur eine feste Anzahl von Argumenten.
Wenn du jedoch den Typ des letzten Parameters mit `...` versiehst, kann die Funktion beliebig viele nachfolgende Argumente annehmen.
Dadurch wird der letzte Parameter ein _variadischer Parameter_.

```go
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}
```

Innerhalb der Funktion ist der variadische Parameter ein Slice:

```go
sum(1, 2, 3)    // nums is []int{1, 2, 3}
sum(1, 2, 3, 4) // nums is []int{1, 2, 3, 4}
sum()           // nums is []int{}
```

Eine Funktion kann nicht-variadische Parameter vor dem variadischen Parameter haben.
Eine Funktion kann höchstens einen variadischen Parameter haben, und dieser muss der letzte Parameter sein.

```go
func greet(greeting string, names ...string) {
    for _, name := range names {
        fmt.Printf("%s, %s!\n", greeting, name)
    }
}
```

## Ein Slice entpacken

Um ein Slice an den variadischen Parameter zu übergeben, hänge `...` daran an:

```go
nums := []int{1, 2, 3}
sum(nums...) // equivalent to sum(1, 2, 3)
```

`...` ist nur gültig, wenn du ein Slice an einen variadischen Parameter übergibst.
