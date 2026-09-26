# Introdução

Normalmente, as funções aceitam apenas um número fixo de argumentos.
Porém, se você prefixar o tipo do último parâmetro com `...`, a função pode aceitar qualquer número de argumentos ao final.
Isso faz com que o último parâmetro seja um _parâmetro variádico_.

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

Uma função pode ter parâmetros que não são variádicos antes do variádico.
Uma função pode ter no máximo um parâmetro variádico, e ele precisa ser o último parâmetro.

```go
func greet(greeting string, names ...string) {
    for _, name := range names {
        fmt.Printf("%s, %s!\n", greeting, name)
    }
}
```

## Espalhando um slice

Para passar um slice ao parâmetro variádico, coloque `...` logo depois dele:

```go
nums := []int{1, 2, 3}
sum(nums...) // equivalent to sum(1, 2, 3)
```

`...` só é válido ao passar um slice para um parâmetro variádico.
