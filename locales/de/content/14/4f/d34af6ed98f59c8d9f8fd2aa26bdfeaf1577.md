# Einleitung

## Zeichenoperationen

Clojure-Zeichen sind `java.lang.Character`-Primitive, und wir können sie über [Interop][clojure-java-interop] mit den Methoden der [Character-Klasse][java-character-class] bearbeiten:

```clojure
(Character/isDigit \2)
;;=> true
```

## Hilfsfunktionen für Strings

Clojure bringt eine leistungsstarke Bibliothek zur String-Verarbeitung mit, [clojure.string][clojure-str]. Sie ist oft idiomatischer als Interop.

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html