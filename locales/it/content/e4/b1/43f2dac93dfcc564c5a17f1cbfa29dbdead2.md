# Istruzioni

Conta i punti segnati su un tavoliere da Go.

Nel gioco del go (noto anche come baduk, igo, cờ vây e wéiqí) si guadagnano punti circondando completamente le intersezioni vuote con le proprie pietre.
Le intersezioni circondate di un giocatore sono note come suo territorio.

Calcola il territorio di ciascun giocatore.
Puoi dare per scontato che tutte le pietre rimaste bloccate in territorio nemico siano già state rimosse dal tavoliere.

Determina il territorio che include una coordinata specificata.

Più intersezioni vuote possono essere circondate contemporaneamente. Per circondare contano solo i vicini orizzontali e verticali.
Nel diagramma seguente le pietre che contano sono contrassegnate con «O» e quelle che non contano con «I» (ignorate).
Gli spazi vuoti rappresentano intersezioni vuote.

```text
+----+
|IOOI|
|O  O|
|O OI|
|IOI |
+----+
```

Per essere più precisi, un'intersezione vuota fa parte del territorio di un giocatore se tutti i suoi vicini sono pietre di quel giocatore oppure intersezioni vuote che fanno parte del territorio di quel giocatore.

Per maggiori informazioni vedi [Wikipedia][go-wikipedia] o [Sensei's Library][go-sensei].

[go-wikipedia]: https://en.wikipedia.org/wiki/Go_%28game%29
[go-sensei]: https://senseis.xmp.net/
