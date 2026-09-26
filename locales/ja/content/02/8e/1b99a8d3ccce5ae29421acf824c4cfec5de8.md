# はじめに

`case`（[`combinators`][combinators]内）は、値に応じて処理を振り分けます。節の連想リストを順に見ていき、最初にマッチした節の本体を実行する仕組みです。

```
case ( obj assoc -- )
```

```factor
USING: combinators ;

: name-of ( n -- s )
    {
        { 1 [ "one" ] }
        { 2 [ "two" ] }
        [ drop "many" ]
    } case ;
```

各節は`{ value [ body ] }`の形をとります。値の比較には`=`を使います。マッチした節は、入力値が*すでに消費された*状態で実行されます。末尾の`[ body ]`（値なし）はデフォルトです。こちらは入力が*まだ*スタックに残った状態で実行されるため、本体は通常`drop`で始まります。

[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
