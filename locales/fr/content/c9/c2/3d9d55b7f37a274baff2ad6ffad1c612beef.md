# Instructions

Tu es le gérant d'un restaurant chic avec une cave à vin bien garnie. Beaucoup de tes clients sont des passionnés de vin exigeants. Trouver la bonne bouteille de vin pour un client en particulier n'est pas une mince affaire.

En tant que restaurateur féru de technologie, tu as décidé d'accélérer la sélection des vins en écrivant une application qui permettra à tes clients de filtrer tes vins selon leurs préférences.

## 1. Récupère tous les vins d'une couleur donnée

Une bouteille de vin est représentée par un type personnalisé, et les vins sont stockés dans un tableau.

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

Implémente la fonction `wines_of_color`. Elle doit prendre un tableau de vins et renvoyer tous les vins d'une couleur donnée.

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

## 2. Récupère toutes les bouteilles de vin d'un pays donné

Implémente la fonction `wines_from_country`. Elle doit prendre un tableau de vins et renvoyer tous les vins d'un pays donné.

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

## 3. Récupère tous les vins d'une couleur donnée mis en bouteille dans un pays donné

Implémente la fonction `filter`. Elle doit prendre un tableau de vins, une couleur et un pays, et renvoyer tous les vins de la couleur donnée mis en bouteille dans le pays donné.

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
