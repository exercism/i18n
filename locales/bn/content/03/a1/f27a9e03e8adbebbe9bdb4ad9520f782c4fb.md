# ভূমিকা

`Maybe` টাইপটি Elm ভাষায় ঐচ্ছিক মানের সমাধান।
তাই এটি Elm-এর বহু কোর ফাংশনের টাইপ সিগনেচারে থাকে, আর এটি বোঝা অত্যন্ত জরুরি।
`Maybe` টাইপটি নিচের মতো ডিফাইন করা হয়েছে:

```elm
type Maybe a = Nothing | Just a
```

Elm-এর পরিভাষায় এটিকে "কাস্টম টাইপ" ডেফিনিশন বলা হয়।
এটি বোঝায় যে এই টাইপের একটি মান হয় `Nothing` হতে পারে, নয়তো `a` টাইপের কিছু `Just` হতে পারে।
এর দুটি কনস্ট্রাক্টর `Nothing` এবং `Just`-এর একটি দিয়ে একটি `Maybe` মান তৈরি করা হয়।
একটি `Maybe`-এর কনটেন্ট পড়া হয় প্যাটার্ন ম্যাচিংয়ের মাধ্যমে।

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

`Maybe` মডিউলে `Maybe` টাইপগুলো ম্যানিপুলেট করার জন্য বেশ কিছু উপযোগী ফাংশনও আছে।

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
