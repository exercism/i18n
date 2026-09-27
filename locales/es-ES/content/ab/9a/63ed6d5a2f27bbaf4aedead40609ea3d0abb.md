# Acerca de

## La instrucción _if-then_

La instrucción de control de flujo más básica en Java es la [_instrucción if-then_][if-statement].
Esta instrucción se usa para ejecutar una sección de código solo si una condición concreta es `true`.
Una _instrucción if-then_ se define con la cláusula `if`:

```java
class Car {
    void drive() {
        // the "if" clause: the car needs to have fuel left to drive
        if (fuel > 0) {
            // the "then" clause: the car drives, consuming fuel
            fuel--;
        }
    }
}
```

En el ejemplo anterior, si el coche se queda sin combustible, llamar al método `Car.drive` no hará nada.

## La instrucción _if-then-else_

La _instrucción if-then-else_ proporciona una ruta de ejecución alternativa para cuando la condición de la cláusula `if` se evalúa como `false`.
Esta ruta de ejecución alternativa sigue a una cláusula `if` y se define con la cláusula `else`:

```java
class Car {
    void drive() {
        if (fuel > 0) {
            fuel--;
        } else {
            stop();
        }
    }
}
```

En el ejemplo anterior, si el coche se queda sin combustible, llamar al método `Car.drive` llamará a otro método para detener el coche.

La _instrucción if-then-else_ también admite varias condiciones mediante la cláusula `else if`:

```java
class Car {
    void drive() {
        if (fuel > 5) {
            fuel--;
        } else if (fuel > 0) {
            turnOnFuelLight();
            fuel--;
        } else {
            stop();
        }
    }
}
```

En el ejemplo anterior, conducir el coche cuando el combustible es menor o igual que `5` hará que el coche avance, pero se encenderá la luz de combustible.
Cuando el combustible llegue a `0`, el coche dejará de avanzar.

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
