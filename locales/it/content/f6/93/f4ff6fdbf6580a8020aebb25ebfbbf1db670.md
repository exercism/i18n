# Suggerimenti

## 1. Classifica i clienti

- Le funzioni `any()` o `all()` possono essere utili qui.
- Si può definire una funzione separata da usare all'interno di queste, oppure si può usare direttamente una funzione anonima.

## 2. Separa i clienti enfatici

- Devi filtrare il dizionario.
- Un dizionario, per impostazione predefinita, itera una `Pair` chiave/valore a cui si può accedere tramite i campi (first/second) o l'indice (1/2).
- Usa la funzione `all_15()`.

## 3. Cambia le valutazioni in binario

- Ti serve una mappatura da `1` a `0` e da `5` a `1`.
- Assicurati che la forma dell'array di output sia uguale a quella dell'array di input.

## 4. Trasforma le valutazioni in una matrice

- Si può fare con `mapreduce()`.
- Usa la funzione `tobinary()` per (parte della?) mappatura.
- Una matrice si può ottenere riducendo un vettore di vettori con `hcat()` o `vcat()`, a seconda che l'input sia un vettore colonna o un vettore riga, rispettivamente.
- Fai attenzione all'output. Ogni vettore di valutazioni è una riga della matrice? La funzione `transpose()` può essere utile da qualche parte.
