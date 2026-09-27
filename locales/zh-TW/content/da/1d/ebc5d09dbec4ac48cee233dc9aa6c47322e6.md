# 關於

## 產生隨機值

在 Java 中，產生隨機值的方法有好幾種。

### 使用`Random`

[`java.util.Random`][java-util-random-docs]類別提供了幾種產生偽隨機值的方法。

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

除了預設建構子之外，`Random` 類別還有另一個建構子，可以自訂種子。
如果用相同的種子建立兩個 Random 實例，並對它們進行相同順序的方法呼叫，它們就會產生並回傳完全相同的數字序列。

### 使用`Math.random()`

[`Math.random()`][math-random-docs]方法是一個工具方法，用來產生介於`0.0`到`1.0`之間的隨機`Double`。

### 使用`ThreadLocalRandom`

[`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs]類別是`java.util.Random`的替代方案，而且設計成執行緒安全。
這個類別有一些額外的工具方法，可以同時指定下界與上界來產生值，用起來稍微方便一些。

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## 安全性

隨機值常被用來產生密碼之類的敏感值。
然而，上述所有產生隨機值的方法都_不_被視為密碼學上安全。

如要產生密碼學上夠強的隨機數字，請使用[`java.security.SecureRandom`][secure-random-docs]類別。

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
