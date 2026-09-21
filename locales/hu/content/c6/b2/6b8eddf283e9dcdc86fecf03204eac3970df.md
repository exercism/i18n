# Tippek

## Általános

- A Kotlin számos [függvényt][ref-strings] kínál a stringekkel való munkához. Mindenképp nézd meg a `Members & Extensions` fület is!

## 1. Üzenet kinyerése egy naplósorból

- Van egy [függvény][ref-string-substringAfter], amellyel egy `String` adott elválasztó utáni részét nyerheted ki.
- A `String`-ből való whitespace-eltávolítást a [Remove All Whitespaces from a String in Kotlin][tutorial-trim-white-space] című cikk mutatja be.

## 2. Naplószint kinyerése egy naplósorból

- Szintén van egy [függvény][ref-string-substringBefore], amellyel egy `String` adott elválasztó _előtti_ részét nyerheted ki.
- Van egy [mód][ref-string-lowercase] arra, hogy egy `String`-et kisbetűssé alakíts.

## 3. Egy naplósor újraformázása

- A [string-sablonok][docs-string-template] [többsoros stringekkel][docs-string-multiline] is megvalósíthatók.

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
