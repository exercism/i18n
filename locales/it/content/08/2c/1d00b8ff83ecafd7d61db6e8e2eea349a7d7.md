# Istruzioni

Il tuo amico ti ha appena inviato un messaggio con un segreto importante.
Non volendo rendere facile agli altri leggerlo, il messaggio è stato cifrato eseguendo una serie di manipolazioni di bit.
Dovrai scrivere le funzioni che servono a decifrare il messaggio.

## 1. Riporta i bit indietro

Il primo passo per decifrare il messaggio è annullare lo scorrimento fatto durante la cifratura, spostando i bit indietro verso destra.
Nei passaggi successivi del processo di decifratura si assume che gli 0 vengano inseriti dal lato sinistro.

Implementa la funzione `shiftBack`, che riceve un valore e il numero di posizioni da scorrere ed esegue lo scorrimento.

```kotlin
shiftBack(0b1001, 2)
# => 0b0010
```

## 2. Imposta alcuni bit

Ora ci sono alcuni bit che devono essere impostati a 1.

Implementa la funzione `setBits`, che riceve un valore e una maschera e restituisce il risultato dell'impostazione a 1 dei bit del valore.
Un bit del valore deve essere impostato a 1 dove anche il bit corrispondente nella maschera è 1.
Tutti gli altri bit vanno lasciati invariati.

```kotlin
setBits(0b0110, 0b0101);
# => 0b0111
```

## 3. Inverti bit specifici

Durante la cifratura alcuni bit vengono invertiti.
Per decifrare il messaggio bisognerà invertirli di nuovo.

Implementa la funzione `flipBits`, che riceve un valore e la maschera.
La maschera indica quali bit del valore invertire.
Se il bit nella maschera è 1, il bit corrispondente viene invertito nel valore.
Tutti gli altri bit restano invariati.

```java
flipBits(0b1100, 0b0101);
# => 0b1001
```

## 4. Azzera bit specifici

Infine, ci sono anche dei bit che, una volta decifrati, valgono sempre 0.

Implementa la funzione `clearBits`, che riceve un valore e una maschera.
I bit del `value` devono essere impostati a 0 dove il bit nella maschera è 1.
Tutti gli altri bit vanno lasciati invariati.

```java
clearBits(0b0110, 0b0101);
# => 0b0010
```
