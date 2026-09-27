# Über

## Zufällige Werte erzeugen

In Java gibt es mehrere Möglichkeiten, zufällige Werte zu erzeugen.

### Mit `Random`

Die Klasse [`java.util.Random`][java-util-random-docs] bietet mehrere Methoden, um pseudozufällige Werte zu erzeugen.

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

Neben ihrem Standardkonstruktor hat die Klasse `Random` noch einen weiteren Konstruktor, dem ein eigener Seed übergeben werden kann.
Wenn zwei Instanzen von Random mit demselben Seed erzeugt werden und für beide dieselbe Abfolge von Methodenaufrufen ausgeführt wird, erzeugen und liefern sie identische Zahlenfolgen.

### Mit `Math.random()`

Die Methode [`Math.random()`][math-random-docs] ist eine Hilfsmethode, um ein zufälliges `Double` im Bereich von `0.0` bis `1.0` zu erzeugen.

### Mit `ThreadLocalRandom`

Die Klasse [`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs] ist eine Alternative zu `java.util.Random` und ist threadsicher ausgelegt.
Diese Klasse hat einige zusätzliche Hilfsmethoden zum Erzeugen von Werten, die sowohl eine untere als auch eine obere Grenze annehmen. Das macht die Arbeit mit ihr etwas einfacher.

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## Sicherheit

Zufällige Werte werden oft verwendet, um sensible Werte wie Passwörter zu erzeugen.
Allerdings gelten alle oben beschriebenen Methoden zum Erzeugen zufälliger Werte _nicht_ als kryptografisch sicher.

Um kryptografisch starke Zufallszahlen zu erzeugen, verwende die Klasse [`java.security.SecureRandom`][secure-random-docs].

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
