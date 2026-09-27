# ভূমিকা

## অবজেক্ট ইনিশিয়ালাইজার

অবজেক্ট ইনিশিয়ালাইজার হলো কনস্ট্রাক্টরের একটি বিকল্প। নিচে সিনট্যাক্সটি দেখানো হয়েছে। আপনি দ্বিতীয় বন্ধনীর ভেতরে `=` দিয়ে আলাদা করা নাম-মান জোড়ার একটি তালিকা দেন, যার জোড়াগুলো কমা দিয়ে আলাদা করা থাকে:

```csharp
public class Person
{
    public string Name;
    public string Address;
}

var person = new Person{Name="The President", Address = "Élysée Palace"};
```

এই পদ্ধতিতে কালেকশনও ইনিশিয়ালাইজ করা যায়। সাধারণত এটি এখানে দেখানো মতো কমা দিয়ে আলাদা করা তালিকা ব্যবহার করে করা হয়:

```csharp
IList<Person> people = new List<Person>{ new Person(), new Person{Name="Joe Shmo"}};
```

ডিকশনারি নিচের সিনট্যাক্সটি ব্যবহার করে:

```csharp
IDictionary<int, string> numbers = new Dictionary<int, string>{ [0] = "zero", [1] = "one"...};

// or

IDictionary<int, string> numbers = new Dictionary<int, string>{ {0, "zero" }, {1,  "one"}...};
```
