# Sobre

## Gerar valores aleatórios

Há várias formas de gerar valores aleatórios em Java.

### Usar `Random`

A classe [`java.util.Random`][java-util-random-docs] disponibiliza vários métodos para gerar valores pseudoaleatórios.

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

Além do seu construtor predefinido, a classe `Random` tem também outro construtor onde se pode indicar uma semente personalizada.
Se criares duas instâncias de Random com a mesma semente e fizeres a mesma sequência de chamadas de métodos em cada uma delas, vão gerar e devolver sequências de números idênticas.

### Usar `Math.random()`

O método [`Math.random()`][math-random-docs] é um método utilitário para gerar um `Double` aleatório no intervalo de `0.0` a `1.0`.

### Usar `ThreadLocalRandom`

A classe [`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs] é uma alternativa a `java.util.Random` e foi concebida para ser thread-safe.
Esta classe tem alguns métodos utilitários extra para gerar valores que recebem tanto um limite inferior como um limite superior, o que torna o seu uso um pouco mais simples.

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## Segurança

Os valores aleatórios são usados frequentemente para gerar valores sensíveis, como palavras-passe.
No entanto, todos os métodos para gerar valores aleatórios descritos acima _não_ são considerados criptograficamente seguros.

Para gerar números aleatórios criptograficamente fortes, usa a classe [`java.security.SecureRandom`][secure-random-docs].

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
