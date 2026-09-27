# Suggerimenti

## Generale

- Kotlin mette a disposizione molte [funzioni][ref-strings] per lavorare con le stringhe. Dai un'occhiata alla scheda `Members & Extensions`!

## 1. Ottenere il messaggio da una riga di log

- Esiste una [funzione][ref-string-substringAfter] per estrarre la parte di una `String` che segue un delimitatore.
- La rimozione degli spazi da una `String` è trattata in [Remove All Whitespaces from a String in Kotlin][tutorial-trim-white-space].

## 2. Ottenere il livello di log da una riga di log

- Esiste anche una [funzione][ref-string-substringBefore] per estrarre la parte di una `String` _prima_ di un delimitatore.
- Esiste un [modo][ref-string-lowercase] per convertire una `String` in minuscolo.

## 3. Riformattare una riga di log

- Le [stringhe interpolate][docs-string-template] si possono creare con una [stringa multilinea][docs-string-multiline].

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
