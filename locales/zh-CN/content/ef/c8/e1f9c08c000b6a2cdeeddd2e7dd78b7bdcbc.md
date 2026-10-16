# 描述

在这个练习中，你要编写一个实用的小程序，这样就不必再去记各个色环的数值了。程序会接收 1 个、4 个或 5 个颜色作为输入，并输出以欧姆为单位的正确数值。色环的编码如下：

| 颜色   | 数值  |
| ------ | ----- |
| Black  | 0     |
| Brown  | 1     |
| Red    | 2     |
| Orange | 3     |
| Yellow | 4     |
| Green  | 5     |
| Blue   | 6     |
| Violet | 7     |
| Gray   | 8     |
| White  | 9     |

在[`Resistor Color Trio`][resistor-color-trio-exercise]中，你解码了前三个色环。
例如：orange-orange-brown 对应的主数值是`330`。
在这个练习中，你还需要把_容差_也考虑进来。
容差是指数值在主数值上下浮动的最大幅度。
例如，如果最后一个色环是 green，最大容差就是`±0.5%`。

容差色环会取下面这些值之一：

| 颜色   | 容差      |
| ------ | --------: |
| Grey   |    ±0.05% |
| Violet |    ±0.10% |
| Blue   |    ±0.25% |
| Green  |    ±0.50% |
| Brown  |    ±1.00% |
| Red    |    ±2.00% |
| Gold   |    ±5.00% |
| Silver |   ±10.00% |

四环电阻的结构是这样的：

| 色环 1  | 色环 2  | 色环 3     | 色环 4    |
| ------- | ------- | ---------- | --------- |
| 数值 1  | 数值 2  | 倍率       | 容差      |

示例：

- orange-orange-brown-green 表示`330`欧姆，容差为`±0.5%`。
- orange-orange-red-grey 表示`3300`欧姆，容差为`±0.05%`。

四环电阻和五环电阻的区别在于，五环电阻多了一个色环，用来表示更精确的数值。

| 色环 1  | 色环 2  | 色环 3  | 色环 4     | 色环 5    |
| ------- | ------- | ------- | ---------- | --------- |
| 数值 1  | 数值 2  | 数值 3  | 倍率       | 容差      |

示例：

- orange-orange-orange-black-green 表示`333`欧姆，容差为`±0.5%`。
- orange-red-orange-blue-violet 表示`323 million`欧姆，容差为`±0.1%`。

另外还有单色环电阻。
单色环电阻只使用 black 这一种颜色，数值为 0。

你的程序应该把表示电阻色环颜色的输入`list`转换成一个标签：

"... ohms ±...%"

所以，当输入`list`是`["orange", "orange", "black", "green"]`时，应该返回：

"33 ohms ±0.5%"

当欧姆数达到几千时，我们会说"kiloohms"。
这就好比把 1000 米称为"kilometer"，把 1000 克称为"kilograms"。

所以，当输入`list`是`["orange", "orange", "orange", "grey"]`时，应该返回：

"33 kiloohms ±0.05%"

当欧姆数达到几百万时，我们会说"megaohms"。

所以，当输入`list`是`["orange", "orange", "blue", "red"]`时，应该返回：

"33 megaohms ±2%"

[resistor-color-trio-exercise]: https://exercism.org/tracks/python/exercises/resistor-color-trio
