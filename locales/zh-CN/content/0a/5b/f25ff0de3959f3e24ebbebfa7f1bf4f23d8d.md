# 说明

Chaitana 拥有一个非常受欢迎的主题公园。在风景优美的园区正中央，她只有一个游乐项目：世界最大的过山车（TM）。尽管只有这一个游乐设施，人们还是从世界各地赶来，排上几个小时的队，只为了能坐上 Chaitana 的超级过山车。

这个项目有两个队列，每个都用一个`list`来表示：

1. 普通队列
2. 快速队列（_也叫 Fast-track_），人们额外付费就能优先入场。

有人请你写一些代码，来更好地管理公园里的游客。你需要在游客（还有你的老板 Chaitana！）发飙之前，尽快把下面这些函数实现出来。请务必仔细阅读。有些任务要求你修改或更新已有的队列，有些则要求你复制一份。

## 1. 把我加进队列

定义`add_me_to_the_queue()`函数，它接受 4 个形参`<express_queue>, <normal_queue>, <ticket_type>, <person_name>`，返回相应的队列，其中已经加上了这个人的名字。

1. `<ticket_type>`是一个`int`：1 表示 express_queue，0 表示 normal_queue。
2. `<person_name>`是要加入相应队列的那个人的名字（类型为`str`）。

```python
>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=1, person_name="RichieRich")
...
["Tony", "Bruce", "RichieRich"]

>>> add_me_to_the_queue(express_queue=["Tony", "Bruce"], normal_queue=["RobotGuy", "WW"], ticket_type=0, person_name="HawkEye")
....
["RobotGuy", "WW", "HawkEye"]
```

## 2. 我的朋友们在哪儿？

有个人很晚才到公园，却想排到朋友们正等着的那个队列里。可是他不知道朋友们站在哪儿，而且手机也没信号，没法打电话问。

定义`find_my_friend()`函数，它接受 2 个形参`queue`和`friend_name`，返回这个名字在队列中的位置。

1. `<queue>`是排队的人组成的`list`。
2. `<friend_name>`是你要查找下标的那个朋友的名字（也就是他在队列中的位置）。

记住：下标从左边数从 0 开始，从右边数从 -1 开始。

```python
>>> find_my_friend(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], friend_name="Steve")
...
1
```

## 3. 我能加入他们吗？

既然已经找到了朋友们（在上面的任务 2 里），这位迟到的人就想插到朋友们排队的位置上。定义`add_me_with_my_friends()`函数，它接受 3 个形参`queue`、`index`和`person_name`。

1. `<queue>`是排队的人组成的`list`。
2. `<index>`是新成员要加入的位置。
3. `<person_name>`是要加在下标位置上的那个人的名字。

返回更新后的队列，其中已经加上了这位迟到者的名字。

```python
>>> add_me_with_my_friends(queue=["Natasha", "Steve", "T'challa", "Wanda", "Rocket"], index=1, person_name="Bucky")
...
["Natasha", "Bucky", "Steve", "T'challa", "Wanda", "Rocket"]
```

## 4. 队列里的讨厌鬼

你刚从队列那边听说，有个特别讨厌的人又推人、又大喊大叫，还在捣乱。你得把这个坏家伙赶出去，谁让他行为这么差！

定义`remove_the_mean_person()`函数，它接受 2 个形参`queue`和`person_name`。

1. `<queue>`是排队的人组成的`list`。
2. `<person_name>`是需要被赶出去的那个人的名字。

返回更新后的队列，其中已经去掉了这个讨厌鬼的名字。

```python
>>> remove_the_mean_person(queue=["Natasha", "Steve", "Eltran", "Wanda", "Rocket"], person_name="Eltran")
...
["Natasha", "Steve", "Wanda", "Rocket"]
```

## 5. 同名的人

你可能没见过两个毫无血缘关系却长得一模一样的人，但你_肯定_见过毫无血缘关系、名字却完全相同的人（_也就是同名的人_）！今天到场的人里，这种人看起来还挺多。你想知道某个名字在队列里出现了多少次。

定义`how_many_namefellows()`函数，它接受 2 个形参`queue`和`person_name`。

1. `<queue>`是排队的人组成的`list`。
2. `<person_name>`是你认为可能在队列里出现不止一次的名字。

返回`person_name`出现的次数，类型为`int`。

```python
>>> how_many_namefellows(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"], person_name="Natasha")
...
2
```

## 6. 移除最后一个人

可惜今天公园里人太多了，你需要把普通队列里的最后一个人移出去（_你会给他一张代金券，让他改天再来走快速通道_）。你得定义`remove_the_last_person()`函数，它接受 1 个形参`queue`，也就是排队的人组成的数组。

你应该更新这个`list`，同时也要`return`被移出去的那个人的名字，这样才能给他开一张代金券。

```python
>>> remove_the_last_person(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
'Rocket'
```

## 7. 给队列排个序

出于管理上的需要，你需要把某个队列里的所有名字按字母顺序排好。

定义`sorted_names()`函数，它接受 1 个实参`queue`（排队的人组成的`list`），并返回这个`list`经过`sorted`排序后的副本。

```python
>>> sorted_names(queue=["Natasha", "Steve", "Eltran", "Natasha", "Rocket"])
...
['Eltran', 'Natasha', 'Natasha', 'Rocket', 'Steve']
```
