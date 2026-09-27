# Acerca de

Los arrays son el tipo de secuencia de longitud fija de Factor: puedes cambiar los
elementos, pero no la longitud.
Los literales usan `{ … }` con espacios en blanco entre los elementos; el
vocabulario `arrays` añade pequeños constructores que toman valores de
la pila:

| palabra  | efecto                              |
|----------|-------------------------------------|
| `1array` | `( a     -- { a } )`                |
| `2array` | `( a b   -- { a b } )`              |
| `3array` | `( a b c -- { a b c } )`            |
| `<array>`| `( n elt -- array )`, `n` copias de `elt` |
| `array?` | `( obj   -- ? )`, predicado de tipo |

Algunas palabras del [protocolo][sequence-protocol] de `sequences` aparecen tan a
menudo con los arrays que merece la pena conocerlas como un conjunto:

| palabra   | efecto                                                |
|-----------|-------------------------------------------------------|
| `concat`  | `( seqs -- seq )`, aplana una secuencia de secuencias |
| `join`    | `( seqs glue -- seq )`, aplana con un separador       |
| `reverse` | `( seq -- newseq )`                                   |
| `index`   | `( elt seq -- i/f )`, índice del elemento, o `f`      |
| `member?` | `( elt seq -- ? )`, comprobación de pertenencia       |

```factor
USING: arrays sequences ;

3 4 2array .                       ! => { 3 4 }
{ { 1 2 } { 3 4 } } concat .       ! => { 1 2 3 4 }
{ 1 2 3 4 } reverse .              ! => { 4 3 2 1 }
"b" { "a" "b" "c" } index .        ! => 1
"b" { "a" "b" "c" } member? .      ! => t
```

`all-unique?` y `members` de [`sets`][sets] también aceptan cualquier
secuencia, algo práctico cuando los elementos de un array deben deduplicarse
o comprobarse en busca de duplicados sin convertirlos antes a un hash-set.

[sets]: https://docs.factorcode.org/content/vocab-sets.html
[sequence-protocol]: https://docs.factorcode.org/content/article-sequence-protocol.html
