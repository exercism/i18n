# Sobre

## A instrução _if-then_

A instrução de fluxo de controlo mais básica em Java é a [instrução _if-then_][if-statement].
Esta instrução serve para executar uma secção de código apenas se uma determinada condição for `true`.
Uma instrução _if-then_ é definida com a cláusula `if`:

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

No exemplo acima, se o carro estiver sem combustível, chamar o método `Car.drive` não fará nada.

## A instrução _if-then-else_

A instrução _if-then-else_ fornece um caminho de execução alternativo para quando a condição da cláusula `if` for avaliada como `false`.
Este caminho de execução alternativo segue uma cláusula `if` e é definido com a cláusula `else`:

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

No exemplo acima, se o carro estiver sem combustível, chamar o método `Car.drive` chamará outro método para parar o carro.

A instrução _if-then-else_ também suporta várias condições recorrendo à cláusula `else if`:

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

No exemplo acima, conduzir o carro quando o combustível é menor ou igual a `5` faz o carro andar, mas acende a luz do combustível.
Quando o combustível chegar a `0`, o carro deixa de andar.

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
