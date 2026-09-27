# مقدمه

«جدول هش» در Factor یک *آرایه‌ی انجمنی* است؛ مجموعه‌ای از جفت‌های `key/value` با زمان جست‌وجوی O(1). جدول هش بخشی از خانواده‌ی بزرگ‌تر [`assocs`][assocs] است.

## لیترال‌های جدول هش

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

`H{ }` یک جدول هش خالی است. جدول‌های هش *تغییرپذیرند* و با افزودن و حذف کلیدها بزرگ و کوچک می‌شوند؛ اگر می‌خواهید نسخه‌ی اصلی دست‌نخورده بماند، اول `clone` کنید. چاپ یک جدول هش، درایه‌هایش را نشان می‌دهد، اما ترتیبش به ترتیب درج وابسته نیست: جدول هش ترتیبی ندارد.

## خواندن

`at` (در [`assocs`][assocs]) یک مقدار را می‌خواند و اگر کلید نبود، `f` را برمی‌گرداند:

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## نوشتن

`set-at` اضافه یا بازنویسی می‌کند؛ `delete-at` حذف می‌کند؛ `change-at` یک قطعه‌کد را روی مقدار فعلی اجرا می‌کند. هر سه جدول را *در جا* تغییر می‌دهند:

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`، میانبر شمارش

`inc-at` (که در [`assocs`][assocs] هم هست) به مقدار موجود برای یک کلید ۱ واحد اضافه می‌کند و اگر کلید نبود، آن را با مقدار ۱ درج می‌کند. برای شمارش، عالی است:

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## پیمایش و درج تنبل

`assoc-each` روی همه‌ی جفت‌های `( key value -- )` حرکت می‌کند؛ `cache` مقدار یک کلید را برمی‌گرداند و اگر کلید نبود، آن را یک‌بار با قطعه‌کد داده‌شده محاسبه می‌کند.

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

`cache` الگوی «جست‌وجو یا ساختن» را در یک واژه خلاصه می‌کند؛ وقتی از جریانی از کلیدها جدول هش می‌سازید و نمی‌خواهید در هر نقطه‌ی فراخوانی حالت نبودن درایه را رسیدگی کنید، به کار می‌آید.

## اعمال به‌روزرسانی جدول هش روی دنباله‌ای از کلیدها

وقتی ورودی دنباله‌ای از کلیدهاست و می‌خواهید جدول هش را برای هر کلید یک‌بار به‌روزرسانی کنید، روی خود *دنباله* با `each` پیمایش کنید و از یک قطعه‌کد سرخ‌شده به شکل `'[ _ … ]` (از [`fry`][fry]) استفاده کنید تا جدول هش را در بدنه‌ی حلقه جای دهید. برای نمونه، حذف فهرستی از کلیدها:

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

`'[ _ delete-at ]` جدول هشی را که بالاتر از آن روی پشته است در بر می‌گیرد، تا در هر تکرار `each` فقط کلید را بدهد. `keep` قطعه‌کد را اجرا می‌کند و در همان حال جدول هش را برای `.` نهایی نگه می‌دارد.

## ساختن جدول هش از یک دنباله

`map>assoc` (در [`assocs`][assocs]) یک قطعه‌کد را روی یک دنباله اعمال می‌کند و نتایج `( elt -- key value )` را در یک assoc از نوع نمونه گرد می‌آورد:

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## کلیدها، مقدارها و جفت‌ها

`keys` و `values` (در [`assocs`][assocs]) فقط کلیدها یا فقط مقدارها را برمی‌گردانند؛ `>alist` جفت‌های `{ key value }` را برمی‌گرداند.

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

`keys` و `values` هم‌ترازند: مقدار در یک جایگاه، به کلید در همان جایگاه تعلق دارد.

`sort-keys` (در [`sorting`][sorting]) جفت‌های `{ key value }` را به‌ترتیب کلید برمی‌گرداند:

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## بازگشت از جفت‌ها به جدول هش

`>hashtable` (در [`hashtables`][hashtables]) وارون `>alist` است: هر assoc را، که بیشتر وقت‌ها یک alist از جفت‌های `{ key value }` است، به جدول هشی با جست‌وجوی O(1) تبدیل می‌کند.

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

وقتی فهرستی از جفت‌ها را سرهم کرده‌اید یا تغییر داده‌اید و می‌خواهید دوباره آن را به جدول هش برگردانید تا درایه‌ها را با کلید جست‌وجو کنید، به کار می‌آید.

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
