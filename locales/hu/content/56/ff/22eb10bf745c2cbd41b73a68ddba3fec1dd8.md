# Részletesen

A tömbök a Factor rögzített hosszúságú sorozattípusába tartoznak: az elemeket megváltoztathatod, de a hosszát nem.
A literálok `{ … }` alakúak, az elemek között szóközzel; az `arrays` szókészlet kis konstruktorokat ad hozzá, amelyek leveszik az értékeket a veremről:

| szó     | veremhatás                              |
|----------|-------------------------------------|
| `1array` | `( a     -- { a } )`                |
| `2array` | `( a b   -- { a b } )`              |
| `3array` | `( a b c -- { a b c } )`            |
| `<array>`| `( n elt -- array )`: `n` darab `elt` |
| `array?` | `( obj   -- ? )`: típuspredikátum   |

Néhány [protokoll][sequence-protocol] szó a `sequences` szókészletből olyan gyakran előkerül a tömbökkel, hogy érdemes egy egységként ismerni őket:

| szó      | veremhatás                                            |
|-----------|-------------------------------------------------------|
| `concat`  | `( seqs -- seq )`: sorozatok sorozatának lapítása     |
| `join`    | `( seqs glue -- seq )`: lapítás elválasztóval         |
| `reverse` | `( seq -- newseq )`                                   |
| `index`   | `( elt seq -- i/f )`: az elem indexe, vagy `f`        |
| `member?` | `( elt seq -- ? )`: tagságvizsgálat                   |

```factor
USING: arrays sequences ;

3 4 2array .                       ! => { 3 4 }
{ { 1 2 } { 3 4 } } concat .       ! => { 1 2 3 4 }
{ 1 2 3 4 } reverse .              ! => { 4 3 2 1 }
"b" { "a" "b" "c" } index .        ! => 1
"b" { "a" "b" "c" } member? .      ! => t
```

`all-unique?` és `members` a [`sets`][sets] szókészletből szintén elfogadnak bármilyen sorozatot; ez kényelmes, ha egy tömb elemeit duplikátumoktól szeretnéd megszabadítani, vagy duplikátumokra szeretnéd ellenőrizni, anélkül, hogy először hash-setet csinálnál belőle.

[sets]: https://docs.factorcode.org/content/vocab-sets.html
[sequence-protocol]: https://docs.factorcode.org/content/article-sequence-protocol.html
