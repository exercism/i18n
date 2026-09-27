# Istruzioni

In questo esercizio lavorerai con i conti di risparmio. Ogni anno, il saldo del tuo conto di risparmio viene aggiornato in base al suo tasso di interesse. Il tasso di interesse che la tua banca ti offre dipende dalla somma di denaro presente sul tuo conto (il suo saldo):

- 3,213% per un saldo negativo (il saldo diventa ancora più negativo).
- 0,5% per un saldo positivo inferiore a `1000` dollari.
- 1,621% per un saldo positivo maggiore o uguale a `1000` dollari e inferiore a `5000` dollari.
- 2,475% per un saldo positivo maggiore o uguale a `5000` dollari.

Ci sono quattro compiti, ognuno dei quali riguarderà il saldo e il suo tasso di interesse.

## 1. Calcola il tasso di interesse

Implementa il metodo (_static_) `SavingsAccount.InterestRate()` per calcolare il tasso di interesse in base al saldo indicato:

```csharp
SavingsAccount.InterestRate(balance: 200.75m)
// 0.5f
```

Nota che il valore restituito è un `float`.

## 2. Calcola l'interesse

Implementa il metodo (_static_) `SavingsAccount.Interest()` per calcolare l'interesse in base al saldo indicato:

```csharp
SavingsAccount.Interest(balance: 200.75m)
// 1.00375m
```

Nota che il valore restituito è un `decimal`.

## 3. Calcola l'aggiornamento annuale del saldo

Implementa il metodo (_static_) `SavingsAccount.AnnualBalanceUpdate()` per calcolare il saldo annuale aggiornato, tenendo conto del tasso di interesse:

```csharp
SavingsAccount.AnnualBalanceUpdate(balance: 200.75m)
// 201.75375m
```

Nota che il valore restituito è un `decimal`.

## 4. Calcola gli anni necessari per raggiungere il saldo desiderato

Implementa il metodo (_static_) `SavingsAccount.YearsBeforeDesiredBalance()` per calcolare il numero minimo di anni necessari per raggiungere il saldo desiderato, dato un interesse composto su base annua:

```csharp
SavingsAccount.YearsBeforeDesiredBalance(balance: 200.75m, targetBalance: 214.88m)
// 14
```

Nota che il valore restituito è un `int`.

~~~~exercism/note
Quando si applica l'interesse semplice a un saldo iniziale, il saldo viene moltiplicato per il tasso di interesse e il prodotto dei due è l'importo dell'interesse.

L'interesse composto, invece, si applica su base ricorrente.
A ogni applicazione, l'importo dell'interesse viene calcolato e aggiunto al saldo iniziale, in modo che i calcoli successivi degli interessi avvengano su un saldo iniziale maggiore.
~~~~
