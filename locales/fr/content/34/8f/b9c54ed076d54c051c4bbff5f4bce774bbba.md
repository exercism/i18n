# À propos

Au lieu d'indexer directement dans une _string_, il faut plutôt calculer une valeur de type `String.Index` et fournir cet indice à la place. À noter que ces indices ne sont pas faits pour être lus tels quels par un humain. Ce sont ce qu'on appelle des _indices opaques_, car il n'est pas nécessaire de savoir ce qu'ils contiennent.

```swift
let csv = "apple,pear,peach,orange,cherry,lime,goosberry"
let index = csv.index(csv.startIndex, offsetBy: 21)
csv[index]
// => "g"
print(index)
// => Index(_rawBits: 1376513)
```
