# Introdução

Um `vector` no R é uma coleção de valores do mesmo `mode`: `numeric`, `character`, etc. Se lhe deres valores de tipos diferentes, o R converte-os silenciosamente para um tipo comum, normalmente character, o que pode dar resultados inesperados.

## Criar vectors

Se já tens todos os valores, usa `c()` (abreviatura de "concatenate" ou "combine"):

```R
x <- 10
v <- c(4, 7, x)
```

A função `c()` é muito flexível, e os valores de entrada podem incluir outros vectors e intervalos.
`c()` aceita qualquer número e variedade de valores de entrada e achata-os num único vector.

## Intervalos

Para um intervalo de valores consecutivos (crescentes ou decrescentes), podes usar a notação `:`

```R
v <- 1:5 # equivalent to c(1, 2, 3, 4, 5)
w <- 10:7 # c(10, 9, 8, 7)
```

## Aceder aos elementos de um vector

Como em muitas linguagens, podemos usar o índice entre parênteses retos:

```R
> v <- 4:7
> v[2]
[1] 5
> v[2:4]
[1] 5 6 7
```

Mas atenção: ***o R usa indexação a partir de 1 por predefinição***.

Isto é comum em linguagens científicas (Fortran, Matlab, Julia), mas é diferente da indexação a partir de zero do C e dos muitos descendentes que se seguiram.

Podes usar intervalos, como no exemplo acima, mas também na muito flexível função `c()`:

```R
v <- c(4, 7, 10)
w <- c(2, v[2:3], 11) # c(2, 7, 10, 11)
```

Os `vectors` (como quase tudo no R) podem ser tratados como mutáveis, com uma sintaxe igualmente flexível para escrever num único elemento ou em vários:

```R
> v <- 1:10
> v[2] <- 42
> v[4:6] <- c(11, 12, 13)
> v
 [1]  1 42  3 11 12 13  7  8  9 10
```

## Índices negativos

Quem está habituado a outras linguagens pode pensar que `v[-1]` é uma forma de aceder ao último elemento de um vector.
Errado!

Na verdade, os índices negativos são uma forma de ***remover*** um elemento, devolvendo um vector mais curto:

```R
> v <- c(2, 4, 6)
> v[-2]
[1] 2 6  # second element gone
```
