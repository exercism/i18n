# Introdução

Quando uma função aceita outra função (ou closure) como parâmetro, essa closure passada como parâmetro é chamada de *non-escaping* por padrão.
Dizemos que uma closure *escapa* de uma função quando ela é chamada depois que a própria função já retornou.

Essa situação costuma acontecer quando:

- Uma closure é armazenada em uma variável ou propriedade externa.
- Uma closure é executada de forma assíncrona depois que uma operação termina.
- Uma closure é retornada pela função para ser chamada mais tarde.

Veja o exemplo a seguir:

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

Neste código, `prepare` aceita uma função chamada `kitchen`, constrói uma nova função `newKitchen` que chama `kitchen` e retorna `newKitchen`.
Tentar compilar esse código gera um erro: `Escaping local function captures non-escaping parameter 'kitchen'`.

Como `newKitchen` sobrevive a `prepare`, a closure `kitchen` escapa.
Para permitir isso, marque o tipo do parâmetro com o atributo `@escaping`.

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

O atributo `@escaping` informa ao compilador do Swift que a closure sobreviverá à chamada imediata da função, permitindo que o Swift gerencie corretamente a memória e as referências capturadas.

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
