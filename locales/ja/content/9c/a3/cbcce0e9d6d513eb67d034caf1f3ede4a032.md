# 概要

Goでは、すべての変数に値があります。
値を代入せずに変数を宣言すると、その変数は型のゼロ値に設定されます。

`bool`、数値型、`string`などの基本型には、それぞれ決まったゼロ値があります。

| 型                     | ゼロ値     |
| ---------------------- | ---------- |
| bool                   | `false`    |
| int、int8、int64など   | `0`        |
| float32、float64       | `0`        |
| complex64、complex128  | `0+0i`     |
| string                 | `""`       |

ポインター、関数、インターフェース、スライス、チャネル、マップなど、基になるデータを参照する型のゼロ値は`nil`です。
一方、配列と構造体は決して`nil`にはなりません。これらはデータへの参照ではなく、データそのものを保持するからです。
配列の各要素と構造体の各フィールドは、それぞれの型のゼロ値で初期化されます。
たとえば、`var a [3]int`は配列`[0, 0, 0]`を作成します。

## ゼロ値の宣言

初期値を指定しない`var`は、どの型でもゼロ値になります。

```go
var myBool bool   // false
var mySlice []int // nil
var p Person      // Person{Name: "", Age: 0}
```

構造体の場合は、複合リテラル`T{}`という書き方もあります。

```go
myPerson := Person{} // equivalent to var myPerson Person
```

`new(T)`は、どの型でもそのゼロ値へのポインターを返します。
最もよく使われるのは構造体ですが、基本型にも使えます。

```go
p := new(Person) // *Person, pointing to Person{Name: "", Age: 0}
s := new(string) // *string, pointing to ""
i := new(int)    // *int, pointing to 0
```

## ゼロ値が重要な理由

Goでは、ゼロ値は自然で便利な初期状態を表します。

`bool`のデフォルトは`false`で、フラグとして使えます。

```go
var done bool // action not done yet
done = true   // action now done
```

整数のデフォルトは`0`で、カウンターとして使えます。

```go
var count int
count++ // 1
count++ // 2
```

構造体では、各フィールドはそれぞれの型のゼロ値から始まります。
`[]string`型のフィールドを1つだけ持つ`Stack`は、宣言した時点ですでに空のスタックとして機能します。
`nil`のスライスに対して`append`を呼び出すと新しい基底配列が割り当てられるので、コンストラクターは必要ありません。

```go
type Stack struct {
    items []string
}

func (s *Stack) Push(v string) {
    s.items = append(s.items, v)
}

func (s *Stack) IsEmpty() bool {
    return len(s.items) == 0
}

var s Stack
fmt.Println(s.IsEmpty()) // true
s.Push("a") // append allocates a new backing array
fmt.Println(s.IsEmpty()) // false
```

## `nil`の扱い

ゼロ値が`nil`になるほとんどの型は、使う前に初期化しないとパニックになります。
例外は`nil`のスライスです。`range`で繰り返し処理でき、`append`もでき、`len`や`cap`に安全に渡せます。

マップは、値を格納する前に初期化する必要があります。

```go
var m map[string]int
m["key"] = 1 // panic
```

マップはよく、次の2通りの方法で初期化されます。

```go
m1 := make(map[string]int)
m2 := map[string]int{}
m1["key"] = 1 // ok
m2["key"] = 1 // ok
```

ポインターは、使う前に`nil`かどうかを確認します。

```go
var p *int

if p == nil {
    fmt.Println("no value assigned")
    return
}

fmt.Println(*p) // p is not nil
```

基本型は常に具体的な値を保持するので、`nil`と比較するとコンパイルエラーになります。

```go
var myString string

if myString == nil {
    // compile error: mismatched types
}
```
