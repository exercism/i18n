# Anleitung

Implementiere die Operationen `keep` und `discard` für Sammlungen.
Wenn du eine Sammlung und ein Prädikat für die Elemente der Sammlung hast, gibt `keep` eine neue Sammlung mit den Elementen zurück, für die das Prädikat wahr ist, während `discard` eine neue Sammlung mit den Elementen zurückgibt, für die das Prädikat falsch ist.

Zum Beispiel bei der Sammlung von Zahlen:

- 1, 2, 3, 4, 5

Und dem Prädikat:

- Ist die Zahl gerade?

Dann sollte deine `keep`-Operation Folgendes ergeben:

- 2, 4

Deine `discard`-Operation sollte hingegen Folgendes ergeben:

- 1, 3, 5

Beachte, dass die Vereinigung von `keep` und `discard` alle Elemente umfasst.

Die Funktionen können `keep` und `discard` heißen, oder sie brauchen andere Namen, damit sie nicht mit vorhandenen Funktionen oder Konzepten in deiner Sprache kollidieren.

## Einschränkungen

Lass die Finger von der Filter-, Reject- oder Dingsbums-Funktionalität deiner Standardbibliothek!
Löse diese Aufgabe selbst mit anderen einfachen Mitteln.
