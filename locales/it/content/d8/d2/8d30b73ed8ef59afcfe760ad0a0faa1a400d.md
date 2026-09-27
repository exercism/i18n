# Suggerimenti

## 1. Orienta il robot

- L'ordine in cui esegui le operazioni è importante.
- Ci sono diversi modi per convertire un vettore di vettori in una matrice.
- Alcune idee che possono aiutare a creare la matrice: le comprensioni, i cicli `for`, [`hcat`][hcat-ref], [`reshape`][reshape-ref], [`stack`][stack-ref], ecc...

## 2. Ruota il robot

- Per sapere come ruotare una matrice, vedi l'introduzione.
- È sufficiente una semplice moltiplicazione tra matrici.

## 3. Verifica l'orientamento corretto

- Ricorda: è la *seconda* colonna della matrice a indicare l'orientamento.
- Lo si può verificare con un prodotto scalare.
- Potrebbe essere utile normalizzare i vettori.
- In caso di discrepanze in virgola mobile, l'orientamento deve essere [approssimativamente][isapprox-ref] uguale a circa `~1e-7`.
- La seguente identità potrebbe essere utile: `x⋅y = ||x||*||y||cos(θ)` dove [`||x|| = norm(x)`][norm-ref] 

## 4. Coordinate del corpo del robot

- Questo è molto semplice, ma le operazioni elemento per elemento sono importanti.
- Ricorda che la matrice di orientamento può essere vista come tre vettori di posizione a partire dall'origine.

[hcat-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.hcat
[reshape-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.reshape
[stack-ref]: https://docs.julialang.org/en/v1/base/arrays/#Base.stack
[isapprox-ref]: https://docs.julialang.org/en/v1/base/math/#Base.isapprox
[norm-ref]: https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#LinearAlgebra.norm
