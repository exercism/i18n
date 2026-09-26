# Sobre

## A condicional _if-then_

A instrução de fluxo de controle mais básica em Java é a [condicional _if-then_][if-statement].
Ela serve para executar um trecho de código somente se uma determinada condição for `true`.
Uma condicional _if-then_ é definida com a cláusula `if`:

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

No exemplo acima, se o carro estiver sem combustível, chamar o método `Car.drive` não faz nada.

## A condicional _if-then-else_

A condicional _if-then-else_ oferece um caminho alternativo de execução para quando a condição da cláusula `if` resultar em `false`.
Esse caminho alternativo de execução vem depois de uma cláusula `if` e é definido com a cláusula `else`:

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

No exemplo acima, se o carro estiver sem combustível, chamar o método `Car.drive` chama outro método para parar o carro.

A condicional _if-then-else_ também dá suporte a várias condições usando a cláusula `else if`:

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

No exemplo acima, dirigir o carro quando o combustível for menor ou igual a `5` faz o carro andar, mas acende a luz de combustível.
Quando o combustível chega a `0`, o carro para de andar.

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
