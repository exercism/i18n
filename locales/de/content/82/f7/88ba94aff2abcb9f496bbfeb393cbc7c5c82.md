# Aktualisieren

Von Zeit zu Zeit kann es nötig sein, dass du etwas aktualisierst.

## Pharo-Image

Wenn du die Bibliotheken in deinem Pharo-Exercism-Image aktualisieren musst, solltest du am besten sicherstellen, dass du alle laufenden Übungen eingereicht und dein Image gespeichert hast, und dann die Dateien Pharo.image und Pharo.changes sichern. Sobald du ein sicheres Backup hast, führe den folgenden Code in einem Playground aus (markiere ihn und drücke meta-g):

 ```smalltalk

 './pharo-local/iceberg/exercism' asFileReference deleteAll.
 './pharo-local/package-cache' asFileReference deleteAll.

 IceRepository reset.

 Metacello new
  baseline: 'Exercism';
  repository: 'github://exercism/pharo-smalltalk:main/releases/latest';
  onConflict: [ :ex | ex allow ];
  load.

 #ExercismManager asClass upgrade.
 ```

Möglicherweise wirst du gefragt, ob Änderungen am Paket „ExercismTools“ verloren gehen dürfen. Wähle dann „Load“, um sicherzustellen, dass du eine kompatible Version der Tools hast.

Wenn du einmal auf eine bestimmte Version von Exercism aktualisieren (oder downgraden) musst, kannst du das obige Skript auch anpassen und eine bestimmte Versionsnummer angeben, indem du den Repository-Pfad wie folgt änderst:

```smalltalk
 ...
  repository: 'github://exercism/pharo-smalltalk:<version-tag>';
 ...
 ```

Dabei könnte `<versison-tag>` etwa `v0.2.3` oder `master` sein.

Sobald du eine bestimmte Version geladen hast, musst du möglicherweise alle vorhandenen Übungen, an denen du weiterarbeiten möchtest, über den regulären Menüpunkt `Exercism | Fetch...` erneut laden.

In seltenen Fällen (und wenn die Probleme weiter bestehen) brauchst du vielleicht eine neue Kopie der Datei Pharo.image (am einfachsten installierst du Pharo neu in einem neuen Verzeichnis und befolgst dabei die üblichen Installationsanweisungen oben auf dieser Seite).

## Pharo-Übungen

Manchmal kann es auch vorkommen, dass eine Übung aktualisiert wurde, um neue Tests hinzuzufügen oder neue Erkenntnisse abzubilden, nachdem du sie bereits gelöst hast.

In diesen Fällen kannst du deine Kopie der Übung auf die neueste Version aktualisieren. Das bedeutet, dass du deine Lösung möglicherweise anpassen musst, damit die Tests bestehen, und deinen neuen Code anschließend zur weiteren Überprüfung einreichen kannst.

Das machst du über das Menü `Exercism | View Track Progress`. Es öffnet deinen aktuellen Fortschritt im Track in einem Webbrowser. Im Tab `Test suite` findest du unten auf der Seite die Schaltfläche `Update exercise to latest version`, wenn eine neuere Version der Übung erkannt wurde.

Wenn du auf diese Schaltfläche klickst und dann im Feld „Download your solution“ auf die Schaltfläche `Copy` klickst, kannst du diesen Wert in die Eingabeaufforderung des Menüs `Exercism | Fetch new exercise` einfügen.

_HINWEIS: Mit Version 0.2.8 hat sich das Format der Übungspakete in Pharo Exercism geändert: Übungen erscheinen jetzt in einem Paket der obersten Ebene namens Exercise@<Name> (statt in einem Tag-Paket namens Exercism-<Name>). Wenn du dein Image aktualisierst und alte Übungen hast, die noch im alten Paketnamen-Format vorliegen, kannst du sie weiterhin einreichen. Wenn du aber auch den Übungstest aktualisierst, musst du deine Lösungsklassen in das neue Paket Exercise@<Name> verschieben, in dem der neue Test gespeichert ist._
