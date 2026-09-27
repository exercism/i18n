# Anleitung

Deine Aufgabe ist es, einen binären Suchalgorithmus zu implementieren.

Ein binärer Suchalgorithmus findet ein Element in einer Liste, indem er sie wiederholt halbiert und nur die Hälfte behält, die das gesuchte Element enthält.
So können wir die möglichen Positionen unseres Elements schnell eingrenzen, bis wir es gefunden haben oder bis wir alle möglichen Positionen ausgeschlossen haben.

~~~~exercism/caution
Die binäre Suche funktioniert nur, wenn die Liste sortiert ist.
~~~~

Der Algorithmus funktioniert so:

- Finde das mittlere Element einer *sortierten* Liste und vergleiche es mit dem gesuchten Element.
- Wenn das mittlere Element unser Element ist, sind wir fertig!
- Wenn das mittlere Element größer als unser Element ist, können wir dieses Element und alle Elemente **danach** ausschließen.
- Wenn das mittlere Element kleiner als unser Element ist, können wir dieses Element und alle Elemente **davor** ausschließen.
- Wenn alle Elemente der Liste ausgeschlossen wurden, ist das Element nicht in der Liste.
- Andernfalls wiederhole den Vorgang mit dem Teil der Liste, der noch nicht ausgeschlossen wurde.

Hier ist ein Beispiel:

Sagen wir, wir suchen die Zahl 23 in der folgenden sortierten Liste: `[4, 8, 12, 16, 23, 28, 32]`.

- Wir vergleichen zuerst 23 mit dem mittleren Element, 16.
- Da 23 größer als 16 ist, können wir die linke Hälfte der Liste ausschließen, und es bleibt `[23, 28, 32]` übrig.
- Dann vergleichen wir 23 mit dem neuen mittleren Element, 28.
- Da 23 kleiner als 28 ist, können wir die rechte Hälfte der Liste ausschließen: `[23]`.
- Wir haben unser Element gefunden.
