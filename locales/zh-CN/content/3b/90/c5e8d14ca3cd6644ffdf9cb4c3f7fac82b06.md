# 简介

## 对象初始化器

对象初始化器是构造函数之外的一种选择。语法如下所示。你需要在花括号中提供一个逗号分隔的名称-值对列表，名称和值之间用`=`分隔：

```csharp
public class Person
{
    public string Name;
    public string Address;
}

var person = new Person{Name="The President", Address = "Élysée Palace"};
```

集合也可以用这种方式初始化。通常，可以用下面这样的逗号分隔列表来实现：

```csharp
IList<Person> people = new List<Person>{ new Person(), new Person{Name="Joe Shmo"}};
```

字典使用以下语法：

```csharp
IDictionary<int, string> numbers = new Dictionary<int, string>{ [0] = "zero", [1] = "one"...};

// or

IDictionary<int, string> numbers = new Dictionary<int, string>{ {0, "zero" }, {1,  "one"}...};
```
