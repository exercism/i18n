# Introdução

O pacote `math/rand` dá suporte à geração de números pseudoaleatórios.

Veja como gerar um número inteiro aleatório entre `0` e `99`:

```go
import "math/rand"

n := rand.Intn(100) // n is a random int, 0 <= n < 100
```

A função `rand.Float64` retorna um número de ponto flutuante aleatório entre `0.0` e `1.0`:

```go
f := rand.Float64() // f is a random float64, 0.0 <= f < 1.0
```

Também há suporte para embaralhar um slice (ou outras estruturas de dados):

```go
x := []string{"a", "b", "c", "d", "e"}
// shuffling the slice put its elements into a random order
rand.Shuffle(len(x), func(i, j int) {
	x[i], x[j] = x[j], x[i]
})
```

## Sementes

As sequências de números geradas pelo pacote `math/rand` não são verdadeiramente aleatórias.
Dado um valor de "semente" específico, os resultados são totalmente determinísticos.

No Go 1.20+, a semente é escolhida automaticamente de forma aleatória, então você verá sequências diferentes de números aleatórios cada vez que rodar seu programa.

Em versões anteriores do Go, a semente era `1` por padrão.
Então, para obter sequências diferentes em várias execuções do programa, você tinha que definir manualmente a semente do gerador de números aleatórios, por exemplo, com a hora atual, antes de obter quaisquer números aleatórios.

```go
rand.Seed(time.Now().UnixNano())
```
