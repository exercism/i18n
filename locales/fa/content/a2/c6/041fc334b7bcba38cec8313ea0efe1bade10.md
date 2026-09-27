# مقدمه

## تابع

برای تعریف یک تابع سراسری در Common Lisp از عبارت `defun` استفاده می‌شود.
این عبارت به عنوان اولین آرگومانش فهرستی از پارامترها می‌گیرد (فهرست خالی یعنی تابع هیچ پارامتری ندارد).
پس از آن یک رشته‌ی مستندات اختیاری می‌آید (به پایین نگاه کنید) و سپس صفر یا چند عبارت که «بدنه‌ی» تابع را تشکیل می‌دهند.

توابع می‌توانند صفر یا چند پارامتر داشته باشند.

```lisp
(defun no-args () (+ 1 1))

(defun add-one (x) (1+ x))

(defun add-nums (x y) (+ x y))
```

برای فراخوانی یک تابع، عبارتی ارزیابی می‌شود که نماد معرف تابع، اولین عنصر آن است و آرگومان‌های تابع (در صورت وجود) عناصر باقی‌مانده‌ی آن عبارت‌اند.

مقداری که یک تابع به آن ارزیابی می‌شود، مقدار آخرین عبارتی است که در بدنه‌ی تابع ارزیابی شده است.
همه‌ی توابع به یک مقدار ارزیابی می‌شوند.

```lisp
(add-nums 2 2) ;; => 4
```

توابع می‌توانند به‌صورت اختیاری یک رشته‌ی مستندات هم داشته باشند (که به آن «داک‌استرینگ» هم می‌گویند).
اگر ارائه شود، بعد از فهرست آرگومان‌ها اما پیش از بدنه‌ی تابع می‌آید.
می‌توان با `documentation` به رشته‌ی مستندات دسترسی داشت.

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
