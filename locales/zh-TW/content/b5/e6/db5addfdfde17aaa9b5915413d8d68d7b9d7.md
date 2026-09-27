# 提示

## 1. 計算十億秒週年紀念日

- 通用時間是從紀元起算的秒數。
- Common Lisp 有一對函式可以編碼或解碼通用時間。
- 使用正確的巨集，就能把函式回傳的多個值捕捉到一個陣列中。
- 雖然 [`decode-universal-time`][hyperspec-decode-universal-time]和[`encode-universal-time`][hyperspec-encode-universla-time]的時區參數是選用的，但這點很重要。它們的預設值是什麼？

[hyperspec-decode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_dec_un.htm#decode-universal-time
[hyperspec-encode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_encode.htm#encode-universal-time
