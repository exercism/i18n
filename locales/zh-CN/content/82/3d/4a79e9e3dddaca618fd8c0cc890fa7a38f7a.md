# 引言

## 方法重载

_方法重载_允许同一个类中的多个方法使用相同的名称。重载的方法之间必须在以下某一方面有所不同：

- 形参的数量
- 形参的类型

不能根据返回类型进行方法重载。

编译器会根据形参的数量和类型，自动推断该调用哪个重载方法。

## 命名实参

到目前为止，我们看到传入方法的实参是按位置与方法声明的形参相匹配的。还有一种方式：当例程需要大量实参时，调用方可以通过指定所声明形参的标识符来匹配实参。

下面的代码演示了这种语法：

```csharp
class Card
{
    static string NewYear(int year, int month, int day)
    {
        return $"Happy {year}-{month}-{day}!";
    }
}

Card.NewYear(month: 1, day: 1, year: 2020);  // => "Happy 2020-1-1!"
```

## 可选形参

为方法的形参指定默认值，就能把它设为可选形参。调用带可选形参的方法时，调用方不必为它们传值。如果没有为可选形参传值，就会使用它的默认值。

可选形参_必须_位于形参列表的末尾；它们后面不能再跟非可选形参。

```csharp
class Card
{
    static string NewYear(int year = 2020)
    {
        return $"Happy {year}!";
    }
}

Card.NewYear();     // => "Happy 2020!"
Card.NewYear(1999); // => "Happy 1999!"
```
