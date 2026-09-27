# 簡介

`case`（位於 [`combinators`][combinators]）會根據值進行分派：它會逐一走訪由子句組成的 alist，並執行第一個符合子句的主體。

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

每個子句的形式是 `{ value [ body ] }`。相等性以 `=` 判斷。符合的子句執行時，輸入值*已經被消耗*。結尾的 `[ body ]`（不含值）則是預設子句，它執行時輸入*仍然*留在堆疊上，所以主體通常會以 `drop` 開頭。

[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
