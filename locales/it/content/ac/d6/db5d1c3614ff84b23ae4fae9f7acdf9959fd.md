# Corsa ai monitor

Sei un dipendente di un'azienda di software chiamata ABC Corp, che ha 97 dipendenti. Un ufficio appena affittato, però, ha solo 65 postazioni. Tutti i dipendenti vogliono lavorare nel nuovo ufficio, perché ogni postazione ha monitor all'avanguardia. L'ufficio risorse umane è sommerso da queste richieste e, con l'aiuto del suo team di operazioni digitali, ha ideato un sistema di assegnazione delle postazioni.

Ha assegnato a ogni postazione un numero, da 1 a 65. I dipendenti che vogliono lavorare nel nuovo ufficio devono inviare le richieste di assegnazione entro le 7:30 di ogni giorno feriale. Ogni dipendente può inviare una sola richiesta di assegnazione. Ogni richiesta può contenere un solo numero di postazione.

## Descrizione del problema

L'ufficio risorse umane, per ogni richiesta di assegnazione, procede così:

- Se la postazione richiesta è disponibile, la assegna a chi l'ha richiesta.
- Se la postazione richiesta è già assegnata, rifiuta la richiesta.

Sei tu il membro del team di operazioni digitali responsabile di automatizzare questo processo di assegnazione. L'input è una richiesta di tipo `int[]` che contiene tutte le richieste dei dipendenti inviate entro le 7:30. Ogni elemento dell'array rappresenta un numero di postazione. Il tuo compito è restituire un `int[]` contenente i numeri delle postazioni assegnate. Poi ordina i numeri delle postazioni in ordine crescente.

## Vincoli

- 0 <= dimensione dell'array di input <= 97
- Ogni elemento dell'array di input sarà compreso tra 1 e 65, estremi inclusi

## Esempio 1

- Input: `65 1 56`
- Output: `1 56 65`

## Esempio 2

- Input: `5 6 18 56 18 8 1`
- Output: `1 5 6 8 18 56`
- Spiegazione: ci sono due richieste per la postazione numero 18
