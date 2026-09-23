# Introduction

Un fichier est un flux associé à un nom sur le disque. La _vocabulary_ [`io.files`][io.files] lit et écrit les fichiers soit en entier, en un seul appel, soit de manière incrémentale via un flux à portée limitée. Chaque mot lié aux fichiers prend un **encodage** ; pour du texte, c'est presque toujours [`utf8`][utf8], de `io.encodings.utf8`.

## Lecture

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents` renvoie le fichier entier sous la forme d'une seule _string_. `file-lines` renvoie ses lignes sous la forme d'un tableau, sans les sauts de ligne.

## Écriture

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

Les deux remplacent le fichier (en le créant si nécessaire). `set-file-lines` écrit un élément par ligne, et ajoute les sauts de ligne à ta place.

## Ajout en fin de fichier et entrées-sorties incrémentielles

Les combinateurs `with-…` ouvrent un fichier comme flux ambiant pour une _quotation_, puis le referment ensuite : une portée de type destructeur, comme les combinateurs de flux de `channel-chatter`.

```
with-file-reader     ( path encoding quot -- )
with-file-writer     ( path encoding quot -- )
with-file-appender   ( path encoding quot -- )
```

```factor
USING: io io.encodings.utf8 io.files ;

"log.txt" utf8 [ "another line" print ] with-file-appender
```

[io.files]: https://docs.factorcode.org/content/vocab-io.files.html
[utf8]: https://docs.factorcode.org/content/vocab-io.encodings.utf8.html
