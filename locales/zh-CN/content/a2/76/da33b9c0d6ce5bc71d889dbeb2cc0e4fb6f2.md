# 说明

你要写一些代码，帮你照着最喜欢的菜谱做千层面。

一共有 5 个任务，全都与烹饪这道菜有关。

## 1. 定义预期的烤箱时间（分钟）

设置`$Lasagna::ExpectedMinutesInOven`变量，让它等于千层面应该在烤箱里待的分钟数。根据菜谱，预期的烤箱时间是 40 分钟：

```perl
$Lasagna::ExpectedMinutesInOven
# => 40
```

## 2. 计算剩余的烤箱时间（分钟）

修改`Lasagna::remaining_minutes_in_oven`子程序。它接受千层面已经在烤箱里的实际分钟数作为实参，并根据上一个任务中预期的烤箱时间，返回千层面还需要在烤箱里待多少分钟。

```perl
Lasagna::remaining_minutes_in_oven(30)
# => 10
```

## 3. 计算准备时间（分钟）

修改`Lasagna::preparation_time_in_minutes`子程序。它接受你往千层面里加的层数作为实参，返回你准备千层面花了多少分钟，假设每一层需要 2 分钟来准备。

```perl
Lasagna::preparation_time_in_minutes(2)
# => 4
```

## 4. 计算总工作时间（分钟）

修改`Lasagna::total_time_in_minutes`子程序，它接受两个实参：第一个实参是你往千层面里加的层数，第二个实参是千层面已经在烤箱里的分钟数。
这个子程序应该返回你烹饪千层面总共花了多少分钟，也就是准备时间的分钟数加上此刻千层面已经在烤箱里度过的分钟数。

```perl
Lasagna::total_time_in_minutes(3, 20)
# => 26
```

## 5. 创建一条千层面已做好的通知

修改`Lasagna::oven_alarm`子程序。它不接受任何实参，返回一条表示千层面可以吃了的消息。

```perl
Lasagna::oven_alarm()
# => "Ding!"
```
