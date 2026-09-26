# 简介

向量可以拥有具名元素，这让它们有时用起来更方便。

## 创建

有 3 种方法可以给向量添加名称。

1) 在创建向量时

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) 通过给`names()`赋值一个字符向量

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> names(months) <- month.abb
> months
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
 31  28  31  30  31  30  31  31  30  31  30  31 
```

3) 使用`setNames()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> setNames(months, month.name)
  January  February     March     April       May      June      July    August September   October  November  December 
       31        28        31        30        31        30        31        31        30        31        30        31 
```

## 移除

如果不再需要名称，可以把它们设为`NULL`来移除

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

`unname()`函数能达到同样的效果，而且可能更清楚地表达你的意图。

## 使用名称

`names()`函数既能获取名称，也能设置名称。

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

名称可以代替位置下标使用，不过在这种情况下必须加引号。

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

要让这种下标方式正常工作，最好确保名称唯一且不缺失。
不过 R 并不会强制要求名称唯一。

常规的向量运算依然有效；只要说得通，名称通常会被保留。

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
