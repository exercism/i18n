# À propos

Les tableaux sont le type de séquence à longueur fixe de Factor : on peut modifier les éléments, mais pas la longueur.
Les littéraux s'écrivent `{ … }`, avec un espace entre les éléments ; le vocabulaire `arrays` ajoute de petits constructeurs qui récupèrent des valeurs sur la pile :

| mot      | effet                                        |
|----------|----------------------------------------------|
| `1array` | `( a     -- { a } )`                         |
| `2array` | `( a b   -- { a b } )`                       |
| `3array` | `( a b c -- { a b c } )`                     |
| `<array>`| `( n elt -- array )` : `n` copies de `elt`   |
| `array?` | `( obj   -- ? )` : prédicat de type          |

Quelques mots du [protocole][sequence-protocol] fournis par `sequences` reviennent si souvent avec les tableaux qu'ils méritent d'être connus ensemble :

| mot       | effet                                                 |
|-----------|-------------------------------------------------------|
| `concat`  | `( seqs -- seq )` : aplatit une séquence de séquences |
| `join`    | `( seqs glue -- seq )` : aplatit avec un séparateur   |
| `reverse` | `( seq -- newseq )`                                   |
| `index`   | `( elt seq -- i/f )` : indice de l'élément, ou `f`    |
| `member?` | `( elt seq -- ? )` : test d'appartenance              |

```factor
USING: arrays sequences ;

3 4 2array .                       ! => { 3 4 }
{ { 1 2 } { 3 4 } } concat .       ! => { 1 2 3 4 }
{ 1 2 3 4 } reverse .              ! => { 4 3 2 1 }
"b" { "a" "b" "c" } index .        ! => 1
"b" { "a" "b" "c" } member? .      ! => t
```

`all-unique?` et `members` de [`sets`][sets] acceptent eux aussi n'importe quelle séquence : c'est pratique lorsqu'on veut dédoublonner les éléments d'un tableau ou vérifier qu'il ne contient pas de doublons, sans d'abord le convertir en hash-set.

[sets]: https://docs.factorcode.org/content/vocab-sets.html
[sequence-protocol]: https://docs.factorcode.org/content/article-sequence-protocol.html
