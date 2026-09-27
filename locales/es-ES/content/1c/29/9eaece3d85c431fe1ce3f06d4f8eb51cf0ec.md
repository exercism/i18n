# Anexo a las instrucciones

## Implementación

En Cairo, donde no hay soporte nativo para los números de coma flotante, representamos los valores fraccionarios mediante números enteros.

Este enfoque es esencial en el desarrollo de blockchain para mantener la precisión en los cálculos.

En este ejercicio, usamos **aritmética de coma fija** convirtiendo los periodos orbitales a microsegundos.

Por ejemplo, el periodo orbital de Mercurio, de `0.2408467` años terrestres, se convierte en `240,846,700` microsegundos al multiplicarlo por `1,000,000`.

Para tener en cuenta la precisión decimal, los casos de prueba asumen que la edad resultante tiene **dos decimales**, representados como números enteros.

Esto significa que una edad de `31.69` años se almacena como `3169` en el código.

Para lograrlo, multiplicamos por 100 antes de hacer la división.

Aquí tienes un ejemplo:

```rust
let mercury_orbital_period = 240_846_700; // in microseconds
let age_microseconds = age_seconds * 1_000_000;
// multiplying with 100 to retain 2 decimal places
age_microseconds * 100 / mercury_orbital_period
```

Al usar este método, te aseguras de que los valores fraccionarios se representen con exactitud como números enteros y de mantener la precisión de dos decimales requerida, algo crucial para que las pruebas se aprueben.
