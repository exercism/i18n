# مقدمة

يمكن أن تحتوي المتجهات على عناصر مُسمّاة، وهو ما يجعل التعامل معها أكثر ملاءمة في بعض الأحيان.

## الإنشاء

هناك ثلاث أساليب لإضافة أسماء إلى متجه.

1) عند إنشاء المتجه

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) عن طريق إسناد متجه من الأحرف إلى `names()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> names(months) <- month.abb
> months
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
 31  28  31  30  31  30  31  31  30  31  30  31 
```

3) باستخدام `setNames()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> setNames(months, month.name)
  January  February     March     April       May      June      July    August September   October  November  December 
       31        28        31        30        31        30        31        31        30        31        30        31 
```

## الإزالة

إذا لم تعد الأسماء مطلوبة، فيمكن إزالتها بإسنادها إلى `NULL`

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

وتحقّق الدالة `unname()` النتيجة نفسها، وقد تجعل نيتك أوضح.

## التعامل مع الأسماء

يمكن للدالة `names()` أن تسترجع الأسماء كما يمكنها إسنادها.

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

يمكن استخدام اسم بدلًا من فهرس الموضع، مع اشتراط علامات الاقتباس في هذه الحالة.

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

لكي تعمل هذه الفهرسة بشكل صحيح، من الأفضل التأكد من أن الأسماء فريدة وغير مفقودة.
لكن R لا يفرض التفرد.

لا تزال عمليات المتجه المعتادة تعمل، وعادة ما تبقى الأسماء محفوظة إذا كان ذلك منطقيًا.

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
