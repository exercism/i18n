# Hinweise

## Allgemein

- Lies in der offiziellen [Dokumentation zum String-Typ][string-type-documentation] nach.
- Sieh dir die [verfügbaren _String-Funktionen_][string-functions] an, um die eingebauten Operationen für Strings zu entdecken.

## 1. Ermittle den ersten Buchstaben des Namens

- Es gibt eine [eingebaute Funktion][string-substr], um das erste Zeichen aus einem String zu holen.
- Es gibt mehrere [eingebaute Funktionen][string-trim], um führende, nachfolgende oder führende und nachfolgende Leerzeichen aus einem String zu entfernen.

## 2. Formatiere den ersten Buchstaben zu einer Initiale

- Es gibt eine [eingebaute Funktion][string-upcase], um alle Zeichen in einem String in Großbuchstaben umzuwandeln.
- Es gibt einen [Operator][concat-operator], der zwei Strings verkettet.

## 3. Teile den vollständigen Namen in Vorname und Nachname auf

- Es gibt eine [eingebaute Funktion][string-explode], die einen String anhand eines anderen Strings aufteilt.
- Die ersten Elemente einer Liste kannst du Variablen zuweisen, indem du Musterabgleich auf die Liste anwendest.

## 4. Setze die Initialen in das Herz

- Es gibt eine spezielle Syntax, um [Variablen in einen String einzufügen][string-variables].
- Es gibt eine spezielle Syntax, um [mehrzeilige Strings][heredoc-syntax] zu schreiben, ohne Zeilenumbrüche escapen zu müssen.

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
