# 关于

## _if-then_ 语句

Java 中最基本的控制流语句是 [_if-then_ 语句][if-statement]。
这条语句只在某个条件为`true`时执行某段代码。
_if-then_ 语句通过`if`子句定义：

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

在上面的例子中，如果汽车没油了，调用`Car.drive`方法不会有任何效果。

## _if-then-else_ 语句

当`if`子句中的条件求值为`false`时，_if-then-else_ 语句会提供一条替代的执行路径。
这条替代执行路径紧跟在`if`子句之后，通过`else`子句定义：

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

在上面的例子中，如果汽车没油了，调用`Car.drive`方法会调用另一个方法来让汽车停下。

_if-then-else_ 语句还可以通过`else if`子句支持多个条件：

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

在上面的例子中，当油量小于或等于`5`时驾驶汽车，汽车仍会前进，但会亮起油量指示灯。
当油量降到`0`时，汽车就会停下来。

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
