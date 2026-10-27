# Introduzione
## Switch

Un'[istruzione switch][switch] ti permette di confrontare un valore con diversi possibili valori corrispondenti.
Ti consente di scrivere codice più conciso rispetto all'uso di più istruzioni `else-if`.
Un'istruzione switch inizia con la parola chiave `switch`, seguita dal valore da confrontare.
Poi puoi definire i casi usando la parola chiave `case`, seguita dal valore con cui confrontare.
La parola chiave `default` serve a definire il caso predefinito quando nessuno dei casi corrisponde.
Come le istruzioni `else-if`, le istruzioni `switch` eseguono solo il blocco di codice associato al primo caso che corrisponde.

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

Considera il seguente esempio:

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

In alternativa, si potrebbe scrivere così:

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

## Cicli while

Un [ciclo while][while-loops] è un'istruzione di controllo del flusso che permette di eseguire del codice finché una certa condizione è vera.
Swift fornisce due tipi di cicli while: i cicli while e i cicli repeat-while.
La condizione di un ciclo while viene valutata prima che il corpo del ciclo venga eseguito; se la condizione è falsa, il corpo del ciclo non verrà eseguito affatto.
I cicli while in Swift hanno la seguente struttura:

```swift
while <#condition#> {
  <#code#>
}
```

Qui il ciclo verrà eseguito finché count è maggiore di 0, e stamperà quindi i numeri 2, 1 e «Liftoff!».

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

Un [ciclo repeat-while][while-loops] è simile a un ciclo while, ma la condizione viene valutata dopo che il corpo del ciclo è stato eseguito.
Questo significa che il corpo del ciclo verrà eseguito sempre almeno una volta, anche se la condizione è falsa.
I cicli repeat-while in Swift hanno la seguente struttura:

```swift
repeat {
  <#code#>
} while <#condition#>
```

Qui il ciclo verrà eseguito una sola volta, dato che la condizione è falsa.
Trattandosi di un ciclo repeat-while, il corpo del ciclo verrà eseguito una volta prima che la condizione venga valutata.

```swift
var count = 2
repeat {
  print("\(count)…")
} while count < 0
print("Liftoff!")
```

## Trasferimento del controllo

Swift fornisce le istruzioni di trasferimento del controllo per modificare il flusso di esecuzione dei cicli e delle istruzioni switch.
Oltre a `return`, Swift include `continue`, `break`, le etichette dei cicli e `fallthrough`.

### Continue

L'istruzione `continue` indica a un ciclo di interrompere l'esecuzione dell'iterazione corrente e di iniziare subito quella successiva.
In un ciclo `while` o `repeat-while` salta direttamente al controllo della condizione.
In un ciclo `for-in` passa all'elemento successivo della sequenza.

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

L'istruzione `break` esce immediatamente da un intero ciclo o da un'istruzione switch.
L'esecuzione riprende dalla prima riga di codice dopo il ciclo o lo switch.

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

### Istruzioni etichettate

Nei cicli annidati, potresti voler far agire `break` o `continue` su un ciclo esterno invece che sul ciclo più interno.
Puoi etichettare un ciclo anteponendo un nome e due punti (`labelName:`).
Puoi quindi passare quell'etichetta a `break` o `continue`:

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
