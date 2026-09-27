# Introduzione

In Common Lisp il tempo è rappresentato in quattro modi, due dei quali tratteremo qui.

- Il tempo universale è un tempo assoluto, un numero intero che rappresenta il numero di secondi trascorsi da `1900-01-01T00:00:00Z` (cioè la mezzanotte del 1° gennaio 1900 in UTC).
- Il tempo decodificato è una tupla di 9 valori che insieme rappresentano un momento specifico del calendario: secondi, minuti, ora, giorno del mese, mese, anno, giorno della settimana, flag dell'ora legale, fuso orario.
(Ne parleremo in dettaglio più avanti.)

## Tempo universale

Per ottenere il tempo universale corrente si usa `get-universal-time` oppure `get-decoded-time`.
Il primo restituisce i secondi correnti trascorsi da `1900-01-01T00:00Z`, mentre il secondo restituisce gli stessi dati in formato decodificato.

## Tempo decodificato

`decode-universal-time` e `encode-universal-time` sono le funzioni principali per lavorare con il tempo.
La prima prende un tempo universale e restituisce un tempo decodificato come [multiple-values][concept-multiple-values], mentre la seconda prende i valori del tempo decodificato come argomenti e restituisce un tempo universale.

Entrambe accettano un argomento opzionale per il fuso orario.
Qui sotto trovi il formato del fuso orario.

Un tempo decodificato è un insieme di valori:

- *secondi*: un numero intero tra 0 e 59
- *minuti*: un numero intero tra 0 e 59
- *ora*: un numero intero tra 0 e 23
- *giorno del mese*: un numero intero tra 1 e 31 (ovviamente il limite superiore dipende dal mese e dall'anno)
- *mese*: un numero intero tra 1 e 12
- *anno*: un numero intero che indica l'anno.
- *giorno della settimana*: un numero intero tra 0 e 6. 0 significa lunedì, 1 significa martedì ecc. ... 6 significa domenica.
- *flag dell'ora legale*: un valore vero indica che l'ora legale è in vigore.
- *fuso orario*: un numero di ore tra -24 e 24 che indica lo scostamento da UTC.
Il numero è un numero razionale e deve essere un multiplo di `1/3600`

```lisp
(encode-universal-time 1 2 3 4 5 2000 0) ; => 3166398121
(decode-universal-time 3166398121)       ; => 1
                                         ;    2
                                         ;    3
                                         ;    4
                                         ;    5
                                         ;    2000
                                         ;    3 (Thursday)
                                         ;    NIL
                                         ;    0
(decode-universal-time 2208988800) ; => 0
                                   ;    0
                                   ;    0
                                   ;    1
                                   ;    1
                                   ;    1970
                                   ;    3
                                   ;    NIL
                                   ;    0
```

[concept-multiple-values]: /tracks/common-lisp/concepts/multiple-values
