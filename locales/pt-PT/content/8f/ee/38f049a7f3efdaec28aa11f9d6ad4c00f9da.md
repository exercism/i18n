# Introdução

Um ficheiro é um fluxo com um nome no disco. O vocabulary [`io.files`][io.files] lê e escreve ficheiros, quer na totalidade, numa única chamada, quer de forma incremental, através de um fluxo com âmbito. Todas as words de ficheiros recebem uma **codificação**; no caso de texto, é quase sempre [`utf8`][utf8], de `io.encodings.utf8`.

## Leitura

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents` devolve o ficheiro inteiro como uma única string. `file-lines` devolve as suas linhas como um array, sem as quebras de linha.

## Escrita

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

Ambas substituem o ficheiro (criando-o, se for preciso). `set-file-lines` escreve um elemento por linha e acrescenta as quebras de linha por ti.

## Acrescentar e E/S incremental

Os combinadores `with-…` abrem um ficheiro como fluxo ambiente para uma quotation e fecham-no no final. É um âmbito com destrutor, como os combinadores de fluxos em `channel-chatter`.

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
