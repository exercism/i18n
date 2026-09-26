# 简介

`case`（位于 [`combinators`][combinators] 中）会遍历由子句组成的关联列表，运行第一个匹配子句的主体，从而根据值进行分派。

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

每个子句的形式是 `{ value [ body ] }`。相等性由 `=` 判断。匹配的子句运行时，输入值已经被消耗掉。末尾的 `[ body ]`（没有值）是默认子句。它运行时输入仍在栈上，所以主体通常以 `drop` 开头。

[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
