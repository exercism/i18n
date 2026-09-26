# Sobre

Em Go, toda variável tem um valor.
Declarar uma variável sem atribuir um valor faz com que ela receba o valor zero do seu tipo.

Os tipos básicos, incluindo `bool`, os tipos numéricos e `string`, têm cada um um valor zero fixo:

| Tipo                   | Valor zero |
| ---------------------- | ---------- |
| bool                   | `false`    |
| int, int8, int64, etc. | `0`        |
| float32, float64       | `0`        |
| complex64, complex128  | `0+0i`     |
| string                 | `""`       |

Os tipos que fazem referência a dados subjacentes, incluindo ponteiros, funções, interfaces, slices, canais e mapas, têm cada um um valor zero igual a `nil`.
No entanto, arrays e structs nunca são `nil`, porque armazenam os dados diretamente, e não uma referência a eles.
Cada elemento de um array e cada campo de uma struct é inicializado com o valor zero do seu próprio tipo.
Por exemplo, `var a [3]int` cria o array `[0, 0, 0]`.

## Declarando valores zero

`var` sem um valor inicial fornece o valor zero para qualquer tipo:

```go
var myBool bool   // false
var mySlice []int // nil
var p Person      // Person{Name: "", Age: 0}
```

Para structs, um literal composto `T{}` é uma alternativa:

```go
myPerson := Person{} // equivalent to var myPerson Person
```

`new(T)` retorna um ponteiro para o valor zero de qualquer tipo.
É usado com mais frequência com structs, embora também funcione com tipos básicos:

```go
p := new(Person) // *Person, pointing to Person{Name: "", Age: 0}
s := new(string) // *string, pointing to ""
i := new(int)    // *int, pointing to 0
```

## Por que os valores zero importam

Em Go, um valor zero representa um estado inicial natural e útil.

Um `bool` tem `false` como valor padrão, o que pode funcionar como uma flag:

```go
var done bool // action not done yet
done = true   // action now done
```

Um inteiro tem `0` como valor padrão, o que pode funcionar como um contador:

```go
var count int
count++ // 1
count++ // 2
```

No caso de structs, cada campo começa com o valor zero do seu próprio tipo.
Uma `Stack` com um único campo `[]string` já é uma pilha vazia que funciona quando declarada.
Como `append` aloca um novo array subjacente quando é chamado em um slice `nil`, nenhum construtor é necessário:

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

## Trabalhando com nil

A maioria dos tipos com valor zero `nil` exige inicialização antes do uso, ou entra em pânico.
Um slice `nil` é a exceção: você pode iterar sobre ele, fazer `append` nele e passá-lo para `len` e `cap` sem problemas.

Um mapa deve ser inicializado antes de armazenar um valor:

```go
var m map[string]int
m["key"] = 1 // panic
```

Um mapa costuma ser inicializado de duas maneiras diferentes:

```go
m1 := make(map[string]int)
m2 := map[string]int{}
m1["key"] = 1 // ok
m2["key"] = 1 // ok
```

Verifique se um ponteiro é `nil` antes de usá-lo:

```go
var p *int

if p == nil {
    fmt.Println("no value assigned")
    return
}

fmt.Println(*p) // p is not nil
```

Os tipos básicos sempre contêm um valor concreto, então compará-los com `nil` é um erro de compilação:

```go
var myString string

if myString == nil {
    // compile error: mismatched types
}
```
