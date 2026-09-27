# Informazioni

## L'istruzione _if-then_

L'istruzione per il controllo del flusso più semplice in Java è l'[istruzione _if-then_][if-statement].
Questa istruzione serve a eseguire una sezione di codice solo se una particolare condizione è `true`.
Un'istruzione _if-then_ si definisce usando la clausola `if`:

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

Nell'esempio sopra, se l'auto è rimasta senza carburante, chiamare il metodo `Car.drive` non farà nulla.

## L'istruzione _if-then-else_

L'istruzione _if-then-else_ fornisce un percorso di esecuzione alternativo per quando la condizione nella clausola `if` viene valutata come `false`.
Questo percorso di esecuzione alternativo segue una clausola `if` e si definisce usando la clausola `else`:

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

Nell'esempio sopra, se l'auto è rimasta senza carburante, chiamare il metodo `Car.drive` chiamerà un altro metodo per fermare l'auto.

L'istruzione _if-then-else_ supporta anche più condizioni usando la clausola `else if`:

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

Nell'esempio sopra, guidare l'auto quando il carburante è minore o uguale a `5` farà muovere l'auto, ma accenderà la spia del carburante.
Quando il carburante raggiunge `0`, l'auto smetterà di muoversi.

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
