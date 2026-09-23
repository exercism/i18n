# Instructions

Dans cet exercice, on va travailler avec des comptes d'épargne. Chaque année, le solde de ton compte d'épargne est mis à jour en fonction de son taux d'intérêt. Le taux d'intérêt que ta banque t'accorde dépend du montant d'argent présent sur ton compte (son solde) :

- 3,213 % pour un solde négatif (le solde devient de plus en plus négatif).
- 0,5 % pour un solde positif inférieur à `1000` dollars.
- 1,621 % pour un solde positif supérieur ou égal à `1000` dollars et inférieur à `5000` dollars.
- 2,475 % pour un solde positif supérieur ou égal à `5000` dollars.

Tu as quatre tâches, et chacune portera sur ton solde et son taux d'intérêt.

## 1. Calculer le taux d'intérêt

Implémente la méthode (_static_) `SavingsAccount.InterestRate()` pour calculer le taux d'intérêt en fonction du solde indiqué :

```csharp
SavingsAccount.InterestRate(balance: 200.75m)
// 0.5f
```

Note que la valeur renvoyée est un `float`.

## 2. Calculer l'intérêt

Implémente la méthode (_static_) `SavingsAccount.Interest()` pour calculer l'intérêt en fonction du solde indiqué :

```csharp
SavingsAccount.Interest(balance: 200.75m)
// 1.00375m
```

Note que la valeur renvoyée est un `decimal`.

## 3. Calculer la mise à jour annuelle du solde

Implémente la méthode (_static_) `SavingsAccount.AnnualBalanceUpdate()` pour calculer le solde annuel mis à jour, en tenant compte du taux d'intérêt :

```csharp
SavingsAccount.AnnualBalanceUpdate(balance: 200.75m)
// 201.75375m
```

Note que la valeur renvoyée est un `decimal`.

## 4. Calculer le nombre d'années avant d'atteindre le solde souhaité

Implémente la méthode (_static_) `SavingsAccount.YearsBeforeDesiredBalance()` pour calculer le nombre minimum d'années nécessaires pour atteindre le solde souhaité, avec des intérêts composés chaque année :

```csharp
SavingsAccount.YearsBeforeDesiredBalance(balance: 200.75m, targetBalance: 214.88m)
// 14
```

Note que la valeur renvoyée est un `int`.

~~~~exercism/note
Quand on applique un intérêt simple à un capital de départ, le solde est multiplié par le taux d'intérêt, et le produit des deux donne le montant des intérêts.

L'intérêt composé, lui, s'applique de façon récurrente.
À chaque application, le montant des intérêts est calculé puis ajouté au capital, de sorte que les calculs d'intérêts suivants portent sur un capital plus élevé.
~~~~
