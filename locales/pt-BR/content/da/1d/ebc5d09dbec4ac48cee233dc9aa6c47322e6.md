# Sobre

## Gerando valores aleatórios

Existem várias formas de gerar valores aleatórios em Java.

### Usando `Random`

A classe [`java.util.Random`][java-util-random-docs] oferece vários métodos para gerar valores pseudoaleatórios.

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

Além do seu construtor padrão, a classe `Random` também tem outro construtor no qual é possível fornecer uma semente personalizada.
Se duas instâncias de Random forem criadas com a mesma semente, e a mesma sequência de chamadas de método for feita em cada uma, elas vão gerar e retornar sequências de números idênticas.

### Usando `Math.random()`

O método [`Math.random()`][math-random-docs] é um método utilitário para gerar um `Double` aleatório no intervalo de `0.0` a `1.0`.

### Usando `ThreadLocalRandom`

A classe [`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs] é uma alternativa ao `java.util.Random` e foi projetada para ser thread-safe.
Essa classe tem alguns métodos utilitários extras para gerar valores que recebem tanto um limite inferior quanto um superior, o que a torna um pouco mais fácil de usar.

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## Segurança

Valores aleatórios costumam ser usados para gerar valores sensíveis, como senhas.
No entanto, todos os métodos para gerar valores aleatórios descritos acima _não_ são considerados criptograficamente seguros.

Para gerar números aleatórios criptograficamente fortes, use a classe [`java.security.SecureRandom`][secure-random-docs].

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
