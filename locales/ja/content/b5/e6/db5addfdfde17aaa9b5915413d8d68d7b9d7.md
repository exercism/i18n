# ヒント

## 1. ギガ秒記念日の日付を計算する

- Universal timeは、エポックからの経過秒数を表す数値です。
- Common Lispには、universal timeをエンコードしたりデコードしたりできる関数が2つあります。
- 関数から返される複数の値は、適切なマクロを使うとリストにまとめられます。
- [`decode-universal-time`][hyperspec-decode-universal-time]と[`encode-universal-time`][hyperspec-encode-universla-time]のタイムゾーンの引数は省略できますが、重要です。それぞれのデフォルト値は何でしょうか？

[hyperspec-decode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_dec_un.htm#decode-universal-time
[hyperspec-encode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_encode.htm#encode-universal-time
