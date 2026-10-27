# Introdução
## Switch

Uma [instrução switch][switch] permite comparar um valor com vários valores possíveis.
Ela permite escrever um código mais conciso do que usar várias condicionais `else-if`.
Uma instrução switch começa com a palavra-chave `switch` seguida do valor a ser comparado.
Depois, você pode definir os casos com a palavra-chave `case` seguida do valor com o qual comparar.
A palavra-chave `default` define o caso padrão quando nenhum dos casos corresponde.
Assim como as condicionais `else-if`, as instruções `switch` só executam o bloco de código associado ao primeiro caso que corresponder.

```swift
switch value {
case 1:
    print("One")
case 2:
    print("Two")
default:
    print("Other")
}
```

Considere o seguinte exemplo:

```swift
if str == "apple" {
    print("Let's bake an apple crumble")
} else if str == "lemon" {
    print("Let's bake a lemon meringue pie!")
} else if str == "peach" {
    print("Let's bake a peach pie!")
} else {
    print("Let's buy ice cream.")
}
```

Em vez disso, isso poderia ser escrito assim:

```swift
switch str {
case "apple":
    print("Let's bake an apple crumble")
case "lemon":
    print("Let's bake a lemon meringue pie!")
case "peach":
    print("Let's bake a peach pie!")
default:
    print("Let's buy ice cream.")
}
```

## Laços while

Um [laço while][while-loops] é uma instrução de fluxo de controle que permite executar código enquanto uma determinada condição for verdadeira.
O Swift oferece dois tipos de laços while: os laços while e repeat-while.
A condição do laço while é avaliada antes de o corpo do laço ser executado; se a condição for falsa, o corpo do laço não será executado nenhuma vez.
Os laços while no Swift têm a seguinte estrutura:

```swift
while <#condition#> {
  <#code#>
}
```

Aqui, o laço será executado enquanto o count for maior que 0 e, com isso, imprimirá os números 2, 1 e "Liftoff!".

```swift
var count = 2
while count > 0 {
  print("\(count)…")
  count -= 1
}
print("Liftoff!")

// prints:
// 2…
// 1…
// Liftoff!
```

Um [laço repeat-while][while-loops] é semelhante a um laço while, mas a condição é avaliada depois de o corpo do laço ser executado.
Isso significa que o corpo do laço sempre será executado pelo menos uma vez, mesmo que a condição seja falsa.
Os laços repeat-while no Swift têm a seguinte estrutura:

```swift
repeat {
  <#code#>
} while <#condition#>
```

Aqui, o laço será executado apenas uma vez, já que a condição é falsa.
Como é um laço repeat-while, o corpo do laço será executado uma vez antes de a condição ser avaliada.

```swift
var count = 2
repeat {
  print("\(count)…")
} while count < 0
print("Liftoff!")
```

## Transferência de controle

O Swift oferece instruções de transferência de controle para alterar o fluxo de execução de laços e de instruções switch.
Além do `return`, o Swift inclui `continue`, `break`, rótulos de laço e `fallthrough`.

### Continue

A instrução `continue` diz a um laço para parar de executar a iteração atual e começar a próxima imediatamente.
Em um laço `while` ou `repeat-while`, ela salta direto para a verificação da condição.
Em um laço `for-in`, ela avança para o próximo elemento da sequência.

```swift
var count = 1
while count < 6 {
    count += 1
    if count == 4 {
        continue
    }
    print(count)
}

// Prints:
// 2
// 3
// 5
// 6
```

### Break

A instrução `break` encerra imediatamente um laço ou uma instrução switch por inteiro.
A execução continua na primeira linha de código depois do laço ou do switch.

```swift
for fruit in ["banana", "grapes", "apple", "strawberry", "kiwi", "lemon"] {
    if !fruit.count.isMultiple(of: 2) {
        break
    }
    print(fruit)
}

// Prints:
// banana
// grapes
```

### Instruções rotuladas

Em laços aninhados, você pode querer que `break` ou `continue` afetem um laço externo em vez do laço mais interno.
Você pode rotular um laço colocando antes dele um nome seguido de dois-pontos (`labelName:`).
Depois, você pode passar esse rótulo para `break` ou `continue`:

```swift
outerLoop: for fruit in ["banana", "grapes", "apple", "strawberry", "kiwi", "lemon"] {
    print("\n--- \(fruit) ---")
    for letter in fruit {
        guard letter != "n" else {
            break outerLoop
        }
        print(letter)
    }
}

// Prints:
// --- banana ---
// b
// a
```

[control-transfer]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Control-Transfer-Statements
[fallthrough]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Fallthrough
[while-loops]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#While-Loops
[repeat-loops]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Repeat-While
[switch]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Switch
