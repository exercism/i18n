# JSON-Dateien formatieren

Ein Track-Repository von Exercism enthält viele JSON-Dateien, darunter:

- Die `config.json`-Datei des Tracks.
- Für jedes Konzept eine `.meta/config.json`- und eine `links.json`-Datei.
- Für jede Konzept-Übung oder Praxis-Übung eine `.meta/config.json`-Datei.

Diese Dateien sind leichter zu lesen, wenn sie in ganz Exercism einheitlich formatiert sind. Deshalb hat configlet einen `fmt`-Befehl, mit dem du die JSON-Dateien eines Tracks in eine kanonische Form bringst.

Der `fmt`-Befehl formatiert die folgenden Dateien:

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## Verwendung

Der `fmt`-Befehl formatiert die „meta/config.json“-Dateien der Übungen.

```
configlet [global-options] fmt [command-options]

Global options:
  -h, --help                   Show this help message and exit
      --version                Show this tool's version information and exit
  -t, --track-dir <dir>        Specify a track directory to use instead of the current directory
  -v, --verbosity <verbosity>  The verbosity of output. Allowed values: q[uiet], n[ormal], d[etailed]

Options for fmt:
  -e, --exercise <slug>        Only operate on this exercise
  -u, --update                 Prompt to write formatted files
  -y, --yes                    Auto-confirm the prompt from --update
```

Ein einfaches `configlet fmt` nimmt keine Änderungen am Track vor, sondern prüft die Formatierung der `.meta/config.json`-Datei jeder Konzept-Übung und Praxis-Übung sowie der `config.json`-Datei des Tracks.

So gibst du eine Liste der Pfade aus, für die es noch keine formatierte `.meta/config.json`-Datei einer Übung gibt (mit einem Exit-Code ungleich null, wenn mindestens einer Übung eine formatierte Konfigurationsdatei fehlt):

```shell
configlet fmt
```

Wenn du aufgefordert werden möchtest, formatierte Konfigurationsdateien zu schreiben, füge die Option `--update` hinzu (kurz `-u`):

```shell
configlet fmt --update
```

Wenn du die formatierten Konfigurationsdateien ohne Rückfrage schreiben möchtest, füge die Option `--yes` hinzu (kurz `-y`):

```shell
configlet fmt --update --yes
```

Um nur eine einzelne Übung zu bearbeiten, verwende die Option `--exercise` (kurz `-e`).
Um zum Beispiel die formatierte Konfigurationsdatei der Übung `prime-factors` ohne Rückfrage zu schreiben:

```shell
configlet fmt -uy -e prime-factors
```

Beim Schreiben von JSON-Dateien geht `configlet fmt` so vor:

- Es schreibt die Schlüssel-Wert-Paare in der kanonischen Reihenfolge.

- Es verwendet zwei Leerzeichen zur Einrückung.

- Es verwendet eine eigene Zeile für jeden Eintrag in einem JSON-Array und jeden Schlüssel in einem JSON-Objekt.

- Es entfernt Schlüssel-Wert-Paare für optionale Schlüssel mit leeren Werten.
  Zum Beispiel wird `"source": ""` entfernt.

- Es entfernt `"test_runner": true` aus den Konfigurationsdateien von Praxis-Übungen.
  Das ist ein optionaler Schlüssel: Die Spezifikation besagt, dass ein weggelassener Schlüssel `test_runner` den Wert `true` impliziert.

- Wenn ein JSON-Objekt mehr als ein Schlüssel-Wert-Paar mit demselben Schlüsselnamen hat, behält es nur das letzte.

Die kanonische Schlüsselreihenfolge für eine `.meta/config.json`-Datei einer Übung ist:

```text
- authors
- [contributors]
- files
  - solution
  - test
  - exemplar           (Concept Exercises only)
  - example            (Practice Exercises only)
  - [editor]
  - [invalidator]
- [language_versions]
- [forked_from]        (Concept Exercises only)
- [icon]               (Concept Exercises only)
- [test_runner]        (Practice Exercises only)
- blurb
- [source]
- [source_url]
- [custom]
```

Dabei zeigen die eckigen Klammern an, dass der eingeschlossene Schlüssel optional ist.

Beachte, dass `configlet fmt` nur auf Übungen wirkt, die in der `config.json`-Datei auf Track-Ebene vorhanden sind.
Wenn du also eine neue Übung für einen Track implementierst und ihre `.meta/config.json`-Datei formatieren möchtest, füge die Übung zuerst der `config.json`-Datei auf Track-Ebene hinzu.
Wenn die Übung noch nicht für Nutzer bestimmt ist, setze ihren `status`-Wert auf `wip`.

Der Exit-Code ist 0, wenn beim Beenden von configlet jede gefundene Konfigurationsdatei formatiert ist, und andernfalls 1.
