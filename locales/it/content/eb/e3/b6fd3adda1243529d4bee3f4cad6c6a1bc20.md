# Suggerimenti

## Generale

- Tutte le parti di questo esercizio si basano su operazioni bit a bit.
  - Il [percorso di apprendimento][concept-bitwise-operations] di Exercism offre un'introduzione graduale.
  - Gli [operatori bit a bit][ref-bitwise-operators] sono elencati nel manuale di Julia.
  - `Base` contiene varie funzioni utili legate ai bit, tra cui [count_ones()][count_ones] e [trailing_zeros()][trailing_zeros].
- I test cercano di non essere prescrittivi sui tipi, ma l'esercizio riguarda i byte senza segno, e ragionare sui valori [`UInt8`][uint8] è relativamente semplice.
  - Gli argomenti e i valori restituiti sono `Vector{UInt8}`,
  - I valori `UInt8` sono utili per le maschere di bit e i valori intermedi.
- I numeri decimali sarebbero una distrazione, quindi per i letterali `UInt8` preferisci l'esadecimale (`0xFF`) o il binario (`0b11111111`).
  - La funzione [`bitstring()`][bitstring] può essere utile durante il debug, perché restituisce un formato binario leggibile.
- Un messaggio grezzo arriva in un vettore di blocchi da 8 bit e va convertito in blocchi da 7 bit nei bit più significativi più un bit di parità come LSB.
  - Usa maschere di bit con `&` o `|` per isolare i bit che ti interessano.
  - Gli operatori di scorrimento a sinistra (`<<`) e di scorrimento logico a destra (`>>>`) sono importanti.
  - Pianifica un modo per portare i bit in eccesso al ciclo di elaborazione successivo.
  - Il riporto rende difficile gestire i byte di input in modo indipendente l'uno dall'altro, quindi un ciclo (o forse la ricorsione) è probabilmente più semplice che provare a usare funzioni di ordine superiore.
  - I messaggi codificati sono in genere più lunghi (più byte) del messaggio grezzo, per fare spazio a un bit di parità per byte.


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
