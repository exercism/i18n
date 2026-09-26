# Introducción

Un archivo es un flujo con un nombre en disco. El vocabulario [`io.files`][io.files] lee y escribe archivos ya sea por completo, en una sola llamada, o de forma incremental a través de un flujo con ámbito. Cada palabra que trabaja con archivos recibe una **codificación**; para texto, casi siempre es [`utf8`][utf8] de `io.encodings.utf8`.

## Lectura

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents` devuelve todo el archivo como un string. `file-lines` devuelve sus líneas como un array, con los saltos de línea eliminados.

## Escritura

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

Ambas reemplazan el archivo (lo crean si hace falta). `set-file-lines` escribe un elemento por línea y agrega los saltos de línea por ti.

## Agregar contenido y E/S incremental

Los combinadores `with-…` abren un archivo como el flujo ambiente para una quotation y lo cierran después: un ámbito de destructor, como los combinadores de flujo en `channel-chatter`.

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
