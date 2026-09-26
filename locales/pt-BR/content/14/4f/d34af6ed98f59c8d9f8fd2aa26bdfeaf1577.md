# Introdução

## Operações com caracteres

Os caracteres do Clojure são primitivos `java.lang.Character`, e podemos manipulá-los por meio da [interoperabilidade][clojure-java-interop], usando os métodos da [classe Character][java-character-class]:

```clojure
(Character/isDigit \2)
;;=> true
```

## Utilitários de string

O Clojure vem com uma poderosa biblioteca de processamento de strings, [clojure.string][clojure-str]. Isso costuma ser mais idiomático do que usar interoperabilidade.

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html