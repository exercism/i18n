# Suggerimenti

## 1. Determina se ti servirà la patente di guida

- Usa l'[operatore di uguaglianza stretta][mdn-equality-operators] per verificare se il tuo input è uguale a una determinata stringa.
- Usa uno dei due [operatori logici][mdn-logical-operators] che hai imparato nel concetto dei booleani per combinare i due requisiti.
- **Non** hai bisogno di un'istruzione if per risolvere questo compito. Puoi restituire direttamente l'espressione booleana che costruisci.

## 2. Scegli tra due potenziali veicoli da acquistare

- Usa un [operatore relazionale][mdn-relational-operators] per determinare quale opzione viene prima in ordine alfabetico.
- Poi imposta il valore di una variabile ausiliaria in base all'esito di quel confronto, con l'aiuto di un'[istruzione if-else][mdn-if-statement].
- Infine, costruisci la frase di raccomandazione. Per farlo, puoi usare l'[operatore di addizione][mdn-addition] per concatenare le due stringhe.

## 3. Calcola una stima per il prezzo di un veicolo usato

- Inizia determinando la percentuale in base all'età del veicolo. Salvala in una variabile ausiliaria. Usa un'[istruzione if-else if-else][mdn-if-statement] come indicato nelle istruzioni.
- Nelle due condizioni if, usa gli [operatori relazionali][mdn-relational-operators] per confrontare l'età dell'auto con i valori di soglia.
- Per calcolare il risultato, applica la percentuale al prezzo originale. Per esempio, `30% of x` si può calcolare dividendo `30` per `100` e moltiplicando per `x`.

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
