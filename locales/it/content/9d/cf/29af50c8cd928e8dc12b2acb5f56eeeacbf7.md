# Istruzioni

In questo esercizio scriverai del codice per aiutarti a cucinare una lasagna favolosa dal tuo ricettario preferito.

Hai tre attività, tutte legate al tempo dedicato alla cottura della lasagna.

## 1. Definisci il tempo previsto in forno in minuti

Definisci `expectedMinutesInOven` per calcolare quanti minuti la lasagna deve stare in forno. Secondo il ricettario, il tempo previsto in forno è di 40 minuti:

```elm
expectedMinutesInOven
    --> 40
```

## 2. Calcola il tempo di preparazione in minuti

Definisci `preparationTimeInMinutes`, che prende come parametro il numero di strati della lasagna e restituisce quanti minuti servono per prepararla, assumendo che ogni strato richieda 2 minuti di preparazione.

```elm
preparationTimeInMinutes 3
    --> 6
```

## 3. Calcola il tempo trascorso in minuti

Definisci la funzione `elapsedTimeInMinutes`, che prende due parametri: il primo è il numero di strati della lasagna, il secondo è il numero di minuti che la lasagna ha passato in forno. La funzione deve restituire quanti minuti hai dedicato alla cottura della lasagna, cioè la somma del tempo di preparazione in minuti e del tempo in minuti che la lasagna ha trascorso in forno fino a quel momento.

```elm
elapsedTimeInMinutes 3 20
    --> 26
```
