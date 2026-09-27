# Introducción

Un fichero es un flujo con un nombre en el disco. El vocabulario [`io.files`][io.files]
lee y escribe ficheros, ya sea enteros en una sola llamada o de forma incremental
a través de un flujo delimitado. Cada palabra de fichero recibe una
**codificación**; para texto, casi siempre es [`utf8`][utf8] de `io.encodings.utf8`.

## Lectura

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents` devuelve el fichero entero como un string. `file-lines` devuelve sus
líneas como un array, con los saltos de línea eliminados.

## Escritura

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

Ambas reemplazan el fichero (creándolo si es necesario). `set-file-lines` escribe un
elemento por línea y añade los saltos de línea automáticamente.

## Añadir al final y E/S incremental

Los combinadores `with-…` abren un fichero como el flujo ambiente para una quotation y
lo cierran después: un ámbito con destructor, como los combinadores de flujo de
`channel-chatter`.

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
