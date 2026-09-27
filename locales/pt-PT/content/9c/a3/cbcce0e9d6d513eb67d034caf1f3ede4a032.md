# Sobre

Em Go, todas as variáveis têm um valor.
Declarar uma variável sem lhe atribuir um valor define-a como o valor zero do seu tipo.

Os tipos básicos, incluindo `bool`, tipos numéricos e `string`, têm cada um um valor zero fixo:

| Tipo                   | Valor zero |
| ---------------------- | ---------- |
| bool                   | `false`    |
| int, int8, int64, etc. | `0`        |
| float32, float64       | `0`        |
| complex64, complex128  | `0+0i`     |
| string                 | `""`       |

Os tipos que referenciam dados subjacentes, incluindo ponteiros, funções, interfaces, slices, canais e mapas, têm cada um um valor zero de `nil`.
No entanto, os arrays e as structs nunca são `nil`, porque contêm os dados diretamente, e não uma referência a eles.
Cada elemento de um array e cada campo de uma struct é inicializado com o valor zero do seu próprio tipo.
Por exemplo, `var a [3]int` cria o array `[0, 0, 0]`.

## Declarar valores zero

`var` sem um valor inicial dá o valor zero para qualquer tipo:

```go
var myBool bool   // false
var mySlice []int // nil
var p Person      // Person{Name: "", Age: 0}
```

Para structs, um literal composto `T{}` é uma alternativa:

```go
myPerson := Person{} // equivalent to var myPerson Person
```

`new(T)` devolve um ponteiro para o valor zero de qualquer tipo.
É mais comummente usado com structs, embora também funcione com tipos básicos:

```go
p := new(Person) // *Person, pointing to Person{Name: "", Age: 0}
s := new(string) // *string, pointing to ""
i := new(int)    // *int, pointing to 0
```

## Porque é que os valores zero importam

Em Go, um valor zero representa um estado inicial natural e útil.

Um `bool` tem como valor predefinido `false`, o que pode funcionar como um indicador:

```go
var done bool // action not done yet
done = true   // action now done
```

Um inteiro tem como valor predefinido `0`, o que pode funcionar como um contador:

```go
var count int
count++ // 1
count++ // 2
```

Para structs, cada campo começa com o valor zero do seu próprio tipo.
Uma `Stack` com um único campo `[]string` já é uma pilha vazia funcional quando é declarada.
Como `append` aloca um novo array subjacente quando é chamado numa slice nil, não é preciso um construtor:

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

## Trabalhar com nil

A maioria dos tipos com valores zero `nil` precisa de inicialização antes de ser usada; caso contrário, provoca um panic.
Uma slice `nil` é a exceção: podes percorrê-la, acrescentar-lhe elementos e passá-la a `len` e `cap` em segurança.

Um mapa deve ser inicializado antes de guardar um valor:

```go
var m map[string]int
m["key"] = 1 // panic
```

Um mapa é normalmente inicializado de duas formas diferentes:

```go
m1 := make(map[string]int)
m2 := map[string]int{}
m1["key"] = 1 // ok
m2["key"] = 1 // ok
```

Verifica se um ponteiro é `nil` antes de o usares:

```go
var p *int

if p == nil {
    fmt.Println("no value assigned")
    return
}

fmt.Println(*p) // p is not nil
```

Os tipos básicos têm sempre um valor concreto, por isso compará-los com `nil` é um erro de compilação:

```go
var myString string

if myString == nil {
    // compile error: mismatched types
}
```
