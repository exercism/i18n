# 说明

舞蹈团正在筹备年终演出：舞者有多少种排列方式，以及演出时长如何在各幕之间分配。

五个任务都写在`FORMATION_COUNT`类里。

## 1. 有多少种排列方式？

有`n`个舞者时，排列方式有`n`的阶乘种：最前面有`n`种选择，接着是`n-1`种，依此类推。把它作为`INT`返回。零个舞者恰好有一种排列方式，也就是空排列。

```sather
FORMATION_COUNT::line_ups(5)
-- => 120
FORMATION_COUNT::line_ups(20)
-- => 2432902008176640000
```

## 2. 把它写出来

把同一个数字写成字符串，每一位都要写出来。

```sather
FORMATION_COUNT::line_ups_text(25)
-- => "15511210043330985984000000"
```

`INTI`装不下这个数字，这正是这个任务的意义所在。

## 3. 一幕的份额

一场有`acts`个等长幕的演出中，每一幕分得演出时长的`1/acts`。把它作为`RAT`返回。

```sather
FORMATION_COUNT::share(3)
-- => 1/3
```

## 4. 两幕合在一起

把两份份额相加，精确地返回总数。

```sather
FORMATION_COUNT::combined(FORMATION_COUNT::share(2), FORMATION_COUNT::share(3))
-- => 5/6
```

## 5. 它能填满整场演出吗？

判断一份份额是否恰好等于整场演出，也就是恰好等于 1。

```sather
FORMATION_COUNT::covers_whole_show(#RAT(3, 3))
-- => true
FORMATION_COUNT::covers_whole_show(#RAT(2, 3))
-- => false
```
