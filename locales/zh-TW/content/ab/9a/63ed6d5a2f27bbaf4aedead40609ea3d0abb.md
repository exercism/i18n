# 關於

## _if-then_ 敘述

Java 中最基礎的控制流程敘述是 [_if-then_ 敘述][if-statement]。
這種敘述只會在特定條件為 `true` 時，才執行某一段程式碼。
_if-then_ 敘述是用 `if` 子句定義的：

```java
class Car {
    void drive() {
        // the "if" clause: the car needs to have fuel left to drive
        if (fuel > 0) {
            // the "then" clause: the car drives, consuming fuel
            fuel--;
        }
    }
}
```

在上面的範例中，如果車子沒油了，呼叫 `Car.drive` 方法不會有任何作用。

## _if-then-else_ 敘述

_if-then-else_ 敘述提供另一條執行路徑，用於 `if` 子句中的條件評估為 `false` 時。
這條替代的執行路徑接在 `if` 子句之後，並使用 `else` 子句定義：

```java
class Car {
    void drive() {
        if (fuel > 0) {
            fuel--;
        } else {
            stop();
        }
    }
}
```

在上面的範例中，如果車子沒油了，呼叫 `Car.drive` 方法會改為呼叫另一個方法讓車子停下來。

_if-then-else_ 敘述也可以使用 `else if` 子句來支援多個條件：

```java
class Car {
    void drive() {
        if (fuel > 5) {
            fuel--;
        } else if (fuel > 0) {
            turnOnFuelLight();
            fuel--;
        } else {
            stop();
        }
    }
}
```

在上面的範例中，當油量小於或等於 `5` 時開車，車子仍會行進，但會亮起油量指示燈。
當油量降到 `0` 時，車子就會停止行進。

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
