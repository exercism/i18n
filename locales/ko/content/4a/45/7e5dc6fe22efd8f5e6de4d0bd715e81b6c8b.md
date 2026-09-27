# 소개

벡터의 원소에는 이름을 붙일 수 있어요. 이름이 있으면 벡터를 다루기가 더 편할 때가 많아요.

## 이름 붙이기

벡터에 이름을 붙이는 방법은 세 가지가 있어요.

1) 벡터를 만들 때

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) `names()`에 문자열 벡터를 대입할 때

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> names(months) <- month.abb
> months
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
 31  28  31  30  31  30  31  31  30  31  30  31 
```

3) `setNames()`를 사용할 때

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> setNames(months, month.name)
  January  February     March     April       May      June      July    August September   October  November  December 
       31        28        31        30        31        30        31        31        30        31        30        31 
```

## 이름 지우기

이름이 더 이상 필요 없다면 `NULL`로 설정해서 지울 수 있어요.

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

`unname()` 함수도 같은 일을 해요. 그리고 의도를 더 분명하게 드러내 줄 수도 있어요.

## 이름 다루기

`names()` 함수는 이름을 설정할 수도 있고, 가져올 수도 있어요.

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

위치 인덱스 대신 이름을 사용할 수 있어요. 이때는 따옴표가 필요해요.

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

이런 식으로 인덱싱이 제대로 동작하려면 이름이 중복되지 않고 빠져 있지 않도록 하는 게 좋아요.
하지만 R은 이름이 중복되는 걸 막아 주지는 않아요.

일반적인 벡터 연산은 그대로 동작하고, 말이 되는 경우에는 이름도 대개 유지돼요.

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
