# Informazioni

I [metodi di estensione][extension-methods] permettono di aggiungere metodi a tipi esistenti senza creare un nuovo tipo derivato, ricompilare o modificare in altro modo il tipo originale.

I metodi di estensione sono metodi statici, ma vengono chiamati come se fossero metodi di istanza del tipo esteso. Ciò si ottiene usando `this` prima del tipo, il che indica che l'istanza su cui mettiamo il `.` viene passata come primo parametro. Per il codice client, non c'è alcuna differenza apparente tra chiamare un metodo di estensione e i metodi definiti in un tipo.

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

I metodi di estensione vengono portati nello scope a livello di namespace. Questo significa che se ti trovi in un namespace diverso da quello in cui è definito il metodo di estensione, il suo namespace deve prima comparire in una direttiva `using`; per esempio, se volessimo usare l'esempio qui sopra nel nostro codice, avremmo prima bisogno di una direttiva `using MyExtensions`. Se invece ti trovi nello stesso namespace in cui è definito il metodo di estensione, puoi usare i metodi di estensione senza una direttiva `using`.

Un esempio ben noto di metodi di estensione sono gli operatori di query standard di [LINQ][linq], che aggiungono funzionalità di query ai tipi IEnumerable esistenti. Per portarli nello scope abbiamo bisogno di una direttiva `using System.Linq;`.

[linq]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/
[extension-methods]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods
