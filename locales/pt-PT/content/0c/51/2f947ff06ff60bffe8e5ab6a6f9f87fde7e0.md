# Introdução

Os [arrays][array] são um dos três tipos de coleção principais do Swift.
Um array é uma lista ordenada de elementos.
Os arrays podem guardar elementos de qualquer tipo, mas todos os elementos de um dado array têm de ser do mesmo tipo.
Os arrays são mutáveis quando são atribuídos a uma variável, o que significa que podes acrescentar, remover ou modificar elementos depois de criares o array.
Quando são atribuídos a uma constante, os arrays são imutáveis, ou seja, o seu conteúdo não pode ser alterado.

Os literais de array escrevem-se como uma lista de elementos separados por vírgulas e entre parênteses retos (`[...]`).
O Swift consegue inferir o tipo do array a partir dos elementos que estão dentro do literal.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let greetings = ["Hello!", "Hi!", "¡Hola!"]
```

Também podes especificar o tipo explicitamente.
Os tipos de array podem escrever-se de duas formas: `Array<T>` ou a sintaxe abreviada `[T]`, em que `T` é o tipo dos valores que o array contém.

```swift
let evenInts: Array<Int> = [2, 4, 6, 8, 10, 12]
var oddInts: [Int] = [1, 3, 5, 7, 9, 11, 13]
let greetings: [String] = ["Hello!", "Hi!", "¡Hola!"]
```

## Tamanho de um array

Podes descobrir o número de elementos de um array através da sua propriedade [`count`][count]:

```swift
evenInts.count
// returns 6
```

## Arrays vazios

Para criar um array vazio, tens de especificar o seu tipo.
Podes fazê-lo com a sintaxe de inicialização de arrays ou com uma anotação de tipo explícita:

```swift
let emptyArray = [Int]()
let emptyArray2 = Array<Int>()
let emptyArray3: [Int] = []
```

## Arrays multidimensionais

Os arrays podem ser aninhados para criar arrays multidimensionais.
Ao especificar explicitamente o tipo de um array aninhado, coloca o tipo dos elementos dentro de parênteses retos aninhados, como em `[[Int]]` ou `Array<Array<Int>>`:

```swift
let multiDimArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let multiDimArray2: [[Int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## Acrescentar elementos a um array

Podes acrescentar um elemento ao fim de um array mutável com o método [`append(_:)`][append]:

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.append(15)
// oddInts is now [1, 3, 5, 7, 9, 11, 13, 15]
```

## Inserir elementos num array

Podes inserir um elemento numa posição específica com o método [`insert(_:at:)`][insert].
Este método recebe dois argumentos: o elemento a inserir e o índice onde o queres inserir.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.insert(0, at: 0)
// oddInts is now [0, 1, 3, 5, 7, 9, 11, 13]
```

## Somar arrays

Podes combinar dois arrays num só com o operador `+`.
O operador `+` cria e devolve um novo array; não modifica os arrays originais.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let combined = oddInts + [15, 17, 19]
// combined is [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

print(oddInts)
// prints [1, 3, 5, 7, 9, 11, 13]
```

## Aceder aos elementos de um array

Podes aceder a um elemento individual de um array colocando o seu índice entre parênteses retos (`[]`) a seguir ao nome do array.
Os índices dos arrays são valores `Int` que começam em zero, sendo `0` o primeiro elemento.
Aceder a um índice fora do intervalo válido provoca um erro em tempo de execução e faz o programa terminar abruptamente.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
let oddInts = [1, 3, 5, 7, 9, 11, 13]

evenInts[2]
// returns 6

oddInts[7]
// Fatal error: Index out of range
```

## Modificar elementos de um array

Podes alterar um elemento de um array mutável atribuindo um novo valor a um índice específico.
Tal como ao ler elementos, usar um índice fora do intervalo válido provoca um erro em tempo de execução.

```swift
var evenInts = [2, 4, 6, 8, 10, 12]

evenInts[2] = 0
// evenInts is now [2, 4, 0, 8, 10, 12]
```

## Converter um array numa string e vice-versa

Podes juntar um array de strings numa única string com o método [`joined(separator:)`][joined], que recebe uma string separadora:

```swift
let evenInts = ["2", "4", "6", "8", "10", "12"]
let evenIntsString = evenInts.joined(separator: ", ")
// returns "2, 4, 6, 8, 10, 12"
```

Podes dividir uma string num array de substrings com o método [`split(separator:)`][split], passando-lhe o caráter delimitador:

```swift
let evenIntsString = "2, 4, 6, 8, 10, 12"
let evenInts = evenIntsString.split(separator: ",")
// returns ["2", " 4", " 6", " 8", " 10", " 12"]
```

## Remover elementos de um array

Podes remover um elemento numa dada posição com o método [`remove(at:)`][remove].
O índice tem de estar dentro dos limites válidos do array; caso contrário, ocorre um erro em tempo de execução.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.remove(at: 3)
// oddInts is now [1, 3, 5, 9, 11, 13]
```

Para remover o último elemento de um array, usa o método [`removeLast()`][removeLast].
Chamar `removeLast()` a um array vazio provoca um erro em tempo de execução.

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
