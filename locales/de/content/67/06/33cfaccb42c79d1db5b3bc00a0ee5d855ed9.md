# Anleitung

In dieser Übung arbeitest du mit Sparkonten. Jedes Jahr wird der Kontostand deines Sparkontos anhand seines Zinssatzes aktualisiert. Der Zinssatz, den dir deine Bank gewährt, hängt von der Geldmenge auf deinem Konto ab (dem Kontostand):

- 3,213 % bei einem negativen Kontostand (der Kontostand wird noch negativer).
- 0,5 % bei einem positiven Kontostand von weniger als `1000` Dollar.
- 1,621 % bei einem positiven Kontostand von mindestens `1000` Dollar und weniger als `5000` Dollar.
- 2,475 % bei einem positiven Kontostand von mindestens `5000` Dollar.

Du hast vier Aufgaben, die sich jeweils mit deinem Kontostand und dessen Zinssatz befassen.

## 1. Berechne den Zinssatz

Implementiere die (_statische_) Methode `SavingsAccount.InterestRate()`, um den Zinssatz für den angegebenen Kontostand zu berechnen:

```csharp
SavingsAccount.InterestRate(balance: 200.75m)
// 0.5f
```

Beachte, dass der zurückgegebene Wert ein `float` ist.

## 2. Berechne die Zinsen

Implementiere die (_statische_) Methode `SavingsAccount.Interest()`, um die Zinsen für den angegebenen Kontostand zu berechnen:

```csharp
SavingsAccount.Interest(balance: 200.75m)
// 1.00375m
```

Beachte, dass der zurückgegebene Wert ein `decimal` ist.

## 3. Berechne die jährliche Aktualisierung des Kontostands

Implementiere die (_statische_) Methode `SavingsAccount.AnnualBalanceUpdate()`, um den aktualisierten jährlichen Kontostand unter Berücksichtigung des Zinssatzes zu berechnen: 

```csharp
SavingsAccount.AnnualBalanceUpdate(balance: 200.75m)
// 201.75375m
```

Beachte, dass der zurückgegebene Wert ein `decimal` ist.

## 4. Berechne die Jahre bis zum Erreichen des gewünschten Kontostands

Implementiere die (_statische_) Methode `SavingsAccount.YearsBeforeDesiredBalance()`, um die Mindestanzahl an Jahren zu berechnen, die bei jährlicher Zinseszinsrechnung nötig ist, um den gewünschten Kontostand zu erreichen:

```csharp
SavingsAccount.YearsBeforeDesiredBalance(balance: 200.75m, targetBalance: 214.88m)
// 14
```

Beachte, dass der zurückgegebene Wert ein `int` ist.

~~~~exercism/note
Wenn du einfache Zinsen auf einen Kapitalbetrag anwendest, wird der Kontostand mit dem Zinssatz multipliziert, und das Produkt der beiden ist der Zinsbetrag.

Zinseszinsen hingegen entstehen dadurch, dass Zinsen regelmäßig wiederkehrend angewendet werden.
Bei jeder Anwendung wird der Zinsbetrag berechnet und zum Kapitalbetrag hinzugefügt, sodass nachfolgende Zinsberechnungen auf einen höheren Kapitalbetrag angewendet werden.
~~~~
