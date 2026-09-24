# Підказки

## Загальне

- Стек калькулятора - це просто масив Factor. *Операція* - це quotation `( stack -- new-stack )`.
- `head*` з [`sequences`][sequences] повертає все, крім останніх `n` елементів; `last2` повертає останні два.

## 1. Реалізуйте додавання

- Використайте `bi` з [`kernel`][kernel], щоб розгалузити вхідні дані на два обчислення: «масив без останніх двох елементів» і «сума останніх двох елементів». Потім `suffix` зʼєднує їх.

## 2. Реалізуйте множення

- Така сама форма, як у завданні 1, але з `*` замість `+`.

## 3. Застосуйте одну операцію

- Ефект quotation - це `( stack -- new-stack )`. Оголосіть його на `call`, щоб компілятор міг перевірити типи: `call( stack -- new-stack )`.

## 4. Обчисліть програму

- `each` (у [`sequences`][sequences]) перебирає quotation по послідовності. Кожна ітерація отримує поточний стек, вилучає з програми наступну операцію і застосовує її.

## 5. Обчисліть за назвою

- Знайдіть кожну назву в assoc за допомогою `at` (у [`assocs`][assocs]), щоб отримати її операцію, а потім повторно використайте `evaluate`.
- Fry-quotation `'[ _ at ]` з [`curry-compose-fry`][fry] замикається над assoc, тож `map` може за один прохід замінити кожну назву на її операцію.

## 6. Діліть безпечно

- `throw` (у [`kernel`][kernel]) спричиняє помилку. `zero-divisor-error` уже оголошено, тож `zero-divisor-error throw` - це виклик.
- Захистіть шлях ділення за допомогою `if`, який перевіряє, чи найнижчий дільник дорівнює `0`.

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
