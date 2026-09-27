# Istruzioni

Implementa le operazioni `keep` e `discard` sulle collezioni.
Data una collezione e un predicato sui suoi elementi, `keep` restituisce una nuova collezione che contiene gli elementi per cui il predicato è vero, mentre `discard` restituisce una nuova collezione che contiene gli elementi per cui il predicato è falso.

Ad esempio, data la collezione di numeri:

- 1, 2, 3, 4, 5

E il predicato:

- il numero è pari?

Allora l'operazione keep dovrebbe produrre:

- 2, 4

Mentre l'operazione discard dovrebbe produrre:

- 1, 3, 5

Nota che l'unione di keep e discard comprende tutti gli elementi.

Le funzioni possono chiamarsi `keep` e `discard`, oppure potrebbero richiedere nomi diversi per non entrare in conflitto con funzioni o concetti già presenti nel linguaggio che stai usando.

## Restrizioni

Lascia stare quella funzionalità di filter/reject/come si chiama che ti offre la libreria standard!
Risolvilo invece da solo, usando altri strumenti di base.
