# Suggerimenti

L'introduzione contiene gran parte di ciò che serve per questo esercizio.
L'attività 5 (il rendering) si può svolgere prima, per aiutare la visualizzazione, ma fai attenzione a tenere conto dei diversi possibili valori dei punti.

## 1. Definisci il logo `Matrix` di Exercism

- Dai sfogo alla creatività! In alternativa, puoi anche semplicemente copiare e incollare dalle istruzioni.

## 2. Definisci le funzioni che fanno accigliare il logo

- Ricorda che le funzioni che terminano con `!` mutano l'input (lo modificano sul posto), mentre le altre no.
- `frown!` si può realizzare assegnando elementi specifici oppure (in modo meno efficiente) scambiando due righe.
- `frown` sarà molto simile a `frown!`, ma restituisce semplicemente una `copy` della matrice di input.

## 3. Componi un muro di adesivi

- Usa la funzione `frown()`.
- Le funzioni `vcat()` e `hcat()`, o i loro equivalenti, qui ti saranno utili.
- Nota che c'è una riga di `1` (cioè di `X`) che separa la metà superiore da quella inferiore.
- La funzione `ones()` si può usare se serve, ma fai attenzione alla sua forma.

## 4. Trasforma i punti in conteggi di pixel per colonna

- Il broadcasting è un ottimo modo per farlo in modo conciso.
- Per fare broadcasting, ti serve un vettore *riga* con il numero di punti di ciascuna colonna.
- Per ottenere un vettore con il numero di punti per colonna, puoi applicare una funzione alla `Matrix` specificando `dims`.

## 5. Renderizza una matrice di punti

- I punti (ad es. `1`, `2`, ecc.) e gli `0` vanno trasformati rispettivamente in `"X"` e `" "`.
- Usare `eachrow()` per un ciclo interno può essere utile qui, ma non è necessario.
- Anche la funzione `join()` può aiutare a rendere tutto più conciso, e ci si può persino applicare il broadcasting.
