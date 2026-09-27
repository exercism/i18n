# Introduzione

## Inizializzatori di oggetto

Gli inizializzatori di oggetto sono un'alternativa ai costruttori. La sintassi è illustrata qui sotto. Si fornisce un elenco di coppie nome-valore separate da virgole, dove nome e valore sono separati da `=`, racchiuso tra parentesi graffe (`{}`):

```csharp
public class Person
{
    public string Name;
    public string Address;
}

var person = new Person{Name="The President", Address = "Élysée Palace"};
```

Anche le collezioni si possono inizializzare in questo modo. Di solito si usano elenchi separati da virgole, come in questo esempio:

```csharp
IList<Person> people = new List<Person>{ new Person(), new Person{Name="Joe Shmo"}};
```

Per i dizionari si usa la sintassi seguente:

```csharp
IDictionary<int, string> numbers = new Dictionary<int, string>{ [0] = "zero", [1] = "one"...};

// or

IDictionary<int, string> numbers = new Dictionary<int, string>{ {0, "zero" }, {1,  "one"}...};
```
