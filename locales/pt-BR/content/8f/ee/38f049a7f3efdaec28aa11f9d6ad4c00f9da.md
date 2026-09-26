# Introdução

Um arquivo é um fluxo com um nome no disco. O vocabulário [`io.files`][io.files] lê e escreve arquivos por inteiro (em uma única chamada) ou de forma incremental, por meio de um fluxo com escopo. Toda palavra do vocabulário de arquivos recebe uma **codificação**; para texto, isso é quase sempre [`utf8`][utf8], de `io.encodings.utf8`.

## Leitura

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents` retorna o arquivo inteiro como uma única string. `file-lines` retorna suas linhas como um array, sem as quebras de linha.

## Escrita

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

Ambas substituem o arquivo (criando-o se for preciso). `set-file-lines` escreve um elemento por linha, adicionando as quebras de linha para você.

## Anexar e E/S incremental

Os combinadores `with-…` abrem um arquivo como o fluxo ambiente para uma quotation e o fecham em seguida. É um escopo destrutor, como os combinadores de fluxo em `channel-chatter`.

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
