# はじめに

Factorにおける*ストリーム*とは、バイトを読み書きできるものすべてを指します。ファイル、ソケット、メモリ上のバッファー、そして自作のラッパーは、どれも[`io`][io]が提供する同じ小さな[プロトコル][stream-protocol]に参加します。

このプロトコルは、2つのミックスインに分かれています。読み込む側が`input-stream`、書き込む側が`output-stream`です。クラスは`INSTANCE: <class> input-stream`と書いて、どちらか（あるいは両方）に参加します。

## 読み込みと書き込み

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1`は次のバイトを返します（ストリームの終端では`f`）。`stream-read`は最大`n`バイトを読み込みます。`stream-write1`と`stream-write`は、出力側で同じ役割を果たします。`stream-flush`はバッファーに溜まった出力を送り出します。`stream-element-type`は、そのストリームが生のバイト（`+byte+`）を扱うのか、文字（`+character+`）を扱うのかを報告します。

## `disposable`による後始末

ストリームはOSのリソースを保持するため、このプロトコルは[`destructors`][destructors]ボキャブラリと組み合わせて使います。自作のストリームは、親クラス`disposable`を継承します。

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable`（`destructors`にあります）はファクトリです。タプルを確保し、例外がリソースを漏らすことがないように、デストラクタのフレームワークに登録します。`M: <class> dispose*`は*どのように*後始末するかを示します。ユーザーのコードは`dispose`（公開されたワード）を呼び出し、これがオブジェクトを破棄済みとして印を付けてから`dispose*`を実行します。

## スコープ付きの使い方

`with-disposal`、`with-input-stream`、`with-output-stream`は、リソースを開いたままクオテーションを実行し、終了時にそれを破棄します。

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
