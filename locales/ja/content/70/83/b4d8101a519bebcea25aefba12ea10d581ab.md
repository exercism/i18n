# ヒント

## 概要

- これらの演習では、[条件式][concept-conditionals]が必要です。

## 1. 文字を比較する

- 文字は、`char-greaterp`、`char-lessp`、`char=`などの関数で比較できます。

## 2. 文字の「大きさ」を判定する

- Common Lispには、文字が大文字か小文字かを判定する関数が2つあります：`upper-case-p`と`lower-case-p`です。
- 文字が大文字でも小文字でもないこともあります。

## 3. 文字の「大きさ」を変える

- Common Lispには、文字の大文字・小文字を変える関数が2つあります：`char-upcase`と`char-downcase`です。

## 4. 文字の「種類」を判定する

- Common Lispには、文字がアルファベットかどうかを判定する述語関数`alpha-char-p`があります。
- Common Lispには、文字が数字かどうかを判定する述語関数`digit-char-p`があります。
- `char=`を使うと、2つの文字が等しいかどうかを判定できます。
- スペース文字は、Common Lispでは`#\Space`と書きます。
- 改行文字は、Common Lispでは`#\Newline`と書きます。

[concept-conditionals]: /tracks/common-lisp/concepts/conditionals
