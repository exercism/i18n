# Детальніше

У Kotlin класи можна використовувати, щоб інкапсулювати дані та поведінку.
Клас оголошуємо за допомогою ключового слова `class`.
Наприклад:

```kotlin
class Car
```

Щоб створити екземпляр класу, викличмо його.

```kotlin
val instance = Car()
```

## Властивості

У наведених прикладах клас `Car` оголошено без жодної властивості.
Властивості класу можна оголосити в тілі, між `{}`, використовуючи `var` для змінних властивостей і `val` для незмінних.
Наприклад:

```kotlin
class Car {
    // color is mutable
    var color = "red"

    // year is immutable
    val year = 2025
}
```

Або ж властивості можна визначити в конструкторі, який приймає ці властивості.

## Конструктори

У Kotlin є два типи конструкторів: [первинний][primary-constructors] і [вторинні конструктори][secondary-constructors].
Первинний конструктор оголошують у тому ж рядку, що й оголошення класу.
Наприклад:

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

Ключове слово `constructor` можна опустити, якщо немає анотацій і модифікаторів видимості:

```kotlin
class Car(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

~~~~exercism/note
Kotlin дозволяє оголосити клас без тіла, якщо він містить лише властивості. Фігурні дужки `{}` не потрібні:

```kotlin
class Car (var color : String = "red", val year : Int = 2025)
```
~~~~

Клас може мати лише один первинний конструктор.
Вторинні конструктори - це додаткові конструктори, які можна додати, оголосивши їх у тілі класу за допомогою ключового слова `constructor`.
Наприклад:

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {

    // This constructor allows the year to be provided as a String
    constructor(color : String = "red", yearText : String) : this(color, yearText.toIntOrNull() ?: 0)
}
```

Вторинні конструктори мають викликати первинний конструктор через `this`.

## Блоки ініціалізації

Первинний конструктор задає властивості класу.
Якщо під час створення обʼєкта потрібно зробити більше, можна використати блоки `init`, щоб виконати додаткові дії.

```kotlin
class Car constructor(var color: String = "red", val year : Int = 2025) {
    init {
        println("Car is ${color}, made in ${year}")
    }
}
```

## Функції

Функції можна визначити в тілі класу.
Наприклад:

```kotlin
class Car (var color : String = "red", val year : Int = 2025) {
    fun repaint(newColor : String) {
        color = newColor
    }
}
```

## Видимість

Властивості та функції можуть бути `private`, `public`, `internal` або `protected`.

- до `private` можна звертатися лише всередині класу
- до `protected` можуть звертатися елементи всередині класу, а також будь-які підкласи
- до `internal` можуть звертатися елементи в межах одного [модуля][kotlin-modules]
- до `public` можуть звертатися інші компоненти, які використовують клас

Наприклад:

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
