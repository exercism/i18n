# مقدمة

## مُهيّئات الكائنات

مُهيّئات الكائنات بديل عن المنشئات. يوضّح المثال التالي صياغتها. حيث تقدّم قائمة من أزواج الاسم والقيمة مفصولة بفواصل، يفصل بين الاسم والقيمة فيها علامة `=`، وتوضع كلها داخل أقواس معقوفة:

```csharp
public class Person
{
    public string Name;
    public string Address;
}

var person = new Person{Name="The President", Address = "Élysée Palace"};
```

يمكن تهيئة المجموعات بالأسلوب نفسه أيضًا. وعادةً ما يتم ذلك باستخدام قوائم مفصولة بفواصل كما هو موضّح هنا:

```csharp
IList<Person> people = new List<Person>{ new Person(), new Person{Name="Joe Shmo"}};
```

أما القواميس فتستخدم الصياغة التالية:

```csharp
IDictionary<int, string> numbers = new Dictionary<int, string>{ [0] = "zero", [1] = "one"...};

// or

IDictionary<int, string> numbers = new Dictionary<int, string>{ {0, "zero" }, {1,  "one"}...};
```
