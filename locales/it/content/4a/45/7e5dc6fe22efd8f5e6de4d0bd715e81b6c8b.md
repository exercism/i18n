# Introduzione

I vettori possono avere elementi con un nome, il che a volte li rende più comodi da usare.

## Creazione

Ci sono tre modi per aggiungere dei nomi a un vettore.

1) Al momento della creazione del vettore 

```R
> work_days <- c(Mon = TRUE, Tue = TRUE, Wed = TRUE, Thu = TRUE, Fri = TRUE, Sat = FALSE, Sun = FALSE)
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
```

2) Assegnando un vettore di stringhe a `names()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> names(months) <- month.abb
> months
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
 31  28  31  30  31  30  31  31  30  31  30  31 
```

3) Con `setNames()`

```R
> months <- c(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
> setNames(months, month.name)
  January  February     March     April       May      June      July    August September   October  November  December 
       31        28        31        30        31        30        31        31        30        31        30        31 
```

## Rimozione

Se i nomi non servono più, si possono rimuovere impostandoli a `NULL`

```R
> work_days
  Mon   Tue   Wed   Thu   Fri   Sat   Sun 
 TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE 
> names(work_days) <- NULL
> work_days
[1]  TRUE  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

La funzione `unname()` ottiene lo stesso risultato e può rendere più chiara l'intenzione.

## Lavorare con i nomi

La funzione `names()` può anche recuperare i nomi, oltre che impostarli.

```R
> names(months) <- month.abb
> names(months)[1:3]
[1] "Jan" "Feb" "Mar"
```

Un nome può essere usato al posto dell'indice di posizione; in questo caso le virgolette sono obbligatorie.

```R
> months[c("Jul", "Aug")]
Jul Aug 
 31  31 
```

Perché questo tipo di indicizzazione funzioni correttamente, è meglio assicurarsi che i nomi siano univoci e non mancanti.
Tuttavia, R non impone l'unicità.

Le normali operazioni sui vettori funzionano comunque, e di solito i nomi vengono conservati se ha senso.

```R
> months[months == 30]
Apr Jun Sep Nov 
 30  30  30  30 

> sum(months)
[1] 365  # no meaningful names possible
```
