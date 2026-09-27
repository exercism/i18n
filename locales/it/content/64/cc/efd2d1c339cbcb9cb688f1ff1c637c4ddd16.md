# Introduzione

In C#, una tupla è una struttura di dati che organizza i dati, contenendo due o più campi di qualsiasi tipo.

Una tupla viene in genere creata inserendo 2 o più espressioni separate da virgole all'interno di una coppia di parentesi tonde (`()`).

```csharp
string boast = "All you need to know";
bool success = !string.IsNullOrWhiteSpace(boast);
(bool, int, string) triple = (success, 42, boast);
```

Una tupla può essere usata nelle operazioni di assegnazione e di inizializzazione, come valore restituito o come argomento di un metodo.

I campi si estraggono usando la sintassi con il punto. Per impostazione predefinita, il primo campo è `Item1`, il secondo `Item2`, e così via. I nomi non predefiniti sono discussi più avanti.

```csharp
// initialization
(int, int, int) vertices = (90, 45, 45);

// assignment
vertices = (60, 60, 60);

//  return value
(bool, int) GetSameOrBigger(int num1, int num2)
{
    return (num1 == num2, num1 > num2 ? num1 : num2);
}

// method argument
int Add((int, int) operands)
{
    return operands.Item1 + operands.Item2;
}
```

I nomi dei campi `Item1` ecc. non rendono il codice leggibile. Il codice qui sotto mostra 2 modi per dare un nome ai campi delle tuple. Nota anche, nel codice qui sotto, che `var` può essere usato con le tuple e il tipo viene inferito. Questo funziona ugualmente bene per tuple con campi denominati e non denominati.

```csharp
// name items in declaration
(bool success, string message) results = (true, "well done!");
bool mySuccess = results.success;
string myMessage = results.message;

// name items in creating expression
var results2 = (success: true, message: "well done!");
bool mySuccess2 = results2.success;
string myMessage2 = results2.message;
```
