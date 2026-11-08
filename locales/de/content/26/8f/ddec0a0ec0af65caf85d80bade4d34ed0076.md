# Überblick

Klassen kannst du in Kotlin nutzen, um Daten und Verhalten zu kapseln.
Eine Klasse deklarierst du mit dem Schlüsselwort `class`.
Zum Beispiel:

```kotlin
class Car
```

Eine Instanz der Klasse erzeugst du, indem du sie aufrufst.

```kotlin
val instance = Car()
```

## Eigenschaften

In den obigen Beispielen wurde die Klasse `Car` ohne Eigenschaften deklariert.
Eigenschaften einer Klasse kannst du im Klassenkörper zwischen `{}` deklarieren, und zwar mit `var` für veränderliche und mit `val` für unveränderliche Eigenschaften.
Zum Beispiel:

```kotlin
class Car {
    // color is mutable
    var color = "red"

    // year is immutable
    val year = 2025
}
```

Alternativ kannst du die Eigenschaften in einem Konstruktor definieren, der sie entgegennimmt.

## Konstruktoren

Kotlin kennt zwei Arten von Konstruktoren: [primäre][primary-constructors] und [sekundäre Konstruktoren][secondary-constructors].
Der primäre Konstruktor steht in derselben Zeile wie die Klassendeklaration.
Zum Beispiel:

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

Das Schlüsselwort `constructor` kannst du weglassen, wenn es keine Annotationen und keine Sichtbarkeitsmodifikatoren gibt:

```kotlin
class Car(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

~~~~exercism/note
Kotlin erlaubt es, eine Klasse ohne Körper zu definieren, wenn sie nur Eigenschaften enthält. Geschweifte Klammern `{}` brauchst du dann nicht:

```kotlin
class Car (var color : String = "red", val year : Int = 2025)
```
~~~~

Eine Klasse kann nur einen primären Konstruktor haben.
Sekundäre Konstruktoren sind weitere Konstruktoren. Du fügst sie hinzu, indem du sie im Klassenkörper mit dem Schlüsselwort `constructor` deklarierst.
Zum Beispiel:

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {

    // This constructor allows the year to be provided as a String
    constructor(color : String = "red", yearText : String) : this(color, yearText.toIntOrNull() ?: 0)
}
```

Sekundäre Konstruktoren müssen den primären Konstruktor aufrufen, indem sie `this` verwenden.

## Initialisierungsblöcke

Der primäre Konstruktor setzt die Eigenschaften der Klasse.
Wenn bei der Objekterstellung mehr zu tun ist, kannst du `init`-Blöcke verwenden, um zusätzliche Aktionen auszuführen.

```kotlin
class Car constructor(var color: String = "red", val year : Int = 2025) {
    init {
        println("Car is ${color}, made in ${year}")
    }
}
```

## Funktionen

Funktionen kannst du im Klassenkörper definieren.
Zum Beispiel:

```kotlin
class Car (var color : String = "red", val year : Int = 2025) {
    fun repaint(newColor : String) {
        color = newColor
    }
}
```

## Sichtbarkeit

Eigenschaften und Funktionen können `private`, `public`, `internal` oder `protected` sein.

- `private`: nur innerhalb der Klasse zugänglich
- `protected`: zugänglich für alles innerhalb der Klasse sowie für alle Unterklassen
- `internal`: zugänglich für alles innerhalb desselben [Moduls][kotlin-modules]
- `public`: zugänglich für andere Komponenten, die die Klasse verwenden

Zum Beispiel:

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
