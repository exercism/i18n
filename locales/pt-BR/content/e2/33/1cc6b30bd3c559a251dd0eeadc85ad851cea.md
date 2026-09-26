# Sobre

[Métodos de extensão][extension-methods] permitem adicionar métodos a tipos existentes sem criar um novo tipo derivado, recompilar ou modificar de outra forma o tipo original.

Métodos de extensão são métodos estáticos, mas são chamados como se fossem métodos de instância do tipo estendido. Isso acontece porque se usa `this` antes do tipo, indicando que a instância na qual colocamos o `.` é passada como primeiro parâmetro. Para o código cliente, não há diferença aparente entre chamar um método de extensão e chamar os métodos definidos em um tipo.

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

Métodos de extensão entram no escopo no nível do namespace. Isso significa que, se você estiver em um namespace diferente daquele em que o método de extensão está definido, o namespace dele precisa estar primeiro em uma diretiva `using`; por exemplo, se quiséssemos usar o exemplo acima no nosso código, antes precisaríamos de uma diretiva `using MyExtensions`. Se você estiver no mesmo namespace em que o método de extensão está definido, pode usar os métodos de extensão sem uma diretiva `using`.

Um exemplo bem conhecido de métodos de extensão são os [operadores de consulta padrão][linq] do [LINQ][linq], que adicionam funcionalidade de consulta aos tipos IEnumerable existentes. Para trazê-los para o escopo, precisamos de uma diretiva `using System.Linq;`.

[linq]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/
[extension-methods]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods
