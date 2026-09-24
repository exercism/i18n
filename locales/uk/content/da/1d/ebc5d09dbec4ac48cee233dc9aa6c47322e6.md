# Докладніше

## Генерування випадкових значень

Існує кілька способів генерувати випадкові значення в Java.

### За допомогою `Random`

Клас [`java.util.Random`][java-util-random-docs] надає кілька методів для генерування псевдовипадкових значень.

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

Окрім конструктора за замовчуванням, клас `Random` має ще один конструктор, у якому можна вказати власне зерно.
Якщо створити два екземпляри `Random` з однаковим зерном і для кожного з них зробити ту саму послідовність викликів методів, вони будуть генерувати і повертати однакові послідовності чисел.

### За допомогою `Math.random()`

За допомогою методу [`Math.random()`][math-random-docs] можна згенерувати випадковий `Double` у діапазоні від `0.0` до `1.0`.

### За допомогою `ThreadLocalRandom`

Клас [`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs] є потокобезпечною альтернативою `java.util.Random`.
У цього класу є кілька додаткових допоміжних методів для генерування значень, які приймають і нижню, і верхню межу, що робить роботу з ним трохи простішою.

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## Безпека

Випадкові значення часто застосовують для генерування чутливих значень, як-от паролів.
Однак усі описані вище методи генерування випадкових значень _не_ вважаються криптографічно стійкими.

Щоб генерувати криптографічно стійкі випадкові числа, скористаймося класом [`java.security.SecureRandom`][secure-random-docs].

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
