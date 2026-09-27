# 소개

다른 언어들처럼 Go도 `switch`문을 제공해요.
`switch`문은 긴 `if ... else if`문을 더 짧게 쓸 수 있는 방법이에요.
`switch`문을 만들려면 먼저 `switch` 키워드를 쓰고 그 뒤에 값이나 식을 적어요.
그다음에는 각 조건을 `case` 키워드로 선언해요.
앞의 `case` 조건 중 어디에도 해당하지 않을 때 실행되는 `default` 케이스도 선언할 수 있어요.

```go
operatingSystem := "windows"

switch operatingSystem {
case "windows":
    // do something if the operating system is windows
case "linux":
    // do something if the operating system is linux
case "macos":
    // do something if the operating system is macos
default:
    // do something if the operating system is none of the above
} 
```

`switch`문에서 흥미로운 점은 `switch` 키워드 뒤의 값을 생략할 수 있고, 각 `case`마다 불리언 조건을 쓸 수 있다는 거예요.

```go
age := 21

switch {
case age > 20 && age < 30:
    // do something if age is between 20 and 30
case age == 10:
    // do something if age is equal to 10
default:
    // do something else for every other case
}
```
