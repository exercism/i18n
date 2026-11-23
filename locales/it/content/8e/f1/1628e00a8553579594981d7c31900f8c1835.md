# Istruzioni

Se vuoi costruire qualcosa con un Raspberry Pi, probabilmente userai dei _resistori_.
Per questo esercizio, ti basta sapere solo tre cose:

- Ogni resistore ha un valore di resistenza.
- I resistori sono piccoli, così piccoli che, se ci stampassi sopra il valore di resistenza, sarebbe difficile da leggere.
  Per aggirare questo problema, i produttori stampano sui resistori delle bande colorate che ne indicano il valore di resistenza.
- Ogni banda rappresenta una cifra di un numero.
  Per esempio, se stampassero una banda brown (valore 1) seguita da una banda green (valore 5), corrisponderebbe al numero 15.
  In questo esercizio creerai un programma che ti aiuterà a non dover ricordare i valori delle bande.
  Il programma prenderà 3 colori in input e produrrà in output il valore corretto, in ohm.
  Le bande colorate sono codificate così:

- black: 0
- brown: 1
- red: 2
- orange: 3
- yellow: 4
- green: 5
- blue: 6
- violet: 7
- grey: 8
- white: 9

In «Duo di colori dei resistori» hai decodificato i primi due colori.
Per esempio: orange-orange ha dato il valore principale `33`.
Il terzo colore indica quanti zeri vanno aggiunti al valore principale.
Il valore principale più gli zeri ci dà un valore in ohm.
Per l'esercizio non importa che cosa siano davvero gli ohm.
Per esempio:

- orange-orange-black sarebbe 33 senza zeri, che diventa 33 ohms.
- orange-orange-red sarebbe 33 con 2 zeri, che diventa 3300 ohms.
- orange-orange-orange sarebbe 33 con 3 zeri, che diventa 33000 ohms.

(Se la matematica è il tuo forte, puoi pensare agli zeri come a esponenti del 10.
Se la matematica non è il tuo forte, vai con gli zeri.
È davvero la stessa cosa, solo detta in parole povere invece che in gergo matematico.)

Questo esercizio consiste nel tradurre i colori in un'etichetta:

> "... ohms"

Quindi un input di `"orange", "orange", "black"` dovrebbe restituire:

> "33 ohms"

Quando si arriva a resistori più grandi, si usa un [prefisso metrico][metric-prefix] per indicare un ordine di grandezza maggiore degli ohm, come "kiloohms".
È simile a dire «2 chilometri» invece di «2000 metri», o «2 chilogrammi» per «2000 grammi».

Per esempio, un input di `"orange", "orange", "orange"` dovrebbe restituire:

> "33 kiloohms"

[metric-prefix]: https://en.wikipedia.org/wiki/Metric_prefix
