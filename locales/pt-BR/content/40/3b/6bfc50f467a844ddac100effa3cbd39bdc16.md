# Formatação de strings

O `str` embutido do Python pode ser inicializado com dois métodos robustos de formatação de strings: `f-strings` e `str.format()`. A interpolação de strings com `f'{variable}'` é preferida por ser um recurso fácil de ler, completo e muito rápido. Quando é preciso de uma abordagem amigável à internacionalização ou mais flexível, `str.format()` permite criar quase todas as outras variações de `str` de que você precisa.

# Interpolação literal de strings. f-string

A interpolação literal de strings é uma forma rápida e eficiente de formatar e avaliar expressões para `str` usando o prefixo `f` e as chaves `{object}`. Pode ser usada com todos os tipos de delimitadores de string: aspas simples `'`, aspas duplas `"` e, para múltiplas linhas e escape, aspas triplas `'''` ou `"""`.

Neste exemplo básico de **f-string**, a variável `name` é renderizada no início da string, e a variável `age`, do tipo `int`, é convertida para `str` e renderizada depois de `' is '`.

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

As expressões avaliadas por uma `f-string` podem ser quase qualquer coisa, então valem os cuidados habituais com a sanitização de entradas. Alguns dos muitos valores que podem ser avaliados: `str`, números, variáveis, expressões aritméticas, expressões condicionais, tipos embutidos, fatias, funções ou qualquer objeto que tenha os métodos `__str__` ou `__repr__` definidos. Alguns exemplos:

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

A saída de uma f-string aceita os mesmos mecanismos de controle, como _largura_, _alinhamento_ e _precisão_, descritos para `.format()`. A interpolação de strings não pode ser usada junto com a API GNU gettext para internacionalização (I18N) e localização (L10N); em vez disso, é preciso usar `str.format()`.

# Método str.format()

`str.format()` permite substituir marcadores de posição no texto. Os marcadores de posição são identificados por índices nomeados `{price}`, por índices numerados `{0}` ou por marcadores vazios `{}`. Seus valores são especificados como parâmetros no método `str.format()`. Exemplo:

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

O `.format()` do Python oferece suporte a toda uma gama de [especificadores da mini linguagem][format-mini-language] que podem ser usados para alinhar texto, converter, etc.

O especificador de formatação completo é `{[<name>][!<conversion>][:<format_specifier>]}`:

- `<name>` pode ser um marcador nomeado, um número ou vazio.
- `!<conversion>` é opcional e deve ser uma destas três opções: `!s` para [`str()`][str-conversion], `!r` para [`repr()`][repr-conversion] ou `!a` para [`ascii()`][ascii-conversion]. Por padrão, usa-se `str()`.
- `:<format_specifier>` é opcional e tem muitas opções, que estão [listadas aqui][format-specifiers].

Exemplo de conversões para uma letra ascii com diacrítico:

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

Exemplo de especificadores de formato, [com mais exemplos no final desta página][summary-string-format]:

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

`str.format()` deve ser usado junto com a [API GNU gettext][gnu-gettext-api] para internacionalização (I18N) e localização (L10N).

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
