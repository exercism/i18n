# Részletek

## Véletlen értékek előállítása

Java nyelven többféleképpen is előállíthatsz véletlen értékeket.

### A `Random` használata

A [`java.util.Random`][java-util-random-docs] osztály több metódust kínál álvéletlen értékek előállítására.

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

Az alapértelmezett konstruktor mellett a `Random` osztálynak van egy másik konstruktora is, amelynél egyéni mag adható meg.
Ha két `Random` példányt ugyanazzal a maggal hozunk létre, és mindkettőn ugyanazokat a metódushívásokat hajtjuk végre, akkor ugyanazokat a számsorozatokat állítják elő és adják vissza.

### A `Math.random()` használata

A [`Math.random()`][math-random-docs] metódus egy segédmetódus, amellyel véletlen `Double`-t lehet előállítani a `0.0` és `1.0` közötti tartományban.

### A `ThreadLocalRandom` használata

A [`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs] osztály a `java.util.Random` alternatívája, és szálbiztosnak tervezték.
Ez az osztály néhány extra segédmetódust is tartalmaz, amelyekkel alsó és felső korlátot is megadva állíthatsz elő értékeket, ami egy kicsit könnyebbé teszi a használatát.

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## Biztonság

A véletlen értékeket gyakran használják érzékeny adatok, például jelszavak előállítására.
A fent leírt véletlenszám-generáló metódusok közül azonban egyik sem számít kriptográfiailag biztonságosnak.

Kriptográfiailag erős véletlen számok előállításához használd a [`java.security.SecureRandom`][secure-random-docs] osztályt.

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
