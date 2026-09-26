# Dicas

## Geral

- O Kotlin oferece muitas [funções][ref-strings] para trabalhar com Strings. Não deixe de conferir a aba `Members & Extensions`!

## 1. Obter a mensagem de uma linha de log

- Existe uma [função][ref-string-substringAfter] para extrair a parte de uma `String` depois de um delimitador.
- Remover espaços em branco de uma `String` é explorado em [Remover todos os espaços em branco de uma String no Kotlin][tutorial-trim-white-space].

## 2. Obter o nível de log de uma linha de log

- Existe também uma [função][ref-string-substringBefore] para extrair parte de uma `String` _antes_ de um delimitador.
- Existe uma [forma][ref-string-lowercase] de transformar uma `String` em minúsculas.

## 3. Reformatar uma linha de log

- Os [templates de string][docs-string-template] podem ser feitos com uma [string multilinha][docs-string-multiline].

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
