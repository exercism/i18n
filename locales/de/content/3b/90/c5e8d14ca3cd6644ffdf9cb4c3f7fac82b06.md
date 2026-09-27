# Einführung

## Objektinitialisierer

Objektinitialisierer sind eine Alternative zu Konstruktoren. Die Syntax ist unten dargestellt. Du gibst eine durch Kommas getrennte Liste von Name-Wert-Paaren an, die mit `=` getrennt sind, und setzt sie in geschweifte Klammern:

```csharp
public class Person
{
    public string Name;
    public string Address;
}

var person = new Person{Name="The President", Address = "Élysée Palace"};
```

Sammlungen kannst du auf diese Weise ebenfalls initialisieren. Typischerweise geschieht das mit durch Kommas getrennten Listen, wie hier gezeigt:

```csharp
IList<Person> people = new List<Person>{ new Person(), new Person{Name="Joe Shmo"}};
```

Für Wörterbücher gilt die folgende Syntax:

```csharp
IDictionary<int, string> numbers = new Dictionary<int, string>{ [0] = "zero", [1] = "one"...};

// or

IDictionary<int, string> numbers = new Dictionary<int, string>{ {0, "zero" }, {1,  "one"}...};
```
