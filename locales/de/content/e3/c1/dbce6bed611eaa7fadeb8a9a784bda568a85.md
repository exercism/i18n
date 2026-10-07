# Ergänzung zur Anleitung

Zähle die Buchstaben, ignoriere dabei Groß- und Kleinschreibung sowie alle Zeichen, die keine Buchstaben sind, und gib ein Wörterbuch zurück, das jedem Kleinbuchstaben seine Anzahl zuordnet.

Verwende `pf.Parallel.map!(items, { workers, task })` aus der [roc-parallel-Plattform](https://github.com/ageron/roc-parallel), um die gegebenen `items` mit einer reinen `task`-Funktion zu verarbeiten, und zwar parallel über mehrere Threads (angegeben durch `workers`). Sobald alle Elemente verarbeitet sind, werden die Ergebnisse in der Reihenfolge der Eingabe zurückgegeben. Du musst nur `ParallelLetterFrequency.roc` bearbeiten.

Tipp: Wir empfehlen dir, für die Umwandlung der Groß- und Kleinschreibung und die Erkennung von Buchstaben die [Unicode-Bibliothek](https://github.com/roc-lang/unicode) zu verwenden. Schau dir insbesondere `unicode.Case.to_lower`, `unicode.GeneralCategory.of_scalar`, `unicode.Scalar.iter` und `unicode.Scalar.to_str` an. Behandle Buchstaben als Unicode-Skalarwerte; eine Unicode-Normalisierung ist nicht nötig.

Hinweis: Anders als die meisten anderen Übungen verwendet diese Übung Funktionen mit Seiteneffekten. Zurzeit kann die `expect`-Anweisung von Roc keine Funktionen mit Seiteneffekten aufrufen, deshalb verwenden die Tests in dieser Übung `expect` und `roc test` gar nicht. Stattdessen führst du die Tests mit `roc --opt=speed` aus, und jeden Fehler, den der Roc-Code zurückgibt, meldet die Plattform in einem anderen Format als sonst.

Vielleicht möchtest du dir auch die Übung `bank-account` ansehen, die eine andere Seite der Nebenläufigkeit beleuchtet: Updates sicher auf einen gemeinsam genutzten Zustand anzuwenden.
