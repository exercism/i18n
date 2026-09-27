# Introduzione

Un file è uno stream con un nome su disco. Il vocabolario [`io.files`][io.files] legge e scrive i file in due modi: per intero, in una sola chiamata, oppure in modo incrementale, attraverso uno stream legato a uno scope. Ogni parola che opera sui file richiede una **codifica**; per il testo è quasi sempre [`utf8`][utf8], da `io.encodings.utf8`.

## Lettura

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents` restituisce l'intero file come un'unica stringa. `file-lines` ne restituisce le righe come un array, con le interruzioni di riga rimosse.

## Scrittura

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

Entrambe sostituiscono il file (creandolo se non esiste). `set-file-lines` scrive un elemento per riga, aggiungendo automaticamente le nuove righe.

## Aggiunta e I/O incrementale

I combinatori `with-…` aprono un file come stream ambientale per una quotation e lo chiudono subito dopo: uno scope con distruttore, come i combinatori per gli stream di `channel-chatter`.

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
