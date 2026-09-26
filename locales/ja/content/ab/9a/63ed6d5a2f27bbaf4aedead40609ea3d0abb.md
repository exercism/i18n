# 概要

## _if-then_文

Javaで最も基本的な制御フローの文は、[_if-then_文][if-statement]です。
この文は、特定の条件が`true`のときにだけコードの一部を実行するために使います。
_if-then_文は、`if`節を使って定義します。

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

上の例では、車の燃料が切れていると、`Car.drive`メソッドを呼んでも何も起こりません。

## _if-then-else_文

_if-then-else_文は、`if`節の条件が`false`と評価されたときのための、もう1つの実行経路を用意します。
このもう1つの実行経路は`if`節のあとに続き、`else`節を使って定義します。

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

上の例では、車の燃料が切れていると、`Car.drive`メソッドを呼ぶと車を止める別のメソッドが呼ばれます。

_if-then-else_文は、`else if`節を使うことで複数の条件にも対応できます。

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

上の例では、燃料が`5`以下のときに車を走らせると、車は走りますが、燃料ランプが点灯します。
燃料が`0`になると、車は走るのをやめます。

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
