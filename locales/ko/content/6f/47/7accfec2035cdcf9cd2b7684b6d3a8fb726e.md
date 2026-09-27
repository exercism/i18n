# 소개

## 패턴 매칭

[패턴 매칭][pattern-matching]은 표현력 있는 분기 코드를 가능하게 하고, [구조 분해][destructuring]는 값과 변수를 우아하게 묶어줘요.

### 간단한 패턴 매칭

패턴 매칭은 `case`문을 사용해 값을 변수에 묶거나, 와일드카드 `_`로 값을 버릴 수 있어요.

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

### 구조 분해

구조 분해는 데이터에 가능한 형태가 하나뿐일 때마다 `let` 바인딩, 함수 인자, 그리고 물론 case 식에서 값을 묶을 수 있어요.

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

구조 분해는 [레코드][records-pattern-matching]에도 사용할 수 있고, [`as` 키워드][as-keyword]와 함께 쓸 수도 있어요.

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
