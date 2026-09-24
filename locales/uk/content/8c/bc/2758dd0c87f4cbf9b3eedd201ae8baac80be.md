# Підказки

## Загальне

- Прочитайте про рядки тексту (англ. string) в офіційній [документації типу string][string-type-documentation].
- Перегляньте [доступні _функції для рядків_][string-functions], щоб відкрити для себе вбудовані операції над рядками.

## 1. Отримати першу літеру імені

- Є [вбудована функція][string-substr], щоб отримати перший символ із рядка тексту.
- Є кілька [вбудованих функцій][string-trim], щоб прибрати пробіли на початку, в кінці або на початку й у кінці рядка тексту.

## 2. Оформити першу літеру як ініціал

- Є [вбудована функція][string-upcase], щоб перетворити всі символи рядка тексту на їхній варіант у верхньому регістрі.
- Є [оператор][concat-operator], який зʼєднує два рядки тексту.

## 3. Розділити повне імʼя на імʼя та прізвище

- Є [вбудована функція][string-explode], яка розділяє рядок тексту за допомогою іншого рядка тексту.
- Кілька перших елементів масиву можна присвоїти змінним, зіставивши їх за зразком.

## 4. Помістити ініціали всередину серця

- Є спеціальний синтаксис для [розгортання змінних][string-variables] усередині рядка тексту.
- Є спеціальний синтаксис для запису [багаторядкових рядків][heredoc-syntax], коли не треба екранувати символи нового рядка.

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
