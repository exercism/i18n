# 소개

Go에는 `fmt`(형식 패키지)라는 내장 패키지가 있어서 입력과 출력의 형식을 자유롭게 다루는 다양한 함수를 제공해요.
가장 많이 쓰는 함수는 `Sprintf`예요. `Sprintf`는 `%s`와 같은 *동사*를 사용해 값을 문자열에 삽입하고, 그 문자열을 반환해요.

```go
import "fmt"

food := "taco"
fmt.Sprintf("Bring me a %s", food)
// Returns: Bring me a taco
```

Go에서는 실수 값을 Sprintf의 동사로 간편하게 서식화할 수 있어요. `%g`(간결한 표현), `%e`(지수), `%f`(지수 아님)를 쓰면 돼요.
세 동사 모두 필드의 너비와 소수점 자릿수를 조절할 수 있어요.

```go
import "fmt"

number := 4.3242
fmt.Sprintf("%.2f", number)
// Returns: 4.32
```

사용할 수 있는 동사의 전체 목록은 [format 패키지 문서][fmt-docs]에서 볼 수 있어요.

`fmt`에는 문자열을 다루는 다른 함수들도 있어요. `Println`은 전달받은 인자를 콘솔에 그대로 출력하고, `Printf`는 `Sprintf`와 같은 방식으로 입력을 서식화한 뒤 출력해요.

[fmt-docs]: https://pkg.go.dev/fmt
