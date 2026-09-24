# Bevezetés

A [tömbök][array] a Swift három fő gyűjteménytípusának egyike.
A tömb elemek sorrendbe rendezett listája.
A tömbök bármilyen típusú elemet tárolhatnak, egy adott tömbben viszont minden elemnek ugyanolyan típusúnak kell lennie.
A tömbök módosíthatók, ha változóhoz rendeljük őket, ami azt jelenti, hogy a tömb létrehozása után hozzáadhatsz, eltávolíthatsz vagy módosíthatsz elemeket.
Ha konstanshoz rendeljük, a tömb nem módosítható, ami azt jelenti, hogy a tartalma nem változtatható meg.

A tömbliterálokat vesszővel elválasztott elemek listájaként írjuk le, szögletes zárójelek (`[...]`) közé zárva.
A Swift a literál elemeiből következtethet a tömb típusára.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let greetings = ["Hello!", "Hi!", "¡Hola!"]
```

A típust explicit módon is megadhatod.
A tömbök típusát kétféleképpen írhatjuk le: `Array<T>` vagy a rövidített `[T]` szintaxissal, ahol a `T` a tömb által tartalmazott értékek típusa.

```swift
let evenInts: Array<Int> = [2, 4, 6, 8, 10, 12]
var oddInts: [Int] = [1, 3, 5, 7, 9, 11, 13]
let greetings: [String] = ["Hello!", "Hi!", "¡Hola!"]
```

## A tömb mérete

A tömb elemeinek számát a [`count`][count] tulajdonságával határozhatod meg:

```swift
evenInts.count
// returns 6
```

## Üres tömbök

Üres tömb létrehozásához meg kell adnod a típusát.
Ezt megteheted a tömb kezdőérték-szintaxisával vagy egy explicit típusmegjelöléssel:

```swift
let emptyArray = [Int]()
let emptyArray2 = Array<Int>()
let emptyArray3: [Int] = []
```

## Többdimenziós tömbök

A tömbök egymásba ágyazhatók, így többdimenziós tömböket hozhatsz létre.
Amikor egy egymásba ágyazott tömb típusát explicit módon adod meg, az elemtípust beágyazott zárójelekbe zárd, például `[[Int]]` vagy `Array<Array<Int>>`:

```swift
let multiDimArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let multiDimArray2: [[Int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## Elem hozzáfűzése egy tömbhöz

Egy módosítható tömb végéhez az [`append(_:)`][append] metódussal adhatsz hozzá elemet:

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.append(15)
// oddInts is now [1, 3, 5, 7, 9, 11, 13, 15]
```

## Beszúrás egy tömbbe

Egy elemet egy adott indexre az [`insert(_:at:)`][insert] metódussal szúrhatsz be.
Ez a metódus két argumentumot vár: a beszúrandó elemet és az indexet, ahová be kell szúrni.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.insert(0, at: 0)
// oddInts is now [0, 1, 3, 5, 7, 9, 11, 13]
```

## Tömbök összeadása

Két tömböt a `+` operátorral fűzhetsz össze egyetlen tömbbé.
A `+` operátor új tömböt hoz létre és ad vissza; nem módosítja az eredeti tömböket.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
let combined = oddInts + [15, 17, 19]
// combined is [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

print(oddInts)
// prints [1, 3, 5, 7, 9, 11, 13]
```

## A tömb elemeinek elérése

Egy tömb egyes elemeit úgy érheted el, hogy az indexét a tömb neve után szögletes zárójelbe (`[]`) írod.
A tömb indexei nullától induló `Int` értékek, az első elemnél `0`-tól kezdődnek.
Ha az érvényes tartományon kívüli indexet érsz el, futásidejű hiba történik, és a program összeomlik.

```swift
let evenInts = [2, 4, 6, 8, 10, 12]
let oddInts = [1, 3, 5, 7, 9, 11, 13]

evenInts[2]
// returns 6

oddInts[7]
// Fatal error: Index out of range
```

## A tömb elemeinek módosítása

Egy módosítható tömb elemét úgy változtathatod meg, hogy új értéket adsz egy adott indexnek.
Az elemek olvasásához hasonlóan az érvényes tartományon kívüli index használata futásidejű hibát okoz.

```swift
var evenInts = [2, 4, 6, 8, 10, 12]

evenInts[2] = 0
// evenInts is now [2, 4, 0, 8, 10, 12]
```

## Tömb átalakítása stringgé és vissza

Stringekből álló tömböt egyetlen stringgé fűzhetsz össze a [`joined(separator:)`][joined] metódussal, amely egy elválasztó stringet vár:

```swift
let evenInts = ["2", "4", "6", "8", "10", "12"]
let evenIntsString = evenInts.joined(separator: ", ")
// returns "2, 4, 6, 8, 10, 12"
```

Egy stringet a [`split(separator:)`][split] metódussal bonthatsz fel részstringek tömbjére, átadva az elválasztó karaktert:

```swift
let evenIntsString = "2, 4, 6, 8, 10, 12"
let evenInts = evenIntsString.split(separator: ",")
// returns ["2", " 4", " 6", " 8", " 10", " 12"]
```

## Elemek eltávolítása egy tömbből

Egy elemet egy adott indexről a [`remove(at:)`][remove] metódussal távolíthatsz el.
Az indexnek a tömb érvényes tartományán belül kell lennie, különben futásidejű hiba történik.

```swift
var oddInts = [1, 3, 5, 7, 9, 11, 13]
oddInts.remove(at: 3)
// oddInts is now [1, 3, 5, 9, 11, 13]
```

Egy tömb utolsó elemének eltávolításához a [`removeLast()`][removeLast] metódust használd.
Ha üres tömbön hívod meg a `removeLast()` metódust, futásidejű hiba történik.

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
