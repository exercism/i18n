# Acerca de

## La _sentencia if-then_

La sentencia de control de flujo más básica en Java es la [_sentencia if-then_][if-statement].
Esta sentencia se usa para ejecutar una sección de código solo si una condición particular es `true`.
Una _sentencia if-then_ se define usando la cláusula `if`:

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

En el ejemplo de arriba, si el auto se quedó sin combustible, llamar al método `Car.drive` no hará nada.

## La _sentencia if-then-else_

La _sentencia if-then-else_ ofrece una ruta alternativa de ejecución para cuando la condición de la cláusula `if` se evalúa como `false`.
Esta ruta alternativa de ejecución sigue a una cláusula `if` y se define usando la cláusula `else`:

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

En el ejemplo de arriba, si el auto se quedó sin combustible, llamar al método `Car.drive` llamará a otro método para detener el auto.

La _sentencia if-then-else_ también admite varias condiciones usando la cláusula `else if`:

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

En el ejemplo de arriba, conducir el auto cuando el combustible es menor o igual que `5` hará que el auto avance, pero encenderá la luz de combustible.
Cuando el combustible llegue a `0`, el auto dejará de avanzar.

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
