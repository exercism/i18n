# Zusatz zu den Anweisungen

## Projektstruktur

* In `src` liegt deine Lösung für die Übung
* In `spec` liegen die Tests, die für die Übung ausgeführt werden

## Tests ausführen

Wenn du dich im richtigen Verzeichnis befindest (also in dem, das `src` und `spec` enthält), kannst du die Tests für diese Übung mit `crystal spec` ausführen:

```bash
$ pwd
/Users/johndoe/Code/exercism/crystal/hello-world

$ ls
GETTING_STARTED.md README.md          spec               src

$ crystal spec
```

Damit werden alle Testdateien im Verzeichnis `spec` ausgeführt.

In jeder Testdatei sind alle Tests bis auf den ersten übersprungen.

Sobald ein Test durchläuft, kannst du den nächsten aktivieren, indem du `pending` durch `it` ersetzt.

## Deine Lösung einreichen

Achte darauf, beim Einreichen deiner Lösung die Quelldatei im Verzeichnis `src` einzureichen:

```bash
$ exercism submit src/hello_world.cr
```
