# Introdução

Quando uma função aceita outra função (ou um closure) como parâmetro, esse closure recebido é chamado de *non-escaping* por predefinição.
Diz-se que um closure *escapa* a uma função quando é chamado depois de a própria função já ter terminado.

Esta situação ocorre habitualmente quando:

- Um closure é guardado numa variável ou propriedade externa.
- Um closure é executado de forma assíncrona depois de uma operação terminar.
- Um closure é devolvido pela função para ser chamado mais tarde.

Considera o seguinte exemplo:

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

Neste código, `prepare` aceita uma função chamada `kitchen`, constrói uma nova função `newKitchen` que chama `kitchen` e devolve `newKitchen`.
Ao tentar compilar este código, obtém-se um erro: `Escaping local function captures non-escaping parameter 'kitchen'`.

Como `newKitchen` continua a existir depois de `prepare` terminar, o closure `kitchen` escapa.
Para que isto seja possível, marca o tipo do parâmetro com o atributo `@escaping`.

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

O atributo `@escaping` informa o compilador Swift de que o closure vai continuar a existir depois da chamada imediata à função, o que permite ao Swift gerir corretamente a memória e as referências capturadas.

[escaping]: https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546
