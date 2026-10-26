# Introdução

A instrução `guard` em Swift serve para sair antecipadamente de funções, ciclos ou métodos quando não se verifica uma condição necessária:

```swift
guard myValue >= 0 else { return 0 }
let root = myValue.squareRoot()
```

No exemplo acima, o `guard` avalia a expressão Boolean que se segue.
Se a condição for `true`, a execução continua com o código que se segue à instrução `guard`.
Se a condição for `false`, executa-se o código dentro do bloco `else`.

Ao contrário de uma condicional `if`:

- Uma instrução `guard` **tem de** incluir uma cláusula `else`.
- A cláusula `else` **tem de** transferir o controlo para sair do âmbito envolvente (por exemplo, usando `return`, `continue`, `break` ou lançando um erro).

O `guard` é frequentemente usado para validar pré-condições de forma clara.
Por exemplo, considera a função sinc ($\text{sinc}(x) = \frac{\sin(x)}{x}$, em que $\text{sinc}(0) = 1$ para evitar uma divisão por zero):

```swift
func sinc(_ x: Double) -> Double {
    guard x != 0 else { return 1 }
    return sin(x) / x
}

sinc(0)             // returns 1
sinc(Double.pi / 2) // returns 0.6366197723675814
```
