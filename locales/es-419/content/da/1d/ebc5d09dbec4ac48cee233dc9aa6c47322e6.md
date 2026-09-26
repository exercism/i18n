# Acerca de

## Generar valores aleatorios

Existen varias formas de generar valores aleatorios en Java.

### Usar `Random`

La clase [`java.util.Random`][java-util-random-docs] proporciona varios métodos para generar valores seudoaleatorios.

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

Además de su constructor predeterminado, la clase `Random` también tiene otro constructor en el que se puede proporcionar una semilla personalizada.
Si se crean dos instancias de Random con la misma semilla y se hace la misma secuencia de llamadas a métodos en cada una, generarán y devolverán secuencias de números idénticas.

### Usar `Math.random()`

El método [`Math.random()`][math-random-docs] es un método de utilidad para generar un `Double` aleatorio en el rango de `0.0` a `1.0`.

### Usar `ThreadLocalRandom`

La clase [`java.util.concurrent.ThreadLocalRandom`][thread-local-random-docs] es una alternativa a `java.util.Random` y está diseñada para ser segura para subprocesos.
Esta clase tiene algunos métodos de utilidad adicionales para generar valores que aceptan tanto un límite inferior como uno superior, lo que la hace un poco más fácil de usar.

```java
ThreadLocalRandom random = ThreadLocalRandom.current();

random.nextInt(10, 20); // Generates a random int in the range 10 to 20
random.nextLong(10, 20); // Generates a random long in the range 10 to 20

random.nextFloat(10.0, 20.0); // Generates a random float in the range 10 to 20
random.nextDouble(10.0, 20.0); // Generates a random double in the range 10 to 20
```

## Seguridad

Los valores aleatorios se usan a menudo para generar valores sensibles, como las contraseñas.
Sin embargo, todos los métodos para generar valores aleatorios descritos anteriormente _no_ se consideran criptográficamente seguros.

Para generar números aleatorios criptográficamente fuertes, usa la clase [`java.security.SecureRandom`][secure-random-docs].

[java-util-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
[math-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#random--
[thread-local-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html
[secure-random-docs]: https://docs.oracle.com/javase/8/docs/api/java/security/SecureRandom.html
