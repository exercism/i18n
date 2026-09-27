# مقدمه

## کار با کاراکترها

«کاراکتر»های Clojure از نوع داده‌های اولیه‌ی `java.lang.Character` هستند و می‌توانیم از طریق [interop][clojure-java-interop] با متدهای [کلاس Character][java-character-class] آن‌ها را دستکاری کنیم:

```clojure
(Character/isDigit \2)
;;=> true
```

## ابزارهای رشته

Clojure یک کتابخانه‌ی قدرتمند پردازش رشته همراه دارد: [clojure.string][clojure-str]. این کار اغلب از interop طبیعی‌تر است.

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html