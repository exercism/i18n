# مقدمة

## عمليات الأحرف

أحرف Clojure هي قيم أولية من النوع `java.lang.Character`، ويمكننا التعامل معها عبر [التشغيل البيني][clojure-java-interop] باستخدام الطرق في [صنف Character][java-character-class]:

```clojure
(Character/isDigit \2)
;;=> true
```

## أدوات السلاسل النصية

تأتي Clojure مزودة بمكتبة قوية لمعالجة السلاسل النصية، [clojure.string][clojure-str]. وهذا غالبًا ما يكون أكثر توافقًا مع أسلوب Clojure من التشغيل البيني.

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html