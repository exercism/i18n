# 안내

이 연습 문제에서는 저축 계좌를 다뤄요. 매년 저축 계좌의 잔액은 이자율에 따라 갱신돼요. 은행이 정해 주는 이자율은 계좌에 있는 금액, 즉 잔액에 따라 달라져요.

- 잔액이 음수인 경우 3.213% (잔액이 더 음수가 돼요).
- 잔액이 양수이면서 `1000`달러 미만인 경우 0.5%.
- 잔액이 양수이면서 `1000`달러 이상 `5000`달러 미만인 경우 1.621%.
- 잔액이 `5000`달러 이상인 경우 2.475%.

네 개의 작업이 있고, 각 작업에서 잔액과 이자율을 다뤄요.

## 1. 이자율 계산하기

주어진 잔액을 기준으로 이자율을 계산하는 (_static_) `SavingsAccount.InterestRate()` 메서드를 구현해요.

```csharp
SavingsAccount.InterestRate(balance: 200.75m)
// 0.5f
```

반환되는 값은 `float`이라는 점에 유의해요.

## 2. 이자 계산하기

주어진 잔액을 기준으로 이자를 계산하는 (_static_) `SavingsAccount.Interest()` 메서드를 구현해요.

```csharp
SavingsAccount.Interest(balance: 200.75m)
// 1.00375m
```

반환되는 값은 `decimal`이라는 점에 유의해요.

## 3. 연간 잔액 갱신 계산하기

이자율을 고려해 갱신된 연간 잔액을 계산하는 (_static_) `SavingsAccount.AnnualBalanceUpdate()` 메서드를 구현해요.

```csharp
SavingsAccount.AnnualBalanceUpdate(balance: 200.75m)
// 201.75375m
```

반환되는 값은 `decimal`이라는 점에 유의해요.

## 4. 목표 잔액에 도달하기까지 걸리는 연수 계산하기

매년 복리로 이자가 붙을 때 목표 잔액에 도달하는 데 필요한 최소 연수를 계산하는 (_static_) `SavingsAccount.YearsBeforeDesiredBalance()` 메서드를 구현해요.

```csharp
SavingsAccount.YearsBeforeDesiredBalance(balance: 200.75m, targetBalance: 214.88m)
// 14
```

반환되는 값은 `int`라는 점에 유의해요.

~~~~exercism/note
원금 잔액에 단리를 적용할 때는 잔액에 이자율을 곱하고, 그 곱이 이자 금액이 돼요.

반면 복리는 이자를 주기적으로 적용하는 방식이에요. 이자를 적용할 때마다 이자 금액을 계산해 원금 잔액에 더하기 때문에, 그다음 이자 계산은 더 커진 원금 잔액을 대상으로 이뤄져요.
~~~~
