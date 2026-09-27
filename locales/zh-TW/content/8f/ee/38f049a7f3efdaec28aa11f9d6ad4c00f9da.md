# 簡介

檔案是磁碟上帶有名稱的串流。[`io.files`][io.files]詞彙庫讀寫檔案的方式有兩種：一次整份讀寫（用單一呼叫），或是透過具作用域的串流逐步進行。每個處理檔案的詞都接受一個**編碼**；對文字來說，幾乎總是來自`io.encodings.utf8`的[`utf8`][utf8]。

## 讀取

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents`會將整份檔案以單一字串回傳。`file-lines`則會把檔案的各行以陣列回傳，並移除換行字元。

## 寫入

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

兩者都會取代檔案（必要時會建立檔案）。`set-file-lines`每行寫入一個元素，並自動幫你加上換行。

## 附加與增量 I/O

`with-…`這組組合子會開啟檔案，作為引述的環境串流，並在之後關閉它，這是一種解構作用域，就像`channel-chatter`中的串流組合子一樣。

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
