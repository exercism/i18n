# Introducción

Un *stream* en Factor es cualquier cosa de la que puedas leer bytes o a la que puedas escribir bytes. Los archivos, los sockets, los búferes en memoria y tus propios wrappers personalizados participan todos en el mismo y pequeño [protocolo][stream-protocol] de [`io`][io].

Las dos mitades del protocolo son mixins: `input-stream` para las cosas de las que lees, `output-stream` para las cosas a las que escribes. Una clase se une a una (o a ambas) con `INSTANCE: <class> input-stream`.

## Lectura y escritura

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1` devuelve el siguiente byte (o `f` al llegar al final del stream); `stream-read` lee hasta `n` bytes. `stream-write1` y `stream-write` son el equivalente para la salida. `stream-flush` envía la salida almacenada en el búfer. `stream-element-type` indica si el stream trabaja con bytes sin procesar (`+byte+`) o con caracteres (`+character+`).

## Limpieza con `disposable`

Los streams ocupan recursos del sistema operativo, así que el protocolo se combina con el vocabulario de [`destructors`][destructors]. Un stream personalizado extiende la clase padre `disposable`:

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable` (en `destructors`) es la fábrica: asigna la tupla y la registra en el framework de destructores para que las excepciones no dejen escapar el recurso. `M: <class> dispose*` dice *cómo* limpiar; el código del usuario llama a `dispose` (la palabra pública), que marca el objeto como desechado y luego ejecuta `dispose*`.

## Uso con ámbito

`with-disposal`, `with-input-stream` y `with-output-stream` ejecutan una quotation con el recurso abierto y lo liberan al salir:

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
