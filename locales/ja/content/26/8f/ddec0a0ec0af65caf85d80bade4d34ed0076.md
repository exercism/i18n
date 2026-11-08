# 概要

Kotlinでは、クラスを使ってデータと振る舞いをカプセル化できます。
クラスは`class`キーワードを使って宣言します。
例えば、次のように書きます。

```kotlin
class Car
```

クラスを呼び出すと、そのインスタンスが作れます。

```kotlin
val instance = Car()
```

## プロパティ

これまでの例では、`Car`クラスをプロパティなしで宣言しました。
クラスのプロパティは、クラス本体の`{}`の間に宣言できます。可変のプロパティには`var`、不変のプロパティには`val`を使います。
例えば、次のようになります。

```kotlin
class Car {
    // color is mutable
    var color = "red"

    // year is immutable
    val year = 2025
}
```

別の方法として、プロパティを引数に取るコンストラクターの中でプロパティを定義することもできます。

## コンストラクター

Kotlinのコンストラクターには、[プライマリーコンストラクター][primary-constructors]と[セカンダリーコンストラクター][secondary-constructors]の2種類があります。
プライマリーコンストラクターは、クラスの宣言と同じ行に書いて宣言します。
例えば、次のようになります。

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

アノテーションも可視性修飾子もない場合は、`constructor`キーワードを省略できます。

```kotlin
class Car(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

~~~~exercism/note
Kotlinでは、プロパティだけを持つクラスなら、本体を付けずに定義できます。波括弧（`{}`）は必要ありません。

```kotlin
class Car (var color : String = "red", val year : Int = 2025)
```
~~~~

クラスが持てるプライマリーコンストラクターは1つだけです。
セカンダリーコンストラクターは追加のコンストラクターで、クラス本体に`constructor`キーワードを使って宣言することで追加できます。
例えば、次のようになります。

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {

    // This constructor allows the year to be provided as a String
    constructor(color : String = "red", yearText : String) : this(color, yearText.toIntOrNull() ?: 0)
}
```

セカンダリーコンストラクターは、`this`を呼び出してプライマリーコンストラクターを呼び出す必要があります。

## 初期化ブロック

プライマリーコンストラクターはクラスのプロパティを設定します。
オブジェクトの生成時にもっと処理が必要な場合は、`init`ブロックを使って追加の処理を行えます。

```kotlin
class Car constructor(var color: String = "red", val year : Int = 2025) {
    init {
        println("Car is ${color}, made in ${year}")
    }
}
```

## 関数

関数はクラス本体に定義できます。
例えば、次のようになります。

```kotlin
class Car (var color : String = "red", val year : Int = 2025) {
    fun repaint(newColor : String) {
        color = newColor
    }
}
```

## 可視性

プロパティと関数には、`private`、`public`、`internal`、`protected`のいずれかを指定できます。

- `private`はクラス内からのみアクセスできます
- `protected`はクラス内に加えて、サブクラスからもアクセスできます
- `internal`は同じ[モジュール][kotlin-modules]内からアクセスできます
- `public`はそのクラスを利用する他のコンポーネントからアクセスできます

例えば、次のようになります。

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
