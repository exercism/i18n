# Bevezetés

## Függvények

Common Lispben egy globális függvényt a `defun` kifejezéssel definiálsz.
Ez a kifejezés első argumentumaként a paraméterek listáját kapja (az üres lista azt jelenti, hogy a függvénynek nincs paramétere).
Ezt egy opcionális dokumentációs string követi (lásd lentebb), majd nulla vagy több kifejezés, amelyek a függvény „törzsét” alkotják.

A függvényeknek nulla vagy több paramétere lehet.

```lisp
(defun no-args () (+ 1 1))

(defun add-one (x) (1+ x))

(defun add-nums (x y) (+ x y))
```

Egy függvényt úgy hívsz meg, hogy kiértékelsz egy kifejezést, amelynek első eleme a függvényt jelölő szimbólum, a többi eleme pedig a függvény argumentumai (ha vannak).

A függvény értéke a függvény törzsében kiértékelt utolsó kifejezés értéke.
Minden függvény kiértékelődik valamilyen értékre.

```lisp
(add-nums 2 2) ;; => 4
```

A függvényeknek opcionálisan lehet dokumentációs stringjük (más néven „docstring”).
Ha megadod, az argumentumlista után, de a függvény törzse előtt áll.
A dokumentációs stringhez a `documentation` segítségével férhetsz hozzá.

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
