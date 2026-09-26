# 説明の補足


## この演習がPythonトラックでどのように実装されているか


この演習のテストでは、時計がClockという`class`として実装されることを想定しています。
Pythonのクラスに馴染みがない場合は、[concept:python/classes]() と [classes][classes in python]（_Pythonのドキュメントより_）が良い出発点になります。


## クラスの表現

[オブジェクト][what-is-an-object]を扱ったりデバッグしたりするときは、そのオブジェクトをうまく表現できることが重要です。
たとえば、Pythonの[REPL][REPL]環境で新しい[`datetime.datetime`][datetime]オブジェクトを作成すると、その[文字列表現][str-rep-classes]を確認できます。


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

Clock`class`は、日付_なし_で時刻を扱う独自の`object`を作成する必要があります。
この`class`の重要な側面の1つは、どのように_文字列_として表現されるかです。
Clock`class`から作られたClock`objects`を使ったり呼び出したりする他のプログラマーは、デバッグやその他の作業のためにこの文字列表現を参照します。
ただし、独自の`class`におけるデフォルトの表現は、あまり役に立ちません。


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

より役に立つ表現を作るには、`class`に[`__repr__`][repr-method]という[特殊メソッド][dunder-methods]を定義します。

理想的には、その`__repr__`メソッドは、[`eval()`][eval-built-in]に渡すとオブジェクトを再作成できる有効なPythonコードを返します。これは[`__repr__`メソッドの仕様][repr-docs]に示されているとおりです。
有効なPythonコードを返すようにすると、他のエンジニアが`str`をそのままコードやREPLにコピー&ペーストできるようになります。
午前11時30分を表す`Clock`は、次のようになります。

```python
 `Clock(11, 30)`
```

`__repr__`メソッドを定義するのは、すべての独自クラスにとって良い習慣です。
さらに、次の点も考慮するとよいでしょう。

- このメソッドから返される情報は、問題のデバッグに役立つものであるべきです。
- _理想的には_、このメソッドは有効なPythonコードである文字列を返します。ただし、常にそうできるとは限りません。
- 有効なPythonコードにするのが現実的でない場合は、山括弧（`<>`）の間に説明を書いて返すのが慣習です: `< ...a practical description... >`


### 文字列への変換

`__repr__`メソッドに加えて、`class`を「人間が読める」形で表す、別の文字列表現が必要になることもあります。
これは、プログラムの出力やドキュメントのためにオブジェクトを整形するのに使われることがあります。
これは、[`__str__`][str-dunder]という特殊メソッドを書くことで行います。
もう一度`datetime.datetime`を見てみましょう。


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

`datetime`オブジェクトに文字列表現への変換を求めると、[ISO 8601標準][ISO 8601]に従って整形された`str`を返します。これはほとんどのdatetimeライブラリで、人間が読める日付と時刻に解析できます。

この演習では、Clockのための`__str__`メソッドと、`__repr__`メソッドを書く機会があります。

```python
>>> str(Clock(11, 30))
'11:30'
```

この文字列変換に対応するには、`class`に`__str__`特殊メソッドを作成し、Clockの時刻を示すより「人間が読める」文字列を返す必要があります。

`__str__`メソッドを作成せずにクラスに対して`str()`を呼び出すと、Pythonはフォールバックとしてそのクラスの`__repr__`を呼び出そうとします。
ですから、この2つの特殊メソッドのうち片方だけを実装するなら、`__str__`だけを作るよりも`__repr__`を作るほうがよいでしょう。


[ISO 8601]: https://www.iso.org/iso-8601-date-and-time-format.html
[REPL]: https://pythonprogramminglanguage.com/repl/
[classes in python]: https://docs.python.org/3/tutorial/classes.html
[datetime]: https://docs.python.org/3/library/datetime.html#available-types
[dunder-methods]: https://www.pythonmorsels.com/every-dunder-method/
[eval-built-in]: https://docs.python.org/3/library/functions.html#eval
[repr-docs]: https://docs.python.org/3/reference/datamodel.html#object.__repr__
[repr-method]: https://docs.python.org/3/library/functions.html#repr
[str-dunder]: https://docs.python.org/3/reference/datamodel.html#object.__str__
[str-rep-classes]: https://www.digitalocean.com/community/tutorials/python-str-repr-functions#introduction
[what-is-an-object]: https://realpython.com/ref/glossary/object/
