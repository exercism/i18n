# Introdução

## Funções

Para definir uma função global em Common Lisp, usamos a expressão `defun`.
Esta expressão recebe como primeiro argumento uma lista de parâmetros (uma lista vazia significa que a função não tem parâmetros).
A seguir vem uma string de documentação opcional (ver abaixo) e, depois, zero ou mais expressões que constituem o "corpo" da função.

As funções podem ter zero ou mais parâmetros.

```lisp
(defun no-args () (+ 1 1))

(defun add-one (x) (1+ x))

(defun add-nums (x y) (+ x y))
```

Para chamar uma função, avalia-se uma expressão em que o símbolo que designa a função é o primeiro elemento e os argumentos da função (se existirem) são os elementos restantes da expressão.

O valor de uma função é o valor da última expressão avaliada no corpo dessa função.
Todas as funções produzem um valor.

```lisp
(add-nums 2 2) ;; => 4
```

As funções podem também ter, opcionalmente, uma string de documentação (também chamada 'docstring').
Se existir, vem depois da lista de argumentos, mas antes do corpo da função.
Podes aceder à string de documentação através de `documentation`.

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
