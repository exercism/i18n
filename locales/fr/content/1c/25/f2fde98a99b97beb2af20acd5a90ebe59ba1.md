# Introduction

Il est souvent utile de regrouper une collection d'éléments, et de manipuler ces groupes comme des unités. En Cairo, on appelle un tel groupe une structure, et chaque élément un des champs de cette structure. Une structure définit l'ensemble général des champs disponibles, mais un exemple particulier de structure s'appelle une instance.

De plus, on peut définir des méthodes sur les structures : ces méthodes ont accès aux champs. Dans ce cas, la structure elle-même est désignée par `self`. Quand une méthode utilise `ref self: SomeStruct`, les champs peuvent être modifiés, ou mutés. Quand une méthode utilise `self: SomeStruct` ou `self: @SomeStruct`, les champs ne peuvent pas être modifiés : ils sont immuables. Contrôler la mutabilité aide le vérificateur d'emprunts à garantir que des catégories entières de bugs de concurrence ne se produisent tout simplement pas en Cairo.

Dans cet exercice, tu vas implémenter deux sortes de méthodes sur une structure. Les premières sont généralement appelées des _getters_ : elles exposent les champs de la structure au monde extérieur, sans laisser qui que ce soit d'autre muter cette valeur.

Tu vas aussi implémenter un autre type de méthodes, généralement appelées des _setters_. Celles-ci changent la valeur du champ. Les _setters_ ne sont pas très courants en Cairo : si un champ peut être modifié librement, il est plus courant de simplement le rendre public. Ils restent néanmoins utiles si la mise à jour du champ doit avoir des effets de bord.

Les structures se définissent à l'aide du mot-clé `struct`, suivi du nom du type qu'elles décrivent, avec une majuscule initiale :

```rust
struct Item {}
```

On introduit ensuite d'autres types dans le corps de la structure, comme _champs_ de celle-ci, chacun avec son propre type :

```rust
struct Item {
    name: String,
    weight: f32,
    worth: u32,
}
```

Un _trait_ définit un ensemble de méthodes qu'un type peut implémenter (on se concentrera ici sur les structures, mais les _traits_ peuvent aussi être implémentés sur des énumérations). Ces méthodes peuvent être appelées sur des instances du type lorsque ce _trait_ est implémenté. Les _traits_ se définissent à l'aide du mot-clé `trait`, et à l'intérieur d'un _trait_ on définit les signatures des méthodes que l'on veut que notre type implémente.

```rust
trait ImplTrait {
    // Define the method signature
    fn new() -> Item;
}
```

Enfin, on peut définir des méthodes sur les structures à l'intérieur d'un bloc `impl`, qui implémente le _trait_ défini :

```rust
impl ItemImpl of ImplTrait {
    // initializes and returns a new instance of our Item struct
    fn new() -> Item {
        Item {}
    }
}
```
