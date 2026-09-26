# 简介

包`math/rand`支持生成伪随机数。

下面介绍如何生成一个介于`0`和`99`之间的随机整数：

```go
import "math/rand"

n := rand.Intn(100) // n is a random int, 0 <= n < 100
```

函数`rand.Float64`返回一个介于`0.0`和`1.0`之间的随机浮点数：

```go
f := rand.Float64() // f is a random float64, 0.0 <= f < 1.0
```

它还支持打乱切片（或其他数据结构）：

```go
x := []string{"a", "b", "c", "d", "e"}
// shuffling the slice put its elements into a random order
rand.Shuffle(len(x), func(i, j int) {
	x[i], x[j] = x[j], x[i]
})
```

## 种子

包`math/rand`生成的数字序列并不是真正随机的。
给定一个特定的“种子”值，结果就完全是确定性的。

在 Go 1.20 及更高版本中，种子会自动随机选取，因此每次运行程序时，你看到的随机数序列都会不同。

在更早的 Go 版本中，种子默认为`1`。
因此，要想在多次运行程序时得到不同的序列，你必须在获取任何随机数之前，手动为随机数生成器设置种子，例如使用当前时间。

```go
rand.Seed(time.Now().UnixNano())
```
