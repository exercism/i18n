# はじめに

値を処理している途中で問題が起きると、`jq`プログラムは**ランタイムエラー**を発生させます。たとえば、数値を文字列でインデックスしようとしたり、不正なJSONテキストをパースしたり、間違った型の引数で関数を呼び出したりする場合です。
キャッチされなかったランタイムエラーが起きると、`jq`は_標準エラー出力_にメッセージを出力し、ステータス`5`で終了します。

## エラーを発生させる：`error`と`error(message)`

- `error`は、**入力**の値を値とするエラーを発生させます。
- `error(message)`は、`message`の結果を値とするエラーを発生させます。

エラーの値は文字列に限らず、_任意の_JSON値にできます。

```jq
42 | error("invalid value: \(.)")
# => "invalid value: 42"

42 | error
(not a string): 42
```

## エラーをキャッチする：`try`と`catch`

エラーは`try EXP catch HANDLER`でキャッチできます。
最初の式が実行され、そこでエラーが発生すると、**エラーの値を入力として**`HANDLER`の式が実行されます。
`try catch`の出力は、最後に実行された式（`EXP`か`HANDLER`のどちらか）の出力になります。

```jq
{a: 42} | try .a catch "no index a in \(.)"
# => 42

true | try .a catch "cannot index a \(type)"
# => "cannot index a boolean"

true | try error("some exception") catch .
# => "some exception"
```

短い形式の`try EXP`は`try EXP catch empty`と同じです。エラーは捨てられ、何も出力されません。

```jq
[{}, true, {"a": 1}] | [.[] | try .a]
# => [null, 1]
```

## エラーを抑制する：`?`演算子

`EXP?`のように使う`?`演算子は、`try EXP`の省略形です。
失敗する式を、単に何も出力しない式に変えます。

```jq
["1", "invalid", "3", 4] | [.[] | tonumber?]
# => [1, 3, 4]
```

インデックスの演算子に付けて、`.foo?`や`.[]?`のように書くこともよくあります。

## プログラムを停止する：`halt_error`と`halt`

`halt_error`はプログラムを停止し、入力を生のテキストとして_標準エラー出力_に出力して、指定されたステータスで終了します。ステータスを省略すると`5`になります。
関連する`halt`フィルターは、終了ステータス`0`で静かにプログラムを停止します。

```jq
"Error: something went wrong" | halt_error(1)
```
