# 簡介

向量的元素可以有名稱，這有時會讓它們更方便使用。

## 建立

有三種方式可以為向量加上名稱。

1) 建立向量時

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) 將字元向量指定給`names()`

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

如果不再需要名稱，可以將它設為`NULL`來移除。

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

`unname()`函式也能達到相同的效果，而且可能更能表達你的意圖。

## 使用名稱

`names()`函式除了可以設定名稱，也可以取回名稱。

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

名稱可以取代位置索引使用，在這種情況下必須加上引號。

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

為了讓這類索引正確運作，最好確保名稱是唯一且沒有缺失的。
不過，R 並不會強制要求名稱唯一。

一般的向量運算仍然可以正常運作，而只要這麼做合理，名稱通常也會被保留下來。

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
