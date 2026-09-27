# نبذة

المصفوفات هي نوع التسلسل ثابت الطول في Factor: يمكنك تغيير العناصر لكن لا يمكنك تغيير الطول.
تستخدم الصيغ الحرفية `{ … }` مع مسافات بيضاء بين العناصر؛ وتضيف مفردات `arrays` مُنشِئات صغيرة تسحب القيم من المكدس:

| الكلمة     | التأثير                              |
|----------|-------------------------------------|
| `1array` | `( a     -- { a } )`                |
| `2array` | `( a b   -- { a b } )`              |
| `3array` | `( a b c -- { a b c } )`            |
| `<array>`| `( n elt -- array )`، `n` نسخة من `elt` |
| `array?` | `( obj   -- ? )`، اختبار النوع   |

بضع كلمات من [بروتوكول][sequence-protocol] في `sequences` تظهر كثيرًا مع المصفوفات حتى إنها تستحق أن تُعرف كوحدة واحدة:

| الكلمة      | التأثير                                                |
|-----------|-------------------------------------------------------|
| `concat`  | `( seqs -- seq )`، تسطيح تسلسل من التسلسلات   |
| `join`    | `( seqs glue -- seq )`، تسطيح مع فاصل     |
| `reverse` | `( seq -- newseq )`                                   |
| `index`   | `( elt seq -- i/f )`، فهرس العنصر أو `f`       |
| `member?` | `( elt seq -- ? )`، اختبار العضوية                  |

```factor
USING: arrays sequences ;

3 4 2array .                       ! => { 3 4 }
{ { 1 2 } { 3 4 } } concat .       ! => { 1 2 3 4 }
{ 1 2 3 4 } reverse .              ! => { 4 3 2 1 }
"b" { "a" "b" "c" } index .        ! => 1
"b" { "a" "b" "c" } member? .      ! => t
```

`all-unique?` و`members` من [`sets`][sets] تقبلان أيضًا أي تسلسل، وهذا مفيد عندما يُراد إزالة التكرار من عناصر مصفوفة أو التحقق من تكراراتها دون تحويلها أولًا إلى مجموعة تجزئة.

[sets]: https://docs.factorcode.org/content/vocab-sets.html
[sequence-protocol]: https://docs.factorcode.org/content/article-sequence-protocol.html
