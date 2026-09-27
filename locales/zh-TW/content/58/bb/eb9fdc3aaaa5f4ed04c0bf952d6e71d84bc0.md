# 簡介

套件`math/rand`支援產生偽隨機數字。

以下說明如何產生介於`0`和`99`之間的隨機整數：

```go
import "math/rand"

n := rand.Intn(100) // n is a random int, 0 <= n < 100
```

函式`rand.Float64`會回傳介於`0.0`和`1.0`之間的隨機浮點數：

```go
f := rand.Float64() // f is a random float64, 0.0 <= f < 1.0
```

此外也支援打亂切片（或其他資料結構）：

```go
x := []string{"a", "b", "c", "d", "e"}
// shuffling the slice put its elements into a random order
rand.Shuffle(len(x), func(i, j int) {
	x[i], x[j] = x[j], x[i]
})
```

## 種子

套件`math/rand`產生的數字序列並非真正隨機。
只要給定特定的「種子」值，結果就完全是確定性的。

在 Go 1.20 以上版本中，種子會自動隨機挑選，所以每次執行程式時都會看到不同的隨機數字序列。

在較早的 Go 版本中，種子預設為`1`。
因此，若想讓程式每次執行時得到不同的序列，就必須在取得任何隨機數字之前，手動設定隨機數產生器的種子，例如使用目前的時間。

```go
rand.Seed(time.Now().UnixNano())
```
