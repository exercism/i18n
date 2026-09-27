# Introdução

## Operações com carateres

Os carateres em Clojure são primitivas `java.lang.Character`, e podemos manipulá-los através de [interop][clojure-java-interop], usando os métodos da [classe Character][java-character-class]:

```clojure
(Character/isDigit \2)
;;=> true
```

## Utilitários para strings

O Clojure vem com uma poderosa biblioteca de processamento de strings, [clojure.string][clojure-str]. Muitas vezes, é mais idiomático do que recorrer ao interop.

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html