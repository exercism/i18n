# Introducción

## Funciones

Para definir una función global en Common Lisp se usa la expresión `defun`.
Esta expresión toma como primer argumento una lista de parámetros (una lista vacía significa que la función no tiene parámetros).
Después viene una cadena de documentación opcional (ver más abajo) y, luego, cero o más expresiones que forman el «cuerpo» de la función.

Las funciones pueden tener cero o más parámetros.

```lisp
(defun no-args () (+ 1 1))

(defun add-one (x) (1+ x))

(defun add-nums (x y) (+ x y))
```

Para llamar a una función, se evalúa una expresión cuyo primer elemento es el símbolo que designa la función y cuyos elementos restantes son los argumentos de la función (si los hay).

El valor al que evalúa una función es el valor de la última expresión evaluada en el cuerpo de la función.
Todas las funciones evalúan a un valor.

```lisp
(add-nums 2 2) ;; => 4
```

Las funciones también pueden tener, de forma opcional, una cadena de documentación (también llamada «docstring»).
Si se incluye, va después de la lista de argumentos, pero antes del cuerpo de la función.
Se puede acceder a la cadena de documentación mediante `documentation`.

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
