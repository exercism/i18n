# Докладніше

Замість того, щоб індексувати рядок тексту (англ. string) напряму, потрібно обчислити значення типу `String.Index` і передати саме його. Зауважмо, що ці індекси не призначені для безпосереднього сприйняття людиною. Їх називають _непрозорими індексами_, бо людині не потрібно знати, що міститься всередині них.

```swift
let csv = "apple,pear,peach,orange,cherry,lime,goosberry"
let index = csv.index(csv.startIndex, offsetBy: 21)
csv[index]
// => "g"
print(index)
// => Index(_rawBits: 1376513)
```
