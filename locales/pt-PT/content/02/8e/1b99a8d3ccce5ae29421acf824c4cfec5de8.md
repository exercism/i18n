# Introdução

`case` (em [`combinators`][combinators]) encaminha com base num valor,
percorrendo uma alist de cláusulas e executando o corpo da primeira
que corresponda.

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

Cada cláusula é `{ value [ body ] }`. A igualdade é feita com `=`. As
cláusulas que correspondem são executadas com o valor de entrada *já
consumido*. Uma cláusula `[ body ]` final (sem valor) é o caso
predefinido: é executada com o valor de entrada *ainda* na pilha, por
isso o corpo começa normalmente com `drop`.

[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
