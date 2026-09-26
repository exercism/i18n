# 简介

循环基本上分为两类：

1. 一直循环，直到满足某个条件。
2. 遍历集合中的元素。

这两种在 Julia 中都能实现，不过第二种可能更常见。

## `while`循环

对于事先不知道要循环多少次的开放式问题，Julia 提供了`while`循环。

基本形式相当简单：

```julia
while condition
    do_something()
end
```

在这种情况下，程序会一直循环下去，直到`condition`不再为`true`。

有两种方式可以提前退出循环：

- `break`会让循环退出，之后从循环`end`后面那一行继续执行。
- `return x`会停止当前函数的执行，并把返回值`x`交还给调用者。

有了这些选择，用`while true ... end`创建一个“无限”循环有时会很方便，之后只要在循环体里找到终止条件，用它触发`break`或`return`即可。

## 遍历集合

最简单的例子就是遍历一个区间。

如果我们想把某件事做 10 次：

```julia
for n in 1:10
    do_something(n)
end
```

如果当前这次迭代不满足某个条件，可以用`continue`立刻跳到下一次迭代：

```julia
for n in 1:10
    if is_useless(n)
        continue
    end
    
    # we decided this iteration could be useful
    do_something_slow(n)
end
```

还能写得更短：把`if`块换成`is_useless(n) && continue`。

还有很多其他集合类型可以遍历：数组里的元素、字符串里的字符、字典里的键……

到目前为止的例子遍历的都是区间`1:10`，其中的值同时也是循环下标。

更一般地，有时需要的不只是值，还有下标。
这时就要用到`eachindex()`函数，例如`for i in eachindex(my_array) ... end`。

## 推导式

在 Julia 中，显式地写循环往往比在许多传统语言里更少见，因为有很多更简洁的选择。

一个特别常见的情形是，我们需要根据另一个集合（向量、字符串、集合……可能性有很多）的元素来构造一个新向量。

喜欢 Python 列表推导式的人会很开心地发现，Julia 也能用类似的语法。

其核心就是在向量里搭起一个非常紧凑的循环。

最简单的语法形如`result = [f(x) for x in some_collection]`。

换成传统循环的话，可能会这样写：

```julia
result = []
for x in some_collection
    push!(result, f(x))
end
```

也可以在末尾加上一个条件，只挑出集合中符合条件的元素：

```julia-repl
# multiples of 3
julia> [n^2 for n in 1:10 if n%3 == 0]
3-element Vector{Int64}:
  9
 36
 81
```
