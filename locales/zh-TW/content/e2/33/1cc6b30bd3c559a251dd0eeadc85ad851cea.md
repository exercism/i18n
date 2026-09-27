# 關於

[擴充方法][extension-methods] 讓你能為現有的型別新增方法，而不需要建立新的衍生型別、重新編譯，或以其他方式修改原始型別。

擴充方法是靜態方法，但呼叫它們的方式就像它們是擴充型別上的執行個體方法一樣。之所以能做到這一點，是因為在型別前使用了 `this`，表示我們加上 `.` 的那個執行個體會當作第一個參數傳入。對用戶端程式碼來說，呼叫擴充方法和呼叫型別中定義的方法並沒有明顯的差別。

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

擴充方法是在命名空間層級納入範圍的。這表示如果你所在的命名空間和定義擴充方法的命名空間不同，就必須先透過 `using` 指示詞引入它的命名空間；例如，如果我們想在程式碼中使用上面的範例，就得先加上 `using MyExtensions` 指示詞。如果你和擴充方法定義所在的命名空間相同，就可以直接使用擴充方法，不需要 `using` 指示詞。

擴充方法一個很有名的例子是 [LINQ][linq] 標準查詢運算子，它們為現有的 IEnumerable 型別增添了查詢功能。要將這些運算子納入範圍，我們需要 `using System.Linq;` 指示詞。

[linq]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/
[extension-methods]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods
