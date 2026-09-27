# Introduzione

Gli [array][array] sono uno dei tre tipi di collezione principali di Swift.
Un array è una lista ordinata di elementi.
Gli array possono contenere elementi di qualsiasi tipo, ma tutti gli elementi di un dato array devono avere lo stesso tipo.
Gli array sono mutabili quando vengono assegnati a una variabile: puoi aggiungere, rimuovere o modificare elementi dopo aver creato l'array.
Quando vengono assegnati a una costante, un array è immutabile: il suo contenuto non può essere modificato.

I letterali di array si scrivono come un elenco di elementi separati da virgole, racchiuso tra parentesi quadre (`[...]`).
Swift può dedurre il tipo dell'array dagli elementi all'interno del letterale.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let greetings = ["Hello!", "Hi!", "¡Hola!"]
```

Puoi anche specificare il tipo in modo esplicito.
I tipi array si possono scrivere in due modi: `Array<T>` oppure la sintassi abbreviata `[T]`, dove `T` è il tipo dei valori contenuti nell'array.

```swift
let evenInts: Array<Int> = [2, 4, 6, 8, 10, 12]
var oddInts: [Int] = [1, 3, 5, 7, 9, 11, 13]
let greetings: [String] = ["Hello!", "Hi!", "¡Hola!"]
```

## Dimensione di un array

Puoi trovare il numero di elementi di un array usando la sua proprietà [`count`][count]:

```swift
evenInts.count
// returns 6
```

## Array vuoti

Per creare un array vuoto, devi specificarne il tipo.
Puoi farlo usando la sintassi di inizializzazione dell'array o un'annotazione di tipo esplicita:

```swift
let emptyArray = [Int]()
let emptyArray2 = Array<Int>()
let emptyArray3: [Int] = []
```

## Array multidimensionali

Gli array possono essere annidati per creare array multidimensionali.
Quando specifichi esplicitamente il tipo di un array annidato, racchiudi il tipo dell'elemento tra parentesi annidate, come `[[Int]]` o `Array<Array<Int>>`:

```swift
let multiDimArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let multiDimArray2: [[Int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## Aggiungere elementi a un array

Puoi aggiungere un elemento alla fine di un array mutabile usando il metodo [`append(_:)`][append]:

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.append(15)
// oddInts is now [1, 3, 5, 7, 9, 11, 13, 15]
```

## Inserire elementi in un array

Puoi inserire un elemento in una posizione specifica usando il metodo [`insert(_:at:)`][insert].
Questo metodo accetta due argomenti: l'elemento da inserire e l'indice in cui inserirlo.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.insert(0, at: 0)
// oddInts is now [0, 1, 3, 5, 7, 9, 11, 13]
```

## Sommare due array

Puoi combinare due array in un unico array usando l'operatore `+`.
L'operatore `+` crea e restituisce un nuovo array; non modifica gli array originali.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let combined = oddInts + [15, 17, 19]
// combined is [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

print(oddInts)
// prints [1, 3, 5, 7, 9, 11, 13]
```

## Accedere agli elementi di un array

Puoi accedere a un singolo elemento di un array inserendo il suo indice tra parentesi quadre (`[]`) dopo il nome dell'array.
Gli indici degli array sono valori `Int` che partono da zero, con `0` per il primo elemento.
Accedere a un indice fuori dall'intervallo valido causa un errore a runtime e fa crashare il programma.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
let oddInts = [1, 3, 5, 7, 9, 11, 13]

evenInts[2]
// returns 6

oddInts[7]
// Fatal error: Index out of range
```

## Modificare gli elementi di un array

Puoi cambiare un elemento in un array mutabile assegnando un nuovo valore a un indice specifico.
Come per la lettura degli elementi, usare un indice fuori dall'intervallo valido causa un errore a runtime.

```swift
var evenInts = [2, 4, 6, 8, 10, 12]

evenInts[2] = 0
// evenInts is now [2, 4, 0, 8, 10, 12]
```

## Convertire un array in una stringa e viceversa

Puoi unire un array di stringhe in un'unica stringa usando il metodo [`joined(separator:)`][joined], che accetta una stringa separatore:

```swift
let evenInts = ["2", "4", "6", "8", "10", "12"]
let evenIntsString = evenInts.joined(separator: ", ")
// returns "2, 4, 6, 8, 10, 12"
```

Puoi dividere una stringa in un array di sottostringhe usando il metodo [`split(separator:)`][split], passando il carattere delimitatore:

```swift
let evenIntsString = "2, 4, 6, 8, 10, 12"
let evenInts = evenIntsString.split(separator: ",")
// returns ["2", " 4", " 6", " 8", " 10", " 12"]
```

## Rimuovere elementi da un array

Puoi rimuovere un elemento in una data posizione usando il metodo [`remove(at:)`][remove].
L'indice deve rientrare nei limiti validi dell'array; altrimenti si verifica un errore a runtime.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.remove(at: 3)
// oddInts is now [1, 3, 5, 9, 11, 13]
```

Per rimuovere l'ultimo elemento di un array, usa il metodo [`removeLast()`][removeLast].
Chiamare `removeLast()` su un array vuoto causa un errore a runtime.

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
