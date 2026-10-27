# Einführung
## Switch

Eine [switch-Anweisung][switch] ermöglicht es dir, einen Wert mit mehreren möglichen übereinstimmenden Werten zu vergleichen.
Damit kannst du prägnanteren Code schreiben als mit mehreren `else-if`-Anweisungen.
Eine switch-Anweisung beginnt mit dem Schlüsselwort `switch`, gefolgt von dem Wert, der verglichen werden soll.
Danach definierst du die Fälle mit dem Schlüsselwort `case`, gefolgt von dem Wert, mit dem verglichen wird.
Mit dem Schlüsselwort `default` definierst du den Standardfall, wenn keiner der Fälle passt.
Wie `else-if`-Anweisungen führen `switch`-Anweisungen nur den Block aus, der zum ersten passenden Fall gehört.

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

Schauen wir uns das folgende Beispiel an:

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

Das lässt sich stattdessen auch so schreiben:

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

## while-Schleifen

Eine [while-Schleife][while-loops] ist eine Anweisung, mit der du Code so lange ausführen kannst, wie eine bestimmte Bedingung wahr ist.
Swift bietet zwei Arten von while-Schleifen: while- und repeat-while-Schleifen.
Bei einer while-Schleife wird die Bedingung ausgewertet, bevor der Schleifenblock ausgeführt wird. Ist die Bedingung falsch, wird der Schleifenblock gar nicht ausgeführt.
while-Schleifen haben in Swift folgenden Aufbau:

```swift
while <#condition#> {
  <#code#>
}
```

Hier wird die Schleife so lange ausgeführt, wie count größer als 0 ist, und gibt dabei die Zahlen 2, 1 und „Liftoff!“ aus.

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

Eine [repeat-while-Schleife][while-loops] ähnelt einer while-Schleife, doch die Bedingung wird ausgewertet, nachdem der Schleifenblock ausgeführt wurde.
Das heißt, der Schleifenblock wird immer mindestens einmal ausgeführt, selbst wenn die Bedingung falsch ist.
repeat-while-Schleifen haben in Swift folgenden Aufbau:

```swift
repeat {
  <#code#>
} while <#condition#>
```

Hier wird die Schleife nur einmal ausgeführt, da die Bedingung falsch ist.
Da es eine repeat-while-Schleife ist, wird der Schleifenblock einmal ausgeführt, bevor die Bedingung ausgewertet wird.

```swift
var count = 2
repeat {
  print("\(count)…")
} while count < 0
print("Liftoff!")
```

## Kontrollübertragung

Swift bietet Kontrollübertragungsanweisungen, mit denen du den Ausführungsfluss von Schleifen und switch-Anweisungen änderst.
Neben `return` gibt es `continue`, `break`, Schleifenlabels und `fallthrough`.

### Continue

Die Anweisung `continue` weist eine Schleife an, die aktuelle Iteration abzubrechen und sofort mit der nächsten zu beginnen.
In einer `while`- oder `repeat-while`-Schleife springt sie direkt zur Prüfung der Bedingung.
In einer `for-in`-Schleife geht sie zum nächsten Element der Sequenz über.

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

Die Anweisung `break` beendet eine ganze Schleife oder switch-Anweisung sofort.
Die Ausführung geht mit der ersten Codezeile nach der Schleife oder der switch-Anweisung weiter.

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

### Anweisungen mit Label

Bei verschachtelten Schleifen möchtest du mit `break` oder `continue` vielleicht eine äußere Schleife ansprechen und nicht die innerste.
Du kannst eine Schleife mit einem Label versehen, indem du einen Namen mit Doppelpunkt davorstellst (`labelName:`).
Dieses Label kannst du dann an `break` oder `continue` übergeben:

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
