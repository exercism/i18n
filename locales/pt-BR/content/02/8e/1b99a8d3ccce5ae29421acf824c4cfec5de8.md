# Introdução

`case` (em [`combinators`][combinators]) despacha com base em um valor percorrendo uma lista associativa de cláusulas e executando o corpo da primeira que corresponder.

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

Cada cláusula é `{ value [ body ] }`. A igualdade é determinada por `=`. As cláusulas correspondentes rodam com o valor de entrada *já consumido*. Uma cláusula final `[ body ]` (sem valor) é o padrão: ela roda com a entrada *ainda* na pilha, então o corpo normalmente começa com `drop`.

[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
