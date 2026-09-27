# Überblick

## Die _if-then_-Anweisung

Die grundlegendste Kontrollflussanweisung in Java ist die [_if-then_-Anweisung][if-statement].
Mit ihr führst du einen Codeabschnitt nur dann aus, wenn eine bestimmte Bedingung `true` ist.
Eine _if-then_-Anweisung definierst du mit der `if`-Klausel:

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

Im obigen Beispiel passiert nichts, wenn du die Methode `Car.drive` aufrufst und der Wagen keinen Kraftstoff mehr hat.

## Die _if-then-else_-Anweisung

Die _if-then-else_-Anweisung bietet einen alternativen Ausführungspfad für den Fall, dass die Bedingung in der `if`-Klausel `false` ergibt.
Dieser alternative Ausführungspfad folgt auf eine `if`-Klausel und wird mit der `else`-Klausel definiert:

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

Im obigen Beispiel ruft der Aufruf der Methode `Car.drive` eine andere Methode auf, die den Wagen anhält, wenn kein Kraftstoff mehr da ist.

Die _if-then-else_-Anweisung unterstützt auch mehrere Bedingungen, indem du die `else if`-Klausel verwendest:

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

Im obigen Beispiel fährt der Wagen los, wenn der Kraftstoffstand kleiner oder gleich `5` ist, aber er schaltet dabei die Tankwarnleuchte ein.
Sinkt der Kraftstoff auf `0`, hält der Wagen an.

[if-statement]: https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
