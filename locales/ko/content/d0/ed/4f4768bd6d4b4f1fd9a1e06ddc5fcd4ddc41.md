# 소개

Go에서 [`Time`][time]은 시점을 나타내는 타입이에요.
날짜와 시간 정보는 메서드를 통해 접근하고 비교하고 조작할 수 있지만, `time` 패키지 자체에서 호출하는 함수들도 있어요.
현재 날짜와 시간은 [`time.Now`][now] 함수로 가져올 수 있어요.

[`time.Parse`][parse] 함수는 문자열을 `Time` 타입의 값으로 파싱해요.
Go는 파싱할 때 기대하는 레이아웃을 정의하는 특별한 방식을 사용해요.
다음 특별한 타임스탬프의 값들을 사용해서 레이아웃 예시를 작성해야 해요:
`Mon Jan 2 15:04:05 -0700 MST 2006`.

예를 들어:

```go
import "time"

func parseTime() time.Time {
    date := "Tue, 09/22/1995, 13:00"
    layout := "Mon, 01/02/2006, 15:04"

    t, err := time.Parse(layout,date) // time.Time, error
}

// => 1995-09-22 13:00:00 +0000 UTC
```

[`Time.Format()`][format] 메서드는 시간을 문자열로 표현한 값을 반환해요.
`Parse` 함수와 마찬가지로, 대상 레이아웃 역시 특별한 타임스탬프의 값들을 사용한 예시로 정의해요.

예를 들어:

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

## 레이아웃 옵션

사용자 정의 레이아웃을 만들려면 다음 옵션들을 조합해서 사용해요.
Go에는 미리 정의된 날짜와 시간 [형식 상수][const]도 있어요.

| 시간        | 옵션                                        |
| ----------- | ---------------------------------------------- |
| 년        | 2006 ; 06                                      |
| 월        | Jan ; January ; 01 ; 1                         |
| 일        | 02 ; 2 ; \_2 (앞에 0을 붙임)                 |
| 요일     | Mon ; Monday                                   |
| 시        | 15 ( 24시간 형식 ) ; 3 ; 03 (오전 또는 오후) |
| 분      | 04 ; 4                                         |
| 초      | 05 ; 5                                         |
| 오전/오후 표시  | PM                                             |
| 연중 일수 | 002 ; \_\_2                                    |

`time.Time` 타입에는 특정 시간에 접근하기 위한 다양한 메서드가 있어요. 예를 들어 시: [`Time.Hour()`][hour], 월: [`Time.Month()`][month].
이게 어떻게 동작하는지 더 알고 싶으면 [공식 문서][time]를 참고해요.

[`time`][time] 패키지에는 경과 시간을 나타내는 또 다른 타입인 [`Duration`][duration]이 있고, 위치/시간대, 타이머 등 다른 개념에서 다룰 관련 기능들도 지원해요.

[time]: https://golang.org/pkg/time/#Time
[now]: https://golang.org/pkg/time/#Now
[const]: https://pkg.go.dev/time#pkg-constants
[format]: https://pkg.go.dev/time#Time.Format
[hour]: https://pkg.go.dev/time#Time.Hour
[month]: https://pkg.go.dev/time/#Time.Month
[duration]: https://pkg.go.dev/time#Duration
[parse]: https://golang.org/pkg/time/#Parse
