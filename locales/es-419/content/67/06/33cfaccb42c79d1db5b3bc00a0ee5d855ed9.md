# Instrucciones

En este ejercicio vas a trabajar con cuentas de ahorro. Cada año, el saldo de tu cuenta de ahorro se actualiza según su tasa de interés. La tasa de interés que te da tu banco depende de la cantidad de dinero que tengas en tu cuenta (su saldo):

- 3.213% para un saldo negativo (el saldo se vuelve más negativo).
- 0.5% para un saldo positivo menor que `1000` dólares.
- 1.621% para un saldo positivo mayor o igual que `1000` dólares y menor que `5000` dólares.
- 2.475% para un saldo positivo mayor o igual que `5000` dólares.

Tienes cuatro tareas, y cada una trabajará con tu saldo y su tasa de interés.

## 1. Calcular la tasa de interés

Implementa el método (_static_) `SavingsAccount.InterestRate()` para calcular la tasa de interés según el saldo especificado:

```csharp
SavingsAccount.InterestRate(balance: 200.75m)
// 0.5f
```

Ten en cuenta que el valor que se devuelve es un `float`.

## 2. Calcular el interés

Implementa el método (_static_) `SavingsAccount.Interest()` para calcular el interés según el saldo especificado:

```csharp
SavingsAccount.Interest(balance: 200.75m)
// 1.00375m
```

Ten en cuenta que el valor que se devuelve es un `decimal`.

## 3. Calcular la actualización anual del saldo

Implementa el método (_static_) `SavingsAccount.AnnualBalanceUpdate()` para calcular el saldo anual actualizado, teniendo en cuenta la tasa de interés: 

```csharp
SavingsAccount.AnnualBalanceUpdate(balance: 200.75m)
// 201.75375m
```

Ten en cuenta que el valor que se devuelve es un `decimal`.

## 4. Calcular los años antes de alcanzar el saldo deseado

Implementa el método (_static_) `SavingsAccount.YearsBeforeDesiredBalance()` para calcular la cantidad mínima de años necesarios para alcanzar el saldo deseado con interés compuesto anual:

```csharp
SavingsAccount.YearsBeforeDesiredBalance(balance: 200.75m, targetBalance: 214.88m)
// 14
```

Ten en cuenta que el valor que se devuelve es un `int`.

~~~~exercism/note
Cuando se aplica interés simple a un saldo principal, el saldo se multiplica por la tasa de interés y el producto de ambos es el monto del interés.

El interés compuesto, por otro lado, se calcula aplicando el interés de forma recurrente.
En cada aplicación, el monto del interés se calcula y se suma al saldo principal, de modo que los cálculos de interés posteriores se hacen sobre un saldo principal mayor.
~~~~
