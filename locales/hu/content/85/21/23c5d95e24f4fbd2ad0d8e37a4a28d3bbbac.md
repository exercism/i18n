# Kiegészítés az utasításokhoz

## Megvalósítás

A `diagram` argumentum minden sort egy `\n`-nel kezd.
Így a Go nyers string literáljaival a diagramok szépen, két balra igazított sorban jeleníthetők meg a forráskódban.
A teszt például a következőt tartalmazhatja.

```go
        diagram := `
VVCCGG
VVCCGG`
```

Ha a `children` argumentum `nil`, használd a fenti utasításokban megadott gyerekek listáját.
Ha viszont nem `nil`, akkor a megadott értéket használd.
