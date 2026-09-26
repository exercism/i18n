# Formato de strings

El `str` incorporado de Python se puede inicializar usando dos métodos robustos de formato de strings: `f-strings` y `str.format()`. Se prefiere la interpolación de string con `f'{variable}'` porque es un módulo fácil de leer, completo y muy rápido. Cuando se necesita un enfoque amigable para la internacionalización o más flexible, `str.format()` permite crear casi todas las demás variaciones de `str` que puedas necesitar.

# Interpolación de string literal. f-string

La interpolación de string literal es una forma rápida y eficiente de formatear y evaluar expresiones a `str` usando el prefijo `f` y las llaves `{object}`. Se puede usar con todos los tipos de comillas que encierran un string: comilla simple `'`, comilla doble `"` y, para varias líneas y el escape, comillas triples `'''` o `"""`.

En este ejemplo básico de **f-string**, la variable `name` se renderiza al inicio del string, y la variable `age` de tipo `int` se convierte a `str` y se renderiza después de `' is '`.

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

Las expresiones que evalúa un `f-string` pueden ser casi cualquier cosa, así que se aplican las precauciones habituales sobre sanear la entrada. Algunos de los muchos valores que se pueden evaluar: `str`, números, variables, expresiones aritméticas, expresiones condicionales, tipos incorporados, slices, funciones o cualquier objeto que tenga definido un método `__str__` o `__repr__`. Algunos ejemplos:

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

La salida de un f-string admite los mismos mecanismos de control, como _ancho_, _alineación_ y _precisión_, que se describen para `.format()`. La interpolación de strings no se puede usar junto con la API de GNU gettext para la internacionalización (I18N) y la localización (L10N); en su lugar, se debe usar `str.format()`.

# El método str.format()

`str.format()` permite reemplazar los marcadores de posición dentro del texto. Los marcadores de posición se identifican con índices con nombre `{price}`, índices numerados `{0}` o marcadores vacíos `{}`. Sus valores se especifican como parámetros en el método `str.format()`. Ejemplo:

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

Python `.format()` admite toda una gama de [especificadores de minilenguaje][format-mini-language] que se pueden usar para alinear texto, convertir, etc.

El especificador de formato complejo es `{[<name>][!<conversion>][:<format_specifier>]}`:

- `<name>` puede ser un marcador de posición con nombre, un número o estar vacío.
- `!<conversion>` es opcional y debe ser uno de los tres: `!s` para [`str()`][str-conversion], `!r` para [`repr()`][repr-conversion] o `!a` para [`ascii()`][ascii-conversion]. De forma predeterminada, se usa `str()`.
- `:<format_specifier>` es opcional y tiene muchas opciones, que [se enumeran aquí][format-specifiers].

Ejemplo de conversiones para una letra ascii con diacrítico:

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

Ejemplo de especificadores de formato; [más ejemplos al final de esta página][summary-string-format]:

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

`str.format()` se debe usar junto con la [API de GNU gettext][gnu-gettext-api] para la internacionalización (I18N) y la localización (L10N).

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
