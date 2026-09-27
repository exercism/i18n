# Hinweise

## 1. Ermittle, welche Anwendung einen Log ausgegeben hat

- Mit dem `range`-Schlüsselwort kannst du über die Runes eines gegebenen Strings iterieren.
- Mit einer `if`-Bedingung kannst du Runes mit anderen Runes vergleichen.
- Ein Zeichen zwischen einfachen Anführungszeichen ist in Go ein `rune`.

## 2. Beschädigte Logs reparieren

- Mit String-Verkettung kannst du die geänderte Logzeile Rune für Rune aufbauen.
- Damit die Verkettung funktioniert, muss jede `rune` gegebenenfalls zuerst in einen String umgewandelt werden.
- Du kannst eine Rune `r` mit `string(r)` in einen `string` umwandeln.

## 3. Ermittle, ob ein Log angezeigt werden kann

- Runes können 1, 2, 3 oder 4 Bytes groß sein, daher gibt die eingebaute Funktion `len` möglicherweise nicht die tatsächliche Anzahl der Zeichen in einem String wieder.
