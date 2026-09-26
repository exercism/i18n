# 提示

## 1. 计算千兆秒纪念日

- 通用时间是从纪元开始计算的秒数。
- Common Lisp 有一对函数，可以编码或解码通用时间。
- 借助合适的宏，可以把函数返回的多个值收集到一个列表中。
- 虽然`decode-universal-time`和`encode-universal-time`的时区参数是可选的，但它很重要。它们的默认值是什么？

[hyperspec-decode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_dec_un.htm#decode-universal-time
[hyperspec-encode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_encode.htm#encode-universal-time
