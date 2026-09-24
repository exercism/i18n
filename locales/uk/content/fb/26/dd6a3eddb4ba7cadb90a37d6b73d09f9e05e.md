# Додаток до інструкцій

## Інструкції для Arturo

У цій вправі нам потрібно підтримати два різні способи виклику слова `stringify`:

1. З атрибутом `roman` (наприклад, `stringify.roman 3999`)
2. Без атрибута `roman` (наприклад, `stringify 3999`)

Щоб дізнатися більше, перегляньте документацію [атрибутів][attributes], а також документацію [`attr`][attr].

~~~~exercism/caution
Окрім `attr`, корисна також функція `attrs`: вона повертає всі атрибути виклику функції як словник.

Зауважмо: ці дві функції деструктивні!

Реалізація Arturo використовує [«таблицю атрибутів»][createAttrsStack].

* `attrs` [явно спорожнює таблицю][getAttrsDict] після отримання атрибутів.
* `attr` [видаляє («виштовхує») атрибут із таблиці][builtinAttr].

Приклад:

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
виводить
```
6 * 9
[answer:42]
[]
```

На кожному кроці ми бачимо, як словник атрибутів зменшується.

**Висновок**: памʼятаймо, що атрибути можна отримати лише один раз.
Якщо потрібно звернутися до атрибутів ще раз, збережімо їх на початку наших функцій.

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
