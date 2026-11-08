# 자세히 알아보기

Kotlin에서는 클래스를 사용해 데이터와 동작을 캡슐화할 수 있어요.
클래스는 `class` 키워드로 선언해요.
예를 들어:

```kotlin
class Car
```

클래스를 호출하면 그 클래스의 인스턴스를 만들 수 있어요.

```kotlin
val instance = Car()
```

## 프로퍼티

위 예시에서 `Car` 클래스는 프로퍼티 없이 선언했어요.
클래스 프로퍼티는 `{}` 사이의 본문에 선언할 수 있고, 값을 바꿀 수 있는 프로퍼티에는 `var`를, 바꿀 수 없는 프로퍼티에는 `val`을 사용해요.
예를 들어:

```kotlin
class Car {
    // color is mutable
    var color = "red"

    // year is immutable
    val year = 2025
}
```

또는 프로퍼티를 인자로 받는 생성자에서 프로퍼티를 정의할 수도 있어요.

## 생성자

Kotlin에는 두 가지 종류의 생성자가 있어요. [주 생성자][primary-constructors]와 [부 생성자][secondary-constructors]예요.
주 생성자는 클래스 선언과 같은 줄에 선언해요.
예를 들어:

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

애너테이션이나 가시성 변경자가 없다면 `constructor` 키워드는 생략할 수 있어요:

```kotlin
class Car(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

~~~~exercism/note
Kotlin에서는 프로퍼티만 있다면 본문 없이 클래스를 정의할 수 있어요. 중괄호 `{}`는 필요 없어요:

```kotlin
class Car (var color : String = "red", val year : Int = 2025)
```
~~~~

클래스는 주 생성자를 하나만 가질 수 있어요.
부 생성자는 클래스 본문에 `constructor` 키워드로 선언해서 추가하는 생성자예요.
예를 들어:

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {

    // This constructor allows the year to be provided as a String
    constructor(color : String = "red", yearText : String) : this(color, yearText.toIntOrNull() ?: 0)
}
```

부 생성자는 `this`를 호출해서 주 생성자를 반드시 호출해야 해요.

## 초기화 블록

주 생성자는 클래스의 프로퍼티를 설정해요.
객체를 만드는 동안 추가로 할 일이 있다면 `init` 블록으로 추가 작업을 수행할 수 있어요.

```kotlin
class Car constructor(var color: String = "red", val year : Int = 2025) {
    init {
        println("Car is ${color}, made in ${year}")
    }
}
```

## 함수

함수는 클래스 본문에 정의할 수 있어요.
예를 들어:

```kotlin
class Car (var color : String = "red", val year : Int = 2025) {
    fun repaint(newColor : String) {
        color = newColor
    }
}
```

## 가시성

프로퍼티와 함수는 `private`, `public`, `internal`, `protected` 중 하나일 수 있어요.

- `private`은 클래스 안에서만 접근할 수 있어요
- `protected`는 클래스 안과 하위 클래스에서 접근할 수 있어요
- `internal`은 같은 [모듈][kotlin-modules] 안에서 접근할 수 있어요
- `public`은 클래스를 사용하는 다른 구성 요소에서 접근할 수 있어요

예를 들어:

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
