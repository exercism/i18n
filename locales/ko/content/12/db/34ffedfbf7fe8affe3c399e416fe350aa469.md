# 안내

이 연습 문제에서는 간단한 정수 계산기의 오류 처리를 만들어 볼 거예요. 편의를 위해 덧셈, 곱셈, 나눗셈을 계산하는 메서드가 미리 준비되어 있어요.

목표는 인자로 `16`, `51`, `+`를 받았을 때 `16 + 51 = 67`과 같은 패턴의 문자열을 반환하는 계산기를 완성하는 거예요.

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. 계산기 연산 구현하기

이 작업에서 구현할 주요 메서드는 (_정적_) `SimpleCalculator.Calculate()` 메서드예요. 이 메서드는 세 개의 인자를 받아요. 처음 두 인자는 연산을 수행할 정수예요. 세 번째 인자는 문자열 타입이고, 이 연습 문제에서는 다음 연산을 구현해야 해요.

- `+` 문자열을 사용한 덧셈
- `*` 문자열을 사용한 곱셈
- `/` 문자열을 사용한 나눗셈

## 2. 잘못된 연산 처리하기

다른 연산 기호가 들어오면 `ArgumentOutOfRangeException` 예외를 던져야 해요. 연산 인자가 빈 문자열이면 메서드는 `ArgumentException` 예외를 던져야 해요. 연산 인자로 `null`이 들어오면 메서드는 `ArgumentNullException` 예외를 던져야 해요.

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. 0으로 나눌 때의 오류 처리하기

`0`으로 나누려고 하면 계산기는 `Division by zero is not allowed.`라는 내용의 문자열을 반환해야 해요. 그 밖의 다른 예외는 `SimpleCalculator.Calculate()` 메서드에서 처리하지 않아요.

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
