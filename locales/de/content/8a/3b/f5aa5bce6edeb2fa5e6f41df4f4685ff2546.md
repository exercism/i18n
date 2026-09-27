# Was liegt beim Rust-Track von Exercism außerhalb des Umfangs?

Diese Datei soll erklären, was der Rust-Track von Exercism innerhalb der Grenzen der Sprache Rust, ihrer Community und ihres Ökosystems vermitteln kann und was nicht.

Wenn ein Thema bei einer bestimmten Übung in _design.md_ unter „Out of scope“ behandelt wird, sollte es hier nicht wiederholt werden, es sei denn, man ist der Ansicht, dass das Thema sonst nicht genug Beachtung findet.

## Die Grenzen der Web-UI

Wer die Web-UI nutzt, ist auf das beschränkt, was die Weboberfläche und der Test-Runner zulassen. Die Möglichkeiten der Web-UI bilden damit faktisch die äußere Grenze für den Rust-Track.

Lernende können:

- eine einzelne `.rs`-Datei bearbeiten
- Ausgaben von `stdout` empfangen (z. B. von `dbg!`)

Das bedeutet insbesondere, dass sie Cargo.toml nicht bearbeiten können. Übungen, die von einer externen Crate abhängen, müssen daher alle Abhängigkeiten bereits in Cargo.toml enthalten.

## Worum es bei Exercism nicht geht

Bei Exercism geht es darum, eine Programmiersprache fließend zu beherrschen, nicht darum, abstraktere Fähigkeiten wie Software-Design oder Informatik zu vermitteln. Themen, die für die Programmiersprache Rust nicht besonders relevant sind, gehören daher nicht zum Umfang des Rust-Tracks.

## Beispiele für ausgeschlossene Themen

Zu den ausgeschlossenen Themen gehören zum Beispiel:

### Cargo

- Cargo.toml bearbeiten
- Kommandozeilenbefehle, z. B. `new`, `update`, `bench`

### Frameworks

- Amethyst
- Yew, Iced, Sauron usw.

### Interoperabilität

- CFFI
- `asm!`

### Allgemein:

- Dateiverarbeitung
- Netzwerkprogrammierung
