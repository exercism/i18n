# পরিচিতি

ভেক্টরের এলিমেন্টের নাম থাকতে পারে, আর এতে অনেক সময় সেগুলো নিয়ে কাজ করা আরও সুবিধাজনক হয়ে ওঠে।

## তৈরি

ভেক্টরে নাম যোগ করার তিনটি উপায় আছে।

1) ভেক্টর তৈরির সময়েই

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) `names()`-এ একটি ক্যারেক্টার ভেক্টর অ্যাসাইন করে

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> names(months) <- month.abb
> months
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
 31  28  31  30  31  30  31  31  30  31  30  31 
```

3) `setNames()` দিয়ে

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> setNames(months, month.name)
  January  February     March     April       May      June      July    August September   October  November  December 
       31        28        31        30        31        30        31        31        30        31        30        31 
```

## মুছে ফেলা

নাম আর দরকার না হলে `NULL` সেট করে সেগুলো মুছে ফেলা যায়

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

`unname()` ফাংশনটিও একই কাজ করে, আর এটি আপনার উদ্দেশ্য আরও স্পষ্ট করে তুলতে পারে।

## নাম নিয়ে কাজ করা

`names()` ফাংশন নাম সেট করার পাশাপাশি নাম পড়ে আনতেও পারে।

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

পজিশন ইনডেক্সের জায়গায় নামও ব্যবহার করা যায়, তবে এক্ষেত্রে কোটেশন দিতে হবে।

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

এ ধরনের ইনডেক্সিং ঠিকভাবে কাজ করার জন্য নামগুলো যেন অনন্য হয় এবং কোনোটি যেন অনুপস্থিত না থাকে, সেটি নিশ্চিত করাই ভালো।
তবে R অনন্যতা বাধ্যতামূলক করে না।

ভেক্টরের স্বাভাবিক অপারেশনগুলো আগের মতোই কাজ করে, আর যুক্তিসঙ্গত হলে নামগুলো সাধারণত সংরক্ষিত থাকে।

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
