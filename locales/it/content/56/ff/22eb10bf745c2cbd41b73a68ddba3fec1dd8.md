# Informazioni

Gli array sono il tipo di sequenza a lunghezza fissa di Factor: puoi cambiare gli elementi ma non la lunghezza. I letterali usano `{ … }` con spazi bianchi tra gli elementi; il vocabolario `arrays` aggiunge piccoli costruttori che prelevano valori dallo stack:

| parola   | effetto                             |
|----------|-------------------------------------|
| `1array` | `( a     -- { a } )`                |
| `2array` | `( a b   -- { a b } )`              |
| `3array` | `( a b c -- { a b c } )`            |
| `<array>`| `( n elt -- array )`: `n` copie di `elt` |
| `array?` | `( obj   -- ? )`: predicato di tipo |

Alcune parole di [protocollo][sequence-protocol] da `sequences` ricorrono così spesso con gli array che vale la pena conoscerle come un insieme:

| parola    | effetto                                                |
|-----------|-------------------------------------------------------|
| `concat`  | `( seqs -- seq )`: appiattisce una sequenza di sequenze |
| `join`    | `( seqs glue -- seq )`: appiattisce con un separatore  |
| `reverse` | `( seq -- newseq )`                                    |
| `index`   | `( elt seq -- i/f )`: indice dell'elemento, oppure `f` |
| `member?` | `( elt seq -- ? )`: test di appartenenza                |

```factor
USING: arrays sequences ;

3 4 2array .                       ! => { 3 4 }
{ { 1 2 } { 3 4 } } concat .       ! => { 1 2 3 4 }
{ 1 2 3 4 } reverse .              ! => { 4 3 2 1 }
"b" { "a" "b" "c" } index .        ! => 1
"b" { "a" "b" "c" } member? .      ! => t
```

`all-unique?` e `members` da [`sets`][sets] accettano anche qualsiasi sequenza: utile quando gli elementi di un array devono essere deduplicati o controllati per duplicati senza prima convertirli in un hash-set.

[sets]: https://docs.factorcode.org/content/vocab-sets.html
[sequence-protocol]: https://docs.factorcode.org/content/article-sequence-protocol.html
