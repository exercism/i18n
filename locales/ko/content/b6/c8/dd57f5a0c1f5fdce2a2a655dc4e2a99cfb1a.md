# 소개

C#의 `struct`는 `class`와 밀접한 관련이 있어요.
`struct`도 상태와 동작을 가져요.
인자를 받는 생성자도 있고, 인스턴스를 할당하거나 같은지 비교할 수 있으며 컬렉션에 저장할 수도 있어요.

```csharp
enum Unit
{
    Kg,
    Lb
}
struct Weight
{
    private double count;
    private Unit unit;

    public Weight(double count, Unit unit)
    {
        this.count = count;
        this.unit = unit;
    }

    public override string ToString()
    {
        return count.ToString() + unit.ToString();
    }
}

new Weight(77.5, Unit.Kg).ToString();
// => "77.6Kg"
```
