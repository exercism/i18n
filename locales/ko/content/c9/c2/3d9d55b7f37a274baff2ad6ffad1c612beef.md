# 지침

여러분은 규모가 꽤 큰 와인 저장고를 갖춘 고급 레스토랑에서 매니저로 일하고 있어요. 손님 중에는 까다로운 와인 애호가가 많아요. 특정 손님에게 꼭 맞는 와인 한 병을 고르는 일은 쉽지 않아요.

기술에 밝은 레스토랑 사장답게, 손님이 취향에 따라 와인을 걸러 볼 수 있는 앱을 만들어 와인 선택 과정의 속도를 높이기로 했어요.

## 1. 주어진 색상의 와인 모두 가져오기

와인 한 병은 사용자 정의 타입으로 표현하고, 와인은 배열에 저장해요.

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

`wines_of_color` 함수를 구현해요. 와인 배열을 받아 주어진 색상의 와인을 모두 반환해야 해요.

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

## 2. 주어진 국가의 와인 모두 가져오기

`wines_from_country` 함수를 구현해요. 와인 배열과 국가를 받아, 주어진 국가에서 생산된 와인을 모두 반환해야 해요.

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

## 3. 주어진 국가에서 생산된 주어진 색상의 와인 모두 가져오기

`filter` 함수를 구현해요. 와인 배열, 색상, 국가를 받아 주어진 국가에서 생산된 주어진 색상의 와인을 모두 반환해야 해요.

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
