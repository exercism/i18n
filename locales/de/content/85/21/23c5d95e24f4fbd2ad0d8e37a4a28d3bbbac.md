# Ergänzung zu den Anweisungen

## Implementierung

Das Argument `diagram` beginnt jede Zeile mit einem `\n`.
Dadurch lassen sich Diagramme mit den rohen String-Literalen von Go im Quellcode schön als zwei linksbündige Zeilen darstellen.
Der Test kann zum Beispiel Folgendes enthalten.

```go
        diagram := `
VVCCGG
VVCCGG`
```

Wenn das Argument `children` `nil` ist, verwende die Liste der Kinder, die in den Anweisungen oben definiert ist.
Wenn es nicht `nil` ist, verwende den angegebenen Wert.
