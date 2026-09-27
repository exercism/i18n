# 소개

`Maybe` 타입은 Elm 언어에서 값이 있을 수도, 없을 수도 있는 경우를 다루는 해법이에요. 그래서 Elm의 수많은 핵심 함수 타입 시그니처에 등장하고, 이를 이해하는 것은 아주 중요해요. `Maybe` 타입은 다음과 같이 정의돼요.

```elm
type Maybe a = Nothing | Just a
```

이런 정의를 Elm 용어로 "custom type" 정의라고 해요. 이 타입의 값은 `Nothing`이거나, `a` 타입의 무언가를 담은 `Just` 중 하나라는 뜻이에요. `Maybe` 값을 만드는 방법은 두 생성자 `Nothing`과 `Just` 중 하나를 쓰는 거예요. `Maybe` 안에 든 내용을 읽는 방법은 패턴 매칭이에요.

```elm
matthieu : Maybe String
matthieu = Just "Matthieu"

anon : Maybe String
anon = Nothing

sayHello : Maybe String -> String
sayHello maybeName =
    case maybeName of
        Nothing -> "Hello, World!"
        Just someName -> "Hello, " ++ someName ++ "!"

sayHello matthieu
    --> "Hello, Matthieu!"

sayHello anon
    --> "Hello, World!"
```

`Maybe` 모듈에는 `Maybe` 타입을 다루는 유용한 함수도 여러 개 있어요.

```elm
sayHelloAgain : Maybe String -> String
sayHelloAgain name = "Hello, " ++ Maybe.withDefault "World" name ++ "!"

capitalizeName : Maybe String -> Maybe String
capitalizeName name = Maybe.map String.toUpper name

capitalizeName matthieu
    --> Just "MATTHIEU"

capitalizeName anon
    --> Nothing
```
