# Informazioni

Un vocabolario è l'unità di organizzazione in Factor: una raccolta di definizioni di parole, identificata da un nome.

```factor
USING: kernel ;
IN: greetings.formal

: hello ( name -- str ) "Greetings, " prepend ;
```

## Struttura di file e directory

I nomi dei vocabolari usano `.` come separatore. Il percorso segue i punti:

| Vocabolario           | File                                       |
| ---                   | ---                                        |
| `greetings`           | `greetings/greetings.factor`               |
| `greetings.formal`    | `greetings/formal/formal.factor`           |
| `greetings.casual`    | `greetings/casual/casual.factor`           |

Il loader di Factor cerca i vocabolari percorrendo le *radici dei vocabolari*, cioè la radice del progetto e la libreria basis inclusa, finché non trova una directory il cui nome corrisponde a ogni segmento del percorso. L'ultimo segmento viene ripetuto come nome del file.

## `USING:` e `IN:`

`USING:` (insieme a `USE:`, per un vocabolario alla volta) porta altri vocabolari nel percorso di ricerca del file corrente. `IN:` dichiara a quale vocabolario *appartengono* le parole definite in questo file: i loro nomi completi iniziano con quel prefisso.

```factor
USING: kernel sequences greetings.formal ;
IN: greetings

: greet-everyone ( names -- strs )
    [ hello ] map ;
```

Qui `greet-everyone` sta in `greetings`, chiama `hello` da `greetings.formal` e `map` da `sequences`.

## Perché suddividere una soluzione in più vocabolari

Suddividere il codice su più vocabolari ti permette di:

- Raggruppare piccole parole ausiliarie per responsabilità, separandole dalla routine di alto livello che le compone.
- Riutilizzare le parole ausiliarie altrove senza tirarsi dietro la routine principale.
- Leggere ogni file come un unico livello di astrazione coerente.

Il loader di Factor è abbastanza veloce e pigro da rendere economico suddividere *ulteriormente* in vocabolari più piccoli; la convenzione nella libreria standard è di fattorizzare in modo aggressivo.
