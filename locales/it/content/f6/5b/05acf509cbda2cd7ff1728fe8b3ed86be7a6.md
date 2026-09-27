# Istruzioni

Analizza e valuta semplici problemi matematici espressi a parole, restituendo la risposta come numero intero.

## Iterazione 0: Numeri

I problemi senza operazioni restituiscono semplicemente il numero indicato.

> What is 5?

Il risultato è 5.

## Iterazione 1: Addizione

Somma due numeri tra loro.

> What is 5 plus 13?

Il risultato è 18.

Gestisci numeri grandi e numeri negativi.

## Iterazione 2: Sottrazione, moltiplicazione e divisione

Ora esegui le altre tre operazioni.

> What is 7 minus 5?

2

> What is 6 multiplied by 4?

24

> What is 25 divided by 5?

5

## Iterazione 3: Operazioni multiple

Gestisci una serie di operazioni, in sequenza.

Dato che questi problemi sono espressi a parole, valuta l'espressione da
sinistra a destra, _ignorando il consueto ordine delle operazioni._

> What is 5 plus 13 plus 6?

24

> What is 3 plus 2 multiplied by 3?

15  (cioè non 9)

## Iterazione 4: Errori

Il parser dovrebbe rifiutare:

* Operazioni non supportate («What is 52 cubed?»)
* Domande non matematiche («Who is the President of the United States»)
* Problemi espressi a parole con sintassi non valida («What is 1 plus plus 2?»)

## Bonus: Esponenziali

Se ti va, gestisci anche le potenze.

> What is 2 raised to the 5th power?

32
