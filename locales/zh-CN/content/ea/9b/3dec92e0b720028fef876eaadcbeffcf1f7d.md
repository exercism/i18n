# 简介

在 Factor 中，*流*就是任何你能从中读取字节、也能向其中写入字节的东西。文件、套接字、内存缓冲区，以及你自己写的包装器，都遵循来自[`io`][io]的同一套小巧的[协议][stream-protocol]。

这个协议的两半都是混入：`input-stream`用于你从中读取的东西，`output-stream`用于你向其中写入的东西。一个类通过`INSTANCE: <class> input-stream`加入其中一个（或两个）。

## 读取和写入

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1`返回下一个字节（到达流末尾时返回`f`）；`stream-read`最多读取`n`个字节。`stream-write1`和`stream-write`在输出端是与之对应的操作。`stream-flush`把缓冲区里的输出推送出去。`stream-element-type`报告这个流处理的是原始字节（`+byte+`）还是字符（`+character+`）。

## 用`disposable`清理

流会占用操作系统资源，所以这个协议总是和[`destructors`][destructors]词汇表搭配使用。自定义的流要继承`disposable`父类：

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`new-disposable`（在`destructors`中）是工厂：它负责分配元组，并把它注册到析构框架里，这样即使抛出异常也不会泄漏资源。`M: <class> dispose*`说明*如何*清理；用户代码调用的是公开词`dispose`，它先把对象标记为已处置，然后运行`dispose*`。

## 限定作用域的使用

`with-disposal`、`with-input-stream`和`with-output-stream`会在资源打开的情况下运行一个引用，并在退出时把这个资源释放掉：

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
