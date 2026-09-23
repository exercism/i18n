# Introduction

## Initialiseurs d'objet

Les initialiseurs d'objet sont une alternative aux constructeurs. La syntaxe est illustrée ci-dessous. On fournit une liste de paires nom-valeur séparées par des virgules, avec `=` entre le nom et la valeur, le tout entre accolades :

```csharp
public class Person
{
    public string Name;
    public string Address;
}

var person = new Person{Name="The President", Address = "Élysée Palace"};
```

Les collections peuvent aussi être initialisées de cette façon. En général, on y parvient avec des listes séparées par des virgules, comme ici :

```csharp
IList<Person> people = new List<Person>{ new Person(), new Person{Name="Joe Shmo"}};
```

Les dictionnaires utilisent la syntaxe suivante :

```csharp
IDictionary<int, string> numbers = new Dictionary<int, string>{ [0] = "zero", [1] = "one"...};

// or

IDictionary<int, string> numbers = new Dictionary<int, string>{ {0, "zero" }, {1,  "one"}...};
```
