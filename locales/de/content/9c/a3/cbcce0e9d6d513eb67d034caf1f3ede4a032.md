# Überblick

In Go hat jede Variable einen Wert.
Deklarierst du eine Variable, ohne ihr einen Wert zuzuweisen, wird sie auf den Zero-Wert ihres Typs gesetzt.

Basistypen, darunter `bool`, numerische Typen und `string`, haben jeweils einen festen Zero-Wert:

| Typ                    | Zero-Wert  |
| ---------------------- | ---------- |
| bool                   | `false`    |
| int, int8, int64 usw.  | `0`        |
| float32, float64       | `0`        |
| complex64, complex128  | `0+0i`     |
| string                 | `""`       |

Typen, die auf darunterliegende Daten verweisen, darunter Zeiger, Funktionen, Interfaces, Slices, Channels und Maps, haben jeweils einen Zero-Wert von `nil`.
Arrays und Structs sind jedoch nie `nil`, weil sie die Daten direkt enthalten und nicht bloß einen Verweis darauf.
Jedes Element eines Arrays und jedes Feld eines Structs wird mit dem Zero-Wert seines eigenen Typs initialisiert.
Zum Beispiel erzeugt `var a [3]int` das Array `[0, 0, 0]`.

## Zero-Werte deklarieren

`var` ohne Anfangswert ergibt für jeden Typ den Zero-Wert:

```go
var myBool bool   // false
var mySlice []int // nil
var p Person      // Person{Name: "", Age: 0}
```

Für Structs ist ein zusammengesetztes Literal `T{}` eine Alternative:

```go
myPerson := Person{} // equivalent to var myPerson Person
```

`new(T)` gibt einen Zeiger auf den Zero-Wert eines beliebigen Typs zurück.
Am häufigsten wird es mit Structs verwendet, es funktioniert aber auch mit Basistypen:

```go
p := new(Person) // *Person, pointing to Person{Name: "", Age: 0}
s := new(string) // *string, pointing to ""
i := new(int)    // *int, pointing to 0
```

## Warum Zero-Werte wichtig sind

In Go steht ein Zero-Wert für einen natürlichen und nützlichen Ausgangszustand.

Ein `bool` ist standardmäßig `false`, was als Flag dienen kann:

```go
var done bool // action not done yet
done = true   // action now done
```

Eine Ganzzahl ist standardmäßig `0`, was als Zähler dienen kann:

```go
var count int
count++ // 1
count++ // 2
```

Bei Structs beginnt jedes Feld mit dem Zero-Wert seines eigenen Typs.
Ein `Stack` mit einem einzigen `[]string`-Feld ist bei der Deklaration bereits ein funktionierender leerer Stack.
Weil `append` beim Aufruf auf einem nil-Slice ein neues zugrundeliegendes Array alloziert, wird kein Konstruktor benötigt:

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

## Arbeiten mit Nil

Die meisten Typen mit `nil` als Zero-Wert müssen vor der Verwendung initialisiert werden, sonst kommt es zu einer Panik.
Ein `nil`-Slice ist die Ausnahme: Du kannst mit `range` darüber iterieren, mit `append` etwas hinzufügen und es sicher an `len` und `cap` übergeben.

Eine Map sollte initialisiert werden, bevor du einen Wert darin speicherst:

```go
var m map[string]int
m["key"] = 1 // panic
```

Eine Map wird üblicherweise auf zwei verschiedene Arten initialisiert:

```go
m1 := make(map[string]int)
m2 := map[string]int{}
m1["key"] = 1 // ok
m2["key"] = 1 // ok
```

Prüfe einen Zeiger auf `nil`, bevor du ihn verwendest:

```go
var p *int

if p == nil {
    fmt.Println("no value assigned")
    return
}

fmt.Println(*p) // p is not nil
```

Basistypen enthalten immer einen konkreten Wert, deshalb ist der Vergleich mit `nil` ein Compilerfehler:

```go
var myString string

if myString == nil {
    // compile error: mismatched types
}
```
