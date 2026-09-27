# Über

[Erweiterungsmethoden][extension-methods] ermöglichen es, Methoden zu vorhandenen Typen hinzuzufügen, ohne einen neuen abgeleiteten Typ zu erstellen, neu zu kompilieren oder den ursprünglichen Typ anderweitig zu ändern.

Erweiterungsmethoden sind statische Methoden, aber sie werden so aufgerufen, als wären sie Instanzmethoden des erweiterten Typs. Das erreichen sie, indem sie `this` vor den Typ setzen: Damit wird angegeben, dass die Instanz, auf die wir mit `.` zugreifen, als erster Parameter übergeben wird. Für den aufrufenden Code gibt es keinen erkennbaren Unterschied zwischen dem Aufruf einer Erweiterungsmethode und den in einem Typ definierten Methoden.

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

Erweiterungsmethoden werden auf Namespace-Ebene in den Gültigkeitsbereich gebracht. Das bedeutet: Wenn du dich in einem anderen Namespace befindest als dem, in dem die Erweiterungsmethode definiert ist, muss der Namespace der Erweiterungsmethode zuerst in einer `using`-Direktive stehen. Wenn wir das obige Beispiel in unserem Code verwenden wollten, bräuchten wir zum Beispiel zuerst eine `using MyExtensions`-Direktive. Wenn du dich im selben Namespace befindest wie die Erweiterungsmethode, kannst du die Erweiterungsmethoden ohne `using`-Direktive verwenden.

Ein bekanntes Beispiel für Erweiterungsmethoden sind die [LINQ][linq]-Standardabfrageoperatoren, die den vorhandenen IEnumerable-Typen Abfragefunktionalität hinzufügen. Um diese in den Gültigkeitsbereich zu bringen, brauchen wir eine `using System.Linq;`-Direktive.

[linq]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/
[extension-methods]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods
