# Вступ

## Функції

Щоб визначити глобальну функцію в Common Lisp, ми використовуємо вираз `defun`.
Першим аргументом цей вираз приймає список параметрів (порожній список означає, що функція не має параметрів).
Далі йде необовʼязковий рядок тексту документації (англ. string), про який ідеться нижче, а потім нуль або більше виразів, які складають «тіло» функції.

Функції можуть мати нуль або більше параметрів.

```lisp
(defun no-args () (+ 1 1))

(defun add-one (x) (1+ x))

(defun add-nums (x y) (+ x y))
```

Щоб викликати функцію, ми обчислюємо вираз, першим елементом якого є символ, що позначає функцію, а рештою елементів - аргументи функції (якщо вони є).

Результатом обчислення функції стає значення останнього обчисленого виразу в тілі функції.
Усі функції обчислюються до якогось значення.

```lisp
(add-nums 2 2) ;; => 4
```

Функції також можуть мати, необовʼязково, рядок тексту документації (який ще називають «докстрінг»).
Якщо його вказано, він іде після списку аргументів, але перед тілом функції.
До рядка тексту документації можна дістатися через `documentation`.

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
