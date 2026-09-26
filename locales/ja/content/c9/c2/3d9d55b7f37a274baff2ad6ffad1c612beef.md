# 説明

かなり大きなワインセラーを備えた高級レストランのマネージャーです。お客様の中には、ワインに強いこだわりを持つ愛好家もたくさんいます。あるお客様にぴったりのワインを1本見つけるのは、決して簡単なことではありません。

テクノロジーに強いレストランのオーナーであるあなたは、ワイン選びのスピードを上げることにしました。お客様が好みに合わせてワインを絞り込めるアプリを作るのです。

## 1. 指定した色のワインをすべて取得する

ワインのボトルはカスタム型で表現され、ワインは配列に格納されます。

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

`wines_of_color`関数を実装しましょう。ワインの配列を受け取り、指定した色のワインをすべて返すようにします。

```gleam
wines_of_color(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  color: White
)
// -> [
//   Wine("Chardonnay", 2015, "Italy", White),
//   Wine("Pinot grigio", 2017, "Germany", White),
// ]
```

## 2. 指定した国のワインをすべて取得する

`wines_from_country`関数を実装しましょう。ワインの配列を受け取り、指定した国のワインをすべて返すようにします。

```gleam
wines_from_country(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  country: "Germany"
)
// -> [
//   Wine("Dornfelder", 2018, "Germany", Rose)
// ]
```

## 3. 指定した色で、指定した国で瓶詰めされたワインをすべて取得する

`filter`関数を実装しましょう。ワインの配列、色、国を受け取り、指定した色で指定した国で瓶詰めされたワインをすべて返すようにします。

```gleam
filter(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  color: White
  country: "Italy"
)
// -> [
//   Wine("Chardonnay", 2015, "Italy", White),
// ]
```
