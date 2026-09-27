# Hinweise

## Allgemein

- Kotlin bietet viele [Funktionen][ref-strings] für die Arbeit mit Strings. Schau dir unbedingt den Tab `Members & Extensions` an!

## 1. Nachricht aus einer Logzeile holen

- Es gibt eine [Funktion][ref-string-substringAfter], um den Teil eines `String` nach einem bestimmten Trennzeichen zu extrahieren.
- Wie du Leerzeichen aus einem `String` entfernst, wird in [Alle Leerzeichen aus einem String in Kotlin entfernen][tutorial-trim-white-space] behandelt.

## 2. Log-Level aus einer Logzeile holen

- Es gibt auch eine [Funktion][ref-string-substringBefore], um den Teil eines `String` _vor_ einem bestimmten Trennzeichen zu extrahieren.
- Es gibt eine [Möglichkeit][ref-string-lowercase], einen `String` in Kleinbuchstaben umzuwandeln.

## 3. Eine Logzeile umformatieren

- [String-Vorlagen][docs-string-template] lassen sich mit einem [mehrzeiligen String][docs-string-multiline] erstellen.

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
