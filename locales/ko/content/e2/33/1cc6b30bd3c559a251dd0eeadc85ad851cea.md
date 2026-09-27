# 자세히 알아보기

[확장 메서드][extension-methods]를 사용하면 새 파생 형식을 만들거나 다시 컴파일하거나 원래 형식을 수정하지 않고도 기존 형식에 메서드를 추가할 수 있어요.

확장 메서드는 정적 메서드지만, 마치 확장 대상 형식의 인스턴스 메서드인 것처럼 호출해요. 이는 형식 앞에 `this`를 사용해서 가능한데, `.`을 붙인 인스턴스가 첫 번째 매개변수로 전달된다는 뜻이에요. 클라이언트 코드에서는 확장 메서드를 호출하는 것과 형식에 정의된 메서드를 호출하는 것 사이에 눈에 띄는 차이가 없어요.

```csharp
namespace MyExtensions
{
    public static int WordCount(this string str)
    {
        return str.Split().Length;
    }
}

"Hello World".WordCount();
// => 2
```

확장 메서드는 네임스페이스 수준에서 스코프에 포함돼요. 즉, 확장 메서드가 정의된 네임스페이스와 다른 네임스페이스에 있다면, 먼저 해당 네임스페이스가 `using` 지시문에 포함되어 있어야 해요. 예를 들어 위 예제를 코드에서 사용하려면 먼저 `using MyExtensions` 지시문이 필요해요. 확장 메서드가 정의된 네임스페이스와 같은 네임스페이스에 있다면, `using` 지시문 없이 확장 메서드를 사용할 수 있어요.

확장 메서드의 잘 알려진 예로는 기존 IEnumerable 형식에 쿼리 기능을 추가하는 [LINQ][linq] 표준 쿼리 연산자가 있어요. 이것들을 스코프에 포함하려면 `using System.Linq;` 지시문이 필요해요.

[linq]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/
[extension-methods]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods
