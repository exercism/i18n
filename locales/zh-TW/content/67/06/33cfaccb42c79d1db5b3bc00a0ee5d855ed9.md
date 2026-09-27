# 說明

在這個練習中，你會操作儲蓄帳戶。你的儲蓄帳戶餘額每年都會根據利率更新。銀行給你的利率取決於你帳戶裡的金額（也就是餘額）：

- 餘額為負時為 3.213%（餘額會變得更負）。
- 餘額為正且低於`1000`美元時為 0.5%。
- 餘額為正、大於等於`1000`美元且低於`5000`美元時為 1.621%。
- 餘額為正且大於等於`5000`美元時為 2.475%。

你有四個任務，每個任務都會處理你的餘額和它的利率。

## 1. 計算利率

實作（_static_）`SavingsAccount.InterestRate()`方法，根據指定的餘額計算利率：

```csharp
SavingsAccount.InterestRate(balance: 200.75m)
// 0.5f
```

請注意，回傳的值是`float`。

## 2. 計算利息

實作（_static_）`SavingsAccount.Interest()`方法，根據指定的餘額計算利息：

```csharp
SavingsAccount.Interest(balance: 200.75m)
// 1.00375m
```

請注意，回傳的值是`decimal`。

## 3. 計算年度餘額更新

實作（_static_）`SavingsAccount.AnnualBalanceUpdate()`方法，計算更新後的年度餘額，並將利率納入考量：

```csharp
SavingsAccount.AnnualBalanceUpdate(balance: 200.75m)
// 201.75375m
```

請注意，回傳的值是`decimal`。

## 4. 計算達到目標餘額所需的年數

實作（_static_）`SavingsAccount.YearsBeforeDesiredBalance()`方法，在每年複利的情況下，計算達到目標餘額所需的最少年數：

```csharp
SavingsAccount.YearsBeforeDesiredBalance(balance: 200.75m, targetBalance: 214.88m)
// 14
```

請注意，回傳的值是`int`。

~~~~exercism/note
對本金套用單利時，會將餘額乘上利率，兩者相乘的乘積就是利息金額。

另一方面，複利則是定期套用利息。
每次套用時，都會計算出利息金額並加到本金上，讓後續的利息計算以更大的本金為基礎。
~~~~
