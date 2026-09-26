# Introdução

## Funções

Para definir uma função global em Common Lisp, usa-se a expressão `defun`.
Essa expressão recebe como primeiro argumento uma lista de parâmetros (uma lista vazia significa que a função não tem parâmetros).
Em seguida vem uma string de documentação opcional (veja abaixo) e depois zero ou mais expressões que compõem o "corpo" da função.

Funções podem ter zero ou mais parâmetros.

```lisp
(defun no-args () (+ 1 1))

(defun add-one (x) (1+ x))

(defun add-nums (x y) (+ x y))
```

Para chamar uma função, avalia-se uma expressão cujo primeiro elemento é o símbolo que designa a função e cujos itens restantes são os argumentos da função (se houver).

O valor que uma função produz ao ser avaliada é o valor da última expressão avaliada no corpo da função.
Todas as funções resultam em um valor.

```lisp
(add-nums 2 2) ;; => 4
```

Funções também podem ter, opcionalmente, uma string de documentação (também chamada de 'docstring').
Se fornecida, ela vem depois da lista de argumentos, mas antes do corpo da função.
A string de documentação pode ser acessada via `documentation`.

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
