# Introduzione

Uno *stream* in Factor è qualsiasi cosa da cui puoi leggere byte o su cui puoi scrivere byte. File, socket, buffer in memoria e i tuoi wrapper personalizzati partecipano tutti allo stesso piccolo [protocollo][stream-protocol] di [`io`][io].

Le due metà del protocollo sono mixin: `input-stream` per le cose da cui leggi, `output-stream` per quelle su cui scrivi. Una classe ne adotta una (o entrambe) con `INSTANCE: <class> input-stream`.

## Lettura e scrittura

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1` restituisce il byte successivo (o `f` alla fine dello stream); `stream-read` legge fino a `n` byte. `stream-write1` e `stream-write` fanno lo stesso per l'output. `stream-flush` spinge in uscita l'output bufferizzato. `stream-element-type` indica se lo stream lavora con byte grezzi (`+byte+`) o con caratteri (`+character+`).

## La pulizia con `disposable`

Gli stream occupano risorse del sistema operativo, quindi il protocollo si accompagna al vocabolario [`destructors`][destructors]. Uno stream personalizzato estende la classe padre `disposable`:

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable` (in `destructors`) è la factory: alloca la tupla e la registra nel framework dei distruttori, così le eccezioni non possono far trapelare la risorsa. `M: <class> dispose*` dice *come* ripulire; il codice utente chiama `dispose` (la parola pubblica), che marca l'oggetto come eliminato e poi esegue `dispose*`.

## Uso con ambito

`with-disposal`, `with-input-stream` e `with-output-stream` eseguono una quotation con la risorsa aperta e la eliminano all'uscita:

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
