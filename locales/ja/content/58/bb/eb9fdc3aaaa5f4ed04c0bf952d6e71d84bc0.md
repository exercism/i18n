# はじめに

`math/rand`パッケージは、疑似乱数を生成するための機能を提供します。

`0`から`99`の間のランダムな整数を生成するには、次のようにします。

```go
import "math/rand"

n := rand.Intn(100) // n is a random int, 0 <= n < 100
```

`rand.Float64`関数は、`0.0`から`1.0`の間の浮動小数点数をランダムに返します。

```go
f := rand.Float64() // f is a random float64, 0.0 <= f < 1.0
```

スライス（あるいは他のデータ構造）をシャッフルする機能もあります。

```go
x := []string{"a", "b", "c", "d", "e"}
// shuffling the slice put its elements into a random order
rand.Shuffle(len(x), func(i, j int) {
	x[i], x[j] = x[j], x[i]
})
```

## シード

`math/rand`パッケージが生成する数列は、真の乱数ではありません。特定の「シード」値を与えると、結果は完全に決まってしまいます。

Go 1.20以降では、シードは自動的にランダムに選ばれるので、プログラムを実行するたびに異なる乱数列が得られます。

それより前のバージョンのGoでは、シードのデフォルト値は`1`でした。そのため、プログラムを実行するたびに異なる数列を得るには、乱数を取得する前に、乱数生成器に手動でシードを設定する必要がありました。たとえば、現在時刻を使います。

```go
rand.Seed(time.Now().UnixNano())
```
