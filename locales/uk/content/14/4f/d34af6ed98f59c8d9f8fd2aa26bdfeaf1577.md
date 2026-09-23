# Вступ

## Операції над символами

Символи в Clojure - це примітиви `java.lang.Character`, і ми можемо працювати з ними через [взаємодію з Java][clojure-java-interop], використовуючи методи [класу Character][java-character-class]:

```clojure
(Character/isDigit \2)
;;=> true
```

## Робота з рядками тексту (англ. string)

Clojure постачається з потужною бібліотекою для обробки рядків тексту, [clojure.string][clojure-str]. Часто це ідіоматичніше, ніж взаємодія з Java.

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html