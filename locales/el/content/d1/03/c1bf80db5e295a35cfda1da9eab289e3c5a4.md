# Introduction
## Switch

Μια [εντολή `switch`][switch] σου επιτρέπει να συγκρίνεις μια τιμή με πολλαπλές πιθανές τιμές που μπορούν να ταιριάξουν. Σου επιτρέπει να γράψεις πιο συνοπτικό κώδικα από το να χρησιμοποιείς πολλαπλές εντολές `else-if`. Μια εντολή `switch` ξεκινά με τη λέξη-κλειδί `switch` ακολουθούμενη από την τιμή που θα συγκριθεί. Στη συνέχεια, μπορείς να ορίσεις τις περιπτώσεις χρησιμοποιώντας τη λέξη-κλειδί `case` ακολουθούμενη από την τιμή με την οποία θα συγκριθεί. Η λέξη-κλειδί `default` χρησιμοποιείται για να ορίσει την προεπιλεγμένη περίπτωση όταν καμία από τις περιπτώσεις δεν ταιριάζει. Όπως και οι εντολές `else-if`, οι εντολές `switch` εκτελούν μόνο το μπλοκ κώδικα που σχετίζεται με την πρώτη περίπτωση που ταιριάζει.

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

Δες το ακόλουθο παράδειγμα:

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

Αυτό θα μπορούσε να γραφτεί εναλλακτικά ως:

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

## Βρόχοι `while`

Ένας [βρόχος `while`][while-loops] είναι μια εντολή ροής ελέγχου που επιτρέπει την εκτέλεση κώδικα όσο μια συγκεκριμένη συνθήκη είναι αληθής. Η Swift παρέχει δύο είδη βρόχων `while`: τους βρόχους `while` και `repeat-while`. Η συνθήκη του βρόχου `while` αξιολογείται πριν εκτελεστεί το σώμα του βρόχου· αν η συνθήκη είναι ψευδής, το σώμα του βρόχου δεν θα εκτελεστεί καθόλου. Οι βρόχοι `while` στη Swift έχουν την ακόλουθη δομή:

```swift
while <#condition#> {
  <#code#>
}
```

Εδώ ο βρόχος θα εκτελεστεί όσο το count είναι μεγαλύτερο από 0 και θα τυπώσει έτσι τους αριθμούς 2, 1 και το "Liftoff!".

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

Ένας [βρόχος `repeat-while`][while-loops] είναι παρόμοιος με έναν βρόχο `while`, αλλά η συνθήκη αξιολογείται αφού εκτελεστεί το σώμα του βρόχου. Αυτό σημαίνει ότι το σώμα του βρόχου θα εκτελεστεί πάντα τουλάχιστον μία φορά, ακόμη και αν η συνθήκη είναι ψευδής. Οι βρόχοι `repeat-while` στη Swift έχουν την ακόλουθη δομή:

```swift
repeat {
  <#code#>
} while <#condition#>
```

Εδώ ο βρόχος θα εκτελεστεί μόνο μία φορά, αφού η συνθήκη είναι ψευδής. Επειδή είναι βρόχος `repeat-while`, το σώμα του βρόχου θα εκτελεστεί μία φορά πριν αξιολογηθεί η συνθήκη.

```swift
var count = 2
repeat {
  print("\(count)…")
} while count < 0
print("Liftoff!")
```

## Μεταφορά Ελέγχου

Η Swift παρέχει εντολές μεταφοράς ελέγχου για να αλλάζουν τη ροή εκτέλεσης των βρόχων και των εντολών `switch`. Εκτός από το `return`, η Swift περιλαμβάνει τα `continue`, `break`, τις ετικέτες βρόχων και το `fallthrough`.

### Συνέχεια

Η εντολή `continue` λέει σε έναν βρόχο να σταματήσει να εκτελεί την τρέχουσα επανάληψη και να ξεκινήσει αμέσως την επόμενη. Σε έναν βρόχο `while` ή `repeat-while`, μεταπηδά κατευθείαν στον έλεγχο της συνθήκης. Σε έναν βρόχο `for-in`, προχωρά στο επόμενο στοιχείο της ακολουθίας.

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

### Διακοπή

Η εντολή `break` τερματίζει αμέσως ολόκληρο τον βρόχο ή την εντολή `switch`. Η εκτέλεση συνεχίζεται από την πρώτη γραμμή κώδικα μετά τον βρόχο ή το `switch`.

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

### Εντολές με ετικέτα

Σε εμφωλευμένους βρόχους, μπορεί να θέλεις το `break` ή το `continue` να επηρεάζει έναν εξωτερικό βρόχο αντί για τον πιο εσωτερικό. Μπορείς να βάλεις ετικέτα σε έναν βρόχο βάζοντας μπροστά του ένα όνομα και μία άνω και κάτω τελεία (`labelName:`). Στη συνέχεια, μπορείς να περάσεις αυτή την ετικέτα στο `break` ή στο `continue`:

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
