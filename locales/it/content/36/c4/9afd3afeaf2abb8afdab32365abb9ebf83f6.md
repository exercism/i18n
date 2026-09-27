# Iteratori

Un iteratore è una routine il cui nome termina con `!` e che può essere chiamata solo all'interno di un `loop`. A ogni giro del ciclo produce il suo valore successivo; quando si esaurisce, il ciclo termina all'istante.

```sather
   loop
      total := total + counts.elt!;
   end;
```

Sather non ha un'istruzione `for`. Questo è ciò che lo sostituisce, ed è la caratteristica per cui il linguaggio è conosciuto.

## Quelli che vale la pena conoscere subito

| Iteratore | Cosa produce |
| --- | --- |
| `a.elt!` | ogni elemento di `a`, in ordine |
| `a.ind!` | ogni posizione di `a`: 0, 1, 2 … |
| `n.upto!(m)` | `n`, `n+1` … `m` |
| `n.downto!(m)` | `n`, `n-1` … `m` |
| `n.times!` | viene eseguito `n` volte, senza produrre nulla |
| `n.up!` | `n`, `n+1`, … e non finisce mai |
| `s.elt!` | ogni carattere di una stringa |

Anche `until!`, `while!` e `break!` sono iteratori. Ecco perché terminano con `!` e perché funzionano solo all'interno di un ciclo.

## Dove va la chiamata

Una chiamata a un iteratore può comparire ovunque possa comparire un'espressione, anche nel mezzo di una condizione:

```sather
   loop
      if counts.elt! > 10 then busy := busy + 1; end;
   end;
```

Ogni *punto* del programma in cui è scritto un iteratore mantiene la propria posizione. Scrivere `counts.elt!` due volte nello stesso corpo del ciclo produce due scansioni indipendenti dell'array, e quasi mai è ciò che si vuole:

```sather
   loop
      #OUT + counts.elt! + " and " + counts.elt!;   -- two separate walks
   end;
```

Chiedilo una volta sola e metti il valore in una variabile.

## Come termina il ciclo

Il ciclo termina non appena *un qualsiasi* iteratore al suo interno si esaurisce, non quando si esauriscono tutti. Con un solo iteratore la cosa è ovvia. Con diversi, è la regola che coglie tutti di sorpresa, ed è l'argomento del prossimo esercizio.

## Quale scegliere

Preferisci `elt!` quando vuoi i valori e `ind!` quando vuoi le posizioni. Ricorri a `upto!` su `0 .. a.size - 1` solo quando servono entrambi contemporaneamente, o quando la risposta è una posizione anziché un valore.
