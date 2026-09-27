# نبذة

## توليد القيم العشوائية

توجد عدة أساليب لتوليد قيم عشوائية في Java.

### استخدام `Random`

يوفّر الصنف [`java.util.Random`][java-util-random-docs] عدة طرق لتوليد قيم شبه عشوائية.

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

إلى جانب المنشئ الافتراضي، يمتلك الصنف `Random` منشئًا آخر يمكن من خلاله تمرير بذرة مخصصة.
إذا أُنشئت نسختان من Random بالبذرة نفسها، ونُفّذ التسلسل نفسه من استدعاءات الطرق على كل منهما، فستولّدان وتُرجعان تسلسل الأعداد نفسه.

### استخدام `Math.random()`

الطريقة [`Math.random()`][math-random-docs] طريقة مساعدة لتوليد قيمة `Double` عشوائية في النطاق من `0.0` إلى `1.0`.

### استخدام `ThreadLocalRandom`

يُعدّ الصنف [`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs] بديلًا عن `java.util.Random`، وهو مصمَّم ليكون آمنًا عند استخدام الخيوط.
يمتلك هذا الصنف بعض الطرق المساعدة الإضافية لتوليد قيم تأخذ حدًا أدنى وحدًا أعلى، مما يجعله أسهل قليلًا في التعامل.

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## الأمان

تُستخدم القيم العشوائية غالبًا لتوليد قيم حساسة مثل كلمات المرور.
ومع ذلك، _لا_ تُعدّ جميع الطرق المذكورة أعلاه لتوليد القيم العشوائية آمنة من الناحية التشفيرية.

لتوليد أعداد عشوائية قوية تشفيريًا، استخدم الصنف [`java.security.SecureRandom`][secure-random-docs].

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
