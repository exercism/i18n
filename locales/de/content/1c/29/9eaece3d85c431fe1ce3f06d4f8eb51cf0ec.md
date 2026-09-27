# Ergänzung zu den Anweisungen

## Implementierung

In Cairo, wo es keine native Unterstützung für Gleitkommazahlen gibt, stellen wir Bruchwerte mit Ganzzahlen dar.

Dieser Ansatz ist in der Blockchain-Entwicklung unerlässlich, um die Genauigkeit bei Berechnungen zu erhalten.

In dieser Übung verwenden wir **Festkommaarithmetik**, indem wir die Umlaufzeiten in Mikrosekunden umrechnen.

Zum Beispiel werden aus Merkurs Umlaufzeit von `0.2408467` Erdjahren `240,846,700` Mikrosekunden, wenn man sie mit `1,000,000` multipliziert.

Um der Dezimalgenauigkeit Rechnung zu tragen, gehen die Testfälle davon aus, dass das resultierende Alter **zwei Nachkommastellen** hat, die als Ganzzahlen dargestellt werden.

Das bedeutet, dass ein Alter von `31.69` Jahren im Code als `3169` gespeichert wird.

Um das zu erreichen, multiplizieren wir vor der Division mit 100.

Hier ist ein Beispiel:

```rust
let mercury_orbital_period = 240_846_700; // in microseconds
let age_microseconds = age_seconds * 1_000_000;
// multiplying with 100 to retain 2 decimal places
age_microseconds * 100 / mercury_orbital_period
```

Mit dieser Methode stellst du sicher, dass Bruchwerte korrekt als Ganzzahlen dargestellt werden und gleichzeitig die erforderliche Genauigkeit von zwei Nachkommastellen erhalten bleibt, was entscheidend ist, damit die Tests bestehen.
