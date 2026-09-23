# Introduction

Un [`Time`][time] en Go est un type qui décrit un instant précis.
On peut accéder aux informations de date et d'heure, les comparer et les manipuler au moyen de ses méthodes, mais il existe aussi des fonctions que l'on appelle sur le paquet `time` lui-même.
On peut récupérer la date et l'heure actuelles grâce à la fonction [`time.Now`][now].

La fonction [`time.Parse`][parse] analyse des _strings_ pour produire des valeurs de type `Time`.
Go a sa propre façon de définir le format que l'on attend pour l'analyse.
Tu dois écrire un exemple de ce format en utilisant les valeurs de cet horodatage particulier :
`Mon Jan 2 15:04:05 -0700 MST 2006`.

Par exemple :

```go
import "time"

func parseTime() time.Time {
    date := "Tue, 09/22/1995, 13:00"
    layout := "Mon, 01/02/2006, 15:04"

    t, err := time.Parse(layout,date) // time.Time, error
}

// => 1995-09-22 13:00:00 +0000 UTC
```

La méthode [`Time.Format()`][format] renvoie une représentation du temps sous forme de _string_.
Tout comme pour la fonction `Parse`, le format cible est de nouveau défini au moyen d'un exemple qui utilise les valeurs de l'horodatage particulier.

Par exemple :

```go
import (
    "fmt"
    "time"
)

func main() {
    t := time.Date(1995,time.September,22,13,0,0,0,time.UTC)
    formattedTime := t.Format("Mon, 01/02/2006, 15:04") // string
    fmt.Println(formattedTime)
}

// => Fri, 09/22/1995, 13:00
```

## Options de format

Pour un format personnalisé, utilise une combinaison de ces options.
En Go, il existe également des [constantes de format][const] prédéfinies pour les dates et les horodatages.

| Élément     | Options                                        |
| ----------- | ---------------------------------------------- |
| Année       | 2006 ; 06                                      |
| Mois        | Jan ; January ; 01 ; 1                         |
| Jour        | 02 ; 2 ; \_2 (pour un zéro initial)            |
| Jour de la semaine | Mon ; Monday                           |
| Heure       | 15 ( format 24 heures ) ; 3 ; 03 (AM ou PM)    |
| Minute      | 04 ; 4                                         |
| Seconde     | 05 ; 5                                         |
| Indicateur AM/PM | PM                                       |
| Jour de l'année | 002 ; \_\_2                                |

Le type `time.Time` possède diverses méthodes pour accéder à une partie précise d'un instant, par exemple l'heure : [`Time.Hour()`][hour], le mois : [`Time.Month()`][month].
Tu trouveras plus de détails sur son fonctionnement dans la [documentation officielle][time].

Le paquet [`time`][time] contient un autre type, [`Duration`][duration], qui représente le temps écoulé, ainsi que la prise en charge des localisations et des fuseaux horaires, des minuteurs et d'autres fonctionnalités associées qui seront abordées dans un autre concept.

[time]: https://golang.org/pkg/time/#Time
[now]: https://golang.org/pkg/time/#Now
[const]: https://pkg.go.dev/time#pkg-constants
[format]: https://pkg.go.dev/time#Time.Format
[hour]: https://pkg.go.dev/time#Time.Hour
[month]: https://pkg.go.dev/time/#Time.Month
[duration]: https://pkg.go.dev/time#Duration
[parse]: https://golang.org/pkg/time/#Parse
