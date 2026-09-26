# 简介

通常，函数只接受固定数量的实参。
不过，如果在最后一个形参的类型前面加上`...`，函数就可以接受任意数量的末尾实参。
这样，最后一个形参就成了_可变参数_。

```go
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}
```

在函数内部，可变参数是一个切片：

```go
sum(1, 2, 3)    // nums is []int{1, 2, 3}
sum(1, 2, 3, 4) // nums is []int{1, 2, 3, 4}
sum()           // nums is []int{}
```

函数可以在可变参数之前有非可变参数。
一个函数最多只能有一个可变参数，而且它必须是最后一个形参。

```go
func greet(greeting string, names ...string) {
    for _, name := range names {
        fmt.Printf("%s, %s!\n", greeting, name)
    }
}
```

## 展开切片

要把一个切片传给可变参数，在它后面加上`...`：

```go
nums := []int{1, 2, 3}
sum(nums...) // equivalent to sum(1, 2, 3)
```

只有在把切片传给可变参数时，`...`才有效。
