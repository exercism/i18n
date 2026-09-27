# Hinweise

## Allgemein

- Der Stack des Taschenrechners ist einfach ein Factor-Array. Eine *Operation* ist eine Quotation `( stack -- new-stack )`.
- `head*` aus [`sequences`][sequences] gibt alles außer den letzten `n` Elementen zurück; `last2` gibt die letzten beiden zurück.

## 1. Addition implementieren

- Verwende `bi` aus [`kernel`][kernel], um die Eingabe in zwei Berechnungen aufzuteilen: „das Array ohne seine letzten beiden Elemente“ und „die Summe der letzten beiden Elemente“. Dann fügt `suffix` sie zusammen.

## 2. Multiplikation implementieren

- Gleiche Form wie Aufgabe 1, aber mit `*` anstelle von `+`.

## 3. Eine einzelne Operation anwenden

- Der Effekt der Quotation ist `( stack -- new-stack )`. Deklariere das bei `call`, damit der Compiler den Typ prüfen kann: `call( stack -- new-stack )`.

## 4. Ein Programm auswerten

- `each` (in [`sequences`][sequences]) iteriert eine Quotation über eine Sequenz. Jede Iteration sieht den laufenden Stack, entfernt die nächste Operation vom Programm und wendet sie an.

## 5. Nach Namen auswerten

- Schlage jeden Namen mit `at` (in [`assocs`][assocs]) in der Assoc nach, um seine Operation zu bekommen, und verwende dann `evaluate` erneut.
- Eine Fry-Quotation `'[ _ at ]` aus [`curry-compose-fry`][fry] schließt über die Assoc ab, sodass `map` jeden Namen in einem Durchlauf durch seine Operation ersetzen kann.

## 6. Sicher dividieren

- `throw` (in [`kernel`][kernel]) löst einen Fehler aus. `zero-divisor-error` ist bereits deklariert, also ist `zero-divisor-error throw` der Aufruf.
- Sichere den Divisionspfad mit einem `if` ab, das prüft, ob der unterste Divisor `0` ist.

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
