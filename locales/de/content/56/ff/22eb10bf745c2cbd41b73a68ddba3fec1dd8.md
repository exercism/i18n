# Über

Arrays sind der Sequenztyp fester Länge in Factor: Du kannst die Elemente ändern, aber nicht die Länge.
Literale verwenden `{ … }` mit Leerzeichen zwischen den Elementen; die Vocabulary `arrays` fügt kleine Konstruktoren hinzu, die Werte vom Stack holen:

| Wort      | Effekt                              |
|-----------|-------------------------------------|
| `1array`  | `( a     -- { a } )`                |
| `2array`  | `( a b   -- { a b } )`              |
| `3array`  | `( a b c -- { a b c } )`            |
| `<array>` | `( n elt -- array )`: `n` Kopien von `elt` |
| `array?`  | `( obj   -- ? )`: Typprädikat       |

Ein paar Wörter, die zum [Protokoll][sequence-protocol] von `sequences` gehören, kommen bei Arrays so oft vor, dass es sich lohnt, sie als Einheit zu kennen:

| Wort      | Effekt                                                |
|-----------|-------------------------------------------------------|
| `concat`  | `( seqs -- seq )`: eine Sequenz aus Sequenzen abflachen |
| `join`    | `( seqs glue -- seq )`: mit einem Trennzeichen abflachen |
| `reverse` | `( seq -- newseq )`                                   |
| `index`   | `( elt seq -- i/f )`: Index des Elements oder `f`     |
| `member?` | `( elt seq -- ? )`: Mitgliedschaftstest               |

```factor
USING: arrays sequences ;

3 4 2array .                       ! => { 3 4 }
{ { 1 2 } { 3 4 } } concat .       ! => { 1 2 3 4 }
{ 1 2 3 4 } reverse .              ! => { 4 3 2 1 }
"b" { "a" "b" "c" } index .        ! => 1
"b" { "a" "b" "c" } member? .      ! => t
```

`all-unique?` und `members` aus [`sets`][sets] akzeptieren ebenfalls jede Sequenz. Das ist praktisch, wenn die Elemente eines Arrays dedupliziert oder auf Duplikate geprüft werden sollen, ohne sie zuerst in ein Hash-Set umzuwandeln.

[sets]: https://docs.factorcode.org/content/vocab-sets.html
[sequence-protocol]: https://docs.factorcode.org/content/article-sequence-protocol.html
