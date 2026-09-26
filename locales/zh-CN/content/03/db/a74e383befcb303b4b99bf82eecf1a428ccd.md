# 简介

在对可枚举对象（数组、位串、字符串）进行[递归][exercism-recursion]时，通常有两个问题需要关注：

- 存储递归函数调用链需要多少内存
- 如何高效地构建出结果

为了解决这些问题，可以使用_累加器_。

累加器是一种变量，除了数据本身之外，还会被一路传递下去。它用来在一次次函数调用之间传递函数执行的当前状态，直到到达_基准情形_为止。在基准情形中，我们用累加器返回递归函数调用的最终值。

累加器应该由函数的作者初始化，而不是由函数的使用者初始化。要做到这一点，需要声明两个函数：一个是公有函数，它只接收必要的数据作为实参，并初始化累加器；另一个是私有函数，它还会接收一个累加器。在 Elixir 中，常见的做法是给私有函数的名称加上`do_`前缀。

```elixir
# Count the length of a list without an accumulator
def count([]), do: 0
def count([_head | tail]), do: 1 + count(tail)

# Count the length of a list with an accumulator
def count(list), do: do_count(list, 0)

defp do_count([], count), do: count
defp do_count([_head | tail], count), do: do_count(tail, count + 1)
```

使用累加器可以让我们把递归函数变成_尾递归_函数。如果函数执行的_最后_一件事就是调用自身，那么这个函数就是尾递归的。

[exercism-recursion]: https://exercism.org/tracks/elixir/concepts/recursion
