# مقدمه

بردارها می‌توانند عناصر نام‌دار داشته باشند، که گاهی کار کردن با آن‌ها را راحت‌تر می‌کند.

## ایجاد

سه روش برای افزودن اسم به یک بردار وجود دارد.

1) هنگام ساخت بردار

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) با اختصاص دادن یک بردار کاراکتری به `names()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> names(months) <- month.abb
> months
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
 31  28  31  30  31  30  31  31  30  31  30  31 
```

3) با `setNames()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> setNames(months, month.name)
  January  February     March     April       May      June      July    August September   October  November  December 
       31        28        31        30        31        30        31        31        30        31        30        31 
```

## حذف

اگر دیگر اسم‌ها را نمی‌خواهید، می‌توان با تنظیم آن‌ها روی `NULL` حذفشان کرد.

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

تابع `unname()` همین کار را انجام می‌دهد و ممکن است منظور شما را روشن‌تر کند.

## کار با اسم‌ها

تابع `names()` هم می‌تواند اسم‌ها را بازیابی کند و هم آن‌ها را تنظیم کند.

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

می‌توان از یک اسم به جای اندیس موقعیت استفاده کرد، که در این حالت به گیومه نیاز دارد.

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

برای این‌که چنین اندیس‌گذاری‌ای درست کار کند، بهتر است مطمئن شوید که اسم‌ها یکتا و بدون مقدار گمشده باشند.
با این حال، R یکتا بودن را الزام نمی‌کند.

عملیات معمول بردار همچنان کار می‌کند و اگر منطقی باشد، اسم‌ها معمولاً حفظ می‌شوند.

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
