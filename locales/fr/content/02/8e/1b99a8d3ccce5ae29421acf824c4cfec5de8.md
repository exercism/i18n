# Introduction

`case` (dans [`combinators`][combinators]) choisit une branche en fonction d'une valeur, en parcourant une liste d'associations de clauses et en exécutant le corps de la première qui correspond.

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

Chaque clause est de la forme `{ value [ body ] }`. L'égalité se fait avec `=`. Les clauses qui correspondent s'exécutent avec la valeur d'entrée *déjà consommée*. Un `[ body ]` final (sans valeur) est la clause par défaut : elle s'exécute avec l'entrée *encore* sur la pile, donc le corps commence généralement par `drop`.

[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
