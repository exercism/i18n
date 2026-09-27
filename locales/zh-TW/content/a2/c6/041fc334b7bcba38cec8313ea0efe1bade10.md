# 簡介

## 函式

在 Common Lisp 中，要定義全域函式可以使用`defun`運算式。
這個運算式的第一個引數是參數的陣列（空的陣列代表這個函式沒有參數）。
接著是選用的文件字串（見下文），然後是零個或多個運算式，組成函式的「主體」。

函式可以有零個或多個參數。

```lisp
(defun no-args () (+ 1 1))

(defun add-one (x) (1+ x))

(defun add-nums (x y) (+ x y))
```

呼叫函式的方式是求值一個運算式：把代表該函式的符號放在運算式的第一個元素，函式的引數（如果有的話）則放在運算式中其餘的位置。

函式求值後所得到的值，就是函式主體中最後被求值的那個運算式的值。
所有函式都會求值出一個值。

```lisp
(add-nums 2 2) ;; => 4
```

函式也可以選擇性地帶有一個文件字串（也稱作「docstring」）。
如果有的話，它會放在引數的陣列之後、函式主體之前。
你可以透過`documentation`取得文件字串。

```lisp
(defun add-nums (x y) "Add X and Y together" (+ x y))

(documentation 'add-nums 'function) ;; => "Add X and Y together"

;; Note that if one provides a docstring but fails to provide a body
;; then the docstring is interpreted by Common Lisp as the body, not
;; the docstring
(defun no-body ())
(no-body) ;; => NIL

(defun mistake () "This is not a docstring")
(mistake) ;; => "This is not a docstring"
(documentation 'mistake 'function) ;; => NIL
```
