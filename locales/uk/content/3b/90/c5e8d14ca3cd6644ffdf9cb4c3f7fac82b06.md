# Вступ

## Ініціалізатори обʼєктів

Ініціалізатори обʼєктів - це альтернатива конструкторам. Синтаксис наведено нижче. Ми надаємо розділений комами список пар імʼя-значення, де імʼя та значення розділені знаком `=`, а весь список узятий у фігурні дужки:

```csharp
public class Person
{
    public string Name;
    public string Address;
}

var person = new Person{Name="The President", Address = "Élysée Palace"};
```

Колекції також можна ініціалізувати в такий спосіб. Зазвичай для цього використовують розділені комами списки, як показано тут:

```csharp
IList<Person> people = new List<Person>{ new Person(), new Person{Name="Joe Shmo"}};
```

Для словників використовують такий синтаксис:

```csharp
IDictionary<int, string> numbers = new Dictionary<int, string>{ [0] = "zero", [1] = "one"...};

// or

IDictionary<int, string> numbers = new Dictionary<int, string>{ {0, "zero" }, {1,  "one"}...};
```
