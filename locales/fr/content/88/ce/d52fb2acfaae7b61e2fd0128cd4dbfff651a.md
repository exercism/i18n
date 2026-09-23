# Introduction

Il arrive qu'un morceau de code doive être utilisé plusieurs fois. Dans ce cas, il peut être pratique de le placer dans une fonction. Une fonction n'effectue généralement qu'une seule action précise. En Rust, le mot-clé `fn` sert à définir des fonctions. Le code qui appartient à la fonction se trouve toujours entre accolades (`{}`). La fonction nommée `main` est spéciale, car c'est le point d'entrée des programmes. Depuis cette fonction, on peut appeler d'autres fonctions.

```rust
fn say_my_name(name: &str) -> &str {
    name
}
```

Les fonctions peuvent aussi prendre des paramètres, comme `name: &str` dans `say_my_name()`. Les fonctions peuvent aussi renvoyer des valeurs, comme `-> &str` ci-dessus.
