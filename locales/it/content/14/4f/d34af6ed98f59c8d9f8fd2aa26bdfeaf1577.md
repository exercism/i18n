# Introduzione

## Operazioni sui caratteri

I caratteri di Clojure sono primitivi `java.lang.Character`, e possiamo manipolarli tramite [interop][clojure-java-interop] usando i metodi della [classe Character][java-character-class]:

```clojure
(Character/isDigit \2)
;;=> true
```

## Utilità per le stringhe

Clojure include una potente libreria per l'elaborazione delle stringhe, [clojure.string][clojure-str]. Spesso è più idiomatico rispetto all'interop.

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html