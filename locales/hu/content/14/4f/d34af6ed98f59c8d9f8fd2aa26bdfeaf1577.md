# Bevezetés

## Karakterekkel végzett műveletek

A Clojure karakterei `java.lang.Character` primitívek. Ezeket az [interop][clojure-java-interop] segítségével, a [Character osztály][java-character-class] metódusaival tudjuk manipulálni:

```clojure
(Character/isDigit \2)
;;=> true
```

## Segédeszközök stringekhez

A Clojure-hez egy hatékony, stringfeldolgozó könyvtár is jár: [clojure.string][clojure-str]. Ez gyakran idiomatikusabb, mint az interop.

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html