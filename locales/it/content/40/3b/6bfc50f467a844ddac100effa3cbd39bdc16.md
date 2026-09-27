# Formattazione delle stringhe

Il tipo integrato `str` di Python può essere inizializzato usando due metodi robusti di formattazione delle stringhe: `f-strings` e `str.format()`. L'interpolazione di stringhe con `f'{variable}'` è preferita perché è un modulo facile da leggere, completo e molto veloce. Quando serve un approccio più flessibile o adatto all'internazionalizzazione, `str.format()` permette di creare quasi tutte le altre varianti di `str` di cui potresti aver bisogno.

# Interpolazione letterale delle stringhe. f-string

L'interpolazione letterale delle stringhe è un modo rapido ed efficiente di formattare e valutare espressioni in `str` usando il prefisso `f` e le parentesi graffe `{object}`. Si può usare con tutti i tipi di stringa di delimitazione: virgolette singole `'`, virgolette doppie `"` e, per le stringhe su più righe e le sequenze di escape, virgolette triple `'''` o `"""`.

In questo esempio di base di **f-string**, la variabile `name` viene visualizzata all'inizio della stringa, e la variabile `age` di tipo `int` viene convertita in `str` e visualizzata dopo `' is '`.

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

Le espressioni valutate da una `f-string` possono essere quasi qualsiasi cosa, quindi valgono le solite cautele sulla sanificazione degli input. Alcuni dei molti valori che si possono valutare: `str`, numeri, variabili, espressioni aritmetiche, espressioni condizionali, tipi integrati, slice, funzioni o qualsiasi oggetto che abbia definito il metodo `__str__` o `__repr__`. Alcuni esempi:

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

L'output di una f-string supporta gli stessi meccanismi di controllo, come _larghezza_, _allineamento_ e _precisione_, descritti per `.format()`. L'interpolazione di stringhe non può essere usata insieme all'API GNU gettext per l'internazionalizzazione (I18N) e la localizzazione (L10N): al suo posto va usato `str.format()`.

# Il metodo str.format()

`str.format()` permette di sostituire i segnaposto all'interno del testo. I segnaposto si identificano con indici con nome `{price}`, con indici numerati `{0}` o con segnaposto vuoti `{}`. I loro valori vengono specificati come parametri del metodo `str.format()`. Esempio:

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

Python `.format()` supporta tutta una serie di [specificatori del mini linguaggio][format-mini-language] che si possono usare per allineare il testo, convertire, ecc.

Lo specificatore di formattazione completo è `{[<name>][!<conversion>][:<format_specifier>]}`:

- `<name>` può essere un segnaposto con nome, un numero o vuoto.
- `!<conversion>` è facoltativo e deve essere uno dei tre: `!s` per [`str()`][str-conversion], `!r` per [`repr()`][repr-conversion] o `!a` per [`ascii()`][ascii-conversion]. Per impostazione predefinita si usa `str()`.
- `:<format_specifier>` è facoltativo e ha molte opzioni, che sono [elencate qui][format-specifiers].

Esempio di conversioni per una lettera ascii diacritica:

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

Esempio di specificatori di formato, [altri esempi in fondo a questa pagina][summary-string-format]:

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

`str.format()` va usato insieme all'[API GNU gettext][gnu-gettext-api] per l'internazionalizzazione (I18N) e la localizzazione (L10N).

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
