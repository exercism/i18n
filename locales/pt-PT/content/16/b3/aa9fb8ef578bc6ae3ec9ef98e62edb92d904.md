# Introdução

Normalmente, as funções aceitam apenas um número fixo de argumentos.
No entanto, se prefixares o tipo do último parâmetro com `...`, a função pode aceitar qualquer número de argumentos finais.
Isto faz com que o último parâmetro seja um _parâmetro variádico_.

```go
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}
```

Dentro da função, o parâmetro variádico é um slice:

```go
sum(1, 2, 3)    // nums is []int{1, 2, 3}
sum(1, 2, 3, 4) // nums is []int{1, 2, 3, 4}
sum()           // nums is []int{}
```

Uma função pode ter parâmetros não variádicos antes do variádico.
Uma função pode ter, no máximo, um parâmetro variádico e este tem de ser o último parâmetro.

```go
func greet(greeting string, names ...string) {
    for _, name := range names {
        fmt.Printf("%s, %s!\n", greeting, name)
    }
}
```

## Espalhar um slice

Para passar um slice para o parâmetro variádico, coloca `...` logo a seguir:

```go
nums := []int{1, 2, 3}
sum(nums...) // equivalent to sum(1, 2, 3)
```

`...` só é válido quando se passa um slice a um parâmetro variádico.
