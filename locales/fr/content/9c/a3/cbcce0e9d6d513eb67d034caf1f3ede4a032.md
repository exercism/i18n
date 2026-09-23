# À propos

En Go, chaque variable a une valeur.
Déclarer une variable sans lui affecter de valeur l'initialise à la valeur zéro de son type.

Les types de base, notamment `bool`, les types numériques et `string`, ont chacun une valeur zéro fixe :

| Type                   | Valeur zéro |
| ---------------------- | ----------- |
| bool                   | `false`     |
| int, int8, int64, etc. | `0`         |
| float32, float64       | `0`         |
| complex64, complex128  | `0+0i`      |
| string                 | `""`        |

Les types qui référencent des données sous-jacentes, notamment les pointeurs, les fonctions, les interfaces, les _slices_, les _channels_ et les _maps_, ont chacun pour valeur zéro `nil`.
En revanche, les tableaux et les structures ne sont jamais `nil`, car ils contiennent les données directement, et non une référence vers celles-ci.
Chaque élément d'un tableau et chaque champ d'une structure est initialisé à la valeur zéro de son propre type.
Par exemple, `var a [3]int` crée le tableau `[0, 0, 0]`.

## Déclare des valeurs zéro

`var` sans valeur initiale donne la valeur zéro, quel que soit le type :

```go
var myBool bool   // false
var mySlice []int // nil
var p Person      // Person{Name: "", Age: 0}
```

Pour les structures, un littéral composite `T{}` est une alternative :

```go
myPerson := Person{} // equivalent to var myPerson Person
```

`new(T)` renvoie un pointeur vers la valeur zéro, quel que soit le type.
On l'utilise le plus souvent avec des structures, mais cela fonctionne aussi pour les types de base :

```go
p := new(Person) // *Person, pointing to Person{Name: "", Age: 0}
s := new(string) // *string, pointing to ""
i := new(int)    // *int, pointing to 0
```

## Pourquoi les valeurs zéro sont importantes

En Go, la valeur zéro représente un état de départ naturel et utile.

Un `bool` vaut `false` par défaut, ce qui peut servir de drapeau :

```go
var done bool // action not done yet
done = true   // action now done
```

Un entier vaut `0` par défaut, ce qui peut servir de compteur :

```go
var count int
count++ // 1
count++ // 2
```

Pour les structures, chaque champ démarre à la valeur zéro de son propre type.
Dès sa déclaration, une `Stack` avec un seul champ `[]string` est déjà une pile vide qui fonctionne.
Comme `append` alloue un nouveau tableau sous-jacent lorsqu'on l'appelle sur un _slice_ `nil`, aucun constructeur n'est nécessaire :

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

## Travaille avec `nil`

La plupart des types dont la valeur zéro est `nil` doivent être initialisés avant utilisation, faute de quoi ils déclenchent une _panic_.
Un _slice_ `nil` fait exception : on peut le parcourir, y ajouter des éléments et le passer sans risque à `len` et `cap`.

Une _map_ doit être initialisée avant d'y stocker une valeur :

```go
var m map[string]int
m["key"] = 1 // panic
```

On initialise couramment une _map_ de deux façons différentes :

```go
m1 := make(map[string]int)
m2 := map[string]int{}
m1["key"] = 1 // ok
m2["key"] = 1 // ok
```

Vérifie qu'un pointeur n'est pas `nil` avant de l'utiliser :

```go
var p *int

if p == nil {
    fmt.Println("no value assigned")
    return
}

fmt.Println(*p) // p is not nil
```

Les types de base contiennent toujours une valeur concrète, donc les comparer à `nil` provoque une erreur de compilation :

```go
var myString string

if myString == nil {
    // compile error: mismatched types
}
```
