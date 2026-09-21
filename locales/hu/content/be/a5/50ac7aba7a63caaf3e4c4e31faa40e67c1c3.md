# Bevezetés

A string közvetlen indexelése helyett először ki kell számítani egy `String.Index` típusú értéket, és azt kell megadni indexként. Ne feledd, hogy ezeket az indexeket nem arra tervezték, hogy önmagukban ember számára értelmezhetők legyenek. Ezek az úgynevezett _átlátszatlan indexek_, hiszen az embereknek nem kell tudniuk, mi van bennük.

```swift
let csv = "apple,pear,peach,orange,cherry,lime,goosberry"
let index = csv.index(csv.startIndex, offsetBy: 21)
csv[index]
// => "g"
print(index)
// => Index(_rawBits: 1376513)
```
