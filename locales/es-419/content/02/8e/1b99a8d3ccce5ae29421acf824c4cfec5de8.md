# Introducción

`case` (en [`combinators`][combinators]) despacha según un valor recorriendo una lista de asociación de cláusulas y ejecutando el cuerpo de la primera que coincida.

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

Cada cláusula es `{ value [ body ] }`. La igualdad se determina con `=`. Las cláusulas que coinciden se ejecutan con el valor de entrada *ya consumido*. Una `[ body ]` final (sin valor) es el caso por defecto: se ejecuta con la entrada *todavía* en la pila, así que el cuerpo normalmente empieza con `drop`.

[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
