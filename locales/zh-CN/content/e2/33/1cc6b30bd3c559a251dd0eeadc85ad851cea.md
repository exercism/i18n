# 关于

[扩展方法][extension-methods]允许在不创建新的派生类型、不重新编译，也不以其他方式修改原类型的情况下，为现有类型添加方法。

扩展方法是静态方法，但调用起来就像在扩展类型上调用实例方法一样。它通过在类型前加上 `this` 来实现这一点，表示我们调用了 `.` 的那个实例会作为第一个形参传入。对调用方的代码来说，调用扩展方法和调用类型中定义的方法看不出任何区别。

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

扩展方法是在命名空间这一层引入作用域的。这意味着，如果你的命名空间与定义该扩展方法的命名空间不同，就必须先用一条 `using` 指令把它的命名空间引入；例如，如果想在自己的代码中使用上面的例子，就得先写一条 `using MyExtensions` 指令。如果你的代码与定义扩展方法的命名空间相同，则无需 `using` 指令就能使用这些扩展方法。

扩展方法的一个著名例子是 [LINQ][linq] 标准查询运算符，它们为现有的 IEnumerable 类型添加了查询功能。要把它们引入作用域，需要一条 `using System.Linq;` 指令。

[linq]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/
[extension-methods]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods
