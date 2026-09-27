# 소개

대수적 데이터 타입(Algebraic Data Type, ADT)은 이름이 붙은 케이스를 정해진 개수만큼 나타내요.
ADT의 각 값은 이름이 붙은 케이스 중 정확히 하나에 해당해요.

ADT는 `data` 키워드로 정의하고, 각 케이스는 파이프(`|`) 문자로 구분해요.
케이스에 연결된 데이터가 하나도 없다면, 그 ADT는 다른 언어에서 흔히 _열거형_(또는 _enum_)이라고 부르는 것과 비슷해요.

```haskell
data Season
  = Spring
  | Summer
  | Autumn
  | Winter
```

ADT의 각 케이스에는 선택적으로 데이터를 연결할 수 있고, 케이스마다 다른 타입의 데이터를 가질 수 있어요. 케이스에 데이터가 연결되어 있으면 생성자가 필요해요.

```haskell
data Number
  = NInt Int      --'NInt' is the constructor for an Int Number.
  | NFloat Float  --'NFloat' is the constructor for an Float Number.
  | Invalid       --'Invalid' does not have data associated to it.
```

특정 케이스의 값을 만들려면 그 케이스의 이름을 사용하면 돼요(예: `NInt 22`).
케이스 이름은 그냥 생성자 함수라서, 연결된 데이터는 일반 함수 인자처럼 넘길 수 있어요.

ADT는 _구조적 동등성_을 가져요. 즉, 같은 케이스에 속하고 같은 (선택적) 데이터를 가진 두 값은 서로 같은 값이에요.

`if/else` 표현식으로도 ADT를 다룰 수 있지만, ADT를 다루는 권장 방법은 _case_ 문을 사용한 패턴 매칭이에요.

```haskell
add1 :: Number -> String
add1 number =
    case number of
      NInt    i -> show (i + 1)
      NFloat  f -> show (f + 1.0)
      Invalid   -> error "Invalid input"
```
