# Introduction

## Les opérations sur les caractères

Les caractères en Clojure sont des primitives `java.lang.Character`, et on peut les manipuler via [l'interopérabilité][clojure-java-interop] en utilisant les méthodes de la [classe Character][java-character-class] :

```clojure
(Character/isDigit \2)
;;=> true
```

## Les utilitaires pour les _strings_

Clojure est livré avec une puissante bibliothèque de traitement des chaînes de caractères, [clojure.string][clojure-str]. Elle est souvent plus idiomatique que l'interopérabilité.

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html