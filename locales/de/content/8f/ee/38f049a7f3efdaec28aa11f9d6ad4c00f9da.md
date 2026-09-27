# Einführung

Eine Datei ist ein Stream mit einem Namen auf der Festplatte. Das Vokabular [`io.files`][io.files] liest und schreibt Dateien entweder komplett, in einem einzigen Aufruf, oder schrittweise über einen Stream mit Gültigkeitsbereich. Jedes Datei-Wort erwartet eine **Kodierung**; für Text ist das fast immer [`utf8`][utf8] aus `io.encodings.utf8`.

## Lesen

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents` gibt die ganze Datei als einen String zurück. `file-lines` gibt die Zeilen der Datei als Array zurück, wobei die Zeilenumbrüche entfernt werden.

## Schreiben

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

Beide ersetzen die Datei (und legen sie an, falls nötig). `set-file-lines` schreibt ein Element pro Zeile und fügt die Zeilenumbrüche für dich hinzu.

## Anhängen und inkrementelles I/O

Die Kombinatoren `with-…` öffnen eine Datei als den umgebenden Stream für eine Quotation und schließen sie danach wieder. Das ist ein Gültigkeitsbereich mit Destruktor, wie die Stream-Kombinatoren in `channel-chatter`.

```
with-file-reader     ( path encoding quot -- )
with-file-writer     ( path encoding quot -- )
with-file-appender   ( path encoding quot -- )
```

```factor
USING: io io.encodings.utf8 io.files ;

"log.txt" utf8 [ "another line" print ] with-file-appender
```

[io.files]: https://docs.factorcode.org/content/vocab-io.files.html
[utf8]: https://docs.factorcode.org/content/vocab-io.encodings.utf8.html
