# 指示

この演習では、ログ行を処理します。

各ログ行は、次のような形式の文字列です：`"[<LEVEL>]: <MESSAGE>"`。

ログレベルは3種類あります：

- `INFO`
- `WARNING`
- `ERROR`

タスクは3つあり、どれもログ行を受け取って何らかの処理をするものです。

## 1. ログ行からメッセージを取り出す

`message`関数を実装して、ログ行のメッセージを返すようにしましょう：

```julia-repl
julia> message("[ERROR]: Invalid operation")
"Invalid operation"
```

先頭と末尾の空白は取り除いてください：

```julia-repl
julia> message("[WARNING]:  Disk almost full\r\n")
"Disk almost full"
```

## 2. ログ行からログレベルを取り出す

`log_level`関数を実装して、ログ行のログレベルを返すようにしましょう。戻り値は小文字にします：

```julia-repl
julia> log_level("[ERROR]: Invalid operation")
"error"
```

## 3. ログ行を整形する

`reformat`関数を実装してログ行を整形しましょう。メッセージを先に書き、そのあとにログレベルを括弧（`()`）に入れます：

```julia-repl
julia> reformat("[INFO]: Operation completed")
"Operation completed (info)"
```

----

***注:***この演習に出てくる文字列はすべて英語で、ASCII文字セットに限られています。Unicode文字を扱う機会は、あとの概念で出てきます。
