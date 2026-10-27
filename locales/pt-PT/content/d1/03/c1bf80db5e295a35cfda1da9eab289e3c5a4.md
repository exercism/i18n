# Introdução
## Switch

Uma [instrução switch][switch] permite-te comparar um valor com vários valores possíveis.
Permite-te escrever código mais conciso do que se usares várias condicionais `else-if`.
Uma instrução switch começa com a palavra-chave `switch`, seguida do valor a comparar.
Depois, podes definir os casos com a palavra-chave `case`, seguida do valor com que queres comparar.
A palavra-chave `default` serve para definir o caso por omissão, quando nenhum dos casos corresponde.
Tal como as condicionais `else-if`, as instruções `switch` só executam o bloco de código associado ao primeiro caso que corresponde.

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

Considera o seguinte exemplo:

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

Em vez disso, podíamos escrever:

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

## Ciclos while

Um [ciclo while][while-loops] é uma instrução de controlo de fluxo que permite executar código enquanto uma determinada condição for verdadeira.
O Swift disponibiliza dois tipos de ciclos while: os ciclos while e os ciclos repeat-while.
A condição do ciclo while é avaliada antes de o corpo do ciclo ser executado; se a condição for falsa, o corpo do ciclo não chega a ser executado.
Os ciclos while em Swift têm a seguinte estrutura:

```swift
while <#condition#> {
  <#code#>
}
```

Aqui, o ciclo é executado enquanto count for maior que 0 e imprime assim os números 2 e 1 e a palavra "Liftoff!".

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

Um [ciclo repeat-while][while-loops] é semelhante a um ciclo while, mas a condição é avaliada depois de o corpo do ciclo ser executado.
Isto significa que o corpo do ciclo é sempre executado pelo menos uma vez, mesmo que a condição seja falsa.
Os ciclos repeat-while em Swift têm a seguinte estrutura:

```swift
repeat {
  <#code#>
} while <#condition#>
```

Aqui, o ciclo só é executado uma vez, porque a condição é falsa.
Como é um ciclo repeat-while, o corpo do ciclo é executado uma vez antes de a condição ser avaliada.

```swift
var count = 2
repeat {
  print("\(count)…")
} while count < 0
print("Liftoff!")
```

## Transferência de controlo

O Swift disponibiliza instruções de transferência de controlo para alterar o fluxo de execução dos ciclos e das instruções switch.
Além do `return`, o Swift inclui o `continue`, o `break`, os rótulos de ciclo e o `fallthrough`.

### Continue

A instrução `continue` indica a um ciclo que pare de executar a iteração atual e que comece imediatamente a iteração seguinte.
Num ciclo `while` ou `repeat-while`, salta diretamente para a verificação da condição.
Num ciclo `for-in`, avança para o elemento seguinte da sequência.

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

A instrução `break` termina imediatamente todo um ciclo ou uma instrução switch.
A execução retoma na primeira linha de código a seguir ao ciclo ou à instrução switch.

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

### Instruções com rótulo

Em ciclos aninhados, podes querer que o `break` ou o `continue` afetem um ciclo exterior em vez do ciclo mais interior.
Podes dar um rótulo a um ciclo colocando um nome e dois pontos antes dele (`labelName:`).
Depois, podes passar esse rótulo ao `break` ou ao `continue`:

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
