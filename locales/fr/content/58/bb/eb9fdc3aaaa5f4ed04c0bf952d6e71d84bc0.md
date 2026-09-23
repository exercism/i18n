# Introduction

Le paquet `math/rand` permet de générer des nombres pseudo-aléatoires.

Voici comment générer un entier aléatoire entre `0` et `99` :

```go
import "math/rand"

n := rand.Intn(100) // n is a random int, 0 <= n < 100
```

La fonction `rand.Float64` renvoie un nombre à virgule flottante aléatoire entre `0.0` et `1.0` :

```go
f := rand.Float64() // f is a random float64, 0.0 <= f < 1.0
```

Il est également possible de mélanger un _slice_ (ou d'autres structures de données) :

```go
x := []string{"a", "b", "c", "d", "e"}
// shuffling the slice put its elements into a random order
rand.Shuffle(len(x), func(i, j int) {
	x[i], x[j] = x[j], x[i]
})
```

## Graines

Les séquences de nombres générées par le paquet `math/rand` ne sont pas véritablement aléatoires.
Pour une valeur de « graine » donnée, les résultats sont entièrement déterministes.

Dans Go 1.20+, la graine est choisie automatiquement au hasard, de sorte que l'on verra une séquence différente de nombres aléatoires à chaque exécution du programme.

Dans les versions antérieures de Go, la graine était `1` par défaut.
Ainsi, pour obtenir des séquences différentes à chaque exécution du programme, il fallait initialiser manuellement le générateur de nombres aléatoires, par exemple avec l'heure actuelle, avant de récupérer des nombres aléatoires.

```go
rand.Seed(time.Now().UnixNano())
```
