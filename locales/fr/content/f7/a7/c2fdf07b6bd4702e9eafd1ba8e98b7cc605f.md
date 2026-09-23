# Introduction

Go fournit un paquet intégré appelé `fmt` (paquet de formatage) qui propose diverses fonctions pour manipuler le format des entrées et des sorties.
La fonction la plus utilisée est `Sprintf`, qui utilise des _verbes_ comme `%s` pour insérer des valeurs dans une _string_ et renvoyer cette _string_.

```go
import "fmt"

food := "taco"
fmt.Sprintf("Bring me a %s", food)
// Returns: Bring me a taco
```

En Go, les nombres à virgule flottante se formatent facilement avec les verbes de `Sprintf` : `%g` (représentation compacte), `%e` (exposant) ou `%f` (sans exposant).
Ces trois verbes permettent de contrôler la largeur du champ ainsi que la position des chiffres.

```go
import "fmt"

number := 4.3242
fmt.Sprintf("%.2f", number)
// Returns: 4.32
```

Tu trouveras la liste complète des verbes disponibles dans la [documentation du paquet de formatage][fmt-docs].

`fmt` contient d'autres fonctions pour manipuler les _strings_, comme `Println`, qui se contente d'afficher dans la console les arguments qu'elle reçoit, et `Printf`, qui met en forme l'entrée de la même façon que `Sprintf` avant de l'afficher.

[fmt-docs]: https://pkg.go.dev/fmt
