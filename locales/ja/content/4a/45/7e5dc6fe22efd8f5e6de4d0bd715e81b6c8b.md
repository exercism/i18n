# はじめに

ベクトルには名前を付けた要素を持たせることができ、そうすると扱いやすくなることがあります。

## 作成

ベクトルに名前を付ける方法は3つあります。

1) ベクトルを作成するとき 

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) `names()`に文字ベクトルを代入する

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> names(months) <- month.abb
> months
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
 31  28  31  30  31  30  31  31  30  31  30  31 
```

3) `setNames()`を使う

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> setNames(months, month.name)
  January  February     March     April       May      June      July    August September   October  November  December 
       31        28        31        30        31        30        31        31        30        31        30        31 
```

## 削除

名前が不要になったら、`NULL`を設定すると削除できます。

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

`unname()`関数でも同じことができ、そのほうが意図が明確になることもあります。

## 名前を使った操作

`names()`関数は、名前を設定するだけでなく取得することもできます。

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

名前は位置のインデックスの代わりに使えます。この場合、引用符が必要です。

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

このようなインデックス指定を正しく機能させるには、名前が重複しておらず、欠けてもいないことを確かめておくのがよいでしょう。
ただし、Rは名前の重複を禁止していません。

通常のベクトル演算はそのまま使え、意味がある場合には名前もたいてい保持されます。

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
