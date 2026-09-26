# はじめに

## 文字の操作

Clojureの文字は`java.lang.Character`のプリミティブで、[相互運用][clojure-java-interop]を通じて[Characterクラス][java-character-class]のメソッドを使って操作できます。

```clojure
(Character/isDigit \2)
;;=> true
```

## 文字列ユーティリティ

Clojureには強力な文字列処理ライブラリである[clojure.string][clojure-str]が付属しています。多くの場合、相互運用よりもこちらのほうが慣用的です。

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html