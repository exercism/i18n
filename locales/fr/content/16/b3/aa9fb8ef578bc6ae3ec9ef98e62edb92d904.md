# Introduction

Généralement, les fonctions n'acceptent qu'un nombre fixe d'arguments.
Cependant, si on préfixe le type du dernier paramètre avec `...`, la fonction peut accepter un nombre quelconque d'arguments supplémentaires.
Cela fait du dernier paramètre un _paramètre variadique_.

```go
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}
```

Dans la fonction, le paramètre variadique est une tranche :

```go
sum(1, 2, 3)    // nums is []int{1, 2, 3}
sum(1, 2, 3, 4) // nums is []int{1, 2, 3, 4}
sum()           // nums is []int{}
```

Une fonction peut avoir des paramètres non variadiques avant le paramètre variadique.
Une fonction peut avoir au plus un paramètre variadique et celui-ci doit être le dernier paramètre.

```go
func greet(greeting string, names ...string) {
    for _, name := range names {
        fmt.Printf("%s, %s!\n", greeting, name)
    }
}
```

## Étale une tranche

Pour passer une tranche au paramètre variadique, fais-la suivre de `...` :

```go
nums := []int{1, 2, 3}
sum(nums...) // equivalent to sum(1, 2, 3)
```

`...` n'est valide que lorsqu'on passe une tranche à un paramètre variadique.
