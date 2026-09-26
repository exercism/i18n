# 指示の補足

## 例外メッセージ

ときには[例外を発生させる](https://docs.python.org/3/tutorial/errors.html#raising-exceptions)必要があります。そのときは、エラーの原因を示す**意味のあるエラーメッセージ**を必ず含めるようにしましょう。こうするとコードが読みやすくなり、デバッグにも大きく役立ちます。エラーの原因がある特定の型だとわかっている場合は、[組み込みのエラー型](https://docs.python.org/3/library/exceptions.html#base-classes)のいずれかを発生させることもできますが、その場合も意味のあるメッセージを含めるようにしましょう。

この演習では、`prime()`関数が不正な入力を受け取ったときに、[raise文](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement)を使って`ValueError`を「投げる」必要があります。この演習は_正の_数値だけを扱うので、1未満の数値はすべて不正な入力です。テストが通るのは、`exception`を`raise`し、それにメッセージを添えた場合だけです。

メッセージ付きで`ValueError`を発生させるには、メッセージを`exception`型の引数として書きます。

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```
