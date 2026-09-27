# Einführung

`case` (in [`combinators`][combinators]) verzweigt anhand eines Werts, indem es eine Alist von Klauseln durchläuft und den Rumpf der ersten passenden Klausel ausführt.

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

Jede Klausel ist `{ value [ body ] }`. Die Gleichheit wird über `=` bestimmt. Passende Klauseln werden mit dem Eingabewert ausgeführt, der *bereits verbraucht* ist. Ein abschließendes `[ body ]` (ohne Wert) ist der Standardfall: Es läuft mit dem Eingabewert, der *noch* auf dem Stack liegt, also beginnt der Rumpf meist mit `drop`.

[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
