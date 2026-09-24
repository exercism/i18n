# Вступ

Замість прямого індексування рядка тексту (англ. string) слід натомість обчислити значення типу `String.Index` і передати цей індекс. Зауважмо, що ці індекси не призначені для того, щоб людина читала їх сама по собі. Їх називають _непрозорими індексами_, бо людям не потрібно знати, що всередині них.

```swift
let csv = "apple,pear,peach,orange,cherry,lime,goosberry"
let index = csv.index(csv.startIndex, offsetBy: 21)
csv[index]
// => "g"
print(index)
// => Index(_rawBits: 1376513)
```
