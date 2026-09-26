# Εισαγωγή

Όταν μια συνάρτηση δέχεται μια άλλη συνάρτηση (ή closure) ως παράμετρο, αυτό το closure που περνάς ονομάζεται *μη διαφεύγον* από προεπιλογή.
Ένα closure λέγεται ότι *διαφεύγει* από μια συνάρτηση όταν καλείται αφού η ίδια η συνάρτηση έχει ήδη επιστρέψει.

Αυτό συμβαίνει συνήθως όταν:

- Ένα closure αποθηκεύεται σε μια εξωτερική μεταβλητή ή ιδιότητα.
- Ένα closure εκτελείται ασύγχρονα αφού ολοκληρωθεί μια λειτουργία.
- Ένα closure επιστρέφεται από τη συνάρτηση για να κληθεί αργότερα.

Δες το παρακάτω παράδειγμα:

```swift
func emptyKitchen(_ order: String) -> String {
    "Sorry, we're all out of \(order)."
}

func prepare(order: String, kitchen: (String) -> String) -> (String) -> String {
    func newKitchen(_ newOrder: String) -> String {
        if newOrder == order {
            return "One \(order) coming up!"
        } else {
            return kitchen(newOrder)
        }
    }
    return newKitchen
}
```

Σε αυτόν τον κώδικα, η `prepare` δέχεται μια συνάρτηση με το όνομα `kitchen`, κατασκευάζει μια νέα συνάρτηση, τη `newKitchen`, η οποία καλεί τη `kitchen`, και επιστρέφει τη `newKitchen`.
Η προσπάθεια να μεταγλωττίσεις αυτόν τον κώδικα παράγει το σφάλμα: `Escaping local function captures non-escaping parameter 'kitchen'`.

Επειδή η `newKitchen` ζει περισσότερο από τη `prepare`, το closure `kitchen` διαφεύγει.
Για να το επιτρέψεις αυτό, σημείωσε τον τύπο της παραμέτρου με το χαρακτηριστικό `@escaping`.

```swift
func prepare(order: String, kitchen: @escaping (String) -> String) -> (String) -> String {
    func newKitchen(_ newOrder: String) -> String {
        if newOrder == order {
            return "One \(order) coming up!"
        } else {
            return kitchen(newOrder)
        }
    }
    return newKitchen
}

let restaurant = prepare(
    order: "sandwich",
    kitchen: prepare(
        order: "chicken",
        kitchen: prepare(order: "steak", kitchen: emptyKitchen)
    )
)

print(restaurant("pork chop"))
// Prints "Sorry, we're all out of pork chop."

print(restaurant("chicken"))
// Prints "One chicken coming up!"
```

Το χαρακτηριστικό `@escaping` ενημερώνει τον μεταγλωττιστή της Swift ότι το closure θα ζήσει περισσότερο από την άμεση κλήση της συνάρτησης, επιτρέποντας στη Swift να διαχειρίζεται σωστά τη μνήμη και τις αναφορές που έχει συλλάβει.

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
