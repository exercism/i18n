# Introdução

Um *stream* em Factor é qualquer coisa da qual você pode ler bytes ou para a qual pode escrever bytes. Arquivos, sockets, buffers em memória e seus próprios wrappers personalizados participam todos do mesmo pequeno [protocolo][stream-protocol] de [`io`][io].

As duas metades do protocolo são mixins: `input-stream` para coisas das quais você lê, `output-stream` para coisas nas quais você escreve. Uma classe entra em uma (ou nas duas) com `INSTANCE: <class> input-stream`.

## Leitura e escrita

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1` retorna o próximo byte (ou `f` no fim do stream); `stream-read` lê até `n` bytes. `stream-write1` e `stream-write` fazem o mesmo para a saída. `stream-flush` envia a saída que está no buffer. `stream-element-type` informa se o stream trabalha com bytes brutos (`+byte+`) ou caracteres (`+character+`).

## Limpeza com `disposable`

Streams mantêm recursos do sistema operacional, então o protocolo anda junto com o vocabulário [`destructors`][destructors]. Um stream personalizado estende a classe pai `disposable`:

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable` (em `destructors`) é a fábrica: ela aloca a tupla e a registra no framework de destrutores, para que exceções não vazem o recurso. `M: <class> dispose*` diz *como* limpar; o código do usuário chama `dispose` (a palavra pública), que marca o objeto como descartado e então executa `dispose*`.

## Uso com escopo

`with-disposal`, `with-input-stream` e `with-output-stream` executam uma quotation com o recurso aberto e o descartam ao final:

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
