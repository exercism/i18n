# Introdução

[Arrays][array] são um dos três principais tipos de coleção do Swift.
Um array, também chamado de vetor, é uma lista ordenada de elementos.
Arrays podem armazenar elementos de qualquer tipo, mas todos os elementos de um determinado array precisam ser do mesmo tipo.
Arrays são mutáveis quando atribuídos a uma variável, o que significa que você pode adicionar, remover ou modificar elementos depois de criar o array.
Quando atribuído a uma constante, um array é imutável, o que significa que seu conteúdo não pode ser alterado.

Literais de array são escritos como uma lista de elementos separados por vírgula e entre colchetes (`[...]`).
O Swift consegue inferir o tipo do array a partir dos elementos dentro do literal.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let greetings = ["Hello!", "Hi!", "¡Hola!"]
```

Você também pode especificar o tipo explicitamente.
Os tipos de array podem ser escritos de duas formas: `Array<T>` ou a sintaxe abreviada `[T]`, em que `T` é o tipo dos valores que o array contém.

```swift
let evenInts: Array<Int> = [2, 4, 6, 8, 10, 12]
var oddInts: [Int] = [1, 3, 5, 7, 9, 11, 13]
let greetings: [String] = ["Hello!", "Hi!", "¡Hola!"]
```

## Tamanho de um array

Você pode descobrir o número de elementos em um array usando a propriedade [`count`][count]:

```swift
evenInts.count
// returns 6
```

## Arrays vazios

Para criar um array vazio, você precisa especificar o tipo dele.
Você pode fazer isso usando a sintaxe de inicializador de array ou uma anotação de tipo explícita:

```swift
let emptyArray = [Int]()
let emptyArray2 = Array<Int>()
let emptyArray3: [Int] = []
```

## Arrays multidimensionais

Arrays podem ser aninhados para criar arrays multidimensionais.
Ao especificar o tipo de um array aninhado explicitamente, coloque o tipo do elemento entre colchetes aninhados, como `[[Int]]` ou `Array<Array<Int>>`:

```swift
let multiDimArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let multiDimArray2: [[Int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## Adicionar ao final de um array

Você pode adicionar um elemento ao final de um array mutável usando o método [`append(_:)`][append]:

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.append(15)
// oddInts is now [1, 3, 5, 7, 9, 11, 13, 15]
```

## Inserir em um array

Você pode inserir um elemento em um índice específico usando o método [`insert(_:at:)`][insert].
Esse método recebe dois argumentos: o elemento a inserir e o índice no qual inseri-lo.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.insert(0, at: 0)
// oddInts is now [0, 1, 3, 5, 7, 9, 11, 13]
```

## Combinar arrays

Você pode combinar dois arrays em um único array usando o operador `+`.
O operador `+` cria e retorna um novo array. Ele não modifica os arrays originais.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let combined = oddInts + [15, 17, 19]
// combined is [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

print(oddInts)
// prints [1, 3, 5, 7, 9, 11, 13]
```

## Acessar elementos de um array

Você pode acessar um elemento individual de um array colocando o índice dele entre colchetes (`[]`) depois do nome do array.
Os índices de array são valores `Int` baseados em zero, começando em `0` para o primeiro elemento.
Acessar um índice fora do intervalo válido causa um erro em tempo de execução e faz o programa travar.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
let oddInts = [1, 3, 5, 7, 9, 11, 13]

evenInts[2]
// returns 6

oddInts[7]
// Fatal error: Index out of range
```

## Modificar elementos de um array

Você pode alterar um elemento em um array mutável atribuindo um novo valor a um índice específico.
Assim como na leitura de elementos, usar um índice fora do intervalo válido causa um erro em tempo de execução.

```swift
var evenInts = [2, 4, 6, 8, 10, 12]

evenInts[2] = 0
// evenInts is now [2, 4, 0, 8, 10, 12]
```

## Converter um array em uma string e vice-versa

Você pode juntar um array de strings em uma única string usando o método [`joined(separator:)`][joined], que recebe uma string separadora:

```swift
let evenInts = ["2", "4", "6", "8", "10", "12"]
let evenIntsString = evenInts.joined(separator: ", ")
// returns "2, 4, 6, 8, 10, 12"
```

Você pode dividir uma string em um array de substrings usando o método [`split(separator:)`][split], passando o caractere delimitador:

```swift
let evenIntsString = "2, 4, 6, 8, 10, 12"
let evenInts = evenIntsString.split(separator: ",")
// returns ["2", " 4", " 6", " 8", " 10", " 12"]
```

## Remover elementos de um array

Você pode remover um elemento em um determinado índice usando o método [`remove(at:)`][remove].
O índice precisa estar dentro dos limites válidos do array; caso contrário, ocorre um erro em tempo de execução.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.remove(at: 3)
// oddInts is now [1, 3, 5, 9, 11, 13]
```

Para remover o último elemento de um array, use o método [`removeLast()`][removeLast].
Chamar `removeLast()` em um array vazio causa um erro em tempo de execução.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.removeLast()
// oddInts is now [1, 3, 5, 7, 9, 11]
```

[array]: https://developer.apple.com/documentation/swift/array
[count]: https://developer.apple.com/documentation/swift/array/count
[insert]: https://developer.apple.com/documentation/swift/array/insert(_:at:)-3erb3
[remove]: https://developer.apple.com/documentation/swift/array/remove(at:)-1p2pj
[removeLast]: https://developer.apple.com/documentation/swift/array/removelast()
[append]: https://developer.apple.com/documentation/swift/array/append(_:)-1ytnt
[joined]: https://developer.apple.com/documentation/swift/array/joined(separator:)-5do1g
[split]: https://developer.apple.com/documentation/swift/string/2894564-split
