# Acerca de

Los [métodos de extensión][extension-methods] permiten añadir métodos a tipos existentes sin crear un nuevo tipo derivado, volver a compilar ni modificar de otro modo el tipo original.

Los métodos de extensión son métodos estáticos, pero se llaman como si fueran métodos de instancia del tipo extendido. Lo consiguen usando `this` antes del tipo, lo que indica que la instancia sobre la que ponemos el `.` se pasa como primer parámetro. Para el código cliente, no hay diferencia aparente entre llamar a un método de extensión y a los métodos definidos en un tipo.

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

Los métodos de extensión se incorporan al scope a nivel de espacio de nombres. Esto significa que si estás en un espacio de nombres distinto de aquel en el que se define el método de extensión, su espacio de nombres debe aparecer primero en una directiva `using`; por ejemplo, si queremos usar el ejemplo anterior en nuestro código, primero necesitamos una directiva `using MyExtensions`. Si estás en el mismo espacio de nombres en el que se define el método de extensión, puedes usar los métodos de extensión sin una directiva `using`.

Un ejemplo muy conocido de métodos de extensión son los operadores de consulta estándar de [LINQ][linq], que añaden funcionalidad de consulta a los tipos IEnumerable existentes. Para incorporarlos al scope necesitamos una directiva `using System.Linq;`.

[linq]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/
[extension-methods]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods
