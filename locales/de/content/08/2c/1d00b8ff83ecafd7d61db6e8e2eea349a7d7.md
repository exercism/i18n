# Anleitung

Ein Freund hat dir gerade eine Nachricht mit einem wichtigen Geheimnis geschickt.
Damit andere sie nicht so leicht lesen können, wurde die Nachricht verschlüsselt, indem mehrere Bitmanipulationen hintereinander ausgeführt wurden.
Du musst jetzt die Funktionen schreiben, die beim Entschlüsseln der Nachricht helfen.

## 1. Verschiebe die Bits zurück

Der erste Schritt beim Entschlüsseln der Nachricht besteht darin, die Verschiebung aus dem Verschlüsselungsprozess rückgängig zu machen, indem du die Bits wieder nach rechts verschiebst.
Die weiteren Schritte beim Entschlüsseln gehen davon aus, dass von links Nullen eingefügt werden.

Implementiere die Funktion `shiftBack`, die einen Wert und die Anzahl der Stellen zum Verschieben entgegennimmt und die Verschiebung ausführt.

```kotlin
shiftBack(0b1001, 2)
# => 0b0010
```

## 2. Setze einige Bits

Als Nächstes gibt es einige Bits, die auf 1 gesetzt werden müssen.

Implementiere die Funktion `setBits`, die einen Wert und eine Maske entgegennimmt und das Ergebnis zurückgibt, nachdem die Bits im Wert auf 1 gesetzt wurden.
Ein Bit aus dem Wert soll auf 1 gesetzt werden, wenn das entsprechende Bit in der Maske ebenfalls 1 ist.
Alle anderen Bits bleiben unverändert.

```kotlin
setBits(0b0110, 0b0101);
# => 0b0111
```

## 3. Kippe bestimmte Bits

Einige Bits werden während der Verschlüsselung gekippt.
Sie müssen zurückgekippt werden, um die Nachricht zu entschlüsseln.

Implementiere die Funktion `flipBits`, die einen Wert und die Maske entgegennimmt.
Die Maske gibt an, welche Bits im Wert gekippt werden.
Ist das Bit in der Maske 1, wird das Bit im Wert gekippt.
Alle anderen Bits bleiben unverändert.

```java
flipBits(0b1100, 0b0101);
# => 0b1001
```

## 4. Lösche bestimmte Bits

Zuletzt gibt es auch noch bestimmte Bits, die immer zu 0 entschlüsselt werden.

Implementiere die Funktion `clearBits`, die einen Wert und eine Maske entgegennimmt.
Die Bits im `value` sollen auf 0 gesetzt werden, wenn das Bit in der Maske 1 ist.
Alle anderen Bits bleiben unverändert.

```java
clearBits(0b0110, 0b0101);
# => 0b0010
```
