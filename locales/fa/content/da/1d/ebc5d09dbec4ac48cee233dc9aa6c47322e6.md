# درباره

## تولید مقادیر تصادفی

روش‌های متعددی برای تولید مقادیر تصادفی در Java وجود دارد.

### استفاده از `Random`

کلاس [`java.util.Random`][java-util-random-docs] چندین متد برای تولید مقادیر «شبه‌تصادفی» فراهم می‌کند.

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

کلاس `Random` علاوه بر سازنده‌ی پیش‌فرض خود، سازنده‌ی دیگری هم دارد که می‌توان در آن یک «بذر» سفارشی مشخص کرد.
اگر دو نمونه از `Random` با بذر یکسانی ساخته شوند و برای هر دو، دنباله‌ی یکسانی از فراخوانی متدها انجام شود، دنباله‌های یکسانی از اعداد تولید و برگردانده می‌شود.

### استفاده از `Math.random()`

متد [`Math.random()`][math-random-docs] یک متد کمکی برای تولید یک `Double` تصادفی در بازه‌ی `0.0` تا `1.0` است.

### استفاده از `ThreadLocalRandom`

کلاس [`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs] جایگزینی برای `java.util.Random` است و طوری طراحی شده است که در محیط‌های چندریسه‌ای ایمن کار کند.
این کلاس چند متد کمکی اضافی برای تولید مقادیری دارد که هم حد پایین و هم حد بالا می‌گیرند و همین کار با آن را کمی ساده‌تر می‌کند.

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## امنیت

از مقادیر تصادفی اغلب برای تولید مقادیر حساسی مانند گذرواژه‌ها استفاده می‌شود.
با این حال، هیچ‌یک از متدهای تولید مقادیر تصادفی که در بالا توضیح داده شد، از نظر رمزنگاری _امن_ به شمار نمی‌آید.

برای تولید اعداد تصادفی قوی از نظر رمزنگاری، از کلاس [`java.security.SecureRandom`][secure-random-docs] استفاده کنید.

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
