# Formatage de _string_

Le type `str` natif de Python peut être initialisé à l'aide de deux méthodes robustes de formatage de _string_ : `f-strings` et `str.format()`. L'interpolation de _string_ avec `f'{variable}'` est préférée, car elle est facile à lire, complète et très rapide. Lorsqu'une approche adaptée à l'internationalisation, ou plus souple, est nécessaire, `str.format()` permet de créer presque toutes les autres variantes de `str` dont tu pourrais avoir besoin.

# Interpolation littérale de _string_. f-string

L'interpolation littérale de _string_ permet de formater et d'évaluer rapidement et efficacement des expressions en `str`, à l'aide du préfixe `f` et des accolades `{object}`. Elle peut être utilisée avec tous les types de guillemets : le guillemet simple `'`, le guillemet double `"`, ainsi que les triples guillemets `'''` ou `"""` pour le multi-ligne et l'échappement.

Dans cet exemple simple de **f-string**, la variable `name` est insérée au début de la chaîne, et la variable `age`, de type `int`, est convertie en `str` puis insérée après `' is '`.

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

Les expressions évaluées par une `f-string` peuvent être à peu près n'importe quoi, et les précautions habituelles concernant la validation des entrées s'appliquent donc. Parmi les nombreuses valeurs qui peuvent être évaluées, on trouve : `str`, des nombres, des variables, des expressions arithmétiques, des expressions conditionnelles, des types natifs, des _slices_, des fonctions, ou tout objet disposant de méthodes `__str__` ou `__repr__`. Voici quelques exemples :

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

La sortie d'une `f-string` prend en charge les mêmes mécanismes de contrôle, comme la _largeur_, l'_alignement_ et la _précision_, que ceux décrits pour `.format()`. L'interpolation de _string_ ne peut pas être utilisée avec l'API GNU gettext pour l'internationalisation (I18N) et la localisation (L10N) ; il faut alors utiliser `str.format()`.

# Méthode str.format()

`str.format()` permet de remplacer des espaces réservés dans le texte. Ces espaces réservés sont identifiés par des indices nommés `{price}`, des indices numérotés `{0}` ou des espaces réservés vides `{}`. Leurs valeurs sont spécifiées comme paramètres de la méthode `str.format()`. Exemple :

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

La méthode `.format()` de Python prend en charge toute une série de [spécificateurs de mini-langage][format-mini-language] qui permettent d'aligner du texte, de convertir, etc.

Le spécificateur de formatage complet est `{[<name>][!<conversion>][:<format_specifier>]}` :

- `<name>` peut être un espace réservé nommé, un nombre ou rien du tout.
- `!<conversion>` est facultatif et doit être l'un des trois : `!s` pour [`str()`][str-conversion], `!r` pour [`repr()`][repr-conversion] ou `!a` pour [`ascii()`][ascii-conversion]. Par défaut, c'est `str()` qui est utilisé.
- `:<format_specifier>` est facultatif et offre de nombreuses options, qui sont [listées ici][format-specifiers].

Exemple de conversions pour une lettre ascii diacritique :

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

Exemple de spécificateurs de formatage, [d'autres exemples à la fin de cette page][summary-string-format] :

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

`str.format()` doit être utilisé avec l'[API GNU gettext][gnu-gettext-api] pour l'internationalisation (I18N) et la localisation (L10N).

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
