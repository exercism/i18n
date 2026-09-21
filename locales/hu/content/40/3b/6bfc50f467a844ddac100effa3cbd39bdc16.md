# stringformázás

A Python beépített `str` típusa két robusztus stringformázási módszerrel hozható létre: `f-strings` és `str.format()`. A `f'{variable}'` szerinti string-interpolációt előnyben részesítjük, mert könnyen olvasható, teljes és nagyon gyors modul. Ha nemzetköziesítésbarát vagy rugalmasabb megközelítésre van szükség, a `str.format()` segítségével szinte minden más `str`-változatot létrehozhatsz, amire szükséged lehet.

# Literál string-interpoláció. f-string

A literál string-interpoláció gyors és hatékony módja annak, hogy kifejezéseket `str` típusúvá formázzunk és kiértékeljünk az `f` előtag és a kapcsos zárójel `{object}` segítségével. Minden idézőjel-típusú stringgel használható: szimpla idézőjel `'`, dupla idézőjel `"`, valamint többsoros stringekhez és escape-eléshez a hármas idézőjelek `'''` vagy `"""`.

Ebben az egyszerű **f-string** példában a `name` változó a string elején jelenik meg, az `int` típusú `age` változó pedig `str`-ré alakul, és az `' is '` után jelenik meg.

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

Az `f-string` által kiértékelt kifejezések szinte bármik lehetnek, ezért a bemenet tisztítására vonatkozó szokásos óvintézkedések itt is érvényesek. A kiértékelhető értékek sokaságából néhány: `str`, számok, változók, aritmetikai kifejezések, feltételes kifejezések, beépített típusok, szeletek, függvények, vagy bármilyen objektum, amelynek van `__str__` vagy `__repr__` metódusa. Néhány példa:

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

Az f-string kimenete ugyanazokat a vezérlési mechanizmusokat támogatja, mint például a _szélesség_, az _igazítás_ és a _pontosság_, amelyeket a `.format()` kapcsán ismertetünk. A string-interpoláció nem használható együtt a GNU gettext API-val a nemzetköziesítéshez (I18N) és a lokalizációhoz (L10N); helyette a `str.format()`-et kell használni.

# A str.format() metódus

A `str.format()` lehetővé teszi a szövegben lévő helyőrzők lecserélését. A helyőrzőket nevesített indexek `{price}`, számozott indexek `{0}` vagy üres helyőrzők `{}` jelölik. Értékeiket a `str.format()` metódus paramétereiként adod meg. Példa:

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

A Python `.format()` a [mini nyelvi specifikátorok][format-mini-language] széles skáláját támogatja, amelyekkel igazíthatsz szöveget, konvertálhatsz, és így tovább.

Az összetett formázási specifikátor a `{[<name>][!<conversion>][:<format_specifier>]}`:

- A `<name>` lehet nevesített helyőrző, szám vagy üres.
- A `!<conversion>` opcionális, és a következő három egyike kell legyen: `!s` a [`str()`][str-conversion], `!r` a [`repr()`][repr-conversion] vagy `!a` az [`ascii()`][ascii-conversion] esetében. Alapértelmezés szerint a `str()`-et használja.
- A `:<format_specifier>` opcionális, és rengeteg beállítást kínál, amelyeket [itt sorolunk fel][format-specifiers].

Példa a konverziókra egy ékezetes ascii-betű esetében:

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

Példa formázási specifikátorokra, [további példák az oldal végén][summary-string-format]:

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

A `str.format()`-et a [GNU gettext API][gnu-gettext-api] segítségével együtt érdemes használni a nemzetköziesítéshez (I18N) és a lokalizációhoz (L10N).

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
