# Introduction

Au lieu d'indexer directement une _string_, on doit plutôt calculer une valeur de type `String.Index` et fournir cet indice. On notera que ces indices ne sont pas destinés à être lus par un humain en tant que tels. C'est ce qu'on appelle des _indices opaques_, car les humains n'ont pas besoin de savoir ce qu'ils contiennent.

```swift
let csv = "apple,pear,peach,orange,cherry,lime,goosberry"
let index = csv.index(csv.startIndex, offsetBy: 21)
csv[index]
// => "g"
print(index)
// => Index(_rawBits: 1376513)
```
