# Névjegy

## Az _if-then_ elágazás

A Java legalapvetőbb vezérlési utasítása az [_if-then_ elágazás][if-statement].
Ezzel az utasítással csak akkor hajtunk végre egy kódrészletet, ha egy adott feltétel `true`.
Az _if-then_ elágazást az `if` ág segítségével definiáljuk:

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

A fenti példában, ha az autóból kifogyott az üzemanyag, a `Car.drive` metódus meghívása nem tesz semmit.

## Az _if-then-else_ elágazás

Az _if-then-else_ elágazás alternatív végrehajtási útvonalat biztosít arra az esetre, amikor az `if` ágban lévő feltétel `false` értékre értékelődik.
Ez az alternatív végrehajtási útvonal egy `if` ágat követ, és az `else` ág segítségével definiáljuk:

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

A fenti példában, ha az autóból kifogyott az üzemanyag, a `Car.drive` metódus meghívása egy másik metódust hív meg, amely megállítja az autót.

Az _if-then-else_ elágazás több feltételt is támogat az `else if` ág használatával:

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

A fenti példában, ha az üzemanyag legfeljebb `5`, az autó tovább halad, de bekapcsol az üzemanyagjelző lámpa.
Amikor az üzemanyag eléri a `0`-t, az autó megáll.

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
