# Introdução

Um *fluxo* em Factor é tudo aquilo de que consegues ler bytes ou para onde consegues escrever bytes. Ficheiros, sockets, buffers em memória e os teus próprios wrappers personalizados participam todos no mesmo e pequeno [protocolo][stream-protocol] do [`io`][io].

As duas metades do protocolo são mixins: `input-stream` para aquilo de que lês, `output-stream` para aquilo para onde escreves. Uma classe junta-se a uma delas (ou a ambas) com `INSTANCE: <class> input-stream`.

## Ler e escrever

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1` devolve o byte seguinte (ou `f` no fim do fluxo); `stream-read` lê até `n` bytes. `stream-write1` e `stream-write` espelham essas operações na saída. `stream-flush` envia a saída que estava em buffer. `stream-element-type` indica se o fluxo trabalha com bytes em bruto (`+byte+`) ou com carateres (`+character+`).

## Limpeza com `disposable`

Os fluxos ocupam recursos do sistema operativo, por isso o protocolo anda de par com o vocabulário de [`destructors`][destructors]. Um fluxo personalizado estende a classe mãe `disposable`:

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable` (em `destructors`) é a fábrica: aloca a tupla e regista-a no framework de destrutores, para que as exceções não deixem o recurso escapar. `M: <class> dispose*` diz *como* limpar; o código do utilizador chama `dispose` (a palavra pública), que marca o objeto como libertado e só depois executa `dispose*`.

## Utilização com âmbito

`with-disposal`, `with-input-stream` e `with-output-stream` executam uma quotation com o recurso aberto e libertam-no ao sair:

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
