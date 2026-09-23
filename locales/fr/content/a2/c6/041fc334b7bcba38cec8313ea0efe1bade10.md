# Introduction

## Fonctions

Pour définir une fonction globale en Common Lisp, on utilise l'expression `defun`.
Cette expression prend comme premier argument une liste de paramètres (une liste vide signifie que la fonction n'a pas de paramètres).
Viennent ensuite une chaîne de documentation facultative (voir plus bas), puis zéro ou plusieurs expressions qui constituent le « corps » de la fonction.

Une fonction peut avoir zéro ou plusieurs paramètres.

```lisp
(defun no-args () (+ 1 1))

(defun add-one (x) (1+ x))

(defun add-nums (x y) (+ x y))
```

Pour appeler une fonction, on évalue une expression dont le premier élément est le symbole qui désigne la fonction et dont les éléments restants sont les arguments de la fonction (s'il y en a).

La valeur à laquelle s'évalue une fonction est la valeur de la dernière expression évaluée dans le corps de la fonction.
Toutes les fonctions s'évaluent à une valeur.

```lisp
(add-nums 2 2) ;; => 4
```

Une fonction peut aussi comporter une chaîne de documentation facultative (aussi appelée « docstring »).
Si elle est fournie, elle vient après la liste des arguments mais avant le corps de la fonction.
On peut accéder à la chaîne de documentation via `documentation`.

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
