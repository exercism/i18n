# Introduction

Quand une fonction accepte une autre fonction (ou une _closure_) en paramètre, la _closure_ passée en paramètre est dite _non échappante_ par défaut.
On dit d'une _closure_ qu'elle _s'échappe_ d'une fonction lorsqu'elle est appelée après que cette fonction a déjà renvoyé son résultat.

Cette situation se produit couramment lorsque :

- Une _closure_ est stockée dans une variable ou une propriété externe.
- Une _closure_ est exécutée de façon asynchrone après la fin d'une opération.
- Une _closure_ est renvoyée par la fonction pour être appelée plus tard.

Prenons l'exemple suivant :

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

Dans ce code, `prepare` accepte une fonction nommée `kitchen`, construit une nouvelle fonction `newKitchen` qui appelle `kitchen`, puis renvoie `newKitchen`.
Si on essaie de compiler ce code, on obtient l'erreur : `Escaping local function captures non-escaping parameter 'kitchen'`.

Comme `newKitchen` survit à `prepare`, la _closure_ `kitchen` s'échappe.
Pour permettre cela, ajoute l'attribut `@escaping` au type du paramètre.

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

L'attribut `@escaping` indique au compilateur Swift que la _closure_ survivra à l'appel de fonction immédiat, ce qui permet à Swift de gérer correctement la mémoire et les références capturées.

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
