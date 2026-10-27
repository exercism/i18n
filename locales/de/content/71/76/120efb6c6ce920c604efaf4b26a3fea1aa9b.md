# Hinweise

## Allgemein

- Implementiere reine Funktionen, die JSON-Strings zurückgeben; du musst keinen Webserver betreiben.

- Roc stellt `Json.parse` und `Json.to_str` als eingebaute Funktionen bereit.
  Eine Typannotation am Rückgabewert einer Hilfsfunktion zum Parsen teilt `Json.parse` mit, welche Record-Struktur dekodiert werden soll.

- Das Feld `payload ?: Str` ist optional: Im Record-Muster des Stubs ist `payload` entweder an `Ok(text)` oder an `Err(MissingField)` gebunden.
