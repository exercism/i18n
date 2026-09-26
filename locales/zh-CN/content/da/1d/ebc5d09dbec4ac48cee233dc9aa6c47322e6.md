# 关于

## 生成随机值

在 Java 中生成随机值有多种方式。

### 使用 `Random`

[`java.util.Random`][java-util-random-docs]类提供了多个方法来生成伪随机值。

```java
Random random = new Random();

random.next(8); // Generates a random int with the given number of bits, in this case 8

random.nextInt(); // Generates a random int in the range Integer.MIN_VALUE through Integer.MAX_VALUE
random.nextInt(10); // Generates a random int in the range 0 to 10

random.nextFloat(); // Generates a random float in the range 0.0 to 1.0
random.nextDouble(); // Generates a random double in the range 0.0 to 1.0

random.nextBoolean(); // Generates a random boolean value
random.nextLong(); // Generates a random long value
```

除了默认构造函数，`Random`类还有一个构造函数，可以传入自定义的种子。
如果用同一个种子创建两个 Random 实例，并且对二者进行相同顺序的方法调用，它们会生成并返回完全相同的数字序列。

### 使用 `Math.random()`

[`Math.random()`][math-random-docs]方法是一个工具方法，用来生成 `0.0` 到 `1.0` 范围内的随机 `Double`。

### 使用 `ThreadLocalRandom`

[`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs]类是 `java.util.Random` 的替代方案，被设计为线程安全的。
这个类还有一些额外的工具方法，可以同时指定上界和下界来生成值，用起来更方便一些。

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## 安全性

随机值常被用来生成密码这样的敏感值。
不过，上面介绍的所有生成随机值的方法都_不_被认为是密码学安全的。

要生成密码学强度高的随机数，请使用[`java.security.SecureRandom`][secure-random-docs]类。

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
