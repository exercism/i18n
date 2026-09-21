# Bevezetés

A `case` (a [`combinators`][combinators] szótárban) egy érték alapján ágazik el: végigmegy a feltételekből álló asszociációs listán, és lefuttatja az első illeszkedő feltétel törzsét.

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

Minden feltétel `{ value [ body ] }` alakú. Az egyenlőséget a `=` dönti el. Az illeszkedő feltételek úgy futnak le, hogy a bemeneti érték *már elfogyott*. A végén álló `[ body ]` (érték nélkül) az alapértelmezett ág, és úgy fut le, hogy a bemenet *még* a veremben van, ezért a törzs általában `drop`-pal kezdődik.

[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
