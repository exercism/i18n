# 簡介

Go 中的[`Time`][time]是一種描述某個時間點的型別。你可以透過它的方法存取、比較及操作日期與時間資訊，不過也有一些函式是直接定義在`time`套件上的。目前的日期與時間可以透過[`time.Now`][now]函式取得。

[`time.Parse`][parse]函式會把字串解析成`Time`型別的值。Go 定義預期解析版面的方式很特別，你需要用這個特殊時間戳記中的值，寫出一個版面範例：`Mon Jan 2 15:04:05 -0700 MST 2006`。

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

[`Time.Format()`][format]方法會回傳代表時間的字串。和`Parse`函式一樣，目標版面同樣是透過範例來定義，而範例中使用的就是這個特殊時間戳記的值。

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

## 版面選項

若要自訂版面，可以組合使用下列選項。Go 也提供了預先定義好的日期與時間戳記[格式常數][const]。

| 時間        | 選項                                        |
| ----------- | ---------------------------------------------- |
| 年        | 2006 ; 06                                      |
| 月        | Jan ; January ; 01 ; 1                         |
| 日        | 02 ; 2 ; \_2（補前導 0）                 |
| 星期     | Mon ; Monday                                   |
| 小時        | 15（24 小時制）; 3 ; 03（AM 或 PM） |
| 分鐘      | 04 ; 4                                         |
| 秒        | 05 ; 5                                         |
| AM/PM 標記  | PM                                             |
| 一年中的第幾天 | 002 ; \_\_2                                    |

`time.Time`型別有各種方法可以存取特定的時間，例如小時：[`Time.Hour()`][hour]，月份：[`Time.Month()`][month]。想進一步了解其運作方式，可以參考[官方文件][time]。

[`time`][time]套件還包含另一種型別[`Duration`][duration]，用來表示經過的時間，此外也支援位置／時區、計時器以及其他相關功能，這些會在另一個概念中介紹。

[time]: https://golang.org/pkg/time/#Time
[now]: https://golang.org/pkg/time/#Now
[const]: https://pkg.go.dev/time#pkg-constants
[format]: https://pkg.go.dev/time#Time.Format
[hour]: https://pkg.go.dev/time#Time.Hour
[month]: https://pkg.go.dev/time/#Time.Month
[duration]: https://pkg.go.dev/time#Duration
[parse]: https://golang.org/pkg/time/#Parse
