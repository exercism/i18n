# Bevezetés

## Objektum kezdőértékek

Az objektum kezdőértékek a konstruktorok alternatívái. A szintaxist az alábbi példa mutatja. A kapcsos zárójelek között vesszővel elválasztott név-érték párok listáját adod meg, ahol a nevet és az értéket `=` választja el:

```csharp
public class Person
{
    public string Name;
    public string Address;
}

var person = new Person{Name="The President", Address = "Élysée Palace"};
```

A gyűjteményeknek is így adhatod meg a kezdőértékeit. Ez általában vesszővel elválasztott listákkal történik, ahogy az alábbi példa mutatja:

```csharp
IList<Person> people = new List<Person>{ new Person(), new Person{Name="Joe Shmo"}};
```

A szótárak a következő szintaxist használják:

```csharp
IDictionary<int, string> numbers = new Dictionary<int, string>{ [0] = "zero", [1] = "one"...};

// or

IDictionary<int, string> numbers = new Dictionary<int, string>{ {0, "zero" }, {1,  "one"}...};
```
