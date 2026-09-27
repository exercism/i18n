# Anleitung

Elena ist die neue Qualitätsmanagerin einer Zeitungsfabrik.
Da sie gerade erst im Unternehmen angekommen ist, hat sie beschlossen, einige Prozesse in der Fabrik zu überprüfen, um zu sehen, was verbessert werden könnte.
Sie hat herausgefunden, dass die Techniker viele Qualitätsprüfungen von Hand durchführen. Sie sieht eine gute Gelegenheit zur Automatisierung und bittet dich als freiberuflichen Entwickler, eine Software zu entwickeln, die einige der Maschinen überwacht.

## 1. Überprüfe die Luftfeuchtigkeit im Raum

Deine erste Mission ist es, eine Software zu schreiben, die die Luftfeuchtigkeit im Produktionsraum überwacht. Es gibt bereits einen Sensor, der mit der Software des Unternehmens verbunden ist und regelmäßig die Luftfeuchtigkeit des Raums in Prozent zurückgibt.

Du musst eine Funktion in der Software implementieren, die einen Fehler auslöst, wenn die Luftfeuchtigkeit zu hoch ist.
Wenn die Luftfeuchtigkeit akzeptabel ist, wird ein Info-Log hinzugefügt.
Die Funktion soll `humiditycheck` heißen und die Luftfeuchtigkeit in Prozent als Argument entgegennehmen.

Du sollst mit einer `ErrorException` abbrechen (die genaue Meldung ist nicht wichtig, muss aber den gemessenen Feuchtigkeitswert enthalten), wenn der Prozentsatz 70 % überschreitet.
Andernfalls füge ein Info-Log mit der Meldung `"humidity level check passed: h%"` hinzu, wobei `h` die Luftfeuchtigkeit in Prozent ist.

```julia-repl
julia> humiditycheck(60)
[ Info: humidity level check passed: 60%
```

```julia-repl
julia> humiditycheck(100)
ERROR: humidity check failed: 100%
```

## 2. Prüfe auf Überhitzung

Elena ist mit deiner ersten Aufgabe sehr zufrieden und bittet dich, dich um die Überwachung der Temperatur der Maschinen zu kümmern.
Während du dich mit einem Techniker, Greg, unterhältst, erfährst du, dass die Techniker sich Sorgen um eine Überhitzung machen, wenn die Temperatur einer Maschine 500 °C überschreitet.

Die Maschine ist mit einem Sensor ausgestattet, der ihre Innentemperatur misst.
Du solltest wissen, dass der Sensor sehr empfindlich ist und oft kaputtgeht.
In diesem Fall müssen die Techniker ihn austauschen.

Deine Aufgabe ist es, eine Funktion `temperaturecheck` zu implementieren, die die Temperatur als Argument entgegennimmt und entweder ein Log hinzufügt, wenn alles in Ordnung ist, oder einen Fehler auslöst, wenn der Sensor defekt ist oder die Maschine zu überhitzen beginnt.
Da du später je nach Fehler unterschiedlich reagieren musst, brauchst du einen Mechanismus, um die beiden Fehlerarten zu unterscheiden.

- Wenn der Sensor defekt ist, ist die Temperatur `nothing`.
  In diesem Fall sollst du mit einem `ArgumentError` abbrechen (die Meldung ist nicht wichtig).
- Wenn der Sensor funktioniert und die Temperatur 500 °C überschreitet, sollst du einen `DomainError` auslösen, der die gemessene Temperatur enthält.
- Andernfalls ist alles in Ordnung, also füge ein Info-Log mit der Meldung `"temperature check passed: t °C"` hinzu, wobei `t` die Temperatur ist.

```julia-repl
julia> temperaturecheck(nothing)
ERROR: ArgumentError: sensor is broken

julia> temperaturecheck(800)
ERROR: DomainError with 800:
"overheating detected"

julia> temperaturecheck(500)
[ Info: temperature check passed: 500 °C
```

## 3. Definiere einen benutzerdefinierten Fehler

Für die nächste Aufgabe musst du einen allgemeineren Auffangfehler definieren.
Die Implementierungsdetails spielen keine Rolle, außer dass es ein Fehler ist und der Name `MachineError` lautet.
Du kannst gerne Felder und Meldungen hinzufügen, wie du sie für hilfreich hältst.

## 4. Überwache die Maschine

Jetzt, wo deine Maschine Fehler erkennen kann und du einen benutzerdefinierten Maschinenfehler hast, fügst du eine Wrapper-Funktion hinzu, die melden kann, wie alles funktioniert.
Über die Logs aus den vorherigen Funktionen hinaus muss dieser Wrapper auch Logs hinzufügen, je nachdem, welche Art von Fehlern auftritt.

- Überprüfe die Luftfeuchtigkeit und die Temperatur.
- Wenn die Feuchtigkeitsprüfung eine `ErrorException` auslöst, soll ein Error-Log mit der Meldung `"humidity level check failed: h%"` hinzugefügt werden, wobei `h` die Luftfeuchtigkeit in Prozent ist.
- Wenn die Temperaturprüfung einen `ArgumentError` auslöst, soll ein Warn-Log mit der Meldung `"sensor is broken"` hinzugefügt werden.
- Wenn die Temperaturprüfung einen `DomainError` auslöst, soll ein Error-Log mit der Meldung `"overheating detected: t °C"` hinzugefügt werden, wobei `t` die Temperatur ist.
- Wenn eine der beiden oder beide Prüfungen fehlschlagen, soll nach dem Hinzufügen der Logs ein einzelner `MachineError` ausgelöst werden.
- Wenn alles in Ordnung ist, werden nur die Logs von `humiditycheck` und `temperaturecheck` hinzugefügt.

Implementiere eine Funktion `machinemonitor()`, die Luftfeuchtigkeit und Temperatur als Argumente entgegennimmt.

```julia-repl
julia> machinemonitor(42, 450)
[ Info: humidity level check passed: 42%
[ Info: temperature check passed: 450 °C

julia> machinemonitor(42, 550)
[ Info: humidity level check passed: 42%
┌ Error: overheating detected: 550 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(82, 521)
┌ Error: humidity level check failed: 82%
└ @ Main # output truncated
┌ Error: overheating detected: 521 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(42, nothing)
[ Info: humidity level check passed: 42%
┌ Warning: sensor is broken
└ @ Main # output truncated

Error: MachineError
```
