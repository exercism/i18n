# Bevezetés

A fájl nem más, mint egy folyam, amelynek neve van a lemezen. Az [`io.files`][io.files] szókészlet a fájlokat vagy teljes egészében olvassa és írja (egyetlen hívásban), vagy növekményesen, egy scope-ba zárt folyamon keresztül. Minden fájlszó egy **kódolást** vár paraméterként; szöveg esetén ez szinte mindig az `io.encodings.utf8`-ból származó [`utf8`][utf8].

## Olvasás

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

A `file-contents` az egész fájlt egyetlen stringként adja vissza. A `file-lines` a sorait adja vissza tömbként, a sortöréseket eltávolítva.

## Írás

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

Mindkettő lecseréli a fájlt (szükség esetén létre is hozza). A `set-file-lines` soronként egy elemet ír ki, a sortöréseket magától hozzáadva.

## Hozzáfűzés és növekményes I/O

A `with-…` kombinatorok megnyitnak egy fájlt, és azt a quotation környező folyamává teszik, majd a végén bezárják. Ez egy destruktor scope, akárcsak a `channel-chatter` folyamkombinatorai.

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
