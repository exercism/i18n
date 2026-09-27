# 簡介

在 Factor 中，*串流*是指任何你能從中讀取位元組、或寫入位元組的東西。檔案、通訊端、記憶體內緩衝區，以及你自己撰寫的包裝器，全都採用[`io`][io]裡同一套小巧的[協定][stream-protocol]。

這套協定的兩半都是混入：`input-stream`用於你能讀取的東西，`output-stream`用於你能寫入的東西。類別只要寫下`INSTANCE: <class> input-stream`，就能加入其中一個（或同時加入兩個）。

## 讀取與寫入

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1`會回傳下一個位元組（在串流結尾時則是`f`）；`stream-read`最多讀取`n`個位元組。`stream-write1`與`stream-write`則是對應的輸出端。`stream-flush`會把緩衝的輸出推送出去。`stream-element-type`則回報這個串流處理的是原始位元組（`+byte+`）還是字元（`+character+`）。

## 用`disposable`清理

串流會持有作業系統資源，因此這套協定會搭配[`destructors`][destructors]詞彙一起使用。自訂串流則繼承`disposable`這個父類別：

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable`（位於`destructors`）是工廠：它會配置 tuple，並向解構器框架註冊，這樣例外就不會讓資源外洩。`M: <class> dispose*`說明了*如何*清理；使用者程式碼會呼叫`dispose`（公開的 word），這個 word 會把物件標記為已處置，然後執行`dispose*`。

## 在作用域內使用

`with-disposal`、`with-input-stream`與`with-output-stream`會在資源保持開啟的情況下執行 quotation，並在離開時處置它：

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
