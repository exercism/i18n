# 개요

## 무작위 값 생성하기

Java에서 무작위 값을 생성하는 방법은 여러 가지가 있어요.

### `Random` 사용하기

[`java.util.Random`][java-util-random-docs] 클래스는 의사 난수를 생성하는 여러 메서드를 제공해요.

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

`Random` 클래스에는 기본 생성자 외에도 사용자 지정 시드를 넘길 수 있는 생성자가 있어요.
같은 시드로 두 개의 Random 인스턴스를 만들고 각각에 대해 같은 순서로 메서드를 호출하면, 두 인스턴스는 동일한 숫자 시퀀스를 생성해서 반환해요.

### `Math.random()` 사용하기

[`Math.random()`][math-random-docs] 메서드는 `0.0`부터 `1.0` 범위의 무작위 `Double`을 생성하는 유틸리티 메서드예요.

### `ThreadLocalRandom` 사용하기

[`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs] 클래스는 `java.util.Random`의 대안이며, 스레드 안전하도록 설계되었어요.
이 클래스에는 하한과 상한을 모두 받아 값을 생성하는 몇 가지 추가 유틸리티 메서드가 있어서 조금 더 다루기 쉬워요.

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## 보안

무작위 값은 비밀번호 같은 민감한 값을 생성할 때 자주 사용돼요.
하지만 위에서 설명한 무작위 값 생성 방법들은 모두 암호학적으로 안전한 것으로 간주되지 않아요.

암호학적으로 강력한 난수를 생성하려면 [`java.security.SecureRandom`][secure-random-docs] 클래스를 사용해요.

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
