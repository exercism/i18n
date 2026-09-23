# Indices

## 1. Définis l’approbation

- [Définis le type de données algébrique][ADT] `Approval` avec des constructeurs pour les options requises.

## 2. Définis la cuisine

- [Définis le type de données algébrique][ADT] `Cuisine` avec des constructeurs pour les options requises.

## 3. Définis les genres de films

- [Définis le type de données algébrique][ADT] `Genre` avec des constructeurs pour les options requises.

## 4. Définis l’activité

- [Définis un type de données algébrique avec des données associées][ADT-with-data] pour encapsuler les différentes activités.

## 5. Évalue l’activité

- La meilleure façon d’exécuter de la logique en fonction de la valeur de l’activité est d’utiliser des [expressions `case`][case-expression].
- Le filtrage par motif sur un cas de type de données algébrique donne accès à ses données associées.
- Pour ajouter une condition supplémentaire à un motif, on peut utiliser une [garde][guards] à l’intérieur d’un `case`.
- Si on veut intercepter toutes les autres valeurs possibles dans un même cas, on peut utiliser le motif joker `_`.

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
