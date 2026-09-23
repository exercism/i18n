# Indices

## Généralités

## 1. Implémente la méthode `new()`

- La méthode `new()` prend les arguments avec lesquels on veut instancier une instance de `User`.
  Elle doit renvoyer une instance de `User` avec le nom, l'âge et le poids indiqués.

- Consulte la [documentation sur les structures][structs] pour des exemples de définition et d'instanciation de structures.

## 2. Implémente les méthodes _getter_

- Les méthodes `name()`, `age()` et `weight()` sont des _getters_.
  Autrement dit, elles sont chargées de renvoyer le champ correspondant d'une instance de structure.

- Il n'est pas nécessaire d'utiliser une instruction `return` en Cairo, sauf si l'on veut expressément qu'une fonction ou une méthode renvoie son résultat de façon anticipée.
  Sinon, il est plus idiomatique de recourir à un retour _implicite_ en omettant le point-virgule pour le résultat que l'on veut renvoyer.
  Utiliser un retour explicite n'est pas _faux_, mais c'est plus propre de tirer parti des retours implicites quand c'est possible.

```rust
fn foo() -> i32 {
    1
}
```

- Consulte la [documentation sur les méthodes][methods] pour plus d'exemples de définition de méthodes sur des structures.

## 3. Implémente les méthodes _setter_

- Les méthodes `set_age()` et `set_weight()` sont des _setters_, chargées de mettre à jour le champ correspondant d'une instance de structure avec l'argument passé en entrée.

- Comme le précisent les signatures de ces méthodes, les méthodes _setter_ ne doivent rien renvoyer.

[structs]: https://book.cairo-lang.org/ch05-01-defining-and-instantiating-structs.html
[methods]: https://book.cairo-lang.org/ch05-03-method-syntax.html
