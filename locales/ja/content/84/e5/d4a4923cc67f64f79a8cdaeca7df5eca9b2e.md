# 指示の補足

## DSLの説明

このDSLでは、グラフは`Graph`型のオブジェクトです。これは、次のものを表す1つ以上のタプルからなる`list`を受け取ります。

+ 属性
+ `Nodes`
+ `Edges`

`Node`と`Edge`の実装は`dot_dsl.py`に用意されています。

DSLが期待する設計や、想定されているエラーの型とメッセージについて詳しくは、`dot_dsl_test.py`のテストケースを見てみましょう。


## 例外のメッセージ

ときには、[例外を発生させる](https://docs.python.org/3/tutorial/errors.html#raising-exceptions)必要があります。その際は、エラーの原因が何であるかを示す**意味のあるエラーメッセージ**を必ず含めるようにしましょう。これにより、コードが読みやすくなり、デバッグもずっと楽になります。エラーの原因がある特定の型になるとわかっている場合は、[組み込みのエラーの型](https://docs.python.org/3/library/exceptions.html#base-classes)から1つを選んで発生させてもかまいませんが、その場合も意味のあるメッセージを含めてください。

この演習では、[`raise`文](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement)を使って、`Graph`が不正な場合は`TypeError`を、`Edge`、`Node`、または`attribute`が不正な場合は`ValueError`を「投げる」必要があります。テストが通るのは、`exception`を`raise`することと、それにメッセージを添えることの両方を行ったときだけです。

メッセージ付きでエラーを発生させるには、`exception`型の引数としてメッセージを書きます。

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
