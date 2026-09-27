# Anleitung

Du bist der Manager eines schicken Restaurants mit einem ansehnlichen Weinkeller. Viele deiner Gäste sind anspruchsvolle Weinliebhaber. Die richtige Flasche Wein für einen bestimmten Gast zu finden, ist keine leichte Aufgabe.

Als technikbegeisterter Restaurantbesitzer hast du beschlossen, die Weinauswahl zu beschleunigen, indem du eine App schreibst, mit der Gäste deine Weine nach ihren Vorlieben filtern können.

## 1. Alle Weine einer bestimmten Farbe finden

Eine Weinflasche wird durch einen benutzerdefinierten Typ dargestellt, und Weine werden in einer Liste gespeichert.

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

Implementiere die Funktion `wines_of_color`. Sie soll eine Liste von Weinen entgegennehmen und alle Weine einer bestimmten Farbe zurückgeben.

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

## 2. Alle Weinflaschen eines bestimmten Landes finden

Implementiere die Funktion `wines_from_country`. Sie soll eine Liste von Weinen entgegennehmen und alle Weine aus einem bestimmten Land zurückgeben.

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

## 3. Alle Weine einer bestimmten Farbe finden, die in einem bestimmten Land abgefüllt wurden

Implementiere die Funktion `filter`. Sie soll eine Liste von Weinen, eine Farbe und ein Land entgegennehmen und alle Weine der gegebenen Farbe zurückgeben, die im gegebenen Land abgefüllt wurden.

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
