# 概要

Pythonでは、真と偽の値は[`bool`][bools]型で表されます。これは`int`のサブクラスです。この型の真偽値は`True`と`False`の2つだけです。これらの値は変数に代入でき、[真偽値の演算子][boolean-operators]（`and`、`or`、`not`）と組み合わせることができます：


```python
>>> true_variable = True and True
>>> false_variable = True and False

>>> true_variable = False or True
>>> false_variable = False or False

>>> true_variable = not False
>>> false_variable = not True
```

[真偽値の演算子][boolean-operators]は_短絡評価_を行います。これは、演算子の右側にある式が必要な場合にのみ評価されるという意味です。

演算子にはそれぞれ異なる優先順位があり、`not`は`and`や`or`より先に評価されます。括弧（`()`）を使うと、式の一部を他の部分より先に評価できます：

```python
>>> not True and True
False

>>> not (True and False)
True
```

すべての`boolean operators`は、`==`、`>`、`<`、`is`、`is not`などのPythonの[`comparison operators`][comparisons]よりも優先順位が低いとみなされます。


## 型変換と真偽値の評価

`bool`関数（[`bool()`][bool-function]）は、任意のオブジェクトを真偽値に変換します。デフォルトでは、`False`を返すように定義されていない限り、すべてのオブジェクトは`True`を返します。

いくつかの`built-ins`は、定義上常に`False`とみなされます：

- 定数`None`と`False`
- 任意の_数値型_のゼロ（`int`、`float`、`complex`、`decimal`、`fraction`）
- 空の_シーケンス_と_コレクション_（`str`、`list`、`set`、`tuple`、`dict`、`range(0)`）


```python
>>> bool(None)
False

>>> bool(1)
True

>>> bool(0)
False

>>> bool([1,2,3])
True

>>> bool([])
False

>>> bool({"Pig" : 1, "Cow": 3})
True

>>> bool({})
False
```

オブジェクトが_真偽値の文脈_で使われると、`bool()`を使って_真_または_偽_として透過的に評価されます：


```python
>>> a = "is this true?"
>>> b = []

# This will print "True", as a non-empty string is considered a "truthy" value
>>> if a:
...  print("True")

# This will print "False", as an empty list is considered a "falsey" value
>>> if not b:
...   print("False")
```


クラスは、`__bool__()`メソッドや`__len__()`メソッドをオーバーライドして実装していれば、真と評価される状況でどのように評価されるかを定義できます。


## 真偽値は内部でどのように動作するのか

`bool`型は_int_の_サブタイプ_として実装されています。つまり、`True`は`1`と_数値的に等しく_、`False`は`0`と_数値的に等しい_ということです。これは、_等値演算子_を使って比較すると確認できます：


```python
>>> 1 == True
True

>>> 0 == False
True
```

ただし、`bools`は`ints`とは**依然として異なります**。これは、_同一性演算子_`is`を使って比較するとわかります：


```python
>>> 1 is True
False

>>> 0 is False
False
```

> 注意：Python 3.8以降では、`is`の_左側_にリテラル（`1`、`''`、`[]`、`{}`など）を使うと警告が発生します。


等値演算子を使って真偽値の変数を`True`や`False`と比較することは、[Pythonのアンチパターン][comparing to true in the wrong way]とされています。代わりに、同一性演算子`is`を使うべきです：


```python

>>> flag = True

# Not "Pythonic"
>>> if flag == True:
...    print("This works, but it's not considered Pythonic.")

# A better way
>>> if flag:
...    print("Pythonistas prefer this pattern as more Pythonic.")
```


[Boolean-operators]: https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not
[bool-function]: https://docs.python.org/3/library/functions.html#bool
[bools]: https://docs.python.org/3/library/stdtypes.html#typebool
[comparing to true in the wrong way]: https://docs.quantifiedcode.com/python-anti-patterns/readability/comparison_to_true.html
[comparisons]: https://docs.python.org/3/library/stdtypes.html#comparisons
