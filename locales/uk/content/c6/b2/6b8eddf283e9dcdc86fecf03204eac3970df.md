# Підказки

## Загальні

- Kotlin надає багато [функцій][ref-strings] для роботи з рядками тексту (англ. string). Обовʼязково перегляньте вкладку `Members & Extensions`!

## 1. Отримати повідомлення з рядка журналу

- Існує [функція][ref-string-substringAfter], яка витягує частину `String` після заданого роздільника.
- Видалення пробілів із `String` розглядається в [статті «Видалення всіх пробілів із рядка в Kotlin»][tutorial-trim-white-space].

## 2. Отримати рівень журналу з рядка журналу

- Існує також [функція][ref-string-substringBefore], яка витягує частину `String` _перед_ заданим роздільником.
- Існує [спосіб][ref-string-lowercase] змінити регістр `String` на нижній.

## 3. Переформатувати рядок журналу

- [Шаблонні рядки][docs-string-template] можна створити за допомогою [багаторядкового рядка тексту][docs-string-multiline].

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
