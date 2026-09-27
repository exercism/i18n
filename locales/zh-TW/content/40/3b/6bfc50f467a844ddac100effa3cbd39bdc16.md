# 字串格式化

Python 的內建`str`可以用兩種強大的字串格式化方法初始化：`f-strings`和`str.format()`。使用`f'{variable}'`的字串插補較受偏好，因為它易讀、完整，而且是非常快速的模組。當需要對國際化友善或更有彈性的做法時，`str.format()`可以建立幾乎所有你可能需要的其他`str`變化形式。

# 常值字串插補。f-string

常值字串插補是一種使用`f`前綴與大括號`{object}`，快速且有效率地將運算式格式化並求值為`str`的方法。它可以搭配所有字串引號類型使用：單引號`'`、雙引號`"`，以及用於多行與跳脫的三重引號`'''`或`"""`。

在這個**f-string**的基本範例中，變數`name`會呈現在字串開頭，而型別為`int`的變數`age`會轉換成`str`，並呈現在`' is '`之後。

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

`f-string`能求值的運算式幾乎可以是任何東西，因此一般關於清理輸入的注意事項同樣適用。可以被求值的眾多值包括：`str`、數字、變數、算術運算式、條件運算式、內建型別、切片、函式，或任何定義了`__str__`或`__repr__`方法的物件。以下是一些範例：

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

f-string 的輸出支援與`.format()`所述相同的控制機制，例如_寬度_、_對齊_和_精確度_。字串插補無法與用於國際化（I18N）與在地化（L10N）的 GNU gettext API 一起使用，必須改用`str.format()`。

# str.format() 方法

`str.format()`可以替換文字中的佔位符。佔位符以具名索引`{price}`、編號索引`{0}`或空白佔位符`{}`來識別。它們的值會以參數的形式在`str.format()`方法中指定。例如：

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

Python 的`.format()`支援一整系列的[迷你語言格式規範][format-mini-language]，可用來對齊文字、轉換等等。

複雜的格式規範是`{[<name>][!<conversion>][:<format_specifier>]}`：

- `<name>`可以是具名佔位符、數字或空白。
- `!<conversion>`是選用的，且應為以下三者之一：`!s`代表[`str()`][str-conversion]、`!r`代表[`repr()`][repr-conversion]，或`!a`代表[`ascii()`][ascii-conversion]。預設會使用`str()`。
- `:<format_specifier>`是選用的，並有許多選項，我們[在這裡列出][format-specifiers]。

帶變音符號的 ascii 字母的轉換範例：

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

格式規範的範例，[更多範例請見本頁末][summary-string-format]：

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

`str.format()`應與用於國際化（I18N）與在地化（L10N）的 [GNU gettext API][gnu-gettext-api] 一起使用。

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
