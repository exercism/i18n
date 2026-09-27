# نبذة

Common Lisp، شأنه شأن اللغات الأخرى، له مجموعة من القواعد التي تحدد ما إذا كان كائنان «متماثلين». وتحدد هذه القواعد أربعة مستويات، لكل منها دالة تُجري ذلك المستوى من الفحص. وتترتب المستويات من الأكثر صرامة إلى الأكثر تسامحًا.

## `eq`

المستوى الأول هو هوية الكائن. ويُفحص هذا التماثل بالدالة [`eq`][hyper-eq]. ويجب أن يكون الكائنان اللذان يُفحصان للتماثل هو الكائن نفسه بعينه:

```lisp
(eq 'apples 'apples)  ; => T
(eq 'apples 'oranges) ; => NIL

(eq '(a b c) '(a b c) ; => NIL (these two lists have the same contents but are not the same list)
(let ((list1 '(a b c)) (list2 list1)) 
  (eq list1 list2))   ; => T (these two lists are the same list)
```

## `eql`

المستوى الثاني يضيف تماثل الأعداد والحروف. ويُفحص هذا التماثل بالدالة [`eql`][hyper-eql]. وتعتمد طريقة الفحص على أنواع الوسائط:

- أي كائنين يكونان `eq` يكونان `eql`
- الأعداد تكون `eql` إذا كانت من النوع والقيمة نفسيهما
- الحروف تكون `eql` إذا كانت تمثل الحرف نفسه.

```lisp
(eql 1 1)     ; => T
(eql 1 1/1)   ; => NIL (one number is an integer, the other a rational)
(eql #\c #\c) ; => T
(eql #\c #\C) ; => NIL (case is different)
```

قد يتساءل المرء لماذا لا تُقارن الأعداد والحروف من حيث هوية الكائن باستخدام [`eq`][hyper-eq]. يسمح معيار Common Lisp للتنفيذات بأن تنسخ الأعداد والحروف إن اختارت ذلك. ولذلك قد لا يكون `0` و`0` متماثلين بـ [`eq`][hyper-eq] لأنهما قد يكونان نسختين مختلفتين من العدد `0`.

## `equal`

المستوى الثالث يفحص التشابه البنيوي. ويُفحص هذا التماثل بـ [`equal`][hyper-equal]. وتعتمد طريقة الفحص على أنواع الوسائط:

- تُقارن الرموز كما لو كانت بـ [`eq`][hyper-eq]
- تُقارن الحروف والأعداد كما لو كانت بـ `eql`
- تكون أزواج `cons` متماثلة بـ [`equal`][hyper-equal] إذا كانت عناصرها [`equal`][hyper-equal]. ويُجرى هذا بشكل تعاودي.
- تكون السلاسل النصية والمتجهات البتية متماثلة بـ [`equal`][hyper-equal] إذا كانت عناصرها `eql`
- تُقارن المصفوفات من الأنواع الأخرى كما لو كانت بـ [`eq`][hyper-eq]
- تكون مسارات الملفات متماثلة بـ [`equal`][hyper-equal] إذا كانت متكافئة وظيفيًا.
(هناك مجال لسلوك يعتمد على التنفيذ هنا فيما يتعلق بحساسية حالة الأحرف في السلاسل النصية التي تكوّن مكوّنات مسارات الملفات.)
- تُقارن الكائنات من أي نوع آخر كما لو كانت بـ [`eq`][hyper-eq]

```lisp
(equal '(a (b c)) '(a (b c)))         ; => T (conses are equal if their contents are equal)
(equal "hello" "hello")               ; => T
(equal "hello" "HELLO")               ; => NIL
(equal #(1 2 3) #(1 2 3))             ; => NIL (arrays are equal only if eq)
(equal #P"foo/bar.md" #P"foo/bar.md") ; => T (pathnames are equal if "functionally equivalent"
```

## `equalp`

المستوى الرابع والأكثر تسامحًا من التماثل يُفحص بـ [`equalp`][hyper-equalp]. وتعتمد طريقة الفحص على الأنواع:

- إذا كان الكائنان [`equalp`][hyper-equalp] فإنهما [`equalp`][hyper-equalp]
- تكون الأعداد [`equalp`][hyper-equalp] إذا كانت لها القيمة نفسها حتى لو لم تكن من النوع نفسه
- تُقارن الحروف والسلاسل النصية دون اعتبار لحالة الأحرف
- تكون أزواج `cons` [`equalp`][hyper-equalp] إذا كانت عناصرها [`equalp`][hyper-equalp]. ويُجرى هذا بشكل تعاودي.
- تكون المصفوفات [`equalp`][hyper-equalp] إذا كان لها العدد نفسه من الأبعاد، وكانت تلك الأبعاد متطابقة، وكان كل عنصر [`equalp`][hyper-equalp].
- تكون البُنى [`equalp`][hyper-equalp] إذا كان لها الصنف والخانات نفسها، وكانت كل واحدة من تلك الخانات [`equalp`][hyper-equalp] بين البنيَتين.
- تكون جداول التجزئة [`equalp`][hyper-equalp] إذا كان لكلٍّ منهما دالة `:test` نفسها، وكان لهما المفاتيح نفسها (بالمقارنة بتلك الدالة `:test`)، وكان لتلك المفاتيح القيم نفسها بالمقارنة بـ [`equalp`][hyper-equalp].

```lisp
(equalp 1 1.0)                       ; => T
(equalp #\c #\C)                     ; => T
(equalp "hello" "HELLO")             ; => T
(equalp #(1 2 3) #(1.0 2.0 3.0))     ; => T (arrays contain elements which are `equalp`)
(equal #S(TEST :SLOT1 'a :SLOT2 'b) 
       #S(TEST :SLOT1 'a :SLOT2 'b)) ; => T (structures of the same class with slots that have values which are `equalp`)
```

## دوال خاصة بالنوع

ما سبق هو دوال التماثل «العامة». وهي تعمل، كما هي معرّفة، مع أي نوع. وقد يكون هذا مفيدًا عند كتابة كود عام لا يعرف أنواع الكائنات التي سيقارنها إلا وقت التشغيل. غير أنه يُعتبر عمومًا «أسلوبًا أفضل» استخدام دوال التماثل الخاصة بالنوع عندما يعرف المرء الأنواع التي تُقارن. على سبيل المثال `string=` بدلًا من `equal`. وستُعرض هذه الدوال وتُناقش في المفاهيم ذات الصلة.

[hyper-eq]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eq.htm
[hyper-eql]: http://www.lispworks.com/documentation/HyperSpec/Body/f_eql.htm
[hyper-equal]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equal.htm
[hyper-equalp]: http://www.lispworks.com/documentation/HyperSpec/Body/f_equalp.htm
