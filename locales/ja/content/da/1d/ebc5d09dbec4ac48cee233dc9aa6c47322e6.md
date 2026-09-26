# 詳細

## ランダムな値の生成

Javaでランダムな値を生成する方法は、いくつかあります。

### `Random`を使う

[`java.util.Random`][java-util-random-docs]クラスには、疑似乱数を生成するためのメソッドがいくつか用意されています。

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

デフォルトのコンストラクターに加えて、`Random`クラスには、独自のシードを指定できる別のコンストラクターもあります。
同じシードで2つのRandomのインスタンスを生成し、それぞれに対して同じ順序でメソッドを呼び出すと、まったく同じ数列を生成して返します。

### `Math.random()`を使う

[`Math.random()`][math-random-docs]メソッドは、`0.0`から`1.0`の範囲の`Double`を生成するユーティリティメソッドです。

### `ThreadLocalRandom`を使う

[`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs]クラスは、`java.util.Random`の代替となるクラスで、スレッドセーフになるように設計されています。
このクラスには、下限と上限の両方を受け取る値を生成するための便利なメソッドがいくつか追加されており、少し扱いやすくなっています。

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## セキュリティ

ランダムな値は、パスワードのような機密性の高い値の生成によく使われます。
ただし、ここまでで紹介したランダムな値を生成する方法は、どれも暗号学的に安全であるとは見なされていません。

暗号学的に強力な乱数を生成するには、[`java.security.SecureRandom`][secure-random-docs]クラスを使います。

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
