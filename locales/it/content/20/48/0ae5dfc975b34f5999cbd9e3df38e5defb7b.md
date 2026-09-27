# Introduzione

L'overflow aritmetico si verifica quando un calcolo, come un'operazione aritmetica o una conversione di tipo, produce un valore maggiore della capacità del tipo che lo riceve.

Le espressioni di tipo `int` e `long`, e le loro controparti senza segno, in queste circostanze si riavvolgono silenziosamente.

Il comportamento dei calcoli con numeri interi può essere modificato usando la parola chiave `checked`. Quando si verifica un overflow all'interno di un blocco `checked`, viene lanciata un'istanza di `OverflowException`.

```csharp
int one = 1;
checked
{
    int expr = int.MaxValue + one;   // OverflowException is thrown
}

// or

int expr2 = checked(int.MaxValue + one);     // OverflowException is thrown
```

Le espressioni di tipo `float` e `double` assumeranno un valore speciale: l'infinito.

Le espressioni di tipo `decimal` lanceranno un'istanza di `OverflowException`.
