# 소개

## Option

`Option` 타입은 값이 있을 수도, 없을 수도 있는 값을 나타낼 때 사용해요.

`gleam/option` 모듈에 다음과 같이 정의되어 있어요:

```gleam
type Option(a) {
  Some(a)
  None
}
```

`Some` 생성자는 값이 있을 때 그 값을 감쌀 때 사용하고, `None` 생성자는 값이 없음을 나타낼 때 사용해요.

`Option`의 내용에 접근할 때는 보통 패턴 매칭을 사용해요.

```gleam
import gleam/option.{type Option, None, Some}

pub fn say_hello(person: Option(String)) -> String {
  case person {
    Some(name) -> "Hello, " <> name <> "!"
    None -> "Hello, Friend!"
  }
}
```

```gleam
say_hello(Some("Matthieu"))
// -> "Hello, Matthieu!"

say_hello(None)
// -> "Hello, Friend!"
```

`gleam/option` 모듈에는 `Option` 타입을 다룰 때 유용한 함수도 여러 개 정의되어 있어요. 예를 들어 `unwrap`은 `Option`의 내용을 반환하고, 값이 `None`이면 기본값을 반환해요.

```gleam
import gleam/option.{type Option}

pub fn say_hello_again(person: Option(String)) -> String {
  let name = option.unwrap(person, "Friend")
  "Hello, " <> name <> "!"
}
```
