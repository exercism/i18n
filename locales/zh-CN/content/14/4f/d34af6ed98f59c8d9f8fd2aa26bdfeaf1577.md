# 引言

## 字符操作

Clojure 的字符是`java.lang.Character`基本类型，我们可以通过[互操作][clojure-java-interop]，使用 [Character 类][java-character-class] 提供的方法来操作它们：

```clojure
(Character/isDigit \2)
;;=> true
```

## 字符串工具

Clojure 自带一个强大的字符串处理库 [clojure.string][clojure-str]。这种写法通常比互操作更地道。

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html