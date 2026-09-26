# 概要

[拡張メソッド][extension-methods]を使うと、新しい派生型を作ったり、再コンパイルしたり、元の型をその他の方法で変更したりすることなく、既存の型にメソッドを追加できます。

拡張メソッドは静的メソッドですが、拡張する型のインスタンスメソッドであるかのように呼び出せます。これは、型の前に`this`を付けることで実現しています。`this`を付けた型のインスタンス、つまり`.`を付けた対象のインスタンスが、最初の仮引数として渡されるのです。呼び出し側のコードから見ると、拡張メソッドを呼び出すことと、型で定義されたメソッドを呼び出すことの間に、見た目の違いはありません。

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

拡張メソッドは、名前空間のレベルでスコープに取り込まれます。つまり、拡張メソッドが定義されている名前空間とは別の名前空間にいる場合、まずその名前空間を`using`ディレクティブに書く必要があります。たとえば、上の例を自分のコードで使いたいときは、最初に`using MyExtensions`ディレクティブが必要です。拡張メソッドが定義されている名前空間と同じ名前空間にいる場合は、`using`ディレクティブなしで拡張メソッドを使えます。

拡張メソッドのよく知られた例として、[LINQ][linq]の標準クエリ演算子があります。これは、既存のIEnumerable型にクエリ機能を追加するものです。これらをスコープに取り込むには、`using System.Linq;`ディレクティブが必要です。

[linq]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/
[extension-methods]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods
