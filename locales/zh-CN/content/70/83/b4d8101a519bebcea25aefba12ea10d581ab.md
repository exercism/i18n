# 提示

## 通用

- 这些练习中你会用到[条件表达式][concept-conditionals]。

## 1. 比较字符

- 字符可以用`char-greaterp`、`char-lessp`和`char=`等函数进行比较。

## 2. 判断字符的“大小”

- Common Lisp 有两个函数来判断字符是大写还是小写：`upper-case-p`和`lower-case-p`。
- 字符也可能既不是大写，也不是小写。

## 3. 更改字符的“大小”

- Common Lisp 有两个函数可以更改字符的大小写：`char-upcase`和`char-downcase`。

## 4. 判断字符的“类型”

- Common Lisp 有一个谓词函数`alpha-char-p`，用于判断字符是否为字母字符。
- Common Lisp 有一个谓词函数`digit-char-p`，用于判断字符是否为数字字符。
- 你可以用`char=`来判断两个字符是否相等。
- 空格字符在 Common Lisp 中写作 #\Space。
- 换行字符在 Common Lisp 中写作 #\Newline。

[concept-conditionals]: /tracks/common-lisp/concepts/conditionals
