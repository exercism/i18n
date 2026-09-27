# 소개

## 문자 연산

Clojure의 문자는 `java.lang.Character` 원시 타입이고, [상호 운용][clojure-java-interop]을 통해 [Character 클래스][java-character-class]의 메서드로 다룰 수 있어요.

```clojure
(Character/isDigit \2)
;;=> true
```

## 문자열 유틸리티

Clojure에는 강력한 문자열 처리 라이브러리인 [clojure.string][clojure-str]이 함께 제공돼요. 이 라이브러리는 상호 운용보다 더 관용적인 경우가 많아요.

[clojure-str]: https://clojuredocs.org/clojure.string
[clojure-java-interop]: https://clojure.org/reference/java_interop
[java-character-class]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Character.html