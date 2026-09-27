# 소개

`case`는 ([`combinators`][combinators]에 있는) 절들의 alist를 차례대로 살펴보면서, 처음으로 일치하는 절의 본문을 실행해 값에 따라 분기해요.

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

각 절은 `{ value [ body ] }` 형태예요. 같은지 비교할 때는 `=`를 사용해요. 일치한 절은 입력 값이 *이미 소비된* 상태에서 실행돼요. 값 없이 마지막에 오는 `[ body ]`는 기본값인데, 이때는 입력이 *여전히* 스택에 남아 있는 상태에서 실행되므로 본문은 보통 `drop`으로 시작해요.

[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
