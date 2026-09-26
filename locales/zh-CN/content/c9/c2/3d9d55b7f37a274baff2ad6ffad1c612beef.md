# 说明

你是一家高档餐厅的经理，餐厅有一个相当大的酒窖。你的许多顾客都是要求很高的葡萄酒爱好者。要为某位顾客找到合适的那瓶酒，可不是件容易的事。

作为一位懂技术的餐厅老板，你决定写一个应用来加快选酒的过程，让客人可以按照自己的偏好筛选你的葡萄酒。

## 1. 获取指定颜色的所有葡萄酒

一瓶酒用一个自定义类型表示，所有酒都存放在一个数组里。

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

实现`wines_of_color`函数。它接收一个葡萄酒数组，返回指定颜色的所有葡萄酒。

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

## 2. 获取产自指定国家的所有葡萄酒

实现`wines_from_country`函数。它接收一个葡萄酒数组，返回产自指定国家的所有葡萄酒。

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

## 3. 获取指定国家中指定颜色的所有葡萄酒

实现`filter`函数。它接收一个葡萄酒数组、一个颜色和一个国家，返回指定国家中指定颜色的所有葡萄酒。

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
