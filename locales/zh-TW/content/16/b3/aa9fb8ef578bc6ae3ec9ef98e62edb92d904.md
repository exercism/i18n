# 簡介

一般來說，函式只接受固定數量的引數。
不過，如果在最後一個參數的型別前面加上`...`，這個函式就能接受任意數量的後續引數。
如此一來，最後一個參數就成為_可變參數_。

```go
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}
```

在函式內，可變參數是一個切片：

```go
sum(1, 2, 3)    // nums is []int{1, 2, 3}
sum(1, 2, 3, 4) // nums is []int{1, 2, 3, 4}
sum()           // nums is []int{}
```

函式可以在可變參數之前有非可變參數。
函式最多只能有一個可變參數，而且它必須是最後一個參數。

```go
func greet(greeting string, names ...string) {
    for _, name := range names {
        fmt.Printf("%s, %s!\n", greeting, name)
    }
}
```

## 展開切片

若要將切片傳入可變參數，請在它後面加上`...`：

```go
nums := []int{1, 2, 3}
sum(nums...) // equivalent to sum(1, 2, 3)
```

只有在將切片傳入可變參數時，`...`才有效。
