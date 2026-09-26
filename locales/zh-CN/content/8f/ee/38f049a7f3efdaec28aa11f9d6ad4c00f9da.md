# 简介

文件是磁盘上带有名字的流。[`io.files`][io.files] vocabulary 读写文件时，要么一次调用就把整个文件读写完，要么通过作用域内的流逐步读写。每个文件 word 都接受一个**编码**；对于文本来说，几乎总是`io.encodings.utf8`里的 [`utf8`][utf8]。

## 读取

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents`把整个文件作为一个字符串返回。`file-lines`把各行内容作为数组返回，并去掉换行符。

## 写入

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

两者都会替换文件（必要时会创建它）。`set-file-lines`每行写入一个元素，并自动加上换行符。

## 追加与增量 I/O

`with-…`系列组合子会把文件打开，作为 quotation 的环境流，并在用完后关闭它，这是一种析构作用域，就像`channel-chatter`里的流组合子一样。

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
