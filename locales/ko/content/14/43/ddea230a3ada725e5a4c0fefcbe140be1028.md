# 지침 추가

## 주제

이 문제를 풀면서 함께 읽어보면 좋을 Rust 주제들이 있어요.

- 트레이트, `From` 트레이트와 [직접 트레이트 구현하기](https://doc.rust-lang.org/book/ch10-02-traits.html)
- 트레이트의 [기본 메서드 구현](https://doc.rust-lang.org/book/ch10-02-traits.html#default-implementations)
- 매크로, 매크로를 사용하면 이 연습 문제에서 반복되는 코드를 줄이고 가독성을 높일 수 있어요.
  예를 들어,
  [매크로로 여러 타입에 대해 한 번에 트레이트를 구현할 수 있어요](https://stackoverflow.com/questions/39150216/implementing-a-trait-for-multiple-types-at-once).
  물론 `Planet` 트레이트 자체에 `years_during`을 구현해도 괜찮아요. 매크로는 구조체와
  그 구현을 모두 정의할 수 있어요. 매크로를 시작하는 데 도움이 되는 정보는 다음에서
  찾을 수 있어요.

  - [The Rust Programming Language의 매크로 챕터](https://doc.rust-lang.org/stable/book/ch19-06-macros.html)
  - [자세한 설명이 담긴 예전 버전의 매크로 챕터](https://doc.rust-lang.org/1.30.0/book/first-edition/macros.html)
  - [Rust By Example](https://doc.rust-lang.org/stable/rust-by-example/macros.html)
