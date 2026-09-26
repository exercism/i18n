# Instruções

Neste exercício, você vai trabalhar com contas poupança. A cada ano, o saldo da sua conta poupança é atualizado com base na sua taxa de juros. A taxa de juros que o seu banco oferece depende da quantidade de dinheiro na sua conta (o saldo dela):

- 3,213% para um saldo negativo (o saldo fica ainda mais negativo).
- 0,5% para um saldo positivo menor que `1000` dólares.
- 1,621% para um saldo positivo maior ou igual a `1000` dólares e menor que `5000` dólares.
- 2,475% para um saldo positivo maior ou igual a `5000` dólares.

Você tem quatro tarefas, e cada uma delas vai lidar com o seu saldo e a sua taxa de juros.

## 1. Calcule a taxa de juros

Implemente o método (_static_) `SavingsAccount.InterestRate()` para calcular a taxa de juros com base no saldo especificado:

```csharp
SavingsAccount.InterestRate(balance: 200.75m)
// 0.5f
```

Repare que o valor retornado é um `float`.

## 2. Calcule o juro

Implemente o método (_static_) `SavingsAccount.Interest()` para calcular o juro com base no saldo especificado:

```csharp
SavingsAccount.Interest(balance: 200.75m)
// 1.00375m
```

Repare que o valor retornado é um `decimal`.

## 3. Calcule a atualização anual do saldo

Implemente o método (_static_) `SavingsAccount.AnnualBalanceUpdate()` para calcular o saldo anual atualizado, levando em conta a taxa de juros: 

```csharp
SavingsAccount.AnnualBalanceUpdate(balance: 200.75m)
// 201.75375m
```

Repare que o valor retornado é um `decimal`.

## 4. Calcule os anos antes de alcançar o saldo desejado

Implemente o método (_static_) `SavingsAccount.YearsBeforeDesiredBalance()` para calcular o número mínimo de anos necessários para alcançar o saldo desejado, considerando juros compostos anuais:

```csharp
SavingsAccount.YearsBeforeDesiredBalance(balance: 200.75m, targetBalance: 214.88m)
// 14
```

Repare que o valor retornado é um `int`.

~~~~exercism/note
Quando se aplica juros simples a um saldo principal, o saldo é multiplicado pela taxa de juros, e o produto dos dois é o valor dos juros.

Já os juros compostos são aplicados de forma recorrente.
A cada aplicação, o valor dos juros é calculado e somado ao saldo principal, de modo que os cálculos de juros seguintes incidem sobre um saldo principal maior.
~~~~
