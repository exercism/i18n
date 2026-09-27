# Introducción

Un *flujo* en Factor es cualquier cosa de la que puedas leer bytes o a la que puedas escribir bytes. Los ficheros, los sockets, los búferes en memoria y tus propios wrappers personalizados participan todos en el mismo y pequeño [protocolo][stream-protocol] de [`io`][io].

Las dos mitades del protocolo son mixins: `input-stream` para las cosas de las que lees y `output-stream` para las cosas a las que escribes. Una clase se une a uno (o a ambos) con `INSTANCE: <class> input-stream`.

## Lectura y escritura

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1` devuelve el siguiente byte (o `f` al final del flujo); `stream-read` lee hasta `n` bytes. `stream-write1` y `stream-write` son sus equivalentes para la salida. `stream-flush` vacía la salida que esté en el búfer. `stream-element-type` indica si el flujo trabaja con bytes sin procesar (`+byte+`) o con caracteres (`+character+`).

## Limpieza con `disposable`

Los flujos hacen uso de recursos del sistema operativo, por lo que el protocolo se combina con el vocabulario [`destructors`][destructors]. Un flujo personalizado hereda de la clase padre `disposable`:

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable` (en `destructors`) es la fábrica: crea la tupla y la registra en el framework de destructores, de modo que las excepciones no provoquen fugas del recurso. `M: <class> dispose*` indica *cómo* limpiar; el código del usuario llama a `dispose` (la palabra pública), que marca el objeto como liberado y después ejecuta `dispose*`.

## Uso delimitado

`with-disposal`, `with-input-stream` y `with-output-stream` ejecutan una quotation con el recurso abierto y lo liberan al salir:

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
