# 說明

你是一間高級餐廳的經理，餐廳裡還有一座規模不小的酒窖。你的顧客中有很多是講究的葡萄酒愛好者。要為某位顧客找到對的那瓶酒，可不是件容易的事。

身為一位懂技術的餐廳老闆，你決定寫個應用程式來加快選酒的流程，讓客人可以依照自己的喜好篩選你的酒款。

## 1. 取得指定顏色的所有葡萄酒

一瓶葡萄酒以自訂型別表示，而所有的酒款則存放在陣列中。

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

實作 `wines_of_color` 函式。它應該接受一個葡萄酒陣列，並回傳指定顏色的所有葡萄酒。

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

## 2. 取得指定國家的所有葡萄酒

實作 `wines_from_country` 函式。它應該接受一個葡萄酒陣列，並回傳來自指定國家的所有葡萄酒。

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

## 3. 取得在指定國家裝瓶、指定顏色的所有葡萄酒

實作 `filter` 函式。它應該接受一個葡萄酒陣列、一個顏色和一個國家，並回傳在指定國家裝瓶、指定顏色的所有葡萄酒。

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
