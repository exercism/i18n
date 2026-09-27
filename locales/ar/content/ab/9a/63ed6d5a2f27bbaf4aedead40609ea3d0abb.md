# نبذة

## الجملة الشرطية _if-then_

أبسط جملة للتحكم في مسار التنفيذ في Java هي [الجملة الشرطية _if-then_][if-statement].
تُستخدم هذه الجملة لتنفيذ مقطع من الكود فقط عندما تحقق شرط معيّن القيمة `true`.
وتُعرَّف الجملة الشرطية _if-then_ باستخدام جملة `if`:

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

في المثال أعلاه، إذا نفد الوقود من السيارة، فلن يفعل استدعاء الطريقة `Car.drive` شيئًا.

## الجملة الشرطية _if-then-else_

توفّر الجملة الشرطية _if-then-else_ مسارًا بديلًا للتنفيذ عندما تكون نتيجة الشرط في جملة `if` هي `false`.
ويأتي هذا المسار البديل للتنفيذ بعد جملة `if`، ويُعرَّف باستخدام جملة `else`:

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

في المثال أعلاه، إذا نفد الوقود من السيارة، فسيؤدي استدعاء الطريقة `Car.drive` إلى استدعاء طريقة أخرى لإيقاف السيارة.

تدعم الجملة الشرطية _if-then-else_ أيضًا شروطًا متعددة باستخدام جملة `else if`:

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

في المثال أعلاه، إذا قدت السيارة والوقود أقل من أو يساوي `5`، فستسير السيارة، لكن مصباح الوقود سيُضيء.
وعندما يصل الوقود إلى `0`، تتوقف السيارة عن السير.

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
