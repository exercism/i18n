# Introducción

## Operaciones con caracteres

Los caracteres de Clojure son primitivas de `java.lang.Character`, y podemos manipularlos mediante la [interoperabilidad][clojure-java-interop] usando los métodos de la [clase Character][java-character-class]:

```clojure
(Character/isDigit \2)
;;=> true
```

## Utilidades de string

Clojure incluye una potente biblioteca de procesamiento de strings, [clojure.string][clojure-str]. A menudo es más idiomática que la interoperabilidad.

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html