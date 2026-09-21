# Névjegy

Go-ban minden változónak van értéke.
Egy változó deklarálása érték hozzárendelése nélkül a típusának megfelelő nullértékre állítja.

Az alapvető típusok, köztük a `bool`, a numerikus típusok és a `string`, mindegyike rögzített nullértékkel rendelkezik:

| Típus                  | Nullérték |
| ---------------------- | ---------- |
| bool                   | `false`    |
| int, int8, int64, stb. | `0`        |
| float32, float64       | `0`        |
| complex64, complex128  | `0+0i`     |
| string                 | `""`       |

Az alapul szolgáló adatokra hivatkozó típusok, köztük a mutatók, függvények, interfészek, szeletek, csatornák és mapok, mindegyikének `nil` a nullértéke.
A tömbök és struktúrák azonban soha nem `nil`-ek, mert közvetlenül tárolják az adatot, nem pedig egy rá mutató hivatkozást.
A tömb minden eleme és a struktúra minden mezője a saját típusának nullértékére inicializálódik.
Például a `var a [3]int` létrehozza a `[0, 0, 0]` tömböt.

## Nullértékek deklarálása

A `var` kezdőérték nélkül bármely típus esetén a nullértéket adja:

```go
var myBool bool   // false
var mySlice []int // nil
var p Person      // Person{Name: "", Age: 0}
```

Struktúrák esetén egy összetett literál, a `T{}` is alternatíva:

```go
myPerson := Person{} // equivalent to var myPerson Person
```

A `new(T)` egy mutatót ad vissza bármely típus nullértékére.
Leggyakrabban struktúrákkal használják, bár alapvető típusokkal is működik:

```go
p := new(Person) // *Person, pointing to Person{Name: "", Age: 0}
s := new(string) // *string, pointing to ""
i := new(int)    // *int, pointing to 0
```

## Miért fontosak a nullértékek?

Go-ban a nullérték egy természetes és hasznos kezdőállapotot jelent.

A `bool` alapértelmezésben `false`, ami jelzőként működhet:

```go
var done bool // action not done yet
done = true   // action now done
```

Egy egész szám alapértelmezésben `0`, ami számlálóként működhet:

```go
var count int
count++ // 1
count++ // 2
```

Struktúráknál minden mező a saját típusának nullértékével indul.
Egy `Stack`, amelynek egyetlen `[]string` mezője van, deklaráláskor már egy működő üres verem.
Mivel az `append` új háttértömböt foglal, amikor egy nil szeletre hívják, nincs szükség konstruktorra:

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

## A nil kezelése

A `nil` nullértékkel rendelkező típusok többségét használat előtt inicializálni kell, különben pánikhoz vezetnek.
A `nil` szelet kivétel: végig lehet menni rajta, hozzá lehet fűzni, és biztonságosan átadható a `len` és `cap` függvénynek.

A map inicializálása szükséges, mielőtt értéket tárolunk benne:

```go
var m map[string]int
m["key"] = 1 // panic
```

A map inicializálása általában kétféleképpen történik:

```go
m1 := make(map[string]int)
m2 := map[string]int{}
m1["key"] = 1 // ok
m2["key"] = 1 // ok
```

Használat előtt ellenőrizd, hogy egy mutató `nil`-e:

```go
var p *int

if p == nil {
    fmt.Println("no value assigned")
    return
}

fmt.Println(*p) // p is not nil
```

Az alapvető típusok mindig konkrét értéket tárolnak, ezért a `nil`-hez hasonlításuk fordítási hiba:

```go
var myString string

if myString == nil {
    // compile error: mismatched types
}
```
