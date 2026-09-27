# Einführung

## File

Funktionen für die Arbeit mit Dateien stellt das Modul `File` bereit.

Um eine ganze Datei zu lesen, verwende `File.read/1`. Um in eine Datei zu schreiben, verwende `File.write/2`.

Jedes Mal, wenn mit `File.write/2` in eine Datei geschrieben wird, wird ein Dateideskriptor geöffnet und ein neuer Elixir-[Prozess][exercism-processes] gestartet. Aus diesem Grund solltest du es vermeiden, in einer Schleife mit `File.write/2` in eine Datei zu schreiben.

Stattdessen kannst du eine Datei mit `File.open/2` öffnen. Das zweite Argument von `File.open/2` ist eine Liste von Modi, mit der du angeben kannst, ob du die Datei zum Lesen oder zum Schreiben öffnen möchtest.

`File.open/2` gibt die PID eines Prozesses zurück, der die Datei verwaltet. Um in die Datei zu lesen und zu schreiben, verwendest du Funktionen aus dem Modul `IO` und übergibst diese PID als IO-Gerät.

Wenn du mit der Datei fertig bist, schließe sie mit `File.close/1`.

Alle genannten Funktionen aus dem Modul `File` haben auch eine `!`-Variante, die einen Fehler auslöst, anstatt ein Fehler-Tupel zurückzugeben (z. B. `File.read!/1`). Verwende diese Variante, wenn du nicht vorhast, Fehler wie fehlende Dateien oder fehlende Berechtigungen zu behandeln.

[exercism-processes]: https://exercism.org/tracks/elixir/concepts/processes
