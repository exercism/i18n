# À propos

## Génère des valeurs aléatoires

Il existe plusieurs façons de générer des valeurs aléatoires en Java.

### Utilise `Random`

La classe [`java.util.Random`][java-util-random-docs] fournit plusieurs méthodes pour générer des valeurs pseudo-aléatoires.

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

Outre son constructeur par défaut, la classe `Random` en possède un autre, auquel on peut fournir une graine personnalisée.
Si deux instances de `Random` sont créées avec la même graine et que la même séquence d'appels de méthodes est effectuée sur chacune d'elles, elles généreront et renverront des séquences de nombres identiques.

### Utilise `Math.random()`

La méthode [`Math.random()`][math-random-docs] est une méthode utilitaire qui permet de générer un `Double` aléatoire dans l'intervalle allant de `0.0` à `1.0`.

### Utilise `ThreadLocalRandom`

La classe [`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs] est une alternative à `java.util.Random` et est conçue pour être _thread-safe_.
Cette classe propose quelques méthodes utilitaires supplémentaires pour générer des valeurs qui prennent à la fois une borne inférieure et une borne supérieure, ce qui la rend un peu plus simple à utiliser.

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## Sécurité

Les valeurs aléatoires servent souvent à générer des valeurs sensibles comme des mots de passe.
Cependant, toutes les méthodes de génération de valeurs aléatoires décrites ci-dessus ne sont _pas_ considérées comme cryptographiquement sûres.

Pour générer des nombres aléatoires cryptographiquement robustes, utilise la classe [`java.security.SecureRandom`][secure-random-docs].

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
