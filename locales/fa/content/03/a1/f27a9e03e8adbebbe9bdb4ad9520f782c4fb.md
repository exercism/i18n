# مقدمه

نوع `Maybe` راهحل زبان Elm برای مقادیر اختیاری است.
از این رو در امضای نوعِ بسیاری از توابع اصلی Elm دیده می‌شود و درک آن حیاتی است.
نوع `Maybe` به این شکل تعریف می‌شود:

```elm
type Maybe a = Nothing | Just a
```

این در اصطلاحات Elm به تعریف «نوع سفارشی» معروف است.
این نشان می‌دهد که یک مقدار از این نوع یا `Nothing` است یا `Just` چیزی از نوع `a`.
ساختن یک مقدار `Maybe` از طریق یکی از دو «سازنده‌ی» آن، یعنی `Nothing` و `Just`، انجام می‌شود.
خواندن محتوای یک `Maybe` از طریق «تطبیق الگو» انجام می‌شود.

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

شماری از توابع مفید دیگر هم در ماژول `Maybe` برای کار با انواع `Maybe` وجود دارد.

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
