# परिचय

## पैटर्न मैचिंग

[पैटर्न मैचिंग][pattern-matching] से हम अभिव्यंजक कोड लिख सकते हैं, जो अलग-अलग स्थितियों में अलग-अलग शाखाएँ लेता है, और [डिस्ट्रक्चरिंग][destructuring] वैल्यू को वेरिएबल में बड़े सुंदर ढंग से बाँधती है।

### सरल पैटर्न मैचिंग

`case` स्टेटमेंट की मदद से पैटर्न मैचिंग वैल्यू को वेरिएबल में बाँध सकती है, या फिर वाइल्डकार्ड `_` से उन वैल्यू को छोड़ सकती है।

```elm
type Entity = Alien | Stranger (Maybe String) | Friend { name: String }

hello : Entity -> String
hello entity =
    case entity of
        -- Custom type variant
        Alien -> "Hello, you are not from around here are you?"
        -- Binding to a litteral value nested in Stranger
        Stranger (Just nametag) -> "Hello, erm... " ++ nametag ++ "."
        -- Discarding Friend's data
        Friend _ -> "Hi!"
        -- All other cases
        _ -> "Hello stranger!"
```

### डिस्ट्रक्चरिंग

जब डेटा के लिए एक ही आकार संभव हो, तब डिस्ट्रक्चरिंग से `let` बाइंडिंग में, फंक्शन के आर्गुमेंट में, और बेशक `case` एक्सप्रेशन में वैल्यू बाँधी जा सकती है।

```elm
pairSum : ( Int, Int ) -> Int
pairSum pair =
    -- Destructuring of a pair in a 'let' binding
    let ( x, y ) = pair
    in x + y

-- Destructuring in the function argument
pairSum : ( Int, Int ) -> Int
pairSum ( x, y ) = x + y

-- Custom type containing a single variant
type Container = Box String

-- Destructuring in the function argument
unbox : Container -> String
unbox (Box str) = str

-- Destructuring combined with pattern matching
unboxMaybe : Maybe Container -> Maybe String
unboxMaybe maybeContainer =
    case maybeContainer of
        Nothing -> Nothing
        Just (Box "42") -> Just "The answer to the universe!"
        Just (Box str) -> Just str
```

डिस्ट्रक्चरिंग का इस्तेमाल [रिकॉर्ड][records-pattern-matching] के लिए भी किया जा सकता है, या [`as` कीवर्ड][as-keyword] के साथ।

```elm
type alias Circle =
    { radius : Float
    , center : ( Float, Float )
    }

perimeter : Circle -> Float
perimeter { radius } =
    2 * pi * radius

left : Circle -> Float
left { radius, center } =
    -- the pair center cannot be pattern matched directly in the function argument
    -- so we do it in a 'let' statement
    let ( x, _ ) = center
    in x - radius

-- using the 'as' keyword to bind both the fields and the whole record
smaller : Float -> Circle -> Circle
smaller reduction ({ radius } as circle) =
    if reduction < radius then
        { circle | radius = radius - reduction }
    else
        circle
```

[pattern-matching]: https://guide.elm-lang.org/types/pattern_matching.html
[destructuring]: https://gist.github.com/yang-wei/4f563fbf81ff843e8b1e
[records-pattern-matching]: https://elm-lang.org/docs/records#pattern-matching
[as-keyword]: https://github.com/izdi/elm-cheat-sheet#operators
