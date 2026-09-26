# Introdução

Slices em Go são parecidos com listas ou arrays de outras linguagens.
Eles guardam vários elementos de um tipo específico (ou de uma interface).

Slices em Go são baseados em arrays.
Arrays têm tamanho fixo.
Um slice, por outro lado, é uma visão flexível e de tamanho dinâmico dos elementos de um array.

Um slice é escrito como `[]T`, com `T` sendo o tipo dos elementos do slice:

```go
var empty []int                 // an empty slice
withData := []int{0,1,2,3,4,5}  // a slice pre-filled with some data
```

Você pode obter ou definir um elemento em um determinado índice, começando em zero, usando a notação de colchetes:

```go
withData[1] = 5
x := withData[1] // x is now 5
```

Você pode criar um novo slice a partir de um slice existente obtendo um intervalo de elementos.
Mais uma vez usando a notação de colchetes, mas especificando tanto um índice inicial (inclusivo) quanto um final (exclusivo).
Se você não especificar um índice inicial, ele assume o valor 0.
Se você não especificar um índice final, ele assume o comprimento do slice.

```go
newSlice := withData[2:4]
// => []int{2,3}
newSlice := withData[:2]
// => []int{0,1}
newSlice := withData[2:]
// => []int{2,3,4,5}
newSlice := withData[:]
// => []int{0,1,2,3,4,5}
```

Você pode adicionar elementos a um slice usando a função `append`.
Abaixo, adicionamos `4` e `2` ao slice `a`.

```go
a := []int{1, 3}
a = append(a, 4, 2)
// => []int{1,3,4,2}
```

`append` sempre retorna um novo slice e, quando só queremos adicionar elementos a um slice existente, é comum reatribuí-lo à variável do slice que passamos como primeiro argumento, como fizemos acima.

`append` também pode ser usado para juntar dois slices:

```go
nextSlice := []int{100,101,102}
newSlice  := append(withData, nextSlice...)
// => []int{0,1,2,3,4,5,100,101,102}
```

## Índices em slices

Trabalhar com índices de slices sempre deve ser protegido de alguma forma por uma verificação que garanta que o índice realmente existe.
Deixar de fazer isso derruba a aplicação inteira.

## Slices vazios

Slices `nil` são o slice vazio padrão.
Eles não têm nenhuma desvantagem em relação a um slice sem valores.
A função `len` funciona em slices `nil`, itens podem ser adicionados sem inicializá-lo, e assim por diante.
Se for criar um novo slice, prefira `var s []int` (slice `nil`) a `s := []int{}` (slice vazio, não `nil`).

## Desempenho

Ao criar slices para serem preenchidos iterativamente, há uma melhoria fácil de desempenho, se o tamanho final do slice for conhecido.
A chave é minimizar o número de vezes que a memória precisa ser alocada, o que é bastante caro e acontece se o slice crescer além do espaço de memória alocado.
A forma mais segura de fazer isso é especificar uma capacidade `cap` para o slice com `s := make([]int, 0, cap)` e depois usar `append` no slice como de costume.
Assim, o espaço para `cap` itens é alocado imediatamente, enquanto o comprimento do slice é zero.
Na prática, `cap` costuma ser o comprimento de outro slice: `s := make([]int, 0, len(otherSlice))`.

## Append não é uma função pura

A função `append` do Go é otimizada para desempenho e, por isso, não faz uma cópia do slice de entrada.
Isso significa que o slice original (1º parâmetro de `append`) será alterado às vezes.
