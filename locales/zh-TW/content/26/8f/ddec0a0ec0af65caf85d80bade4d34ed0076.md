# 關於

在 Kotlin 中，你可以使用類別來封裝資料和行為。
類別是使用`class`關鍵字宣告的。
例如：

```kotlin
class Car
```

呼叫類別就能建立它的實例。

```kotlin
val instance = Car()
```

## 屬性

在上面的範例中，`Car`類別沒有宣告任何屬性。
類別的屬性可以宣告在類別本體中，也就是`{}`之間；可變的屬性用`var`，不可變的屬性用`val`。
例如：

```kotlin
class Car {
    // color is mutable
    var color = "red"

    // year is immutable
    val year = 2025
}
```

另一種做法，是把屬性定義在接收這些屬性的建構子裡。

## 建構子

Kotlin 有兩種建構子：[主要建構子][primary-constructors]和[次要建構子][secondary-constructors]。
主要建構子和類別宣告寫在同一行。
例如：

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

如果沒有標註，也沒有可見性修飾子，就可以省略`constructor`關鍵字：

```kotlin
class Car(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

~~~~exercism/note
只要類別本體只包含屬性，Kotlin 允許定義時省略本體，不需要大括號`{}`：

```kotlin
class Car (var color : String = "red", val year : Int = 2025)
```
~~~~

一個類別只能有一個主要建構子。
次要建構子是額外的建構子，可以在類別本體中用`constructor`關鍵字宣告來加入。
例如：

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {

    // This constructor allows the year to be provided as a String
    constructor(color : String = "red", yearText : String) : this(color, yearText.toIntOrNull() ?: 0)
}
```

次要建構子必須透過呼叫`this`來叫用主要建構子。

## 初始化區塊

主要建構子負責設定類別的屬性。
如果在建立物件時還需要做其他事，可以使用`init`區塊來執行額外的動作。

```kotlin
class Car constructor(var color: String = "red", val year : Int = 2025) {
    init {
        println("Car is ${color}, made in ${year}")
    }
}
```

## 函式

函式可以定義在類別本體中。
例如：

```kotlin
class Car (var color : String = "red", val year : Int = 2025) {
    fun repaint(newColor : String) {
        color = newColor
    }
}
```

## 可見性

屬性和函式可以是`private`、`public`、`internal`或`protected`。

- `private`只能在類別內部存取
- `protected`可以在類別內部以及任何子類別中存取
- `internal`可以在同一個[模組][kotlin-modules]中存取
- `public`可以讓使用該類別的其他元件存取

例如：

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
