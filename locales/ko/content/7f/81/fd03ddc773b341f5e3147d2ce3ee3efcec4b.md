# 메서드 문법

Cairo의 메서드는 함수와 비슷하지만, 트레이트를 통해 특정 타입에 연결돼요.

메서드의 첫 번째 매개변수는 항상 `self`이고, 메서드가 호출되는 인스턴스를 나타내요.

Cairo에서는 타입에 메서드를 직접 정의할 수 없지만, 트레이트를 정의하고 그 타입에 대해 구현하면 같은 기능을 만들 수 있어요.

다음은 트레이트를 사용해 `Rectangle` 타입에 메서드를 정의한 예제예요:

```rust
#[derive(Copy, Drop)]
struct Rectangle {
    width: u64,
    height: u64,
}

#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn area(self: @Rectangle) -> u64 {
        (*self.width) * (*self.height)
    }
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };
    println!("Area is {}", rect.area());
}
```

위 예제에서 `area` 메서드는 사각형의 넓이를 계산해요.

`#[generate_trait]` 어트리뷰트를 사용하면 필요한 트레이트를 자동으로 만들어 주기 때문에 과정이 훨씬 간단해져요.

덕분에 코드가 더 깔끔해지면서도 메서드를 특정 타입에 연결할 수 있어요.

## 연관 함수

연관 함수는 메서드와 비슷하지만 타입의 인스턴스에 동작하지 않아요. 매개변수로 `self`를 받지 않죠.

이런 함수는 주로 생성자나 타입에 묶인 유틸리티 함수로 사용돼요.

```rust
#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn square(size: u64) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let square = RectangleTrait::square(10);
    println!("Square dimensions: {}x{}", square.width, square.height);
}
```

`Rectangle::square` 같은 연관 함수는 `::` 문법을 사용하고, 해당 타입의 네임스페이스에 속해요.

기존 객체가 없어도 인스턴스를 만들거나 다루기 쉽게 해줘요.

Cairo는 관련된 기능을 트레이트와 구현으로 정리함으로써 깔끔하고 모듈화된, 확장 가능한 코드 구조를 만들 수 있게 해줘요.
