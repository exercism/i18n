# Névjegy

Ahelyett, hogy közvetlenül a stringbe indexelnél, egy `String.Index` típusú értéket kell kiszámítanod, és indexként azt kell megadnod. Ne feledd, hogy ezek az indexek önmagukban nem emberi olvasásra valók. Ezeket nevezik _opaque indexeknek_, mivel az embereknek nem kell tudniuk, mi van bennük.

```swift
let csv = "apple,pear,peach,orange,cherry,lime,goosberry"
let index = csv.index(csv.startIndex, offsetBy: 21)
csv[index]
// => "g"
print(index)
// => Index(_rawBits: 1376513)
```
