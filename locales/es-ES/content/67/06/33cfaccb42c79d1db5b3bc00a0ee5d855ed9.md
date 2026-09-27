# Instrucciones

En este ejercicio vas a trabajar con cuentas de ahorro. Cada año, el saldo de tu cuenta de ahorro se actualiza en función de su tipo de interés. El tipo de interés que te da tu banco depende de la cantidad de dinero que haya en tu cuenta (su saldo):

- 3,213 % para un saldo negativo (el saldo se vuelve más negativo).
- 0,5 % para un saldo positivo inferior a `1000` dólares.
- 1,621 % para un saldo positivo mayor o igual que `1000` dólares y menor que `5000` dólares.
- 2,475 % para un saldo positivo mayor o igual que `5000` dólares.

Tienes cuatro tareas y cada una de ellas se ocupará de tu saldo y de su tipo de interés.

## 1. Calcula el tipo de interés

Implementa el método (_estático_) `SavingsAccount.InterestRate()` para calcular el tipo de interés a partir del saldo indicado:

```csharp
SavingsAccount.InterestRate(balance: 200.75m)
// 0.5f
```

Ten en cuenta que el valor devuelto es un `float`.

## 2. Calcula el interés

Implementa el método (_estático_) `SavingsAccount.Interest()` para calcular el interés a partir del saldo indicado:

```csharp
SavingsAccount.Interest(balance: 200.75m)
// 1.00375m
```

Ten en cuenta que el valor devuelto es un `decimal`.

## 3. Calcula la actualización anual del saldo

Implementa el método (_estático_) `SavingsAccount.AnnualBalanceUpdate()` para calcular el saldo anual actualizado, teniendo en cuenta el tipo de interés: 

```csharp
SavingsAccount.AnnualBalanceUpdate(balance: 200.75m)
// 201.75375m
```

Ten en cuenta que el valor devuelto es un `decimal`.

## 4. Calcula los años que faltan para alcanzar el saldo deseado

Implementa el método (_estático_) `SavingsAccount.YearsBeforeDesiredBalance()` para calcular el número mínimo de años necesarios para alcanzar el saldo deseado con un interés compuesto anual:

```csharp
SavingsAccount.YearsBeforeDesiredBalance(balance: 200.75m, targetBalance: 214.88m)
// 14
```

Ten en cuenta que el valor devuelto es un `int`.

~~~~exercism/note
Cuando se aplica un interés simple a un saldo principal, el saldo se multiplica por el tipo de interés y el producto de ambos es el importe de los intereses.

El interés compuesto, en cambio, se aplica de forma recurrente.
En cada aplicación se calcula el importe de los intereses y se suma al saldo principal, de modo que los cálculos de intereses posteriores se hacen sobre un saldo principal mayor.
~~~~
