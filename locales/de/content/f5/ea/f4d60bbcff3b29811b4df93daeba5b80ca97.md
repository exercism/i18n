# Anhang zur Anweisung

## Eingabeformat

Jeder Dominostein wird im linearen Speicher als zwei aufeinanderfolgende Bytes abgelegt, ein Byte für jede Hälfte.

Zum Beispiel werden die Steine `[2|1]`, `[2|3]` und `[1|3]` als Byte-Array `[ 0x02, 0x01, 0x02, 0x03, 0x01, 0x03 ]` dargestellt.

## Reservierter Speicher

Der Puffer für die Eingabe-Dominosteine verwendet die Bytes 256-511 des linearen Speichers.
