# Sobre

Em Kotlin, as classes podem ser usadas para encapsular dados e comportamento.
Uma classe é declarada com a palavra-chave `class`.
Por exemplo:

```kotlin
class Car
```

Para criar uma instância da classe, basta chamá-la.

```kotlin
val instance = Car()
```

## Propriedades

Nos exemplos acima, a classe `Car` foi declarada sem nenhuma propriedade.
As propriedades da classe podem ser declaradas no corpo, entre `{}`, usando `var` para as propriedades mutáveis e `val` para as imutáveis.
Por exemplo:

```kotlin
class Car {
    // color is mutable
    var color = "red"

    // year is immutable
    val year = 2025
}
```

Outra opção é definir as propriedades em um construtor que recebe essas propriedades.

## Construtores

Kotlin tem dois tipos de construtores: o [primário][primary-constructors] e os [secundários][secondary-constructors].
O construtor primário é declarado na mesma linha da declaração da classe.
Por exemplo:

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

A palavra-chave `constructor` pode ser omitida se não houver anotações nem modificadores de visibilidade:

```kotlin
class Car(var color : String = "red", val year : Int = 2025) {
    // ...
}
```

~~~~exercism/note
No Kotlin, quando a classe tem apenas propriedades, dá para defini-la sem corpo: não é preciso usar chaves `{}`:

```kotlin
class Car (var color : String = "red", val year : Int = 2025)
```
~~~~

Uma classe pode ter apenas um construtor primário.
Os construtores secundários são construtores adicionais, que podem ser adicionados declarando-os no corpo da classe com a palavra-chave `constructor`.
Por exemplo:

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {

    // This constructor allows the year to be provided as a String
    constructor(color : String = "red", yearText : String) : this(color, yearText.toIntOrNull() ?: 0)
}
```

Os construtores secundários precisam invocar o construtor primário chamando `this`.

## Blocos de inicialização

O construtor primário define as propriedades da classe.
Se for preciso fazer mais alguma coisa durante a criação do objeto, é possível usar blocos `init` para executar ações adicionais.

```kotlin
class Car constructor(var color: String = "red", val year : Int = 2025) {
    init {
        println("Car is ${color}, made in ${year}")
    }
}
```

## Funções

É possível definir funções no corpo da classe.
Por exemplo:

```kotlin
class Car (var color : String = "red", val year : Int = 2025) {
    fun repaint(newColor : String) {
        color = newColor
    }
}
```

## Visibilidade

Propriedades e funções podem ser `private`, `public`, `internal` ou `protected`.

- `private` só pode ser acessado dentro da própria classe
- `protected` pode ser acessado por elementos dentro da classe e também por suas subclasses
- `internal` pode ser acessado por elementos do mesmo [módulo][kotlin-modules]
- `public` pode ser acessado por outras partes do código que usam a classe

Por exemplo:

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
