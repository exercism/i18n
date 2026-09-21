# Bevezetés

A `math/rand` csomag támogatást nyújt pszeudo-véletlen számok előállításához.

Így hozhatsz létre egy véletlen egész számot `0` és `99` között:

```go
import "math/rand"

n := rand.Intn(100) // n is a random int, 0 <= n < 100
```

A `rand.Float64` függvény egy véletlen lebegőpontos számot ad vissza `0.0` és `1.0` között:

```go
f := rand.Float64() // f is a random float64, 0.0 <= f < 1.0
```

Egy szelet (vagy más adatszerkezet) összekeverésére is van támogatás:

```go
x := []string{"a", "b", "c", "d", "e"}
// shuffling the slice put its elements into a random order
rand.Shuffle(len(x), func(i, j int) {
	x[i], x[j] = x[j], x[i]
})
```

## Magok

A `math/rand` csomag által előállított számsorozatok nem valódi véletlen számok.
Egy adott „mag” érték esetén az eredmények teljesen determinisztikusak.

A Go 1.20-as és újabb verzióiban a magot automatikusan véletlenszerűen választja ki, így minden alkalommal, amikor futtatod a programot, a véletlen számok más sorozatát fogod látni.

A Go korábbi verzióiban a mag alapértelmezés szerint `1` volt.
Ezért ahhoz, hogy a program különböző futásaihoz különböző számsorozatokat kapj, a véletlenszám-generátor magját kézzel kellett beállítanod, például az aktuális idővel, mielőtt bármilyen véletlen számot lekérnél.

```go
rand.Seed(time.Now().UnixNano())
```
