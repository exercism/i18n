# 提示

## General

- 這些練習會用到[條件運算式][concept-conditionals]。

## 1. 比較字元

- 字元可以用`char-greaterp`、`char-lessp`和`char=`這類函式來比較。

## 2. 判斷字元的「大小」

- Common Lisp 有兩個函式可以判斷字元是大寫還是小寫：`upper-case-p`和`lower-case-p`。
- 字元也可能既不是大寫，也不是小寫。

## 3. 改變字元的「大小」

- Common Lisp 有兩個函式可以改變字元的大小寫：`char-upcase`和`char-downcase`。

## 4. 判斷字元的「類型」

- Common Lisp 有一個述詞函式`alpha-char-p`，可以判斷字元是否為字母字元。
- Common Lisp 有一個述詞函式`digit-char-p`，可以判斷字元是否為數字字元。
- 你可以使用`char=`來判斷兩個字元是否相等。
- 空白字元在 Common Lisp 中寫作 #\Space。
- 換行字元在 Common Lisp 中寫作 #\Newline。

[concept-conditionals]: /tracks/common-lisp/concepts/conditionals
