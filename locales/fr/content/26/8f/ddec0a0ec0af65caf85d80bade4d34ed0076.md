# À propos

En Kotlin, les classes permettent d'encapsuler des données et des comportements.
Une classe se déclare avec le mot-clé `class`.
Par exemple :

```kotlin
class Car
```

Pour créer une instance de la classe, on l'appelle.

```kotlin
val instance = Car()
```

## Propriétés

Dans les exemples ci-dessus, la classe `Car` a été déclarée sans aucune propriété.
Les propriétés d'une classe peuvent être déclarées dans son corps, entre `{}`, avec `var` pour les propriétés mutables et `val` pour les propriétés immuables.
Par exemple :

```kotlin
class Car {
    // color is mutable
    var color = "red"

    // year is immutable
    val year = 2025
}
```

On peut aussi définir les propriétés dans un constructeur qui les prend en paramètres.

## Constructeurs

Kotlin propose deux types de constructeurs : les [constructeurs primaires][primary-constructors] et les [constructeurs secondaires][secondary-constructors].
Le constructeur primaire se déclare sur la même ligne que la déclaration de la classe.
Par exemple :

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

Le mot-clé `constructor` peut être omis s'il n'y a ni annotation ni modificateur de visibilité :

```kotlin
class Car(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

~~~~exercism/note
Kotlin permet de définir la classe sans corps si celle-ci ne contient que des propriétés, sans avoir besoin d'accolades  `{}` :

```kotlin
class Car (var color : String = "red", val year : Int = 2025)
```
~~~~

Une classe ne peut avoir qu'un seul constructeur primaire.
Les constructeurs secondaires sont des constructeurs supplémentaires, que l'on ajoute en les déclarant dans le corps de la classe avec le mot-clé `constructor`.
Par exemple :

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {

    // This constructor allows the year to be provided as a String
    constructor(color : String = "red", yearText : String) : this(color, yearText.toIntOrNull() ?: 0)
}
```

Les constructeurs secondaires doivent invoquer le constructeur primaire en appelant `this`.

## Blocs d'initialisation

Le constructeur primaire définit les propriétés de la classe.
S'il faut faire davantage de choses lors de la création de l'objet, on peut utiliser des blocs `init` pour effectuer des actions supplémentaires.

```kotlin
class Car constructor(var color: String = "red", val year : Int = 2025) {
    init {
        println("Car is ${color}, made in ${year}")
    }
}
```

## Fonctions

On peut définir des fonctions dans le corps de la classe.
Par exemple :

```kotlin
class Car (var color : String = "red", val year : Int = 2025) {
    fun repaint(newColor : String) {
        color = newColor
    }
}
```

## Visibilité

Les propriétés et les fonctions peuvent être `private`, `public`, `internal` ou `protected`.

- `private` n'est accessible qu'à l'intérieur de la classe
- `protected` est accessible depuis l'intérieur de la classe, ainsi que depuis ses sous-classes
- `internal` est accessible depuis tout ce qui se trouve dans le même [module][kotlin-modules]
- `public` est accessible depuis les autres composants qui utilisent la classe

Par exemple :

```kotlin
class Car {
    private val color: String
    public val year: Int
    internal val model: String
    protected val brand: String

    private fun drive() {
        // ...
    }

    internal fun start() {
        // ...
    }

    protected fun stop() {
        // ...
    }

    public fun make() {
        // ...
    }
}
```

[kotlin-modules]: https://kotlinlang.org/spec/packages-and-imports.html#modules
[primary-constructors]: https://kotlinlang.org/docs/classes.html#primary-constructor
[secondary-constructors]: https://kotlinlang.org/docs/classes.html#secondary-constructors
