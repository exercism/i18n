# Докладніше

У Common Lisp, як і в інших мовах, є набір правил, які визначають, чи два обʼєкти є «однаковими».
Ці правила задають чотири рівні, і для кожного з них є функція, яка виконує відповідну перевірку.
Рівні впорядковано від найсуворішого до наймʼякшого.

## `eq`

Перший рівень - тотожність обʼєктів.
Цю рівність перевіряють за допомогою функції [`eq`][hyper-eq].
Два обʼєкти, які перевіряють на рівність, мають бути тим самим обʼєктом:

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

Другий рівень додає рівність чисел і символів.
Цю рівність перевіряють за допомогою функції [`eql`][hyper-eql].
Спосіб перевірки залежить від типів аргументів:

- Будь-які два обʼєкти, які є `eq`, є також `eql`
- Числа є `eql`, якщо вони належать до того самого типу й мають те саме значення
- Символи є `eql`, якщо вони позначають той самий символ.

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

Може виникнути питання, чому числа й символи не порівнюють на тотожність обʼєктів за допомогою [`eq`][hyper-eq].
Стандарт Common Lisp дозволяє реалізаціям копіювати числа й символи, якщо вони цього захочуть.
Тож `0` і `0` можуть не бути [`eq`][hyper-eq], оскільки це можуть бути різні екземпляри числа `0`.

## `equal`

Третій рівень перевіряє структурну подібність.
Цю рівність перевіряють за допомогою [`equal`][hyper-equal].
Спосіб перевірки залежить від типів аргументів:

- Lisp-символи порівнюються так, ніби за допомогою [`eq`][hyper-eq]
- символи та числа порівнюються так, ніби за допомогою `eql`
- конси є [`equal`][hyper-equal], якщо їхні елементи є [`equal`][hyper-equal].
Це робиться рекурсивно.
- рядки тексту (англ. string) та бітові вектори є [`equal`][hyper-equal], якщо їхні елементи є `eql`
- масиви інших типів порівнюються так, ніби за допомогою [`eq`][hyper-eq]
- шляхи є [`equal`][hyper-equal], якщо вони функціонально еквівалентні.
(Тут можлива поведінка, залежна від реалізації, щодо чутливості до регістру рядків тексту, з яких складаються компоненти шляхів.)
- обʼєкти будь-якого іншого типу порівнюються так, ніби за допомогою [`eq`][hyper-eq]

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

Четвертий, найвільніший рівень рівності перевіряють за допомогою [`equalp`][hyper-equalp].
Спосіб перевірки залежить від типів:

- якщо два обʼєкти є [`equalp`][hyper-equalp], то вони є [`equalp`][hyper-equalp]
- числа є [`equalp`][hyper-equalp], якщо вони мають однакове значення, навіть коли належать до різних типів
- символи та рядки тексту порівнюються без урахування регістру
- конси є [`equalp`][hyper-equalp], якщо їхні елементи є [`equalp`][hyper-equalp].
Це робиться рекурсивно.
- масиви є [`equalp`][hyper-equalp], якщо вони мають однакову кількість вимірів, ці виміри однакові, і кожен елемент є [`equalp`][hyper-equalp].
- структури є [`equalp`][hyper-equalp], якщо вони мають той самий клас і ті самі слоти, і кожен із цих слотів є [`equalp`][hyper-equalp] у двох структурах.
- хеш-таблиці є [`equalp`][hyper-equalp], якщо в обох однакова функція `:test`, вони мають ті самі ключі (порівняно цією функцією `:test`), і ці ключі мають однакові значення за [`equalp`][hyper-equalp].

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## Функції, специфічні для типів

Наведені вище функції - «загальні» функції рівності.
Як визначено, вони працюють для будь-якого типу.
Це може стати в пригоді, коли ми пишемо загальний код, який до моменту виконання не знає типів обʼєктів, які порівнюватиме.
Однак зазвичай «кращим стилем» вважається використовувати функції рівності, специфічні для типу, коли ми знаємо типи, які порівнюємо.
Наприклад, `string=` замість `equal`.
Ці функції ми представимо й обговоримо у відповідних концепціях.

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
