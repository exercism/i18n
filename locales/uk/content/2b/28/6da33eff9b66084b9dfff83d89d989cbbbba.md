# Підказки

## 1. Замініть усі пробіли на підкреслення

- [Цей туторіал][chars-tutorial] стане в пригоді.
- [Довідкова документація][chars-docs] про `char` ось тут.
- Отримати символи `char` з рядка тексту (англ. string) можна так само, як елементи з масиву.
- Щоб побудувати вихідний рядок тексту, варто використати [`StringBuilder`][string-builder].
- [Цей метод][iswhitespace] допоможе виявляти пробіли. Памʼятаймо, що це статичний метод.
- Літерали `char` беруться в одинарні лапки.

## 2. Замініть керуючі символи на рядок тексту у верхньому регістрі «CTRL»

- [Цей метод][iscontrol] допоможе перевірити, чи є символ керуючим.

## 3. Перетворіть kebab-case на camel case

- [Цей метод][toupper] допоможе перетворити символ на верхній регістр.

## 4. Пропустіть грецькі малі літери

- `char` підтримує типові оператори рівності та порівняння.

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
