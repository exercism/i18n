# Részletesen

A [bővítőmetódusok][extension-methods] lehetővé teszik, hogy új metódusokat adjunk meglévő típusokhoz anélkül, hogy új származtatott típust hoznánk létre, újrafordítanánk a kódot, vagy bármi más módon módosítanánk az eredeti típust.

A bővítőmetódusok statikus metódusok, mégis úgy hívjuk meg őket, mintha a bővített típus példánymetódusai lennének. Ezt úgy éri el, hogy a `this` kulcsszót a típus elé teszi, jelezve, hogy az a példány, amelyre a `.`-ot írtuk, első paraméterként kerül átadásra. A hívó kód számára nem látszik különbség aközött, hogy egy bővítőmetódust hívunk meg, vagy egy típusban definiált metódust.

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

A bővítőmetódusok névtér szintjén kerülnek be a scope-ba. Ez azt jelenti, hogy ha más névtérben vagy, mint ahol a bővítőmetódus definiálva van, előbb szerepeltetned kell a névterét egy `using` direktívában; ha például a fenti példát szeretnénk használni a kódunkban, először egy `using MyExtensions` direktívára lenne szükségünk. Ha ugyanabban a névtérben vagy, mint ahol a bővítőmetódus definiálva van, `using` direktíva nélkül is használhatod a bővítőmetódusokat.

A bővítőmetódusok jól ismert példája a [LINQ][linq] szabványos lekérdezési operátorai, amelyek lekérdezési funkciókkal bővítik a meglévő IEnumerable-típusokat. Ahhoz, hogy ezek is bekerüljenek a scope-ba, egy `using System.Linq;` direktívára van szükség.

[linq]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/
[extension-methods]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods
