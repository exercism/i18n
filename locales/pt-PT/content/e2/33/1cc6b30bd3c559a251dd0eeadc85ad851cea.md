# Sobre

Os [métodos de extensão][extension-methods] permitem adicionar métodos a tipos existentes sem criar um novo tipo derivado, sem recompilar nem modificar de outra forma o tipo original.

Os métodos de extensão são métodos estáticos, mas são chamados como se fossem métodos de instância do tipo estendido. Consegue-se isto com a utilização de `this` antes do tipo, o que indica que a instância sobre a qual colocamos o `.` é passada como primeiro parâmetro. Para o código cliente, não há diferença aparente entre chamar um método de extensão e chamar os métodos definidos num tipo.

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

Os métodos de extensão são trazidos para o âmbito ao nível do namespace. Isto significa que, se estiveres num namespace diferente daquele em que o método de extensão está definido, o namespace do método tem de vir primeiro numa diretiva `using`; por exemplo, se quiséssemos usar o exemplo acima no nosso código, precisaríamos primeiro de uma diretiva `using MyExtensions`. Se estiveres no mesmo namespace em que o método de extensão está definido, podes usar os métodos de extensão sem uma diretiva `using`.

Um exemplo bem conhecido de métodos de extensão são os operadores de consulta padrão do [LINQ][linq], que acrescentam funcionalidade de consulta aos tipos IEnumerable existentes. Para os trazer para o âmbito, precisamos de uma diretiva `using System.Linq;`.

[linq]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/
[extension-methods]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods
