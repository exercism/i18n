# Istruzioni

Scriverai del codice che ti aiuterà a cucinare una lasagna tratta dal tuo libro di ricette preferito.

Le attività da svolgere sono cinque e riguardano tutte la preparazione della tua ricetta.

## 1. Definisci il tempo di cottura previsto in forno, in minuti

Imposta la variabile `$Lasagna::ExpectedMinutesInOven` con quanti minuti la lasagna deve stare in forno. Secondo il libro di ricette, il tempo di cottura previsto in forno è di 40 minuti:

```perl
$Lasagna::ExpectedMinutesInOven
# => 40
```

## 2. Calcola il tempo rimanente in forno, in minuti

Modifica il sottoprogramma `Lasagna::remaining_minutes_in_oven`, che prende come argomento i minuti effettivi che la lasagna ha già passato in forno, in modo che restituisca quanti minuti la lasagna deve ancora rimanere in forno, in base al tempo di cottura previsto in minuti dell'attività precedente.

```perl
Lasagna::remaining_minutes_in_oven(30)
# => 10
```

## 3. Calcola il tempo di preparazione, in minuti

Modifica il sottoprogramma `Lasagna::preparation_time_in_minutes`, che prende come argomento il numero di strati che hai aggiunto alla lasagna, in modo che restituisca quanti minuti hai impiegato a preparare la lasagna, supponendo che ogni strato richieda 2 minuti di preparazione.

```perl
Lasagna::preparation_time_in_minutes(2)
# => 4
```

## 4. Calcola il tempo di lavoro totale, in minuti

Modifica il sottoprogramma `Lasagna::total_time_in_minutes`, che prende due argomenti: il primo è il numero di strati che hai aggiunto alla lasagna, il secondo è il numero di minuti che la lasagna ha passato in forno.
Il sottoprogramma deve restituire il numero totale di minuti che hai dedicato a cucinare la lasagna, cioè la somma del tempo di preparazione in minuti e del tempo in minuti che la lasagna ha passato in forno fino a quel momento.

```perl
Lasagna::total_time_in_minutes(3, 20)
# => 26
```

## 5. Crea una notifica che avvisa che la lasagna è pronta

Modifica il sottoprogramma `Lasagna::oven_alarm`, che non prende alcun argomento, in modo che restituisca un messaggio che indica che la lasagna è pronta da mangiare.

```perl
Lasagna::oven_alarm()
# => "Ding!"
```
