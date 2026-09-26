# 说明

在这个练习中，你将和储蓄账户打交道。每年，储蓄账户的余额都会根据利率更新。银行给你的利率取决于你账户里的金额（即余额）：

- 余额为负时为 3.213%（余额会变得更负）。
- 余额为正且小于`1000`美元时为 0.5%。
- 余额为正且大于或等于`1000`美元、小于`5000`美元时为 1.621%。
- 余额为正且大于或等于`5000`美元时为 2.475%。

一共有四个任务，每个任务都会涉及余额和利率。

## 1. 计算利率

实现（_static_）`SavingsAccount.InterestRate()`方法，根据指定的余额计算利率：

```csharp
SavingsAccount.InterestRate(balance: 200.75m)
// 0.5f
```

注意，返回的值是`float`。

## 2. 计算利息

实现（_static_）`SavingsAccount.Interest()`方法，根据指定的余额计算利息：

```csharp
SavingsAccount.Interest(balance: 200.75m)
// 1.00375m
```

注意，返回的值是`decimal`。

## 3. 计算年度余额更新

实现（_static_）`SavingsAccount.AnnualBalanceUpdate()`方法，计算更新后的年度余额，并考虑利率：

```csharp
SavingsAccount.AnnualBalanceUpdate(balance: 200.75m)
// 201.75375m
```

注意，返回的值是`decimal`。

## 4. 计算达到目标余额所需的年数

实现（_static_）`SavingsAccount.YearsBeforeDesiredBalance()`方法，在每年复利的情况下，计算达到目标余额所需的最少年数：

```csharp
SavingsAccount.YearsBeforeDesiredBalance(balance: 200.75m, targetBalance: 214.88m)
// 14
```

注意，返回的值是`int`。

~~~~exercism/note
把单利作用于本金余额时，用余额乘以利率，两者的乘积就是利息金额。

而复利则是按周期反复计息。
每次计息时，先算出利息金额并加到本金余额上，这样后续的利息计算就会基于更大的本金余额。
~~~~
