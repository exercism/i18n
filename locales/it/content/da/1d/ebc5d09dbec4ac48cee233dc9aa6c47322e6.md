# Informazioni

## Generare valori casuali

Esistono diversi modi per generare valori casuali in Java.

### Usare `Random`

La classe [`java.util.Random`][java-util-random-docs] fornisce diversi metodi per generare valori pseudo-casuali.

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

Oltre al suo costruttore predefinito, la classe `Random` ha anche un altro costruttore a cui si può fornire un seme personalizzato.
Se si creano due istanze di Random con lo stesso seme e su ciascuna si effettua la stessa sequenza di chiamate ai metodi, genereranno e restituiranno sequenze di numeri identiche.

### Usare `Math.random()`

Il metodo [`Math.random()`][math-random-docs] è un metodo di utilità per generare un `Double` casuale nell'intervallo da `0.0` a `1.0`.

### Usare `ThreadLocalRandom`

La classe [`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs] è un'alternativa a `java.util.Random` ed è progettata per essere thread-safe.
Questa classe ha alcuni metodi di utilità aggiuntivi per generare valori che accettano sia un limite inferiore che uno superiore, il che la rende un po' più semplice da usare.

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## Sicurezza

I valori casuali vengono spesso usati per generare valori sensibili come le password.
Tuttavia, tutti i metodi per generare valori casuali descritti sopra _non_ sono considerati crittograficamente sicuri.

Per generare numeri casuali crittograficamente forti, usa la classe [`java.security.SecureRandom`][secure-random-docs].

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
