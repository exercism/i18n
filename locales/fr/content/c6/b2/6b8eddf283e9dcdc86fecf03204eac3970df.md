# Indices

## Général

- Kotlin fournit de nombreuses [fonctions][ref-strings] pour travailler avec des _strings_. Pense à jeter un œil à l'onglet `Members & Extensions` !

## 1. Récupère le message à partir d'une ligne de log

- Il existe une [fonction][ref-string-substringAfter] pour extraire la partie d'un `String` qui suit un délimiteur donné.
- Pour supprimer les espaces d'un `String`, tu peux consulter [Supprimer tous les espaces d'une chaîne de caractères en Kotlin][tutorial-trim-white-space].

## 2. Récupère le niveau de log à partir d'une ligne de log

- Il existe aussi une [fonction][ref-string-substringBefore] pour extraire la partie d'un `String` _avant_ un délimiteur donné.
- Il existe un [moyen][ref-string-lowercase] de mettre un `String` en minuscules.

## 3. Reformate une ligne de log

- Les [_template strings_][docs-string-template] peuvent s'écrire à l'aide d'une [chaîne multiligne][docs-string-multiline].

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
