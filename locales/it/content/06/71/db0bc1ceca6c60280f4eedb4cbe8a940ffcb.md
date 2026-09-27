# Informazioni

Le cifre binarie, alla fine, corrispondono direttamente ai transistor della tua CPU o della tua RAM, e al fatto che ciascuno sia «acceso» o «spento».

La manipolazione di basso livello, informalmente chiamata «bit-twiddling», è particolarmente importante nei linguaggi di sistema.

I linguaggi di alto livello come Julia di solito astraggono la maggior parte di questi dettagli. Tuttavia, nel linguaggio di base è [disponibile][bitwise] una gamma completa di operazioni a livello di bit.

***Nota:*** Per vedere un output binario leggibile nella REPL, quasi tutti gli esempi che seguono devono essere racchiusi in una funzione [`bitstring()`][bitstring]. Questo distrae visivamente, quindi la maggior parte delle occorrenze di questa funzione è stata rimossa.

## Operazioni di shift sui bit

I tipi interi, con o senza segno, possono essere rappresentati come una stringa di 1 e 0.

```julia-repl
julia> bitstring(UInt8(5))
"00000101"
```

Gli shift di bit spostano semplicemente tutto a sinistra o a destra di un numero di posizioni specificato.
Con i tipi `UInt`, alcuni bit cadono da un'estremità e l'altra estremità viene riempita con degli zeri:

```julia-repl
julia> ux::UInt8 = 5
5

julia> bitstring(ux)
"00000101"

julia> ux << 2 # left by 2
"00010100"

julia> ux >> 1 # right by 1
"00000010"
```

Ogni shift a sinistra raddoppia il valore e ogni shift a destra lo dimezza (con troncamento).
Questo è più evidente nella rappresentazione decimale:

```julia-repl
julia> 3 << 2
12

julia> 24 >> 3
3
```

Questo tipo di shift sui bit è molto più veloce dell'aritmetica «vera», il che rende la tecnica molto popolare nella programmazione di basso livello.

Con gli interi con segno, dobbiamo fare un po' più attenzione.

Gli shift a sinistra sono relativamente semplici:

```julia-repl
julia> sx = Int8(5)
5

julia> sx # positive integer
"00000101"

julia> sx << 2
"00010100"

julia> -sx # negative integer
"11111011"

julia> -sx << 2
"11101100"
```

Lo shift a sinistra di interi con segno positivi è quindi uguale a quello degli interi senza segno.

I valori negativi sono memorizzati nella forma in [complemento a due][2complement], il che significa che il bit più a sinistra è 1.
Nessun problema per uno shift a sinistra, ma quando spostiamo a destra, come riempiamo i bit più a sinistra?

```julia-repl
julia> sx >> 2 # simple for positive values!
"00000001"

julia> -sx # negative integer
"11111011"

julia> -sx >> 2 # pad with repeated sign bit
"11111110"

julia> -sx >>> 2 # pad with 0
"00111110"
```

L'operatore `>>` esegue uno [shift aritmetico][arithmetic], preservando il bit di segno.

L'operatore `>>>` esegue uno [shift logico][logical], riempiendo con zeri come se il numero fosse senza segno.

Se tutto questo ti sembra ancora incompleto, esiste anche una funzione [`bitrotate()`][bitrotate].

## Logica bit a bit

In un concetto precedente abbiamo visto che gli operatori `&&` (and), `||` (or) e `!` (not) si usano con i valori booleani.

Esistono operatori equivalenti `&` (and bit a bit), `|` (or bit a bit) e `~` (una tilde, not bit a bit) per confrontare i bit di due interi.

```julia-repl
julia> 0b1011 & 0b0010 # bit is 1 in both numbers
"00000010"

julia> 0b1011 | 0b0010 # bit is 1 in at least one number
"00001011"

julia> ~0b1011 # flip all bits
"11110100"

julia> xor(0b1011, 0b0010) # bit is 1 in exactly one number, not both
"00001001"
```

Qui, `xor()` è l'[or esclusivo][xor], usato come funzione (vedi più avanti per una notazione alternativa).

Per inciso, gli operatori `&` e `|` si possono usare anche con i booleani.
A differenza di `&&` e `||`, tutte le parti dell'espressione vengono allora valutate: non c'è alcuna valutazione a corto circuito.


## Altri simboli

Julia ama la matematica e i matematici amano i simboli criptici, quindi abbiamo altri simboli con cui giocare.

```julia-repl
julia> 0b1011 ⊻ 0b0010 # xor() in infix notation
"00001001"

julia> 0b1011 ⊼ 0b0010 # not and
"11111101"

julia> 0b1011 ⊽ 0b0010 # not or
"11110100"
```

Negli editor che conoscono Julia, si inseriscono come `\xor`, `\nand` e `\nor` più un tab in ciascun caso.

Questi simboli non sono molto conosciuti, nemmeno tra chi ha studiato matematica all'università (l'autore di questo concetto non li aveva mai visti prima).
Se vuoi usarli, fai attenzione a chi chiedi di revisionare il tuo codice!


[bitwise]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
[bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
[xor]: https://en.wikipedia.org/wiki/Exclusive_or
[2complement]: https://en.wikipedia.org/wiki/Two%27s_complement
[arithmetic]: https://en.wikipedia.org/wiki/Arithmetic_shift
[logical]: https://en.wikipedia.org/wiki/Logical_shift
[bitrotate]: https://docs.julialang.org/en/v1/base/math/#Base.bitrotate
