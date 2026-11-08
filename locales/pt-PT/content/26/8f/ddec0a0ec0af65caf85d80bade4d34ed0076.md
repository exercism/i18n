# Sobre

Em Kotlin, as classes podem ser usadas para encapsular dados e comportamento.
Uma classe declara-se com a palavra-chave `class`.
Por exemplo:

```kotlin
class Car
```

Cria uma instância da classe chamando-a.

```kotlin
val instance = Car()
```

## Propriedades

Nos exemplos acima, a classe `Car` foi declarada sem quaisquer propriedades.
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

Em alternativa, podes definir as propriedades num construtor que as recebe.

## Construtores

Em Kotlin existem dois tipos de construtores: o [construtor primário][primary-constructors] e os [construtores secundários][secondary-constructors].
O construtor primário declara-se na mesma linha da declaração da classe.
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
A Kotlin permite definir a classe sem corpo se ela contiver apenas propriedades: não precisas de chavetas `{}`:

```kotlin
class Car (var color : String = "red", val year : Int = 2025)
```
~~~~

Uma classe só pode ter um construtor primário.
Os construtores secundários são construtores adicionais, que podes acrescentar declarando-os no corpo da classe com a palavra-chave `constructor`.
Por exemplo:

```kotlin
class Car constructor(var color : String = "red", val year : Int = 2025) {

    // This constructor allows the year to be provided as a String
    constructor(color : String = "red", yearText : String) : this(color, yearText.toIntOrNull() ?: 0)
}
```

Os construtores secundários têm de invocar o construtor primário chamando `this`.

## Blocos de inicialização

O construtor primário define as propriedades da classe.
Se for preciso fazer mais alguma coisa durante a criação do objeto, podes usar blocos `init` para executar ações adicionais.

```kotlin
class Car constructor(var color: String = "red", val year : Int = 2025) {
    init {
        println("Car is ${color}, made in ${year}")
    }
}
```

## Funções

Podes definir funções no corpo da classe.
Por exemplo:

```kotlin
class Car (var color : String = "red", val year : Int = 2025) {
    fun repaint(newColor : String) {
        color = newColor
    }
}
```

## Visibilidade

As propriedades e as funções podem ser `private`, `public`, `internal` ou `protected`.

- `private`: só pode ser acedido dentro da classe
- `protected`: pode ser acedido por elementos dentro da classe, bem como por quaisquer subclasses
- `internal`: pode ser acedido por elementos do mesmo [módulo][kotlin-modules]
- `public`: pode ser acedido por outros componentes que usam a classe

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
