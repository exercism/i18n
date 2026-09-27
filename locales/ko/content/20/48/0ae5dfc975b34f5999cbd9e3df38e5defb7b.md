# 소개

산술 오버플로는 산술 연산이나 형 변환 같은 계산의 결과가 값을 받는 타입이 담을 수 있는 범위보다 클 때 발생해요.

이런 상황에서 `int`와 `long`, 그리고 이들의 부호 없는 대응 타입으로 된 식은 아무런 오류 없이 값이 순환해요.

정수 계산의 동작은 `checked` 키워드를 사용해 바꿀 수 있어요. `checked` 블록 안에서 오버플로가 발생하면 `OverflowException` 인스턴스가 발생해요.

```csharp
int one = 1;
checked
{
    int expr = int.MaxValue + one;   // OverflowException is thrown
}

// or

int expr2 = checked(int.MaxValue + one);     // OverflowException is thrown
```

`float`와 `double` 타입의 식은 무한대라는 특별한 값을 가져요.

`decimal` 타입의 식은 `OverflowException` 인스턴스를 발생시켜요.
