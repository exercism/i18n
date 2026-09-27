# Introdução

Os slices em Go são semelhantes a listas ou arrays de outras linguagens.
Guardam vários elementos de um tipo específico (ou interface).

Os slices em Go baseiam-se em arrays.
Os arrays têm um tamanho fixo.
Um slice, por outro lado, é uma vista flexível e de tamanho dinâmico sobre os elementos de um array.

Um slice escreve-se como `[]T`, em que `T` é o tipo dos elementos do slice:

```go
var empty []int                 // an empty slice
withData := []int{0,1,2,3,4,5}  // a slice pre-filled with some data
```

Podes obter ou definir um elemento num determinado índice (com base em zero) usando a notação de parênteses retos:

```go
withData[1] = 5
x := withData[1] // x is now 5
```

Podes criar um novo slice a partir de um slice existente, obtendo um intervalo de elementos.
Mais uma vez com a notação de parênteses retos, mas especificando um índice inicial (inclusive) e um índice final (exclusive).
Se não especificares um índice inicial, este assume o valor 0.
Se não especificares um índice final, este assume o comprimento do slice.

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

Podes adicionar elementos a um slice com a função `append`.
Em baixo, acrescentamos `4` e `2` ao slice `a`.

```go
a := []int{1, 3}
a = append(a, 4, 2)
// => []int{1,3,4,2}
```

A função `append` devolve sempre um novo slice e, quando só queremos acrescentar elementos a um slice existente, é comum voltar a atribuí-lo à variável do slice que passamos como primeiro argumento, como fizemos em cima.

Também podes usar a função `append` para juntar dois slices:

```go
nextSlice := []int{100,101,102}
newSlice  := append(withData, nextSlice...)
// => []int{0,1,2,3,4,5,100,101,102}
```

## Índices em slices

O trabalho com índices de slices deve estar sempre protegido, de alguma forma, por uma verificação que garanta que o índice existe de facto.
Se não o fizeres, a aplicação inteira vai abaixo.

## Slices vazios

Os slices `nil` são o slice vazio predefinido.
Não têm qualquer desvantagem em relação a um slice sem valores.
A função `len` funciona com slices `nil`, podes adicionar itens sem o inicializar, e assim por diante.
Se criares um novo slice, prefere `var s []int` (slice `nil`) a `s := []int{}` (slice vazio, não `nil`).

## Desempenho

Ao criar slices que vão ser preenchidos de forma iterativa, há uma otimização simples ao teu alcance para melhorar o desempenho, se souberes o tamanho final do slice.
O essencial é minimizar o número de vezes que é preciso alocar memória, algo bastante caro e que acontece se o slice crescer para além do espaço de memória que lhe foi alocado.
A forma mais segura de o fazer é especificar uma capacidade `cap` para o slice com `s := make([]int, 0, cap)` e depois usar `append` normalmente.
Assim, o espaço para `cap` itens é alocado imediatamente, enquanto o comprimento do slice é zero.
Na prática, `cap` é muitas vezes o comprimento de outro slice: `s := make([]int, 0, len(otherSlice))`.

## O `append` não é uma função pura

A função `append` do Go está otimizada para o desempenho e, por isso, não faz uma cópia do slice de entrada.
Isto significa que o slice original (o primeiro parâmetro de `append`) vai ser alterado às vezes.
