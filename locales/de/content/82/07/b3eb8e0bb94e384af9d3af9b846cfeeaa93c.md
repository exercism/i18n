# Anhang zu den Anweisungen

## Ausgabeformat

Die Methode `solve()` soll ein Objekt mit diesen Eigenschaften zurückgeben:

- `moves` – die Anzahl der Eimeraktionen, die nötig sind, um das Ziel zu erreichen
  (das Füllen des Starteimers eingeschlossen),
- `goalBucket` – der Name des Eimers, der die Zielmenge erreicht hat,
- `otherBucket` – die Menge, die der andere Eimer enthält.

Beispiel:

```json
{
  "moves": 5,
  "goalBucket": "one",
  "otherBucket": 2
}
```
