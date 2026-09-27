# পরিচিতি

## ক্যারেক্টার অপারেশন

Clojure ক্যারেক্টারগুলো `java.lang.Character` প্রিমিটিভ, আর [ইন্টারঅপ][clojure-java-interop] ব্যবহার করে [Character ক্লাসের][java-character-class] মেথড দিয়ে আমরা এগুলো নিয়ে কাজ করতে পারি:

```clojure
(Character/isDigit \2)
;;=> true
```

## স্ট্রিং ইউটিলিটি

Clojure-এর সাথে একটি শক্তিশালী স্ট্রিং প্রসেসিং লাইব্রেরি আসে, [clojure.string][clojure-str]। এটি প্রায়ই ইন্টারঅপের চেয়ে বেশি ইডিওম্যাটিক।

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html