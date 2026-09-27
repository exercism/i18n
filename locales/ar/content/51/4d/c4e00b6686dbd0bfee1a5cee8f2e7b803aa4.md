# مقدمة

جداول التجزئة في Factor هي *مصفوفات ترابطية*، أي مجموعات من أزواج `key/value` ذات بحث بزمن O(1). وهي جزء من عائلة [`assocs`][assocs] الأوسع.

## القيم الحرفية لجداول التجزئة

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }` هو جدول تجزئة فارغ. جداول التجزئة *قابلة للتغيير*، فهي تنمو وتتقلص عند إضافة المفاتيح وإزالتها. استخدم `clone` أولًا إذا أردت ترك الأصل دون تغيير. تُظهر طباعة جدول التجزئة مدخلاته، لكن ترتيبه لا يرتبط بترتيب الإدراج، فجداول التجزئة غير مرتبة.

## القراءة

تقرأ `at` (في [`assocs`][assocs]) قيمة، وتُرجع `f` إذا كان المفتاح غير موجود:

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## الكتابة

`set-at` تضيف قيمة أو تكتب فوقها، و`delete-at` تحذف، و`change-at` تُشغّل اقتباسًا على القيمة الحالية. الثلاث جميعها *تُغيّر* الجدول:

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`: اختصار العدّ التصاعدي

تضيف `inc-at` (وهي أيضًا في [`assocs`][assocs]) 1 إلى القيمة الموجودة لمفتاح معيّن، وتُدرجها بالقيمة 1 عند غياب المفتاح. مثالية لإحصاء التكرارات:

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## التكرار والإدراج المتأخر

تمرّ `assoc-each` على كل زوج `( key value -- )`، وتُرجع `cache` قيمة مفتاح ما، وتحسبها مرة واحدة بالاقتباس المزوّد إذا كان المفتاح غير موجود.

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache` هي نمط «ابحث أو أنشئ» في كلمة واحدة، وهي مفيدة عندما تبني جدول تجزئة من سيل من المفاتيح ولا تريد معالجة حالة المدخل المفقود عند كل موضع استدعاء.

## تطبيق تحديث جدول التجزئة على تسلسل من المفاتيح

عندما يكون المُدخل تسلسلًا من المفاتيح وتريد تحديث جدول التجزئة مرة واحدة لكل مفتاح، فكرّر على *التسلسل* باستخدام `each`، واستعمل اقتباسًا مقليًا `'[ _ … ]` (من [`fry`][fry]) لتثبيت جدول التجزئة في جسم الحلقة. على سبيل المثال، إزالة قائمة من المفاتيح:

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

يلتقط `'[ _ delete-at ]` جدول التجزئة الواقع فوقه في المكدس، بحيث لا يحتاج `each` في كل تكرار إلا إلى تمرير المفتاح. وتشغّل `keep` الاقتباس مع الحفاظ على جدول التجزئة من أجل `.` الأخيرة.

## بناء جدول تجزئة من تسلسل

يطبّق `map>assoc` (في [`assocs`][assocs]) اقتباسًا على تسلسل ويجمع نتائج `( elt -- key value )` في مصفوفة ترابطية من نوع النموذج:

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## المفاتيح والقيم والأزواج

تُرجع كل من `keys` و`values` (في [`assocs`][assocs]) المفاتيح فقط أو القيم فقط، بينما تُرجع `>alist` الأزواج `{ key value }`.

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

تتوافق `keys` و`values`: فالقيمة في موضع معيّن تنتمي إلى المفتاح في الموضع نفسه.

تُرجع `sort-keys` (في [`sorting`][sorting]) الأزواج `{ key value }` مرتّبة حسب المفتاح:

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## من الأزواج عائدًا إلى جدول تجزئة

`>hashtable` (في [`hashtables`][hashtables]) هي عكس `>alist`: فهي تحوّل أي مصفوفة ترابطية (وغالبًا ما تكون قائمة ترابط من أزواج `{ key value }`) إلى جدول تجزئة ببحث بزمن O(1).

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

وهي مفيدة عندما تكون قد جمّعت قائمة من الأزواج أو حوّلتها وتريد طيّها مجددًا في جدول تجزئة للبحث عن المدخلات حسب المفتاح.

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
