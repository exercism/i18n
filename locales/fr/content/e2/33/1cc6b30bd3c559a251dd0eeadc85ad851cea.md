# À propos

Les [méthodes d'extension][extension-methods] permettent d'ajouter des méthodes à des types existants sans créer un nouveau type dérivé, sans recompiler, ni modifier le type d'origine d'une autre manière.

Les méthodes d'extension sont des méthodes statiques, mais on les appelle comme si c'étaient des méthodes d'instance sur le type étendu. Pour y parvenir, on place `this` devant le type, ce qui indique que l'instance sur laquelle on met le `.` est passée comme premier paramètre. Pour le code client, il n'y a aucune différence apparente entre appeler une méthode d'extension et appeler les méthodes définies dans un type.

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

Les méthodes d'extension sont mises dans la portée au niveau de l'espace de noms. Cela signifie que si tu te trouves dans un espace de noms différent de celui où la méthode d'extension est définie, son espace de noms doit d'abord apparaître dans une directive `using` ; par exemple, si on voulait utiliser l'exemple ci-dessus dans son code, il faudrait d'abord une directive `using MyExtensions`. Si tu es dans le même espace de noms que celui où la méthode d'extension est définie, tu peux utiliser les méthodes d'extension sans directive `using`.

Un exemple bien connu de méthodes d'extension, ce sont les opérateurs de requête standard de [LINQ][linq], qui ajoutent des fonctionnalités de requête aux types IEnumerable existants. Pour les mettre dans la portée, il faut une directive `using System.Linq;`.

[linq]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/
[extension-methods]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods
