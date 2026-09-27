# درباره

## دستور _if-then_

ابتدایی‌ترین دستور کنترل جریان در Java، دستور [_if-then_][if-statement] است.
از این دستور برای آن استفاده می‌شود که بخشی از کد تنها در صورتی اجرا شود که شرط مشخصی `true` باشد.
دستور _if-then_ با استفاده از بند `if` تعریف می‌شود:

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

در مثال بالا، اگر سوخت خودرو تمام شده باشد، فراخوانی متد `Car.drive` هیچ کاری انجام نمی‌دهد.

## دستور _if-then-else_

دستور _if-then-else_ مسیر اجرای جایگزینی را برای زمانی فراهم می‌کند که شرط بند `if` به `false` ارزیابی شود.
این مسیر اجرای جایگزین پس از بند `if` می‌آید و با استفاده از بند `else` تعریف می‌شود:

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

در مثال بالا، اگر سوخت خودرو تمام شده باشد، فراخوانی متد `Car.drive` متد دیگری را برای متوقف کردن خودرو فراخوانی می‌کند.

دستور _if-then-else_ همچنین با استفاده از بند `else if` از چندین شرط پشتیبانی می‌کند:

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

در مثال بالا، راندن خودرو وقتی سوخت کمتر از یا مساوی `5` باشد، خودرو را به حرکت درمی‌آورد، اما چراغ سوخت را روشن می‌کند.
وقتی سوخت به `0` برسد، خودرو از حرکت بازمی‌ایستد.

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
