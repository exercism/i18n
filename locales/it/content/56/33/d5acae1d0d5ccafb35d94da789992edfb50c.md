# Introduzione

Un tipo di dato algebrico (ADT) rappresenta un numero fisso di casi con un nome.
Ogni valore di un ADT corrisponde esattamente a uno di questi casi.

Un ADT si definisce con la parola chiave `data`, separando i casi con il carattere pipe (`|`).
Se nessuno dei casi ha dati associati, l'ADT è simile a quello che in altri linguaggi viene di solito chiamato _enumerazione_ (o _enum_).

```haskell
data Season
  = Spring
  | Summer
  | Autumn
  | Winter
```

Ogni caso di un ADT può avere facoltativamente dei dati associati, e casi diversi possono avere tipi di dati diversi. Quando un caso ha dei dati associati, serve un costruttore.

```haskell
data Number
  = NInt Int      --'NInt' is the constructor for an Int Number.
  | NFloat Float  --'NFloat' is the constructor for an Float Number.
  | Invalid       --'Invalid' does not have data associated to it.
```

Per creare un valore per un caso specifico basta riferirsi al suo nome (ad esempio, `NInt 22`).
Dato che i nomi dei casi sono semplicemente delle funzioni costruttore, i dati associati si possono passare come un normale argomento di funzione.

Gli ADT hanno l'_uguaglianza strutturale_, il che significa che due valori dello stesso caso e con gli stessi dati (facoltativi) sono equivalenti.

Anche se si possono usare espressioni `if/else` per lavorare con gli ADT, il modo consigliato è il pattern matching tramite l'istruzione _case_:

```haskell
add1 :: Number -> String
add1 number =
    case number of
      NInt    i -> show (i + 1)
      NFloat  f -> show (f + 1.0)
      Invalid   -> error "Invalid input"
```
