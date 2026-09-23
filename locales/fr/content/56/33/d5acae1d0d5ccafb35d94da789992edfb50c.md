# Introduction

Un type de données algébrique (ADT) représente un nombre fixe de cas nommés.
Chaque valeur d'un ADT correspond à exactement l'un des cas nommés.

Un ADT se définit avec le mot-clé `data`, les cas étant séparés par des caractères barre verticale (`|`).
Si aucun des cas n'a de données associées, l'ADT s'apparente à ce que les autres langages appellent généralement une _énumération_ (ou _enum_).

```haskell
data Season
  = Spring
  | Summer
  | Autumn
  | Winter
```

Chaque cas d'un ADT peut éventuellement avoir des données associées, et des cas différents peuvent avoir des types de données différents. Quand un cas a des données associées, un constructeur est nécessaire.

```haskell
data Number
  = NInt Int      --'NInt' is the constructor for an Int Number.
  | NFloat Float  --'NFloat' is the constructor for an Float Number.
  | Invalid       --'Invalid' does not have data associated to it.
```

Pour créer une valeur d'un cas précis, il suffit de référencer son nom (par exemple, `NInt 22`).
Comme les noms de cas ne sont que des fonctions constructrices, les données associées peuvent être passées comme n'importe quel argument de fonction.

Les ADT ont une _égalité structurelle_, ce qui signifie que deux valeurs du même cas et portant les mêmes données (facultatives) sont équivalentes.

Bien qu'on puisse utiliser des expressions `if/else` pour travailler avec les ADT, la façon recommandée de le faire est le filtrage par motifs à l'aide de l'instruction `case` :

```haskell
add1 :: Number -> String
add1 number =
    case number of
      NInt    i -> show (i + 1)
      NFloat  f -> show (f + 1.0)
      Invalid   -> error "Invalid input"
```
