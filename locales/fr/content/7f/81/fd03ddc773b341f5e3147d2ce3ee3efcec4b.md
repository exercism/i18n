# Syntaxe des méthodes

Les méthodes en Cairo sont semblables aux fonctions, mais elles sont rattachées à un type précis par l'intermédiaire des traits.

Leur premier paramètre est toujours `self`, qui représente l'instance sur laquelle la méthode est appelée.

Cairo ne permet pas de définir des méthodes directement sur un type, mais on obtient la même chose en définissant un trait et en l'implémentant pour ce type.

Voici un exemple de méthode définie sur un type `Rectangle` à l'aide d'un trait :

```rust
#[derive(Copy, Drop)]
struct Rectangle {
    width: u64,
    height: u64,
}

#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn area(self: @Rectangle) -> u64 {
        (*self.width) * (*self.height)
    }
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };
    println!("Area is {}", rect.area());
}
```

Dans l'exemple ci-dessus, la méthode `area` calcule l'aire d'un rectangle.

Utiliser l'attribut `#[generate_trait]` simplifie le processus, puisqu'il crée automatiquement le trait nécessaire à ta place.

Ainsi, le code reste plus propre tout en permettant d'associer des méthodes à des types précis.

## Fonctions associées

Les fonctions associées ressemblent aux méthodes, mais elles ne s'appliquent pas à une instance d'un type : elles ne prennent pas `self` en paramètre.

Ces fonctions servent souvent de constructeurs ou de fonctions utilitaires rattachées au type.

```rust
#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn square(size: u64) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let square = RectangleTrait::square(10);
    println!("Square dimensions: {}x{}", square.width, square.height);
}
```

Les fonctions associées, comme `Rectangle::square`, utilisent la syntaxe `::` et sont rattachées à l'espace de noms du type.

Elles facilitent la création et la manipulation d'instances sans avoir besoin d'un objet déjà existant.

En organisant les fonctionnalités liées dans des traits et des implémentations, Cairo permet d'obtenir des structures de code propres, modulaires et extensibles.
