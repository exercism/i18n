# 简介

Go 中的[`Time`][time]是一个表示时间点的类型。
通过它的方法可以访问、比较和操作日期与时间信息，不过也有一些函数是直接在`time`包上调用的。
通过[`time.Now`][now]函数可以获取当前的日期和时间。

[`time.Parse`][parse]函数可以把字符串解析为`Time`类型的值。
Go 定义解析布局的方式很特别。你需要用下面这个特殊时间戳中的值来写一个布局示例：`Mon Jan 2 15:04:05 -0700 MST 2006`。

例如：

```go
import "time"

func parseTime() time.Time {
    date := "Tue, 09/22/1995, 13:00"
    layout := "Mon, 01/02/2006, 15:04"

    t, err := time.Parse(layout,date) // time.Time, error
}

// => 1995-09-22 13:00:00 +0000 UTC
```

[`Time.Format()`][format]方法返回时间的字符串表示。
和`Parse`函数一样，目标布局同样通过一个示例来定义，这个示例使用特殊时间戳中的值。

例如：

```go
import (
    "fmt"
    "time"
)

func main() {
    t := time.Date(1995,time.September,22,13,0,0,0,time.UTC)
    formattedTime := t.Format("Mon, 01/02/2006, 15:04") // string
    fmt.Println(formattedTime)
}

// => Fri, 09/22/1995, 13:00
```

## 布局选项

要自定义布局，可以组合使用这些选项。
Go 中还提供了预定义的日期和时间戳[格式常量][const]。

| 时间           | 选项                                           |
| ----------- | ---------------------------------------------- |
| 年           | 2006 ; 06                                      |
| 月           | Jan ; January ; 01 ; 1                         |
| 日           | 02 ; 2 ; \_2（表示前导 0）                        |
| 星期          | Mon ; Monday                                   |
| 小时          | 15（24 小时制） ; 3 ; 03（上午或下午）                |
| 分钟          | 04 ; 4                                         |
| 秒           | 05 ; 5                                         |
| 上午/下午标记    | PM                                             |
| 一年中的第几天   | 002 ; \_\_2                                    |

`time.Time`类型有各种方法，用于访问特定的时间。例如小时：[`Time.Hour()`][hour]；月：[`Time.Month()`][month]。
想了解更多细节，可以查阅[官方文档][time]。

[`time`][time]还包含另一个类型[`Duration`][duration]，它表示经过的时间；此外还支持位置/时区、计时器以及其他相关功能，这些会在另一个概念中介绍。

[time]: https://golang.org/pkg/time/#Time
[now]: https://golang.org/pkg/time/#Now
[const]: https://pkg.go.dev/time#pkg-constants
[format]: https://pkg.go.dev/time#Time.Format
[hour]: https://pkg.go.dev/time#Time.Hour
[month]: https://pkg.go.dev/time/#Time.Month
[duration]: https://pkg.go.dev/time#Duration
[parse]: https://golang.org/pkg/time/#Parse
