# Introdução

A instrução `guard` do Swift serve para sair antecipadamente de funções, laços ou métodos quando uma condição obrigatória não é satisfeita:

```swift
guard myValue >= 0 else { return 0 }
let root = myValue.squareRoot()
```

No exemplo acima, o `guard` avalia a expressão Boolean que vem depois dele.
Se a condição for `true`, a execução continua com o código que vem depois da instrução `guard`.
Se a condição for `false`, o código dentro do bloco `else` é executado.

Ao contrário de uma condicional `if`:

- Uma instrução `guard` **precisa** incluir uma cláusula `else`.
- A cláusula `else` **precisa** transferir o controle para sair do escopo ao redor (por exemplo, usando `return`, `continue`, `break` ou lançando um erro).

O `guard` costuma ser usado para validar pré-condições de forma limpa.
Por exemplo, considere a função sinc ($\text{sinc}(x) = \frac{\sin(x)}{x}$, com $\text{sinc}(0) = 1$ para evitar divisão por zero):

```swift
func sinc(_ x: Double) -> Double {
    guard x != 0 else { return 1 }
    return sin(x) / x
}

sinc(0)             // returns 1
sinc(Double.pi / 2) // returns 0.6366197723675814
```
