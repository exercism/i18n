# Appendice alle istruzioni

## Implementazione

In Cairo, dove non esiste un supporto nativo per i numeri in virgola mobile, rappresentiamo i valori frazionari usando numeri interi.

Questo approccio è essenziale nello sviluppo blockchain per mantenere la precisione nei calcoli.

In questo esercizio, usiamo l'**aritmetica in virgola fissa** convertendo i periodi orbitali in microsecondi.

Ad esempio, il periodo orbitale di Mercurio di `0.2408467` anni terrestri diventa `240,846,700` microsecondi se moltiplicato per `1,000,000`.

Per tenere conto della precisione decimale, i casi di test presuppongono che l'età risultante abbia **due cifre decimali**, rappresentate come numeri interi.

Ciò significa che un'età di `31.69` anni viene memorizzata come `3169` nel codice.

Per ottenere questo, moltiplichiamo per 100 prima di eseguire la divisione.

Ecco un esempio:

```rust
let mercury_orbital_period = 240_846_700; // in microseconds
let age_microseconds = age_seconds * 1_000_000;
// multiplying with 100 to retain 2 decimal places
age_microseconds * 100 / mercury_orbital_period
```

Usando questo metodo, i valori frazionari vengono rappresentati accuratamente come numeri interi, mantenendo la precisione richiesta di due cifre decimali, cosa cruciale perché i test passino.
