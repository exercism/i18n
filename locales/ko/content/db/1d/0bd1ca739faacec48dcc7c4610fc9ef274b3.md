# 소개

람다는 이름이 없는 함수예요. 기본적으로 함수를 간단히 줄여 쓴 표기법이라고 할 수 있어요.

람다에는 식 람다와 문 람다 두 가지가 있어요:

```
(input_parameters) => expression
(input_parameters) => { <statements> }
```

## 람다 선언

값을 반환하지 않는(`void`) 람다는 `Action<T>` 대리자 형식으로 변환할 수 있어요.

```csharp
// Statement lambda
Action = () =>
{
    Console.WriteLine("No parameters");
    Console.WriteLine("Still nice, right?");
}

// Expression lambda
Action<int> = (x) => Console.WriteLine(x);
```

`void`가 아닌 값을 반환하는 람다는 `Func<T>` 대리자 형식으로 변환할 수 있어요.

```csharp
// Expression lambda
Func<int, int> = (x) => x * x;

// Statement lambda
Func<string, string, bool> = (left, right) =>
{
    var equal = left == right;
    return equal;
}
```

람다에 매개변수가 하나뿐이라면, 그 매개변수를 감싸는 괄호는 생략할 수 있어요:

```csharp
// Equivalent definitions
Action<int> = (x) => Console.WriteLine(x);
Action<int> = x => Console.WriteLine(x);
```

## 람다 인자

람다의 주된 쓰임은 다른 메서드에 인자로 전달하는 거예요. 대부분의 LINQ 메서드처럼요:

```csharp
var numbers = new[] { 1, 2, 3, 4 };
var doubled = numbers.Select(n => n * 2);
foreach (var number in doubled)
{
    Console.Write(number)
}
// => 2468
```
