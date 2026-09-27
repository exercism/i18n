# String-Formatierung

Der in Python eingebaute Typ `str` kann mit zwei robusten String-Formatierungsmethoden initialisiert werden: `f-strings` und `str.format()`. Die String-Interpolation mit `f'{variable}'` ist vorzuziehen, weil sie ein leicht lesbares, vollständiges und sehr schnelles Modul ist. Wenn ein internationalisierungsfreundlicher oder flexiblerer Ansatz gebraucht wird, kannst du mit `str.format()` fast alle anderen `str`-Varianten erstellen, die du vielleicht brauchst.

# Literale String-Interpolation. f-string

Die literale String-Interpolation ist ein Weg, Ausdrücke schnell und effizient zu `str` zu formatieren und auszuwerten, indem du das Präfix `f` und die geschweiften Klammern `{object}` verwendest. Sie kann mit allen umschließenden String-Typen verwendet werden: einfaches Anführungszeichen `'`, doppeltes Anführungszeichen `"` sowie für mehrzeilige Strings und zum Escapen dreifache Anführungszeichen `'''` oder `"""`.

In diesem einfachen Beispiel eines **f-string** wird die Variable `name` am Anfang des Strings ausgegeben, und die Variable `age` vom Typ `int` wird zu `str` konvertiert und hinter `' is '` ausgegeben.

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

Die Ausdrücke, die ein `f-string` auswertet, können fast alles sein. Deshalb gelten die üblichen Vorsichtsmaßnahmen beim Bereinigen von Eingaben. Einige der vielen Werte, die ausgewertet werden können: `str`, Zahlen, Variablen, arithmetische Ausdrücke, bedingte Ausdrücke, eingebaute Typen, Slices, Funktionen oder beliebige Objekte, für die entweder eine `__str__`- oder eine `__repr__`-Methode definiert ist. Ein paar Beispiele:

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

Die Ausgabe eines f-string unterstützt dieselben Steuermechanismen wie _Breite_, _Ausrichtung_ und _Genauigkeit_, die für `.format()` beschrieben sind. Die String-Interpolation kann nicht zusammen mit der GNU-gettext-API für Internationalisierung (I18N) und Lokalisierung (L10N) verwendet werden; stattdessen muss `str.format()` verwendet werden.

# Die Methode str.format()

Mit `str.format()` kannst du Platzhalter im Text ersetzen. Platzhalter werden durch benannte Indizes `{price}`, nummerierte Indizes `{0}` oder leere Platzhalter `{}` gekennzeichnet. Ihre Werte werden als Parameter in der Methode `str.format()` angegeben. Beispiel:

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

Python `.format()` unterstützt eine ganze Reihe von [Spezifizierern der Mini-Sprache][format-mini-language], mit denen du Text ausrichten, konvertieren usw. kannst.

Der komplexe Formatierungs-Spezifizierer ist `{[<name>][!<conversion>][:<format_specifier>]}`:

- `<name>` kann ein benannter Platzhalter, eine Zahl oder leer sein.
- `!<conversion>` ist optional und sollte einer der drei folgenden Werte sein: `!s` für [`str()`][str-conversion], `!r` für [`repr()`][repr-conversion] oder `!a` für [`ascii()`][ascii-conversion]. Standardmäßig wird `str()` verwendet.
- `:<format_specifier>` ist optional und hat viele Optionen, die [hier aufgeführt sind][format-specifiers].

Beispiel für Konvertierungen bei einem diakritischen ASCII-Buchstaben:

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

Beispiel für Format-Spezifizierer, [weitere Beispiele am Ende dieser Seite][summary-string-format]:

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

`str.format()` sollte zusammen mit der [GNU-gettext-API][gnu-gettext-api] für Internationalisierung (I18N) und Lokalisierung (L10N) verwendet werden.

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
