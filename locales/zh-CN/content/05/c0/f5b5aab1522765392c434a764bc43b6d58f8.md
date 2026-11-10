# 说明

你的朋友 Li Mei 经营着一家果汁吧，店里卖好喝的混合果汁。
你是她店里的常客，你发现可以让朋友的工作轻松一些。
你决定用自己的编程技能帮 Li Mei 分担一些活儿。

## 1. 确定调制一杯果汁需要多长时间

Li Mei 喜欢提前告诉顾客，他们点的菜单上的果汁需要等多久。
她很难记住确切的数字，因为调制不同果汁所需的时间各不相同。
`"Pure Strawberry Joy"` 需要 0.5 分钟，`"Energizer"` 和 `"Green Garden"` 各需要 1.5 分钟，`"Tropical Island"` 需要 3 分钟，`"All or Nothing"` 需要 5 分钟。
其他所有饮品（例如特惠款）可以按 2.5 分钟的调制时间计算。

为了帮你的朋友，请编写一个函数 `time_to_mix_juice`，它接收菜单上的一种果汁作为实参，并返回调制这种饮品所需的分钟数。

```julia-repl
julia> time_to_mix_juice("Tropical Island")
3

julia> time_to_mix_juice("Berries & Lime")
2.5
```

## 2. 补充青柠角

Li Mei 的很多作品都会用到青柠角，有时作为原料，有时用于装饰。
所以早上开始上班时，她要确保装青柠角的盒子是满的，够一整天用。

实现函数 `limes_to_cut`，它接收 Li Mei 需要切的青柠角数量，以及一个数组，表示她手头现有的完整青柠。
一个 `"small"` 青柠可以切出 6 个青柠角，一个 `"medium"` 青柠可以切出 8 个，一个 `"large"` 青柠可以切出 10 个。
她总是按照青柠在列表中出现的顺序来切，从第一项开始。
她一直切到凑够所需的青柠角数量，或者用完所有青柠为止。

Li Mei 想提前知道她需要切多少个青柠。
`limes_to_cut` 函数应该返回需要切的青柠个数。

```julia-repl
julia> limes_to_cut(25, ["small", "small", "large", "medium", "small"])
4
```

## 3. 列出队列中每笔订单的调制时间

Li Mei 喜欢记录调制顾客正在等待的订单需要多长时间。

实现 `order_times` 函数，它接收一个订单队列，并返回一个调制时间向量。

```julia-repl
julia> order_times(["Energizer", "Tropical Island"])
[1.5, 3.0]
```

## 4. 结束班次

Li Mei 总是工作到下午 3 点。
然后她的员工 Dmitry 来接替她。
Li Mei 下班时，经常还有一些饮品已经点单但还没做好。
剩下的果汁就由 Dmitry 来调制。

为了让交接更轻松，请实现一个函数 `remaining_orders`，它接收 Li Mei 本轮班剩余的分钟数，以及一个数组，里面是已经点单但还没调制的果汁。
该函数应返回 Li Mei 在下班前来不及开始调制的订单。

本轮班剩余的时间总是大于 0。
待调制的果汁数组不会为空。
此外，订单按照它们在数组中出现的顺序调制。
只要 Li Mei 开始调制某杯果汁，她就一定会做完，哪怕要多加一会儿班。
如果没有任何需要 Dmitry 处理的剩余订单，则应返回一个空向量。

```julia-repl
julia> remaining_orders(5, ["Energizer", "All or Nothing", "Green Garden"])
["Green Garden"]
```
