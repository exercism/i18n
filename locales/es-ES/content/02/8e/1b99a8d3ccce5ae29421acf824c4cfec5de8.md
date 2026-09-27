# Introducción

`case` (de [`combinators`][combinators]) despacha en función de un valor
recorriendo un alist de cláusulas y ejecutando el cuerpo de la primera
que coincida.

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

Cada cláusula es `{ value [ body ] }`. La igualdad se comprueba con `=`.
Las cláusulas que coinciden se ejecutan con el valor de entrada
*ya consumido*. Una `[ body ]` al final (sin valor) es la opción por
defecto: se ejecuta con la entrada *todavía* en la pila, así que el
cuerpo suele empezar con `drop`.

[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
