# Utasítások

Egy elegáns étterem menedzsere vagy, amelynek tekintélyes borospincéje van. A vendégeid közül sokan igényes borrajongók. Nem könnyű feladat megtalálni a megfelelő üveg bort egy adott vendég számára.

Technikailag felkészült étteremtulajdonosként úgy döntöttél, hogy felgyorsítod a borkiválasztás folyamatát: írsz egy alkalmazást, amellyel a vendégek az ízlésük szerint szűrhetik a boraidat.

## 1. Keresd ki az összes adott színű bort

Egy üveg bort egy egyedi típus reprezentál, a borokat pedig egy listában tároljuk.

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

Valósítsd meg a `wines_of_color` függvényt. Egy borokból álló listát kap, és visszaadja az adott színű összes bort.

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

## 2. Keresd ki az összes bort egy adott országból

Valósítsd meg a `wines_from_country` függvényt. Egy borokból álló listát kap, és visszaadja az adott országból származó összes bort.

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

## 3. Keresd ki az adott országban palackozott, adott színű borokat

Valósítsd meg a `filter` függvényt. Egy borokból álló listát, egy színt és egy országot kap, és visszaadja az adott országban palackozott, adott színű borokat.

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
