# 説明

この演習では、普通預金口座を扱います。預金残高は、毎年、金利に基づいて更新されます。銀行が提示する金利は、口座にあるお金の額（残高）によって決まります。

- 残高がマイナスの場合は3.213%（残高はさらにマイナスになります）。
- `1000`ドル未満のプラスの残高は0.5%。
- `1000`ドル以上`5000`ドル未満のプラスの残高は1.621%。
- `5000`ドル以上のプラスの残高は2.475%。

4つのタスクがあり、どれも残高と金利を扱います。

## 1. 金利を計算する

指定された残高に基づいて金利を計算する、（_静的_）`SavingsAccount.InterestRate()`メソッドを実装します。

```csharp
SavingsAccount.InterestRate(balance: 200.75m)
// 0.5f
```

戻り値は`float`であることに注意してください。

## 2. 利息を計算する

指定された残高に基づいて利息を計算する、（_静的_）`SavingsAccount.Interest()`メソッドを実装します。

```csharp
SavingsAccount.Interest(balance: 200.75m)
// 1.00375m
```

戻り値は`decimal`であることに注意してください。

## 3. 年間の残高更新を計算する

金利を考慮して、更新後の年間残高を計算する、（_静的_）`SavingsAccount.AnnualBalanceUpdate()`メソッドを実装します。

```csharp
SavingsAccount.AnnualBalanceUpdate(balance: 200.75m)
// 201.75375m
```

戻り値は`decimal`であることに注意してください。

## 4. 目標残高に到達するまでの年数を計算する

毎年複利で利息が付く場合に、目標残高に到達するために必要な最小年数を計算する、（_静的_）`SavingsAccount.YearsBeforeDesiredBalance()`メソッドを実装します。

```csharp
SavingsAccount.YearsBeforeDesiredBalance(balance: 200.75m, targetBalance: 214.88m)
// 14
```

戻り値は`int`であることに注意してください。

~~~~exercism/note
元金に単利を適用する場合、残高に金利を掛け、その積が利息の額になります。

一方、複利は利息を繰り返し適用することで計算します。
適用のたびに利息の額を計算して元金に加えるので、次の利息計算ではより大きな元金に対して利息が付きます。
~~~~
