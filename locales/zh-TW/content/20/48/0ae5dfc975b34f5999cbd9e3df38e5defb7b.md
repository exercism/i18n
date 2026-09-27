# 簡介

當某個計算（例如算術運算或型別轉換）產生的值超過接收型別的容量時，就會發生算術溢位。

在這種情況下，`int`和`long`型別的運算式，以及它們不帶正負號的對應型別，會悄悄地繞回。

整數運算的行為可以透過`checked`關鍵字來改變。當`checked`區塊內發生溢位時，就會擲回`OverflowException`執行個體。

```csharp
int one = 1;
checked
{
    int expr = int.MaxValue + one;   // OverflowException is thrown
}

// or

int expr2 = checked(int.MaxValue + one);     // OverflowException is thrown
```

`float`和`double`型別的運算式則會採用無限大這個特殊值。

`decimal`型別的運算式則會擲回`OverflowException`執行個體。
