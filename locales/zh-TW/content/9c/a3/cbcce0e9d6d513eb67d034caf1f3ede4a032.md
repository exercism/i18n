# 關於

在 Go 裡，每個變數都有一個值。
宣告變數時若沒有指定值，它就會被設為該型別的零值。

基本型別（包括 `bool`、數值型別和 `string`）各自都有固定的零值：

| 型別                   | 零值       |
| ---------------------- | ---------- |
| bool                   | `false`    |
| int, int8, int64, etc. | `0`        |
| float32, float64       | `0`        |
| complex64, complex128  | `0+0i`     |
| string                 | `""`       |

會參照底層資料的型別，包括指標、函式、介面、切片、通道和映射，其零值都是 `nil`。
不過，陣列和結構體永遠不會是 `nil`，因為它們直接持有資料，而不是資料的參照。
陣列的每個元素和結構體的每個欄位，都會初始化為其自身型別的零值。
例如，`var a [3]int` 會建立陣列 `[0, 0, 0]`。

## 宣告零值

不帶初始值的 `var` 會給出任何型別的零值：

```go
var myBool bool   // false
var mySlice []int // nil
var p Person      // Person{Name: "", Age: 0}
```

對結構體來說，複合字面量 `T{}` 是另一個選擇：

```go
myPerson := Person{} // equivalent to var myPerson Person
```

`new(T)` 會回傳指向任何型別零值的指標。
它最常用於結構體，不過對基本型別也同樣適用：

```go
p := new(Person) // *Person, pointing to Person{Name: "", Age: 0}
s := new(string) // *string, pointing to ""
i := new(int)    // *int, pointing to 0
```

## 為什麼零值很重要

在 Go 裡，零值代表一個自然且有用的起始狀態。

`bool` 預設為 `false`，可以當作旗標使用：

```go
var done bool // action not done yet
done = true   // action now done
```

整數預設為 `0`，可以當作計數器使用：

```go
var count int
count++ // 1
count++ // 2
```

對結構體來說，每個欄位都從自身型別的零值開始。
一個只有單一 `[]string` 欄位的 `Stack`，在宣告時就已經是能用的空堆疊。
因為 `append` 用在 nil 切片上時會配置新的底層陣列，所以不需要建構函式：

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

## 處理 nil

大多數零值為 `nil` 的型別都必須先初始化才能使用，否則會 panic。
nil 切片是例外：你可以對它做 range、附加元素，並安全地傳給 `len` 和 `cap`。

映射應該先初始化，再存入值：

```go
var m map[string]int
m["key"] = 1 // panic
```

映射通常有兩種初始化方式：

```go
m1 := make(map[string]int)
m2 := map[string]int{}
m1["key"] = 1 // ok
m2["key"] = 1 // ok
```

使用指標之前，先檢查它是不是 `nil`：

```go
var p *int

if p == nil {
    fmt.Println("no value assigned")
    return
}

fmt.Println(*p) // p is not nil
```

基本型別永遠持有具體的值，所以拿它們和 `nil` 比較會是編譯錯誤：

```go
var myString string

if myString == nil {
    // compile error: mismatched types
}
```
