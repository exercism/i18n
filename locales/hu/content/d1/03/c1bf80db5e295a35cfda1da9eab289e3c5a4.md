# Bevezetés

## Switch

A [switch utasítás][switch] lehetővé teszi, hogy egy értéket több lehetséges egyező értékkel hasonlíts össze.
Segítségével tömörebb kódot írhatsz, mint több `else-if` utasítás használatával.
A switch utasítás a `switch` kulcsszóval kezdődik, amelyet az összehasonlítandó érték követ.
Ezután az eseteket a `case` kulcsszóval definiálhatod, amelyet az az érték követ, amellyel össze szeretnéd hasonlítani.
A `default` kulcsszóval adhatod meg az alapértelmezett esetet, amikor egyik eset sem egyezik.
Az `else-if` utasításokhoz hasonlóan a `switch` utasítások is csak az első egyező esethez tartozó kódblokkot hajtják végre.

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

Nézzük a következő példát:

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

Ehelyett így is írható:

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

## While-ciklusok

A [while-ciklus][while-loops] egy vezérlési utasítás, amely lehetővé teszi, hogy a kód addig fusson, amíg egy adott feltétel igaz.
A Swift kétféle while-ciklust kínál: a while és a repeat-while ciklust.
A while-ciklus feltételét a ciklusmag végrehajtása előtt értékeli ki; ha a feltétel hamis, a ciklusmag egyáltalán nem fut le.
A while-ciklusok felépítése Swiftben a következő:

```swift
while <#condition#> {
  <#code#>
}
```

Itt a ciklus addig fut, amíg a count nagyobb, mint 0, és ennek eredményeként kiírja a 2-es és 1-es számot, valamint a „Liftoff!” szöveget.

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

A [repeat-while ciklus][while-loops] hasonló a while-ciklushoz, de a feltétel a ciklusmag végrehajtása után értékelődik ki.
Ez azt jelenti, hogy a ciklusmag mindig legalább egyszer lefut, még akkor is, ha a feltétel hamis.
A repeat-while ciklusok felépítése Swiftben a következő:

```swift
repeat {
  <#code#>
} while <#condition#>
```

Itt a ciklus csak egyszer fut le, mivel a feltétel hamis.
Mivel repeat-while ciklusról van szó, a ciklusmag egyszer lefut, mielőtt a feltétel kiértékelődik.

```swift
var count = 2
repeat {
  print("\(count)…")
} while count < 0
print("Liftoff!")
```

## Vezérlésátadás

A Swift vezérlésátadó utasításokat kínál, amelyekkel megváltoztatható a ciklusok és a switch utasítások végrehajtási folyama.
A `return` mellett a Swift tartalmazza a `continue`-t, a `break`-et, a cikluscímkéket és a `fallthrough`-ot is.

### Continue

A `continue` utasítás arra kéri a ciklust, hogy hagyja abba az aktuális iteráció végrehajtását, és azonnal kezdje el a következőt.
`while` vagy `repeat-while` ciklusban egyenesen a feltétel ellenőrzéséhez ugrik.
`for-in` ciklusban továbblép a sorozat következő elemére.

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

A `break` utasítás azonnal kilép egy teljes ciklusból vagy switch utasításból.
A végrehajtás a ciklus vagy switch utáni első kódsorral folytatódik.

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

### Címkézett utasítások

Egymásba ágyazott ciklusokban előfordulhat, hogy a `break` vagy a `continue` a legbelső ciklus helyett egy külső ciklusra hasson.
Egy ciklust úgy címkézhetsz meg, hogy elé egy nevet és egy kettőspontot írsz (`labelName:`).
Ezt a címkét aztán átadhatod a `break`-nek vagy a `continue`-nak:

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
