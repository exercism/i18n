# Bevezetés

A Go beépített csomagot kínál `fmt` néven (formázócsomag), amely számos függvényt biztosít a bemenet és a kimenet formátumának alakításához.
A leggyakrabban használt függvény a `Sprintf`, amely _igékkel_, például `%s`-sel illeszt be értékeket egy stringbe, majd visszaadja azt a stringet.

```go
import "fmt"

food := "taco"
fmt.Sprintf("Bring me a %s", food)
// Returns: Bring me a taco
```

A Go-ban a lebegőpontos értékeket kényelmesen formázhatod a `Sprintf` igéivel: `%g` (tömör ábrázolás), `%e` (kitevő) vagy `%f` (kitevő nélkül).
Mindhárom ige segítségével szabályozhatod a mező szélességét és a szám pozícióját.

```go
import "fmt"

number := 4.3242
fmt.Sprintf("%.2f", number)
// Returns: 4.32
```

Az elérhető igék teljes listáját a [formázócsomag dokumentációjában][fmt-docs] találod.

A `fmt` más, stringekkel dolgozó függvényeket is tartalmaz, például a `Println`-t, amely egyszerűen kiírja a kapott argumentumokat a konzolra, és a `Printf`-et, amely ugyanúgy formázza a bemenetet, mint a `Sprintf`, mielőtt kiírná.

[fmt-docs]: https://pkg.go.dev/fmt
