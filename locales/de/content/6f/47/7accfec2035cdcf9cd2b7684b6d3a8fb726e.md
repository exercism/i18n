# Einführung

## Pattern Matching

[Pattern Matching][pattern-matching] ermöglicht ausdrucksstarken Code mit Verzweigungen, und mit [Destrukturierung][destructuring] bindest du Werte elegant an Variablen.

### Einfaches Pattern Matching

Mit Pattern Matching kannst du Werte an Variablen binden oder sie mit dem Platzhalter `_` verwerfen, indem du die `case`-Anweisung verwendest.

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

### Destrukturierung

Destrukturierung kann Werte in `let`-Bindungen, in Funktionsargumenten und natürlich in `case`-Ausdrücken binden, wann immer die Daten nur eine mögliche Form haben.

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

Destrukturierung lässt sich auch für [Records][records-pattern-matching] verwenden oder mit dem [`as`-Schlüsselwort][as-keyword].

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
