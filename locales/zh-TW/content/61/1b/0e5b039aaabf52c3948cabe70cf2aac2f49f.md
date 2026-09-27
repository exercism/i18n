# 指令

舞團正在籌劃年終演出：舞者可以有多少種排列方式，以及演出時間如何分配給各幕。

這 5 個任務都放在`FORMATION_COUNT`類別中。

## 1. 有多少種排列方式？

有`n`位舞者時，將他們排成一列有`n`的階乘種方式：最前面有`n`種選擇，接著下一個位置有`n-1`種，依此類推。請將它以`INTI`回傳。0 位舞者恰好有 1 種排列方式，也就是空的排列。

```sather
FORMATION_COUNT::line_ups(5)
-- => 120
FORMATION_COUNT::line_ups(20)
-- => 2432902008176640000
```

## 2. 將它寫出

將同一個數字寫成字串，包含它的每一個位數。

```sather
FORMATION_COUNT::line_ups_text(25)
-- => "15511210043330985984000000"
```

`INT`無法儲存那個數字，而這正是這個任務的重點。

## 3. 單一幕的份額

一場由`acts`個相等幕組成的演出，會讓每一幕分得演出時間的`1/acts`。請將它以`RAT`回傳。

```sather
FORMATION_COUNT::share(3)
-- => 1/3
```

## 4. 兩幕合計

將 2 個份額相加，並精確回傳總和。

```sather
FORMATION_COUNT::combined(FORMATION_COUNT::share(2), FORMATION_COUNT::share(3))
-- => 5/6
```

## 5. 它會填滿整場演出嗎？

回答某個份額是否恰好等於整場演出，也就是恰好為 1。

```sather
FORMATION_COUNT::covers_whole_show(#RAT(3, 3))
-- => true
FORMATION_COUNT::covers_whole_show(#RAT(2, 3))
-- => false
```
