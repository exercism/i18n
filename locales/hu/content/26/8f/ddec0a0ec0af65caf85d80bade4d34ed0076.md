# Az osztályokról

A Kotlinban az osztályokkal adatokat és viselkedést zárhatsz egységbe.
Egy osztályt a `class` kulcsszóval deklarálsz.
Például:

```kotlin
class Car
```

Az osztályból példányt úgy hozol létre, hogy meghívod az osztályt.

```kotlin
val instance = Car()
```

## Tulajdonságok

A fenti példákban a `Car` osztályt tulajdonságok nélkül hoztad létre.
Az osztály tulajdonságait a törzsében, a `{}` között deklarálhatod: a módosítható tulajdonságokhoz `var`-t, a módosíthatatlanokhoz `val`-t használj.
Például:

```kotlin
class Car {
    // color is mutable
    var color = "red"

    // year is immutable
    val year = 2025
}
```

A tulajdonságokat egy olyan konstruktorban is megadhatod, amely paraméterként átveszi őket.

## Konstruktorok

A Kotlinban kétféle konstruktor van: az [elsődleges][primary-constructors] és a [másodlagos konstruktor][secondary-constructors].
Az elsődleges konstruktort az osztály deklarációjával azonos sorban deklarálod.
Például:

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

A `constructor` kulcsszó elhagyható, ha nincsenek annotációk és láthatósági módosítók:

```kotlin
class Car(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

~~~~exercism/note
A Kotlinban az osztály törzs nélkül is definiálható, ha csak tulajdonságokat tartalmaz, ilyenkor nincs szükség a kapcsos zárójelekre (`{}`):

```kotlin
class Car (var color : String = "red", val year : Int = 2025)
```
~~~~

Egy osztálynak csak egy elsődleges konstruktora lehet.
A másodlagos konstruktorok további konstruktorok, amelyeket az osztály törzsében, a `constructor` kulcsszóval deklarálva adhatsz hozzá.
Például:

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {

    // This constructor allows the year to be provided as a String
    constructor(color : String = "red", yearText : String) : this(color, yearText.toIntOrNull() ?: 0)
}
```

A másodlagos konstruktoroknak a `this` meghívásával kell meghívniuk az elsődleges konstruktort.

## Inicializáló blokkok

Az elsődleges konstruktor állítja be az osztály tulajdonságait.
Ha az objektum létrehozásakor többre is szükség van, `init` blokkokkal végezhetsz további műveleteket.

```kotlin
class Car constructor(var color: String = "red", val year : Int = 2025) {
    init {
        println("Car is ${color}, made in ${year}")
    }
}
```

## Függvények

A függvényeket az osztály törzsében definiálhatod.
Például:

```kotlin
class Car (var color : String = "red", val year : Int = 2025) {
    fun repaint(newColor : String) {
        color = newColor
    }
}
```

## Láthatóság

A tulajdonságok és a függvények `private`, `public`, `internal` vagy `protected` láthatóságúak lehetnek.

- `private`: csak az osztályon belülről érhető el
- `protected`: az osztályon belülről és bármely leszármazott osztályból elérhető
- `internal`: az ugyanabban a [modulban][kotlin-modules] lévő dolgok érhetik el
- `public`: az osztályt használó többi komponens is elérheti

Például:

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
