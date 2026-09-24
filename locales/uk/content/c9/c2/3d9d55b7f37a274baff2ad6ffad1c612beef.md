# Інструкції

Ми керуємо елегантним рестораном із чималим винним погребом. Серед наших відвідувачів багато вимогливих поціновувачів вина. Знайти правильну пляшку вина для конкретного гостя нелегко.

Як власник ресторану, обізнаний із технологіями, ми вирішили пришвидшити процес вибору вина й написати застосунок, який дозволить гостям фільтрувати наше вино за їхніми вподобаннями.

## 1. Отримати всі вина заданого кольору

Пляшку вина представлено за допомогою власного типу, а вина зберігаються в масиві.

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

Реалізуйте функцію `wines_of_color`. Вона приймає масив вин і повертає всі вина заданого кольору.

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

## 2. Отримати всі пляшки вин із заданої країни

Реалізуйте функцію `wines_from_country`. Вона приймає масив вин і повертає всі вина із заданої країни.

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

## 3. Отримати всі вина заданого кольору, розлиті в заданій країні

Реалізуйте функцію `filter`. Вона приймає масив вин, колір і країну та повертає всі вина заданого кольору, розлиті в заданій країні.

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
