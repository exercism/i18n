# Testen im Pyret-Track

## Voraussetzungen installieren

Nachdem du eine Übung erfolgreich heruntergeladen hast, musst du die Node.js-Module installieren, um die Tests auszuführen:

```sh
cd /path/to/exercise
npm install
```

Füge dann das Verzeichnis mit dem `pyret`-Kommandozeilen-Tool zu deinem $PATH hinzu

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## Erste Schritte

Im Übungsverzeichnis gibt es mehrere Dateien, aber die zwei wichtigsten sind deine Lösungs- und deine Testdatei.
Im folgenden Beispiel haben wir die Übung Schaltjahr heruntergeladen.

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

Um die Tests auszuführen, verwendest du entweder `exercism test`, wenn du die offizielle Exercism CLI heruntergeladen hast, oder du führst `pyret leap-test.arr` aus.
Pyret führt die Testsuite aus, die aus einer Reihe von beschrifteten `check`-Blöcken besteht, die deine Lösungsdatei mit bestimmten Eingaben und erwarteten Ergebnissen testen.
Ein entscheidender Teil dieses Vorgangs ist, Teile deines Codes explizit zu exportieren, damit die Testsuite sie sehen kann.

## provide

Die Tests in diesem Track importieren deine Datei und erhalten so Zugriff auf alles, was explizit aus deinem Code exportiert wird.

Um Variablen zu exportieren, musst du am Anfang deiner Datei eine [provide-Anweisung][provide-statement] einfügen.

Die folgenden Codeausschnitte sind zwei gültige Möglichkeiten, `a`, `b` und `c` zu exportieren.

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

Eine dritte Methode, `provide *`, ist eine Kurzform, um alle Bindungen der obersten Ebene außer benutzerdefinierten Datentypen zu exportieren.
Sie wird jedoch im Allgemeinen nicht empfohlen, weil Pyret beim Verbot von [Shadowing][shadowing] streng ist.

## provide-types

Bei manchen Übungen muss ein [benutzerdefinierter Datentyp][data-definition] für Testzwecke exportiert werden.
In diesen Fällen kannst du eine [provide-types-Anweisung][provide-types-statement] verwenden.
Da ein Datentyp zusätzliche Funktionen hat, die möglicherweise nicht exportiert werden, ist es ratsam, `provide-types *` zu verwenden, trotz der Bedenken wegen Shadowing.

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

Alle Übungs-Stubs enthalten entweder `provide`- oder `provide-types`-Anweisungen, die für dich vorbereitet sind.

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
