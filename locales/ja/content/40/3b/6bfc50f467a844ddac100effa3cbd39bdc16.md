# 文字列フォーマット

Pythonの組み込み`str`は、2つの強力な文字列フォーマットの方法、`f-strings`と`str.format()`を使って初期化できます。`f'{variable}'`を使った文字列補間は、読みやすく、完結していて、とても高速なため好まれます。国際化に適した方法や、より柔軟な方法が必要なときは、`str.format()`を使えば、必要になりそうなほぼすべての`str`のバリエーションを作れます。

# リテラル文字列補間：f-string

リテラル文字列補間は、`f`プレフィックスと波括弧`{object}`を使って、式をすばやく効率的にフォーマットし`str`に評価する方法です。囲みの文字列の種類はすべて使えます。シングルクォート`'`、ダブルクォート`"`、複数行やエスケープにはトリプルクォート`'''`または`"""`です。

この**f-string**の基本的な例では、変数`name`が文字列の先頭に展開され、`int`型の変数`age`が`str`に変換されて`' is '`の後に展開されます。

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

`f-string`が評価する式は、ほとんど何でもかまいません。そのため、入力を安全に処理することについてのいつもの注意が当てはまります。評価できる値の一部を挙げると、`str`、数値、変数、算術式、条件式、組み込み型、スライス、関数、または`__str__`か`__repr__`メソッドを定義した任意のオブジェクトです。いくつか例を示します。

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

f-stringの出力は、`.format()`で説明されている_幅_、_整列_、_精度_と同じ制御の仕組みをサポートします。文字列補間は、国際化（I18N）と地域化（L10N）のためのGNU gettext APIと一緒には使えません。代わりに`str.format()`を使う必要があります。

# `str.format()`メソッド

`str.format()`では、テキスト内のプレースホルダーを置き換えられます。プレースホルダーは、名前付きインデックス`{price}`、番号付きインデックス`{0}`、または空のプレースホルダー`{}`で指定します。値は`str.format()`メソッドの引数として指定します。例を見てみましょう。

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

Pythonの`.format()`は、テキストの整列や変換などに使える[ミニ言語仕様][format-mini-language]を幅広くサポートしています。

複雑なフォーマット指定子は`{[<name>][!<conversion>][:<format_specifier>]}`です。

- `<name>`には、名前付きプレースホルダー、番号、または空を指定できます。
- `!<conversion>`は省略可能で、`!s`（[`str()`][str-conversion]）、`!r`（[`repr()`][repr-conversion]）、`!a`（[`ascii()`][ascii-conversion]）の3つのうちの1つを指定します。デフォルトでは`str()`が使われます。
- `:<format_specifier>`は省略可能で、たくさんのオプションがあります。それらは[ここにまとめてあります][format-specifiers]。

分音記号が付いたASCII文字を変換する例です。

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

フォーマット指定子の例です。もっと多くの例は[このページの最後][summary-string-format]にあります。

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

国際化（I18N）と地域化（L10N）には、`str.format()`を[GNU gettext API][gnu-gettext-api]と一緒に使うとよいでしょう。

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
