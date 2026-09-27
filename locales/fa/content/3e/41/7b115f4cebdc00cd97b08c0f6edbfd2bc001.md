# درباره

Common Lisp هم مانند زبان‌های دیگر مجموعه‌ای از قواعد دارد که بر اساس آن‌ها تصمیم گرفته می‌شود آیا دو شیء «یکسان» هستند یا نه. این قواعد چهار سطح را تعریف می‌کنند و هر سطح تابعی دارد که همان سطح از بررسی را انجام می‌دهد. سطح‌ها از سخت‌گیرانه‌ترین به آزادترین مرتب شده‌اند.

## `eq`

سطح اول، اینهمانی شیء است.
این برابری با تابع [`eq`][hyper-eq] بررسی می‌شود.
دو شیئی که برای برابری بررسی می‌شوند باید دقیقاً همان یک شیء باشند:

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

سطح دوم برابری اعداد و کاراکترها را هم اضافه می‌کند.
این برابری با تابع [`eql`][hyper-eql] بررسی می‌شود.
شیوه‌ی انجام بررسی به نوع آرگومان‌ها بستگی دارد:

- هر دو شیئی که `eq` باشند، `eql` هم هستند
- اعداد اگر از یک نوع و با یک مقدار باشند `eql` هستند
- کاراکترها اگر یک کاراکتر یکسان را نمایش دهند `eql` هستند.

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

شاید بپرسید چرا اعداد و کاراکترها با [`eq`][hyper-eq] برای اینهمانی شیء مقایسه نمی‌شوند.
استاندارد Common Lisp به پیاده‌سازی‌ها اجازه می‌دهد اگر بخواهند اعداد و کاراکترها را کپی کنند.
بنابراین `0` و `0` ممکن است [`eq`][hyper-eq] نباشند، چون می‌توانند نمونه‌های متفاوتی از عدد `0` باشند.

## `equal`

سطح سوم شباهت ساختاری را بررسی می‌کند.
این برابری با [`equal`][hyper-equal] بررسی می‌شود.
شیوه‌ی انجام بررسی به نوع آرگومان‌ها بستگی دارد:

- نمادها همانند [`eq`][hyper-eq] مقایسه می‌شوند
- کاراکترها و اعداد همانند `eql` مقایسه می‌شوند
- consها اگر عنصرهایشان [`equal`][hyper-equal] باشند [`equal`][hyper-equal] هستند.
این کار به‌صورت بازگشتی انجام می‌شود.
- رشته‌ها و بردارهای بیت اگر عنصرهایشان `eql` باشند [`equal`][hyper-equal] هستند
- آرایه‌هایی از نوع‌های دیگر همانند [`eq`][hyper-eq] مقایسه می‌شوند
- نام‌های مسیر اگر از نظر کارکردی معادل باشند [`equal`][hyper-equal] هستند.
(اینجا جا برای رفتار وابسته به پیاده‌سازی وجود دارد، در مورد حساسیت به بزرگی و کوچکی حروف در رشته‌هایی که اجزای نام مسیر را می‌سازند.)
- اشیاء از هر نوع دیگری همانند [`eq`][hyper-eq] مقایسه می‌شوند

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

سطح چهارم و آزادترین سطح برابری با [`equalp`][hyper-equalp] بررسی می‌شود.
شیوه‌ی انجام بررسی به نوع‌ها بستگی دارد:

- اگر دو شیء [`equalp`][hyper-equalp] باشند، آنگاه [`equalp`][hyper-equalp] هستند
- اعداد اگر مقدار یکسان داشته باشند [`equalp`][hyper-equalp] هستند، حتی اگر از یک نوع نباشند
- کاراکترها و رشته‌ها بدون توجه به بزرگی و کوچکی حروف مقایسه می‌شوند
- consها اگر عنصرهایشان [`equalp`][hyper-equalp] باشند [`equalp`][hyper-equalp] هستند.
این کار به‌صورت بازگشتی انجام می‌شود.
- آرایه‌ها اگر تعداد ابعاد یکسان داشته باشند و آن ابعاد یکسان باشند و هر عنصر [`equalp`][hyper-equalp] باشد، [`equalp`][hyper-equalp] هستند.
- ساختارها اگر کلاس و اسلات‌های یکسان داشته باشند و هر یک از آن اسلات‌ها بین دو ساختار [`equalp`][hyper-equalp] باشد، [`equalp`][hyper-equalp] هستند.
- جدول‌های درهم‌سازی اگر هر دو تابع `:test` یکسان داشته باشند، کلیدهای یکسان داشته باشند (وقتی با همان تابع `:test` مقایسه شوند) و آن کلیدها مقادیر یکسانی داشته باشند (وقتی با [`equalp`][hyper-equalp] مقایسه شوند)، [`equalp`][hyper-equalp] هستند.

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## توابع مختص نوع

موارد بالا توابع برابری «عمومی» هستند.
آن‌ها همان‌طور که تعریف شده‌اند برای هر نوعی کار می‌کنند.
این می‌تواند زمانی مفید باشد که کد عمومی می‌نویسید و تا زمان اجرا نمی‌دانید چه نوع اشیائی را مقایسه خواهید کرد.
اما وقتی نوع چیزهایی که مقایسه می‌شوند را می‌دانید، عموماً «سبک بهتر» این است که از توابع برابری مختص نوع استفاده کنید.
برای نمونه `string=` به‌جای `equal`.
این توابع در مفاهیم مرتبط معرفی و بررسی می‌شوند.

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
