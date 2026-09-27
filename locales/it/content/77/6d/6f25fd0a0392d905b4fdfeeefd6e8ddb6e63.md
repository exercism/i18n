# Suggerimenti

## Generale

- Lo stack della calcolatrice è semplicemente un array di Factor. Un'*operazione* è una quotation `( stack -- new-stack )`.
- `head*` di [`sequences`][sequences] restituisce tutto tranne gli ultimi `n` elementi; `last2` restituisce gli ultimi due.

## 1. Implementare l'addizione

- Usa `bi` di [`kernel`][kernel] per dividere l'input in due computazioni: «l'array meno i suoi ultimi due elementi» e «la somma degli ultimi due elementi». Poi `suffix` le unisce.

## 2. Implementare la moltiplicazione

- Stessa forma del compito 1, con `*` al posto di `+`.

## 3. Applicare una singola operazione

- L'effetto della quotation è `( stack -- new-stack )`. Dichiaralo su `call` in modo che il compilatore possa verificarne i tipi: `call( stack -- new-stack )`.

## 4. Valutare un programma

- `each` (in [`sequences`][sequences]) itera una quotation su una sequenza. Ogni iterazione vede lo stack corrente, estrae la prossima operazione dal programma e la applica.

## 5. Valutare per nome

- Cerca ogni nome nell'assoc con `at` (in [`assocs`][assocs]) per ottenere la sua operazione, poi riutilizza `evaluate`.
- Una quotation fry `'[ _ at ]` di [`curry-compose-fry`][fry] cattura l'assoc, così `map` può scambiare ogni nome con la sua operazione in un solo passaggio.

## 6. Dividere in sicurezza

- `throw` (in [`kernel`][kernel]) genera un errore. `zero-divisor-error` è già dichiarato, quindi la chiamata è `zero-divisor-error throw`.
- Proteggi il percorso di divisione con un `if` che controlla se il divisore più in basso è `0`.

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
