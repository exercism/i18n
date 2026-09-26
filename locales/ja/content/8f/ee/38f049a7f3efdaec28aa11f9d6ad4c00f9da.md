# はじめに

ファイルとは、ディスク上の名前を持ったストリームです。[`io.files`][io.files]ボキャブラリを使うと、ファイルを丸ごと（1回の呼び出しで）読み書きすることも、スコープ付きストリームを通して少しずつ読み書きすることもできます。ファイルを扱うワードはどれも**エンコーディング**を取ります。テキストの場合、それはほぼ常に`io.encodings.utf8`の[`utf8`][utf8]です。

## 読み込み

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents`はファイル全体を1つの文字列として返します。`file-lines`はそのファイルの行を配列として返し、改行は取り除かれます。

## 書き込み

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

どちらもファイルを置き換えます（必要なら新しく作成します）。`set-file-lines`は要素1つにつき1行を書き込み、改行は自動で加えてくれます。

## 追記と逐次I/O

`with-…`コンビネータは、クォーテーションが実行される間だけファイルを暗黙のストリームとして開き、そのあとで閉じます。`channel-chatter`のストリームコンビネータと同じ、デストラクタスコープです。

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
