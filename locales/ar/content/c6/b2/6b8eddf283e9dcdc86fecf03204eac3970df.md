# تلميحات

## عام

- توفّر Kotlin العديد من [الدوال][ref-strings] للتعامل مع السلاسل النصية. تأكّد من الاطّلاع على تبويب `Members & Extensions`!

## 1. احصل على الرسالة من سطر السجل

- توجد [دالة][ref-string-substringAfter] لاستخراج الجزء الذي يأتي بعد فاصل معيّن في `String`.
- إزالة المسافات البيضاء من `String` مشروحة في [إزالة كل المسافات البيضاء من سلسلة نصية في Kotlin][tutorial-trim-white-space].

## 2. احصل على مستوى السجل من سطر السجل

- توجد أيضًا [دالة][ref-string-substringBefore] لاستخراج جزء من `String` _قبل_ فاصل معيّن.
- يوجد [أسلوب][ref-string-lowercase] لتحويل `String` إلى أحرف صغيرة.

## 3. أعد تنسيق سطر السجل

- يمكن استخدام [قوالب السلاسل النصية][docs-string-template] مع [سلسلة نصية متعددة الأسطر][docs-string-multiline].

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
