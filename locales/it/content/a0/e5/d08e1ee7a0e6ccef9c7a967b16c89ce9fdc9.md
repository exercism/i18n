# Informazioni

Il concetto di [SIMD][SIMD] ha introdotto i valori in virgola mobile impacchettati: più numeri contenuti in un unico registro `xmm`, elaborati lane per lane e in parallelo.
Gli stessi registri `xmm` possono contenere anche _interi_ impacchettati.

## Sintassi

Gran parte del modello SIMD per i valori in virgola mobile si applica senza modifiche agli interi impacchettati:

- Un registro a 128 bit è diviso in lane
- Le istruzioni agiscono in parallelo sulle lane che occupano la stessa posizione
- Gli operandi in memoria seguono le stesse regole di allineamento a 16 byte

La sintassi, però, è leggermente diversa:

1. Un _prefisso_ `p` per indicare che l'istruzione opera su dati _impacchettati_.
2. L'operazione eseguita, con lo stesso nome della sua controparte non SIMD (detta anche _scalare_) (ad esempio `add`, `mul`, ecc.).
3. Un suffisso per indicare la dimensione di ciascuna lane.

Gli interi impacchettati hanno quattro dimensioni di lane, e ognuna ha il proprio suffisso:

| larghezza della lane | byte | lane in 128 bit | suffisso |
|----------------------|------|-----------------|----------|
| byte                 | 1    | 16              | b        |
| word                 | 2    | 8               | w        |
| dword                | 4    | 4               | d        |
| qword                | 8    | 2               | q        |

Ad esempio:

| istruzione | significato                                  |
|------------|----------------------------------------------|
| `paddb`    | `add` impacchettato, lane a 8 bit (16 lane)  |
| `paddw`    | `add` impacchettato, lane a 16 bit (8 lane)  |
| `paddd`    | `add` impacchettato, lane a 32 bit (4 lane)  |
| `paddq`    | `add` impacchettato, lane a 64 bit (2 lane)  |

Alcune istruzioni prendono in input lane di una dimensione, ma restituiscono in output lane di un'altra.
Seguono la stessa convenzione generale, ma con _due_ suffissi di dimensione.
Il primo indica la dimensione della lane di input, il secondo indica la dimensione della lane di output:

| istruzione | significato                                       |
|------------|---------------------------------------------------|
| `pmovsxwd` | `movsx` impacchettato, da lane a 16 bit a lane a 32 bit |
| `pmuldq`   | `mul` impacchettato, da lane a 32 bit a lane a 64 bit   |

## Spostamenti in memoria

Due istruzioni con nome riferito agli interi copiano 128 bit tra un registro `xmm` e la memoria:

| istruzione | descrizione                                                   |
|------------|---------------------------------------------------------------|
| `movdqa`   | copia interi impacchettati da o verso una posizione _allineata_ |
| `movdqu`   | copia interi impacchettati da o verso una posizione _non allineata_ |

Si comportano come `movaps` e `movups`: `movdqa` genera un fault su un indirizzo non allineato, mentre `movdqu` accetta qualsiasi indirizzo.
Tutte e quattro copiano 128 bit senza interpretarli.
La coppia con nome riferito agli interi si usa con i dati interi per convenzione, non per obbligo.

~~~~exercism/note
Qui `dq` sta per `double-qword`, cioè 128 bit (16 byte).
~~~~

## Addizione e sottrazione

L'addizione e la sottrazione seguono la regola di denominazione:

```x86asm
paddb xmm0, xmm1 ; 16 lanes: each  8-bit, xmm0 += xmm1
paddw xmm2, xmm3 ;  8 lanes: each 16-bit, xmm2 += xmm3

psubd xmm4, xmm5 ;  4 lanes: each 32-bit, xmm4 -= xmm5
psubq xmm6, xmm7 ;  2 lanes: each 64-bit, xmm6 -= xmm7
```

Non esiste una forma separata per i numeri con segno e senza segno.
Nel complemento a due, l'addizione e la sottrazione producono gli stessi bit sia che le lane siano lette come con segno sia come senza segno, quindi un'unica istruzione serve entrambi i casi.
L'interpretazione spetta a te, esattamente come con `add` e `sub` scalari.

Queste istruzioni **vanno in wrap-around** in caso di overflow, come le loro controparti scalari.
Una lane a 8 bit contiene valori modulo 256, quindi un `paddb` di `200 + 100` produce `300 - 256 = 44`, scartando i bit che non ci stanno.

Nota che quei bit in eccesso non si riportano sulla lane successiva.
Ogni lane è elaborata separatamente dalle altre, anche se condividono lo stesso registro.

## Addizione e sottrazione saturante

Il SIMD su interi aggiunge un'operazione che il SIMD in virgola mobile non ha: l'addizione e la sottrazione [saturante][saturation], che _limitano_ il valore invece di andare in wrap-around.
Un risultato sopra l'intervallo della lane diventa il valore più grande che la lane può contenere; un risultato sotto l'intervallo diventa il più piccolo.

Le forme saturanti inseriscono `s` (con segno) o `us` (senza segno) prima del suffisso di dimensione:

| istruzione | significato                                |
|------------|--------------------------------------------|
| `paddsb`   | `add`, saturante, lane a 8 bit con segno    |
| `paddusb`  | `add`, saturante, lane a 8 bit senza segno  |
| `psubsw`   | `sub`, saturante, lane a 16 bit con segno   |
| `psubusw`  | `sub`, saturante, lane a 16 bit senza segno |

L'intervallo di limitazione è l'intero intervallo rappresentabile per un intero della dimensione e del tipo (con segno o senza segno) corrispondenti.
Per un byte:

- I byte senza segno si limitano all'intervallo `[0, 255]`: un `paddusb` di `200 + 100` dà `255`, e un `psubusb` di `5 - 10` dà `0`.
- I byte con segno si limitano all'intervallo `[-128, 127]`: un `paddsb` di `100 + 50` dà `127`.

La saturazione è importante quando una lane contiene una quantità limitata, come il canale di un pixel o un campione audio.
Il wrap-around renderebbe scuro un pixel troppo luminoso, mentre la limitazione lo mantiene alla luminosità massima, che è il risultato che vuoi.

~~~~exercism/note
L'addizione e la sottrazione saturanti esistono solo per le lane byte e word, non per quelle dword o qword.
~~~~

## Moltiplicazione

Moltiplicare due valori a N bit può produrre un prodotto a 2N bit, ma la lane di destinazione è larga solo N bit.
Le operazioni SIMD risolvono il problema specificando quale metà del prodotto conservare, gli N bit bassi oppure gli N bit alti.

Per le lane a 16 bit si usano tre istruzioni:

| istruzione | significato                                                       |
|------------|-------------------------------------------------------------------|
| `pmullw`   | `mul`, lane a 16 bit, conserva i 16 bit bassi di ogni prodotto     |
| `pmulhw`   | `mul`, lane a 16 bit, conserva i 16 bit alti, operandi con segno   |
| `pmulhuw`  | `mul`, lane a 16 bit, conserva i 16 bit alti, operandi senza segno |

I 16 bit bassi di un prodotto sono gli stessi sia che gli operandi siano letti come con segno sia come senza segno, quindi esiste un unico `pmullw`.

I 16 bit alti, invece, variano a seconda del tipo (con segno o senza segno) del risultato.
Per questo la moltiplicazione della metà alta ha forme separate per la moltiplicazione con segno e senza segno:

1. `pmulhw`, per la moltiplicazione con segno.
2. `pmulhuw`, con una `u` in più, per la moltiplicazione senza segno.

Nota la sintassi:

1. Una `p`, per intero impacchettato.
2. L'operazione eseguita, `mul`.
3. Una `h`, per indicare che vengono selezionati i bit alti («high») del risultato.
4. Una `u` opzionale se il risultato deve essere interpretato come senza segno (cioè non viene esteso con il segno).
5. Infine, il suffisso di dimensione `w`, per indicare che si tratta di un'operazione su word (16 bit).

La moltiplicazione impacchettata per le word segue esattamente la regola precedente.
Anche la moltiplicazione dword (32 bit) segue la regola, ma esiste solo la variante che seleziona la metà bassa: `pmulld`.

Non esiste una variante della moltiplicazione dword che selezioni i bit alti.
Esistono però varianti che _ampliano_ la moltiplicazione, memorizzando il prodotto completo a 64 bit delle lane con _indice pari_ (cioè le lane in posizione 0 e 2):

| istruzione | significato                                                                      |
|------------|----------------------------------------------------------------------------------|
| `pmuludq`  | moltiplica gli elementi a 32 bit con indice pari, senza segno, ottenendo 2 prodotti completi a 64 bit |
| `pmuldq`   | moltiplica gli elementi a 32 bit con indice pari, con segno, ottenendo 2 prodotti completi a 64 bit   |

Nota che la sintassi usa `dq`, eventualmente preceduto da una `u` per la moltiplicazione senza segno.
Questo perché le istruzioni prendono lane `dword` e producono lane `qword`.

## Divisione

Non esiste una divisione impacchettata tra interi.
Il codice che ne ha bisogno converte i valori in virgola mobile, divide e riconverte.

## Ampliamento degli interi

Esistono equivalenti impacchettati di `movsx` e `movzx`.
Seguono la stessa sintassi che abbiamo visto per le istruzioni che prendono input con una dimensione di lane diversa da quella dell'output:

```x86asm
pmovsxwd xmm0, xmm1   ; 4 words -> 4 dwords, sign-extended
pmovzxbw xmm0, xmm1   ; 8 bytes -> 8 words, zero-extended
```

Nota che il numero di lane è determinato dalla larghezza maggiore (quella dell'output).
L'istruzione legge quel numero di lane dalla parte bassa della sorgente.
Questa è la stessa semantica che abbiamo già visto per le istruzioni `cvt` impacchettate tra numeri in virgola mobile a precisione singola e doppia.

## Conversione tra interi e numeri in virgola mobile

Esistono istruzioni per convertire tra interi con segno a 32 bit e lane in virgola mobile.
Seguono la solita sintassi delle istruzioni `cvt` e `cvtt`, ma al posto di `si` un intero impacchettato è rappresentato da `dq`:

```x86asm
cvtdq2ps xmm0, xmm1 ; convert 32-bit signed integers in xmm1 to 32-bit floats in xmm0
cvtdq2pd xmm2, xmm3 ; convert 32-bit signed integers in xmm3 to 64-bit floats in xmm2
cvtps2dq xmm4, xmm5 ; convert 32-bit floats in xmm5 to 32-bit signed integers in xmm4
```

~~~~exercism/caution
Le istruzioni che usano `pi` per rappresentare gli interi impacchettati scrivono su registri `mmx` legacy e sono di fatto deprecate su x86-64.
Preferisci le forme `dq`, che usano i registri `xmm`.
~~~~

Le stesse considerazioni fatte per la conversione scalare tra numeri in virgola mobile e interi valgono anche qui.
I numeri in virgola mobile vengono arrotondati in base a un registro speciale chiamato MXCSR, il cui modo non puoi dare per scontato all'ingresso di una funzione.
Esiste una variante `cvtt` (con una `t` in più) che tronca sempre il risultato.

È anche possibile usare `round` per portare i valori in virgola mobile impacchettati in uno stato noto prima della conversione.
Il valore di controllo dell'arrotondamento è lo stesso di `round` scalare, e anche la sintassi è la stessa per i valori in virgola mobile impacchettati:

```x86asm
roundps xmm0, xmm1, 1 ; xmm0 = floor(xmm1), packed 32-bit floats
roundpd xmm2, xmm3, 2 ; xmm2 = ceil(xmm3), packed 64-bit floats
```

~~~~exercism/note
Un riferimento completo per ogni istruzione menzionata qui è disponibile nella [guida di riferimento delle istruzioni x86][instruction-reference].

[instruction-reference]: https://www.felixcloutier.com/x86/
~~~~

[simd]: https://exercism.org/tracks/x86-64-assembly/concepts/simd
[saturation]: https://en.wikipedia.org/wiki/Saturation_arithmetic
