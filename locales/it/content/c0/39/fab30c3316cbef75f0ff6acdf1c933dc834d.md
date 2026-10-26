# Introduzione

L'istruzione `guard` in Swift serve a uscire anticipatamente da funzioni, cicli o metodi quando una condizione richiesta non è soddisfatta:

```swift
guard myValue >= 0 else { return 0 }
let root = myValue.squareRoot()
```

Nell'esempio sopra, `guard` valuta l'espressione booleana che la segue.
Se la condizione è `true`, l'esecuzione prosegue con il codice che segue l'istruzione `guard`.
Se la condizione è `false`, viene eseguito il codice all'interno del blocco `else`.

A differenza di un'istruzione `if`:

- Un'istruzione `guard` **deve** includere una clausola `else`.
- La clausola `else` **deve** trasferire il controllo per uscire dallo scope circostante (ad esempio, usando `return`, `continue`, `break` oppure lanciando un errore).

`guard` viene spesso usato per validare le precondizioni in modo pulito.
Ad esempio, consideriamo la funzione sinc ($\text{sinc}(x) = \frac{\sin(x)}{x}$, con $\text{sinc}(0) = 1$ per evitare una divisione per zero):

```swift
func sinc(_ x: Double) -> Double {
    guard x != 0 else { return 1 }
    return sin(x) / x
}

sinc(0)             // returns 1
sinc(Double.pi / 2) // returns 0.6366197723675814
```
