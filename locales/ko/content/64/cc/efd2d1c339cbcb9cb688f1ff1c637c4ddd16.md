# 소개

C#에서 튜플은 데이터를 정리해 주는 자료 구조로, 어떤 타입의 필드든 두 개 이상 담을 수 있어요.

튜플은 보통 쉼표로 구분한 두 개 이상의 식을 괄호 안에 넣어서 만들어요.

```csharp
string boast = "All you need to know";
bool success = !string.IsNullOrWhiteSpace(boast);
(bool, int, string) triple = (success, 42, boast);
```

튜플은 할당과 초기화 연산에서, 또는 반환값이나 메서드 인자로 사용할 수 있어요.

필드는 점 문법으로 꺼내요. 기본적으로 첫 번째 필드는 `Item1`, 두 번째 필드는 `Item2`예요. 그다음도 마찬가지고요. 기본 이름이 아닌 이름을 붙이는 방법은 아래에서 살펴봐요.

```csharp
// initialization
(int, int, int) vertices = (90, 45, 45);

// assignment
vertices = (60, 60, 60);

//  return value
(bool, int) GetSameOrBigger(int num1, int num2)
{
    return (num1 == num2, num1 > num2 ? num1 : num2);
}

// method argument
int Add((int, int) operands)
{
    return operands.Item1 + operands.Item2;
}
```

`Item1` 같은 필드 이름은 코드를 읽기 좋게 만들어 주지 않아요. 아래 코드는 튜플의 필드에 이름을 붙이는 두 가지 방법을 보여줘요. 아래 코드에서 `var`를 튜플과 함께 사용해 타입을 추론할 수 있다는 점도 눈여겨봐요. 이 방법은 이름이 있는 튜플과 이름이 없는 튜플 모두에서 똑같이 잘 동작해요.

```csharp
// name items in declaration
(bool success, string message) results = (true, "well done!");
bool mySuccess = results.success;
string myMessage = results.message;

// name items in creating expression
var results2 = (success: true, message: "well done!");
bool mySuccess2 = results2.success;
string myMessage2 = results2.message;
```
