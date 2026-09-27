# Introdução

## Inicializadores de objetos

Os inicializadores de objetos são uma alternativa aos construtores. A sintaxe é ilustrada abaixo. Forneces uma lista de pares nome-valor separados por vírgulas, com o nome e o valor separados por `=`, tudo entre chavetas:

```csharp
public class Person
{
    public string Name;
    public string Address;
}

var person = new Person{Name="The President", Address = "Élysée Palace"};
```

As coleções também podem ser inicializadas desta forma. Normalmente, isto faz-se com listas separadas por vírgulas, como se mostra aqui:

```csharp
IList<Person> people = new List<Person>{ new Person(), new Person{Name="Joe Shmo"}};
```

Os dicionários usam a seguinte sintaxe:

```csharp
IDictionary<int, string> numbers = new Dictionary<int, string>{ [0] = "zero", [1] = "one"...};

// or

IDictionary<int, string> numbers = new Dictionary<int, string>{ {0, "zero" }, {1,  "one"}...};
```
