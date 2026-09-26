# 演習の補足

## 例外メッセージ

ときには[例外を発生させる](https://docs.python.org/3/tutorial/errors.html#raising-exceptions)必要があります。そのときは、エラーの原因が何であるかを示す**意味のあるエラーメッセージ**を必ず含めるようにしましょう。そうすることでコードが読みやすくなり、デバッグもぐっと楽になります。エラーの原因がある特定の種類になるとわかっている場合は、[組み込みのエラー型](https://docs.python.org/3/library/exceptions.html#base-classes)から適切なものを選んで発生させてもかまいませんが、その場合も意味のあるメッセージを含めるようにしましょう。

この演習では、入力されたマス目が範囲外のときに[raise文](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement)を使って`ValueError`を「投げる」必要があります。`exception`を`raise`することと、それにメッセージを添えることの両方ができていなければ、テストは合格しません。

メッセージ付きで`ValueError`を発生させるには、`exception`型の引数としてメッセージを書きます。

```python
# when the square value is not in the acceptable range        
raise ValueError("square must be between 1 and 64")
```
