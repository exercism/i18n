# Workflow: Keine wichtigen Dateien geändert

Wenn ein Track-PR gemergt wird, der eine Übung betrifft, werden _alle_ zuletzt veröffentlichten Iterationen der Lösungen von Lernenden erneut getestet.
Bei beliebten Übungen ist das eine _sehr_ teure Operation (70.000 Testläufe für Python Hello World im Extremfall!).

Dieser Workflow prüft, ob die Änderungen in einem PR das erneute Testen von Lösungen auslösen würden. Wenn ja, fügt er einen Kommentar hinzu, der das Risiko erklärt, den PR _so wie er ist_ zu mergen.
Außerdem erklärt er, wie du den PR mergen kannst, ohne Lösungen erneut zu testen.

Weitere Informationen findest du in der Dokumentation [Unnötige Testläufe vermeiden](https://exercism.org/docs/building/tracks#h-avoiding-triggering-unnecessary-test-runs).

## Quelle

Der Workflow ist in der Datei `.github/workflows/no-important-files-changed.yml` definiert.
