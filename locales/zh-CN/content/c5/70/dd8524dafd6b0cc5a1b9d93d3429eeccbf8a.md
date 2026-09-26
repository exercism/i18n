# 简介

主要的算术运算符和比较运算符经过改造，都可以供你自己的类和结构体使用。这被称为_运算符重载_。

大多数运算符的形式如下：

```csharp
static <return type> operator <operator symbols>(<parameters>);
```

类型转换运算符的形式如下：

```csharp
static (explicit|implicit) operator <cast-to-type>(<cast-from-type> <parameter name>);
```

运算符的行为与静态方法相同。运算符符号占据方法标识符的位置，它们同样有形参和返回类型。形参和返回类型的类型规则符合你的直觉，你可以放心依靠编译器给出详细的指引。
