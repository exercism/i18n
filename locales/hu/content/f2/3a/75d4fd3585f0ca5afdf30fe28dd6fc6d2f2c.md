# Utasítások

Varázslótanoncként Elyse-nek gyakorolnia kell néhány alapvető dolgot.
Van egy kártyapaklija, amit manipulálni szeretne.

Hogy egy kicsit könnyebb legyen, csak az 1-től 10-ig terjedő kártyákat használja, így a kártyapaklija számok tömbjeként ábrázolható.
Egy adott kártya pozíciója a tömbben lévő indexnek felel meg.
Ez azt jelenti, hogy a 0. pozíció az első kártyára utal, az 1. pozíció a másodikra, és így tovább.

~~~~exercism/note
Minden függvénynek frissítenie kell a kártyák tömbjét, majd vissza kell adnia a módosított tömböt. Ez egy gyakori munkamódszer, amely Builder-minta néven ismert, és lehetővé teszi, hogy a függvényeket szépen egymásba fűzd.
~~~~

## 1. Kártya lekérése a pakliból

Egy kártya kiválasztásához add vissza az adott pakli `position` indexén lévő kártyát.

Valósítsd meg a `getCard(at:from:)` függvényt, amely két argumentumot vár: `at`, amely a kártya pozíciója a pakliban, és `from`, amely a kártyák paklija.
A függvénynek vissza kell adnia az adott pakli `index` pozícióján lévő kártyát.

```swift
let index = 2
getCard(at: index, from: [1, 2, 4, 1])
// returns 4
```

## 2. Kártya cseréje a pakliban

Végezz egy kis bűvészmutatványt, és cseréld ki a `position` indexen lévő kártyát a megadott cserekártyára.

Valósítsd meg a `setCard(at:in:to)` függvényt, amely három argumentumot vár: `at`, amely a kártya pozíciója a pakliban, `in`, amely a kártyák paklija, és `to`, amely az új kártya, amely lecseréli az `index` pozícióban lévő kártyát.
A függvénynek vissza kell adnia a pakli egy másolatát, amelyben az `index` pozícióban lévő kártya az új kártyára van cserélve.
Ha a megadott `index` nem érvényes index a pakliban, az eredeti paklit kell visszaadni, változatlanul.

```swift
let index = 2
let newCard = 6
setCard(at: index, in: [1, 2, 4, 1], to: newCard)
// returns [1, 2, 6, 1]
```

## 3. Kártya beszúrása a pakli tetejére

Varázsolj elő egy kártyát úgy, hogy egy új kártyát szúrsz be a pakli tetejére.

Valósítsd meg az `insert(_:atTopOf:)` függvényt, amely két argumentumot vár: a beszúrandó új kártyát és a kártyák pakliját.
A függvénynek vissza kell adnia a pakli egy másolatát, amelyben a megadott új kártya a pakli tetejére került.

```swift
let newCard = 8
insert(newCard, atTopOf: [5, 9, 7, 1])
// returns [5, 9, 7, 1, 8]
```

## 4. Kártya eltávolítása a pakliból

Tüntess el egy kártyát úgy, hogy eltávolítod az adott `position` pozícióban lévő kártyát a pakliból.

Valósítsd meg a `removeCard(at:from:)` függvényt, amely két argumentumot vár: `at`, amely a kártya pozíciója a pakliban, és `from`, amely a kártyák paklija.
A függvénynek vissza kell adnia a pakli egy másolatát, amelyből az `index` pozícióban lévő kártya el van távolítva.
Ha a megadott `index` nem érvényes index a pakliban, az eredeti paklit kell visszaadni, változatlanul.

```swift
let index = 2
removeCard(at: index, from: [3, 2, 6, 4, 8])
// returns [3, 2, 4, 8]
```

## 5. Kártya beszúrása a pakliba

Varázsolj elő egy kártyát úgy, hogy egy új kártyát szúrsz be a pakli adott `position` pozíciójába.

Valósítsd meg az `insert(_:at:from:)` függvényt, amely három argumentumot vár: a beszúrandó új kártyát, a pozíciót, ahová az új kártyát be kell szúrni, és a kártyák pakliját.
A függvénynek vissza kell adnia a pakli egy másolatát, amelyben a megadott új kártya az adott pozícióra került.
Ha a megadott `index` nem érvényes index a pakliban, az eredeti paklit kell visszaadni, változatlanul.

```swift
let newCard = 8
insert(newCard, at: 2, from: [5, 9, 7, 1])
// returns [5, 9, 8, 7, 1]
```

## 6. A pakli méretének ellenőrzése

Ellenőrizd, hogy a pakli mérete megegyezik-e a `stackSize` értékkel vagy sem.

Valósítsd meg a `checkSizeOfStack(_:_:)` függvényt, amely két argumentumot vár: `stack`, amely a kártyák paklija, és `stackSize`, amely a pakli mérete.
A függvénynek `true` értéket kell visszaadnia, ha a pakli mérete megegyezik a `stackSize` értékkel, és `false` értéket egyébként.

```swift
let stackSize = 4
checkSizeOfStack([3, 2, 6, 4, 8], stackSize)
// returns false
```
