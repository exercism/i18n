# Utasítások

Ebben a feladatban megtakarítási számlákkal fogsz dolgozni. A megtakarítási számlád egyenlege minden évben a kamatláb alapján frissül. Az, hogy a bankod milyen kamatlábat ad neked, attól függ, mennyi pénz van a számládon (az egyenlegeden):

- 3,213% negatív egyenleg esetén (az egyenleg még negatívabb lesz).
- 0,5% `1000` dollárnál kisebb pozitív egyenleg esetén.
- 1,621% legalább `1000` dollár, de `5000` dollárnál kevesebb pozitív egyenleg esetén.
- 2,475% legalább `5000` dollár pozitív egyenleg esetén.

Négy részfeladat vár rád, és mindegyik az egyenlegeddel meg annak kamatlábával foglalkozik.

## 1. Számítsd ki a kamatlábat

Valósítsd meg a (_statikus_) `SavingsAccount.InterestRate()` metódust, amely a megadott egyenleg alapján kiszámítja a kamatlábat:

```csharp
SavingsAccount.InterestRate(balance: 200.75m)
// 0.5f
```

Figyeld meg, hogy a visszaadott érték `float`.

## 2. Számítsd ki a kamatot

Valósítsd meg a (_statikus_) `SavingsAccount.Interest()` metódust, amely a megadott egyenleg alapján kiszámítja a kamatot:

```csharp
SavingsAccount.Interest(balance: 200.75m)
// 1.00375m
```

Figyeld meg, hogy a visszaadott érték `decimal`.

## 3. Számítsd ki az éves egyenlegfrissítést

Valósítsd meg a (_statikus_) `SavingsAccount.AnnualBalanceUpdate()` metódust, amely kiszámítja a frissített éves egyenleget, figyelembe véve a kamatlábat: 

```csharp
SavingsAccount.AnnualBalanceUpdate(balance: 200.75m)
// 201.75375m
```

Figyeld meg, hogy a visszaadott érték `decimal`.

## 4. Számítsd ki, hány év kell a kívánt egyenleg eléréséig

Valósítsd meg a (_statikus_) `SavingsAccount.YearsBeforeDesiredBalance()` metódust, amely kiszámítja, hogy évente kamatozó kamat mellett minimálisan hány év kell a kívánt egyenleg eléréséhez:

```csharp
SavingsAccount.YearsBeforeDesiredBalance(balance: 200.75m, targetBalance: 214.88m)
// 14
```

Figyeld meg, hogy a visszaadott érték `int`.

~~~~exercism/note
Amikor egy tőkeegyenlegre egyszerű kamatot alkalmazunk, az egyenleget megszorozzuk a kamatlábbal, és a kettő szorzata adja a kamat összegét.

A kamatos kamat ezzel szemben úgy működik, hogy rendszeresen alkalmazzuk a kamatot.
Minden alkalommal kiszámítjuk a kamat összegét, és hozzáadjuk a tőkeegyenleghez, így a következő kamatszámítások már nagyobb tőkeegyenlegre vonatkoznak.
~~~~
