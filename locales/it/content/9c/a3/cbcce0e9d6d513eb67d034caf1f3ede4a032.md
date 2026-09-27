# Informazioni

In Go, ogni variabile ha un valore.
Dichiarare una variabile senza assegnarle un valore la imposta al valore zero del suo tipo.

I tipi di base, tra cui `bool`, i tipi numerici e `string`, hanno ciascuno un valore zero fisso:

| Tipo                   | Valore zero |
| ---------------------- | ----------- |
| bool                   | `false`     |
| int, int8, int64, ecc. | `0`         |
| float32, float64       | `0`         |
| complex64, complex128  | `0+0i`      |
| string                 | `""`        |

I tipi che fanno riferimento a dati sottostanti, tra cui puntatori, funzioni, interfacce, slice, canali e mappe, hanno ciascuno un valore zero pari a `nil`.
Tuttavia, gli array e le struct non sono mai `nil`, perché contengono i dati direttamente, non un riferimento a essi.
Ogni elemento di un array e ogni campo di una struct viene inizializzato al valore zero del proprio tipo.
Ad esempio, `var a [3]int` crea l'array `[0, 0, 0]`.

## Dichiarare i valori zero

`var` senza un valore iniziale dà il valore zero per qualsiasi tipo:

```go
var myBool bool   // false
var mySlice []int // nil
var p Person      // Person{Name: "", Age: 0}
```

Per le struct, un letterale composito `T{}` è un'alternativa:

```go
myPerson := Person{} // equivalent to var myPerson Person
```

`new(T)` restituisce un puntatore al valore zero di qualsiasi tipo.
È usato più comunemente con le struct, sebbene funzioni anche per i tipi di base:

```go
p := new(Person) // *Person, pointing to Person{Name: "", Age: 0}
s := new(string) // *string, pointing to ""
i := new(int)    // *int, pointing to 0
```

## Perché i valori zero sono importanti

In Go, un valore zero rappresenta uno stato iniziale naturale e utile.

Un `bool` ha come valore predefinito `false`, che può funzionare come flag:

```go
var done bool // action not done yet
done = true   // action now done
```

Un intero ha come valore predefinito `0`, che può funzionare come contatore:

```go
var count int
count++ // 1
count++ // 2
```

Per le struct, ogni campo parte dal valore zero del proprio tipo.
Uno `Stack` con un singolo campo `[]string` è già uno stack vuoto funzionante quando viene dichiarato.
Poiché `append` alloca un nuovo array sottostante quando viene chiamato su uno slice nil, non serve un costruttore:

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

## Lavorare con nil

La maggior parte dei tipi con valori zero `nil` richiede un'inizializzazione prima dell'uso, altrimenti vanno in panic.
Uno slice `nil` è l'eccezione: puoi iterarci sopra, aggiungervi elementi e passarlo in sicurezza a `len` e `cap`.

Una mappa va inizializzata prima di memorizzare un valore:

```go
var m map[string]int
m["key"] = 1 // panic
```

Una mappa viene comunemente inizializzata in due modi diversi:

```go
m1 := make(map[string]int)
m2 := map[string]int{}
m1["key"] = 1 // ok
m2["key"] = 1 // ok
```

Controlla che un puntatore non sia `nil` prima di usarlo:

```go
var p *int

if p == nil {
    fmt.Println("no value assigned")
    return
}

fmt.Println(*p) // p is not nil
```

I tipi di base contengono sempre un valore concreto, quindi confrontarli con `nil` è un errore di compilazione:

```go
var myString string

if myString == nil {
    // compile error: mismatched types
}
```
