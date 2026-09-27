# 簡介

## 字元操作

Clojure 的字元是 `java.lang.Character`基本型別，我們可以透過[互操作][clojure-java-interop]，使用 [Character 類別][java-character-class]中的方法來操作它們：

```clojure
(Character/isDigit \2)
;;=> true
```

## 字串工具

Clojure 內建一套強大的字串處理函式庫：[clojure.string][clojure-str]。這通常比互操作更符合慣用寫法。

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html