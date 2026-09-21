# Bevezetés

Aritmetikai túlcsordulás akkor következik be, amikor egy számítás, például egy aritmetikai művelet vagy egy típuskonverzió eredménye nagyobb, mint a fogadó típus kapacitása.

Az `int` és `long` típusú kifejezések, valamint előjel nélküli megfelelőik ilyen esetekben csendben átfordulnak.

Az egészszám-számítások viselkedése módosítható a `checked` kulcsszó használatával. Ha egy `checked` blokkon belül túlcsordulás történik, akkor a program egy `OverflowException` példányt dob.

```csharp
int one = 1;
checked
{
    int expr = int.MaxValue + one;   // OverflowException is thrown
}

// or

int expr2 = checked(int.MaxValue + one);     // OverflowException is thrown
```

A `float` és `double` típusú kifejezések egy speciális végtelen értéket vesznek fel.

A `decimal` típusú kifejezések `OverflowException` példányt dobnak.
