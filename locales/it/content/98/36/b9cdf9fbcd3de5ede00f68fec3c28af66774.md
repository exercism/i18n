# Suggerimenti

Ricorda: le tartarughe sono animali a sangue freddo, quindi assicurati che siano al caldo prima di dar loro una trapunta o un maglione.

## 1. Ordina la quantità!

- La permutazione di ordinamento che restituisci deve essere in ordine decrescente.
- Assicurati di ordinare le quantità in ordine decrescente sul posto.
- `sortperm` può accettare argomenti simili a quelli di `sort`.
- L'ordine in cui esegui le due operazioni qui sopra è molto importante!

## 2. Ordina i clienti

- Deve essere restituito un nuovo array con i clienti ordinati (cioè non ordinare sul posto)
- Ricorda che una permutazione di ordinamento (cioè un array di indici) si può usare come gli indici.

## 3. Il piano di produzione!

- Qui puoi usare le funzioni `sortquantity!()` e `sortcustomer()`.
- Ricorda che una permutazione di ordinamento è solo una permutazione degli indici.
- Per una [permutazione di ordinamento inversa][invperm]:
    - Pensa a qual è l'ordine originale degli indici per un `Vector` arbitrario.
    - Cosa si può fare a *qualsiasi* permutazione di indici per riportarla a questo punto di partenza?
    - Ultimo suggerimento... Cosa fa la permutazione di ordinamento di una permutazione di ordinamento?
 
[invperm]: https://docs.julialang.org/en/v1/base/arrays/#Base.invperm
