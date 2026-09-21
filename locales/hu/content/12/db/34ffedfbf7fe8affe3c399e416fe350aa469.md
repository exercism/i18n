# Utasítások

Ebben a feladatban egy egyszerű, egész számokkal dolgozó számológép hibakezelését építed fel. Hogy egyszerűbb legyen a dolgod, az összeadás, a szorzás és az osztás elvégzésére kész metódusokat kapsz.

A cél egy működő számológép, amely a következő mintázatú stringet adja vissza: `16 + 51 = 67`, ha a `16`, `51` és `+` argumentumokat kapja.

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. Valósítsd meg a számológép műveleteit

Ebben a részfeladatban a fő megvalósítandó metódus a (_statikus_) `SimpleCalculator.Calculate()` metódus. Három argumentumot vár. Az első két argumentum egész szám, amelyeken a műveletet el fogod végezni. A harmadik argumentum string típusú, és ebben a feladatban a következő műveleteket kell megvalósítanod:

- összeadás a `+` string használatával
- szorzás a `*` string használatával
- osztás a `/` string használatával

## 2. Kezeld az érvénytelen műveleteket

Bármely más műveleti jel esetén a `ArgumentOutOfRangeException` kivételt kell dobni. Ha a művelet argumentuma üres string, akkor a metódusnak az `ArgumentException` kivételt kell dobnia. Ha `null` az értéke a művelet argumentumának, akkor a metódusnak az `ArgumentNullException` kivételt kell dobnia.

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. Kezeld a nullával való osztás hibáit

Amikor `0`-val próbálsz osztani, a számológépnek a `Division by zero is not allowed.` tartalmú stringet kell visszaadnia. A `SimpleCalculator.Calculate()` metódusnak semmilyen más kivételt nem szabad kezelnie.

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
