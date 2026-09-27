# معرفی

## مقداردهی اولیه‌ی شیء

«مقداردهی اولیه‌ی شیء» جایگزینی برای سازنده‌ها است. نحوه‌ی نگارش آن در زیر نشان داده شده است. یک فهرست جداشده با ویرگول از جفت‌های اسم-مقدار می‌دهید که هر جفت را با `=` به هم وصل می‌کنید و همه را داخل «آکولاد» می‌گذارید:

```csharp
public class Person
{
    public string Name;
    public string Address;
}

var person = new Person{Name="The President", Address = "Élysée Palace"};
```

مجموعه‌ها را هم می‌توان به همین شکل مقداردهی اولیه کرد. معمولاً این کار با فهرست‌های جداشده با ویرگول انجام می‌شود، همان‌طور که در زیر می‌بینید:

```csharp
IList<Person> people = new List<Person>{ new Person(), new Person{Name="Joe Shmo"}};
```

دیکشنری‌ها از نحوه‌ی نگارش زیر استفاده می‌کنند:

```csharp
IDictionary<int, string> numbers = new Dictionary<int, string>{ [0] = "zero", [1] = "one"...};

// or

IDictionary<int, string> numbers = new Dictionary<int, string>{ {0, "zero" }, {1,  "one"}...};
```
