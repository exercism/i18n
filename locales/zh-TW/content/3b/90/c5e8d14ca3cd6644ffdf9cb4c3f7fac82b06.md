# 簡介

## 物件初始化

物件初始化是建構子以外的另一種選擇。語法如下所示。你在大括號內提供一串以逗號分隔的名稱與值配對，每組配對以`=`分隔：

```csharp
public class Person
{
    public string Name;
    public string Address;
}

var person = new Person{Name="The President", Address = "Élysée Palace"};
```

集合也可以用這種方式初始化。通常會使用以逗號分隔的清單來完成，如下所示：

```csharp
IList<Person> people = new List<Person>{ new Person(), new Person{Name="Joe Shmo"}};
```

字典則使用以下語法：

```csharp
IDictionary<int, string> numbers = new Dictionary<int, string>{ [0] = "zero", [1] = "one"...};

// or

IDictionary<int, string> numbers = new Dictionary<int, string>{ {0, "zero" }, {1,  "one"}...};
```
