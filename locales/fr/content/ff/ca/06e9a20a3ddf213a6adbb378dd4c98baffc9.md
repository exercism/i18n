# À propos

Quand une variante d'un type personnalisé contient des données, on parle d'un _enregistrement_, et chaque valeur qu'il contient réside dans un _champ_.

```gleam
pub type Rectangle {
  Rectangle(
    Float, // The first field
    Float, // The second field
  )
}
```

Pour faciliter la lecture, Gleam permet d'étiqueter les champs avec un nom.

```gleam
pub type Rectangle {
  Rectangle(
    width: Float,
    height: Float,
  )
}
```

Les étiquettes permettent de donner les arguments dans n'importe quel ordre au constructeur d'un enregistrement.

```gleam
let a = Rectangle(height: 10.0, width: 20.0)
let b = Rectangle(width: 20.0, height: 10.0)

a == b
// -> True
```

Quand un type personnalisé ne possède qu'une seule variante, on peut utiliser la syntaxe d'accès `.label` pour récupérer les champs d'un enregistrement.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)

rect.height // -> 10.0
rect.width  // -> 20.0
```

La syntaxe de mise à jour d'enregistrement permet, quand un type personnalisé ne possède qu'une seule variante, de créer un nouvel enregistrement à partir d'un enregistrement existant tout en remplaçant certains champs par de nouvelles valeurs.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)
let tall_rect = Rectangle(..rect, height: 50.0)

tall_rect.height // -> 50.0
tall_rect.width  // -> 20.0
```

On peut aussi utiliser les étiquettes avec le _pattern matching_ pour extraire les valeurs des enregistrements.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, width: _) if h > 20.0 -> True
    _ -> False
  }
}
```

Si on ne veut faire correspondre que certains des champs, on peut utiliser l'opérateur de propagation `..` pour ignorer les champs restants.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, ..) if h > 20.0 -> True
    _ -> False
  }
}
```
