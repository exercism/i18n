# 字符串格式化

Python 内置的`str`可以通过 2 种强大的字符串格式化方法来初始化：`f-strings`和`str.format()`。用`f'{variable}'`做字符串插值是首选，因为它是一个易读、完整、速度极快的模块。当需要更适合国际化或更灵活的方式时，`str.format()`几乎可以创建你可能需要的其他所有`str`变体。

# 字面量字符串插值：f-string

字面量字符串插值是一种使用`f`前缀和花括号`{object}`，快速高效地把表达式格式化并求值为`str`的方式。它可以用于所有包围字符串的类型：单引号`'`、双引号`"`，以及多行和转义用的三引号`'''`或`"""`。

在下面这个 **f-string** 的基本示例中，变量`name`渲染在字符串的开头，类型为`int`的变量`age`被转换为`str`，并渲染在`' is '`后面。

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

`f-string`求值的表达式几乎可以是任何东西，因此，通常关于清理输入的注意事项同样适用。可以被求值的众多值包括：`str`、数字、变量、算术表达式、条件表达式、内置类型、切片、函数，或任何定义了`__str__`或`__repr__`方法的对象。一些示例：

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

f-string 的输出支持与`.format()`相同的控制机制，例如_宽度_、_对齐_和_精度_。字符串插值不能与用于国际化（I18N）和本地化（L10N）的 GNU gettext API 一起使用，这时需要改用`str.format()`。

# str.format() 方法

`str.format()`允许替换文本中的占位符。占位符用命名索引`{price}`、编号索引`{0}`或空占位符`{}`来表示。它们的值在`str.format()`方法中作为参数指定。示例：

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

Python 的`.format()`支持一整套[格式迷你语言说明符][format-mini-language]，可用来对齐文本、进行转换等。

复杂的格式说明符是`{[<name>][!<conversion>][:<format_specifier>]}`：

- `<name>`可以是命名占位符、数字或空。
- `!<conversion>`是可选的，应为以下 3 个值之一：`!s`表示[`str()`][str-conversion]，`!r`表示[`repr()`][repr-conversion]，`!a`表示[`ascii()`][ascii-conversion]。默认使用`str()`。
- `:<format_specifier>`是可选的，有很多选项，[这里列出了这些选项][format-specifiers]。

下面是一个带变音符号的 ascii 字母的转换示例：

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

格式说明符示例，[本页末尾还有更多示例][summary-string-format]：

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

`str.format()`应与[GNU gettext API][gnu-gettext-api]一起使用，以实现国际化（I18N）和本地化（L10N）。

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
