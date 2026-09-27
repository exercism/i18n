# Anleitung

In dieser Übung baust du die Fehlerbehandlung für einen einfachen Ganzzahlrechner. Um es einfach zu halten, sind Methoden zum Berechnen von Addition, Multiplikation und Division bereits vorhanden.

Das Ziel ist ein funktionierender Rechner, der einen String nach dem folgenden Muster zurückgibt: `16 + 51 = 67`, wenn ihm die Argumente `16`, `51` und `+` übergeben werden.

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. Implementiere die Rechenoperationen

Die wichtigste Methode, die du in dieser Aufgabe implementierst, ist die (_statische_) Methode `SimpleCalculator.Calculate()`. Sie nimmt drei Argumente entgegen. Die ersten beiden Argumente sind Ganzzahlen, mit denen eine Operation ausgeführt wird. Das dritte Argument ist vom Typ String, und für diese Übung musst du die folgenden Operationen implementieren:

- Addition mit dem String `+`
- Multiplikation mit dem String `*`
- Division mit dem String `/`

## 2. Behandle ungültige Operationen

Jedes andere Operationssymbol sollte die Ausnahme `ArgumentOutOfRangeException` auslösen. Wenn das Argument für die Operation ein leerer String ist, sollte die Methode die Ausnahme `ArgumentException` auslösen. Wird `null` als Argument für die Operation übergeben, sollte die Methode die Ausnahme `ArgumentNullException` auslösen.

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. Behandle Fehler bei der Division durch Null

Wenn du versuchst, durch `0` zu teilen, sollte der Rechner einen String mit dem Inhalt `Division by zero is not allowed.` zurückgeben. Alle anderen Ausnahmen sollte die Methode `SimpleCalculator.Calculate()` nicht behandeln.

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
