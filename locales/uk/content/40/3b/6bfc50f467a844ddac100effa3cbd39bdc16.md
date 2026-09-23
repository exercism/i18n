# Форматування рядків

Вбудований у Python тип `str` можна ініціалізувати двома надійними методами форматування рядків тексту (англ. string): `f-strings` і `str.format()`. Інтерполяція рядків за допомогою `f'{variable}'` має перевагу: її легко читати, а сам модуль повний і дуже швидкий. Коли ж потрібен підхід, зручніший для інтернаціоналізації, або гнучкіший, `str.format()` дає змогу створити майже всі інші варіанти `str`, які можуть знадобитися.

# Літеральна інтерполяція рядків. f-string

Літеральна інтерполяція рядків - це спосіб швидко й ефективно форматувати вирази в `str` і обчислювати їх за допомогою префікса `f` і фігурних дужок `{object}`. Її можна використовувати з усіма типами лапок, якими огортають рядки: одинарними `'`, подвійними `"`, а для багаторядкових рядків і екранування - потрійними `'''` або `"""`.

У цьому базовому прикладі **f-string** змінна `name` виводиться на початку рядка, а змінна `age` типу `int` перетворюється на `str` і виводиться після `' is '`.

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

Вирази, які обчислює `f-string`, можуть бути майже будь-якими, тому тут діють звичайні застереження щодо очищення вхідних даних. Ось лише деякі з багатьох значень, які можна обчислити: `str`, числа, змінні, арифметичні вирази, умовні вирази, вбудовані типи, зрізи, функції або будь-які обʼєкти з визначеними методами `__str__` чи `__repr__`. Кілька прикладів:

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

Виведення `f-string` підтримує ті самі механізми керування, як-от _ширина_, _вирівнювання_ та _точність_, які описані для `.format()`. Інтерполяцію рядків не можна використовувати разом із GNU gettext API для інтернаціоналізації (I18N) і локалізації (L10N), натомість треба використовувати `str.format()`.

# Метод `str.format()`

`str.format()` дає змогу замінювати заповнювачі в тексті. Заповнювачі позначаються іменованими індексами `{price}`, нумерованими індексами `{0}` або порожніми заповнювачами `{}`. Їхні значення задаються як параметри в методі `str.format()`. Приклад:

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

Python `.format()` підтримує цілий набір [специфікаторів мінімови][format-mini-language], які можна використовувати для вирівнювання тексту, перетворення тощо.

Повний специфікатор форматування має такий вигляд: `{[<name>][!<conversion>][:<format_specifier>]}`:

- `<name>` може бути іменованим заповнювачем, числом або порожнім.
- `!<conversion>` необовʼязковий і має бути одним із трьох: `!s` для [`str()`][str-conversion], `!r` для [`repr()`][repr-conversion] або `!a` для [`ascii()`][ascii-conversion]. Типово використовується `str()`.
- `:<format_specifier>` необовʼязковий і має багато опцій, які [перелічені тут][format-specifiers].

Приклад перетворень для діакритичної літери ascii:

```python
>>> '{0!s}'.format('ë')
'ë'
>>> '{0!r}'.format('ë')
"'ë'"
>>> '{0!a}'.format('ë')
"'\\xeb'"

>>> 'She said her name is not {} but {!r}.'.format('Anna', 'Zoë')
"She said her name is not Anna but 'Zoë'."
```

Приклад специфікаторів формату, [більше прикладів у кінці цієї сторінки][summary-string-format]:

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

`str.format()` варто використовувати разом із [GNU gettext API][gnu-gettext-api] для інтернаціоналізації (I18N) і локалізації (L10N).

[all-about-formatting]: https://realpython.com/python-formatted-output
[difference-formatting]: https://realpython.com/python-string-formatting/#2-new-style-string-formatting-strformat
[printf-style-docs]: https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting
[tuples]: https://www.w3schools.com/python/python_tuples.asp
[format-mini-language]: https://docs.python.org/3/library/string.html#format-specification-mini-language
[str-conversion]: https://www.w3resource.com/python/built-in-function/str.php
[repr-conversion]: https://www.w3resource.com/python/built-in-function/repr.php
[ascii-conversion]: https://www.w3resource.com/python/built-in-function/ascii.php
[format-specifiers]: https://www.python.org/dev/peps/pep-3101/#standard-format-specifiers
[summary-string-format]: https://www.w3schools.com/python/ref_string_format.asp
[template-string]: https://docs.python.org/3/library/string.html#template-strings
[gnu-gettext-api]: https://docs.python.org/3/library/gettext.html
