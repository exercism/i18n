# Introduzione

`case` (in [`combinators`][combinators]) smista in base a un valore: scorre un alist di clausole ed esegue il corpo della prima che corrisponde.

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

Ogni clausola è `{ value [ body ] }`. L'uguaglianza è determinata da `=`. Le clausole corrispondenti vengono eseguite con il valore di input *già consumato*. Una `[ body ]` finale (senza valore) è il caso predefinito: viene eseguita con l'input *ancora* sullo stack, quindi il corpo di solito inizia con `drop`.

[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
