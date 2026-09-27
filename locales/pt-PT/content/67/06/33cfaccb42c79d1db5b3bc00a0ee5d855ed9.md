# Instruções

Neste exercício vais trabalhar com contas poupança. Todos os anos, o saldo da tua conta poupança é atualizado com base na respetiva taxa de juro. A taxa de juro que o teu banco te dá depende do montante de dinheiro que tens na tua conta (o saldo):

- 3,213% para um saldo negativo (o saldo fica ainda mais negativo).
- 0,5% para um saldo positivo inferior a `1000` dólares.
- 1,621% para um saldo positivo superior ou igual a `1000` dólares e inferior a `5000` dólares.
- 2,475% para um saldo positivo superior ou igual a `5000` dólares.

Tens quatro tarefas, cada uma delas vai trabalhar com o teu saldo e a taxa de juro correspondente.

## 1. Calcula a taxa de juro

Implementa o método (_static_) `SavingsAccount.InterestRate()` para calcular a taxa de juro com base no saldo indicado:

```csharp
SavingsAccount.InterestRate(balance: 200.75m)
// 0.5f
```

Repara que o valor devolvido é um `float`.

## 2. Calcula o juro

Implementa o método (_static_) `SavingsAccount.Interest()` para calcular o juro com base no saldo indicado:

```csharp
SavingsAccount.Interest(balance: 200.75m)
// 1.00375m
```

Repara que o valor devolvido é um `decimal`.

## 3. Calcula a atualização anual do saldo

Implementa o método (_static_) `SavingsAccount.AnnualBalanceUpdate()` para calcular o saldo anual atualizado, tendo em conta a taxa de juro:

```csharp
SavingsAccount.AnnualBalanceUpdate(balance: 200.75m)
// 201.75375m
```

Repara que o valor devolvido é um `decimal`.

## 4. Calcula os anos até atingires o saldo pretendido

Implementa o método (_static_) `SavingsAccount.YearsBeforeDesiredBalance()` para calcular o número mínimo de anos necessários para atingir o saldo pretendido, com juro composto anualmente:

```csharp
SavingsAccount.YearsBeforeDesiredBalance(balance: 200.75m, targetBalance: 214.88m)
// 14
```

Repara que o valor devolvido é um `int`.

~~~~exercism/note
Quando se aplica juro simples a um saldo principal, o saldo é multiplicado pela taxa de juro e o produto dos dois é o montante de juro.

O juro composto, por outro lado, faz-se aplicando juro de forma recorrente.
Em cada aplicação, o montante de juro é calculado e adicionado ao saldo principal, para que os cálculos de juro subsequentes incidam sobre um saldo principal maior.
~~~~
