# はじめに

代数的データ型（ADT）は、決まった数の名前付きケースを表します。
ADTの各値は、そのうち必ず1つのケースに対応します。

ADTは`data`キーワードを使って定義し、ケースはパイプ（`|`）で区切ります。
どのケースにもデータが関連付けられていない場合、そのADTは、他の言語で通常_列挙型_（_enum_）と呼ばれるものに似ています。

```haskell
data Season
  = Spring
  | Summer
  | Autumn
  | Winter
```

ADTの各ケースには、必要に応じてデータを関連付けることができ、ケースごとに異なる型のデータを持たせられます。データを関連付けるケースでは、コンストラクターが必要です。

```haskell
data Number
  = NInt Int      --'NInt' is the constructor for an Int Number.
  | NFloat Float  --'NFloat' is the constructor for an Float Number.
  | Invalid       --'Invalid' does not have data associated to it.
```

特定のケースの値を作るには、その名前を参照します（例えば`NInt 22`）。
ケース名は単なるコンストラクター関数なので、関連付けるデータは通常の関数の引数として渡せます。

ADTは_構造的等価性_を持ちます。つまり、同じケースで同じ（省略可能な）データを持つ2つの値は等価です。

`if/else`式を使ってADTを扱うこともできますが、推奨される方法は、_case_文を使ったパターンマッチングです。

```haskell
add1 :: Number -> String
add1 number =
    case number of
      NInt    i -> show (i + 1)
      NFloat  f -> show (f + 1.0)
      Invalid   -> error "Invalid input"
```
