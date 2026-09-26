# Acerca de

Los [métodos de extensión][extension-methods] permiten agregar métodos a tipos existentes sin crear un nuevo tipo derivado, sin recompilar y sin modificar de ninguna otra forma el tipo original.

Los métodos de extensión son métodos estáticos, pero se llaman como si fueran métodos de instancia del tipo extendido. Esto se logra usando `this` antes del tipo, lo que indica que la instancia a la que le pones el `.` se pasa como primer parámetro. Para el código cliente, no hay ninguna diferencia aparente entre llamar a un método de extensión y llamar a los métodos definidos en un tipo.

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

Los métodos de extensión se incorporan al ámbito a nivel de espacio de nombres. Esto significa que si estás en un espacio de nombres distinto de aquel en el que se define el método de extensión, primero su espacio de nombres debe aparecer en una directiva `using`; por ejemplo, si quisiéramos usar el ejemplo anterior en nuestro código, primero necesitaríamos una directiva `using MyExtensions`. Si estás en el mismo espacio de nombres en el que se define el método de extensión, puedes usar los métodos de extensión sin una directiva `using`.

Un ejemplo muy conocido de los métodos de extensión son los [operadores de consulta estándar de LINQ][linq], que agregan funcionalidad de consulta a los tipos IEnumerable existentes. Para incorporarlos al ámbito necesitamos una directiva `using System.Linq;`.

[linq]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/
[extension-methods]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods
