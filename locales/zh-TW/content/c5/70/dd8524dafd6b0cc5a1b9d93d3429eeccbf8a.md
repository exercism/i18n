# 簡介

主要的算術和比較運算子可以經過改寫，供你自己的類別和結構使用。這就叫做_運算子多載_。

大多數運算子的形式如下：

```csharp
static <return type> operator <operator symbols>(<parameters>);
```

轉型運算子的形式如下：

```csharp
static (explicit|implicit) operator <cast-to-type>(<cast-from-type> <parameter name>);
```

運算子的行為和靜態方法相同。運算子符號會取代方法識別碼的位置，而它們一樣有參數和回傳型別。參數和回傳型別的型別規則符合你的直覺，你可以倚靠編譯器提供詳細的指引。
