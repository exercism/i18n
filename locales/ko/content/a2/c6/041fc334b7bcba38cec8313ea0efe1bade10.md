# 소개

## 함수

Common Lisp에서 전역 함수를 정의할 때는 `defun` 표현식을 사용해요.
이 표현식은 첫 번째 인자로 매개변수 목록을 받아요. 빈 목록이면 함수에 매개변수가 없다는 뜻이에요.
그다음에는 선택적인 문서 문자열(아래를 참고하세요)이 오고, 이어서 함수의 "본문"을 이루는 0개 이상의 표현식이 와요.

함수는 매개변수를 0개 이상 가질 수 있어요.

```lisp
(defun no-args () (+ 1 1))

(defun add-one (x) (1+ x))

(defun add-nums (x y) (+ x y))
```

함수를 호출할 때는 함수를 가리키는 심볼을 표현식의 첫 번째 요소로 두고, 함수에 전달할 인자(있다면)를 표현식의 나머지 요소로 두어 표현식을 평가해요.

함수가 평가되어 나오는 값은 함수 본문에서 마지막으로 평가된 표현식의 값이에요.
모든 함수는 어떤 값으로 평가돼요.

```lisp
(add-nums 2 2) ;; => 4
```

함수는 선택적으로 문서 문자열('독스트링'이라고도 해요)을 가질 수도 있어요.
문서 문자열을 제공한다면 인자 목록 뒤, 함수 본문 앞에 와요.
문서 문자열은 `documentation`으로 접근할 수 있어요.

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
