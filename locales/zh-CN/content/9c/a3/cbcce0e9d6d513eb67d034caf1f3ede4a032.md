# 关于

在 Go 中，每个变量都有一个值。
声明变量时如果不赋值，它就会被设置为该类型的零值。

基本类型，包括`bool`、数值类型和`string`，都有固定的零值：

| 类型                   | 零值 |
| ---------------------- | ---------- |
| bool                   | `false`    |
| int、int8、int64 等    | `0`        |
| float32、float64       | `0`        |
| complex64、complex128  | `0+0i`     |
| string                 | `""`       |

引用底层数据的类型，包括指针、函数、接口、切片、通道和映射，它们的零值都是`nil`。
不过，数组和结构体永远不是`nil`，因为它们直接持有数据，而不是对数据的引用。
数组的每个元素和结构体的每个字段都会被初始化为各自类型的零值。
例如，`var a [3]int`会创建数组`[0, 0, 0]`。

## 声明零值

不带初始值的`var`会得到任何类型的零值：

```go
var myBool bool   // false
var mySlice []int // nil
var p Person      // Person{Name: "", Age: 0}
```

对于结构体，也可以改用复合字面量`T{}`：

```go
myPerson := Person{} // equivalent to var myPerson Person
```

`new(T)`返回一个指针，指向任何类型的零值。
它最常用于结构体，不过对基本类型也适用：

```go
p := new(Person) // *Person, pointing to Person{Name: "", Age: 0}
s := new(string) // *string, pointing to ""
i := new(int)    // *int, pointing to 0
```

## 零值为何重要

在 Go 中，零值代表一种自然而且有用的初始状态。

`bool`默认为`false`，可以当作标志使用：

```go
var done bool // action not done yet
done = true   // action now done
```

整数默认为`0`，可以当作计数器使用：

```go
var count int
count++ // 1
count++ // 2
```

对于结构体，每个字段都从自身类型的零值开始。
一个只有单个`[]string`字段的`Stack`，在声明时就已经是一个可用的空栈。
因为在 nil 切片上调用`append`会分配一个新的底层数组，所以不需要构造函数：

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

## 处理 nil

大多数零值为`nil`的类型都需要在使用前初始化，否则就会 panic。
`nil`切片是个例外：你可以对它使用 range、向它 append，也可以安全地把它传给`len`和`cap`。

映射在存入值之前应该先初始化：

```go
var m map[string]int
m["key"] = 1 // panic
```

映射通常有两种初始化方式：

```go
m1 := make(map[string]int)
m2 := map[string]int{}
m1["key"] = 1 // ok
m2["key"] = 1 // ok
```

使用指针之前，先检查它是否为`nil`：

```go
var p *int

if p == nil {
    fmt.Println("no value assigned")
    return
}

fmt.Println(*p) // p is not nil
```

基本类型始终持有一个具体的值，所以把它们与`nil`比较会导致编译错误：

```go
var myString string

if myString == nil {
    // compile error: mismatched types
}
```
