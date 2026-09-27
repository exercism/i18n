# Appendice alle istruzioni

## Note sull'implementazione

Il programma di test crea gli alberi applicando ripetutamente la funzione variadica `New`.
Per esempio, l'istruzione

```go
tree := New("a",New("b"),New("c",New("d")))
```

costruisce il seguente albero:

```text
      "a"
       |
    -------
    |     |
   "b"   "c"
          |
         "d"
```

Puoi assumere che negli alberi di test non ci siano valori duplicati.

Il programma di test userà i metodi `Value` e `Children` per scomporre gli alberi.

La costruzione e la scomposizione di base degli alberi deve funzionare prima di iniziare la parte interessante dell'esercizio, quindi viene testata separatamente nei primi tre test.

---

I metodi `FromPov` e `PathTo` sono la parte interessante dell'esercizio.

Il metodo `FromPov` accetta un argomento di tipo stringa, `from`, che specifica un nodo dell'albero tramite il suo valore.
Deve restituire un albero con il valore `from` nella radice.
Puoi modificare l'albero originale e restituirlo, oppure creare un nuovo albero e restituire quello.
Se restituisci un nuovo albero, sei libero di consumare o distruggere l'albero originale.
Ovviamente, è preferibile lasciarlo invariato.

Il metodo `PathTo` accetta due argomenti di tipo stringa, `from` e `to`, che specificano due nodi dell'albero tramite i loro valori.
Deve restituire il percorso più breve nell'albero dal primo al secondo nodo.
