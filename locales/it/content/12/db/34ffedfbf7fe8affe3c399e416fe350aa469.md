# Istruzioni

In questo esercizio costruirai la gestione degli errori per una semplice calcolatrice di numeri interi. Per semplificare, sono forniti i metodi per calcolare l'addizione, la moltiplicazione e la divisione.

L'obiettivo è avere una calcolatrice funzionante che restituisce una stringa con questo schema: `16 + 51 = 67`, quando riceve gli argomenti `16`, `51` e `+`.

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. Implementa le operazioni della calcolatrice

Il metodo principale da implementare in questo compito sarà il metodo (_static_) `SimpleCalculator.Calculate()`. Richiede tre argomenti. I primi due argomenti sono numeri interi sui quali verrà eseguita un'operazione. Il terzo argomento è di tipo stringa e per questo esercizio è necessario implementare le seguenti operazioni:

- addizione usando la stringa `+`
- moltiplicazione usando la stringa `*`
- divisione usando la stringa `/`

## 2. Gestisci le operazioni non valide

Qualsiasi altro simbolo di operazione deve lanciare l'eccezione `ArgumentOutOfRangeException`. Se l'argomento dell'operazione è una stringa vuota, il metodo deve lanciare l'eccezione `ArgumentException`. Quando viene fornito `null` come argomento dell'operazione, il metodo deve lanciare l'eccezione `ArgumentNullException`.

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. Gestisci gli errori quando si divide per zero

Quando si tenta di dividere per `0`, la calcolatrice deve restituire una stringa con il contenuto `Division by zero is not allowed.`. Qualsiasi altra eccezione non deve essere gestita dal metodo `SimpleCalculator.Calculate()`.

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
