# Ergänzung zur Anleitung

## Hinweise zur Implementierung

Das Testprogramm erstellt Bäume, indem es die variadische `New`-Funktion wiederholt anwendet.
Zum Beispiel erzeugt die Anweisung

```go
tree := New("a",New("b"),New("c",New("d")))
```

den folgenden Baum:

```text
      "a"
       |
    -------
    |     |
   "b"   "c"
          |
         "d"
```

Du kannst davon ausgehen, dass es in den Testbäumen keine doppelten Werte gibt.

Die Methoden `Value` und `Children` werden vom Testprogramm verwendet, um Bäume zu zerlegen.

Der grundlegende Aufbau und die Zerlegung von Bäumen müssen funktionieren, bevor du mit dem interessanten Teil der Übung beginnst, deshalb werden sie in den ersten drei Tests separat getestet.

---

Die Methoden `FromPov` und `PathTo` sind der interessante Teil der Übung.

Die Methode `FromPov` nimmt ein String-Argument `from`, das einen Knoten im Baum über seinen Wert angibt.
Sie sollte einen Baum zurückgeben, dessen Wurzel den Wert `from` hat.
Du kannst den ursprünglichen Baum verändern und ihn zurückgeben oder einen neuen Baum erstellen und diesen zurückgeben.
Wenn du einen neuen Baum zurückgibst, darfst du den ursprünglichen Baum verbrauchen oder zerstören.
Natürlich ist es schön, ihn unverändert zu lassen.

Die Methode `PathTo` nimmt zwei String-Argumente `from` und `to`, die zwei Knoten im Baum über ihre Werte angeben.
Sie sollte den kürzesten Pfad im Baum vom ersten zum zweiten Knoten zurückgeben.
