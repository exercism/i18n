# Einführung

## Funktionen

Um in Common Lisp eine globale Funktion zu definieren, verwendet man den `defun`-Ausdruck.
Dieser Ausdruck nimmt als erstes Argument eine Liste von Parametern entgegen (eine leere Liste bedeutet, dass die Funktion keine Parameter hat).
Danach folgt ein optionaler Dokumentations-String (siehe unten) und anschließend null oder mehr Ausdrücke, die den „Rumpf“ der Funktion bilden.

Funktionen können null oder mehr Parameter haben.

```lisp
(defun no-args () (+ 1 1))

(defun add-one (x) (1+ x))

(defun add-nums (x y) (+ x y))
```

Eine Funktion ruft man auf, indem man einen Ausdruck auswertet, dessen erstes Element das Symbol ist, das die Funktion bezeichnet, und dessen restliche Elemente die Argumente für die Funktion sind (falls es welche gibt).

Der Wert, zu dem eine Funktion auswertet, ist der Wert des letzten Ausdrucks im Rumpf der Funktion, der ausgewertet wurde. 
Alle Funktionen werten zu einem Wert aus.

```lisp
(add-nums 2 2) ;; => 4
```

Funktionen können außerdem optional einen Dokumentations-String haben (auch „Docstring“ genannt).
Wenn er angegeben wird, steht er nach der Argumentliste, aber vor dem Rumpf der Funktion.
Auf den Dokumentations-String kann man über `documentation` zugreifen.

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
