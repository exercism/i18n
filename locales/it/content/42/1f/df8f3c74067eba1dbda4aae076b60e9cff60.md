# Iteratori

Percorrere un array con un contatore richiede quattro righe di operazioni preliminari prima di poter fare qualsiasi cosa:

```sather
   i ::= 0;
   loop
      until!(i >= counts.size);
      total := total + counts[i];
      i := i + 1;
   end;
```

Il contatore, il test di fine e l'incremento non hanno nulla a che vedere con la somma dei numeri. Un **iteratore** fa tutte e tre le cose.

```sather
   loop
      total := total + counts.elt!;
   end;
```

`elt!` consegna un elemento a ogni giro e termina il ciclo quando non ce ne sono più. Niente contatore, niente da sbagliare e nessun modo di andare oltre la fine dell'array.

## Il punto esclamativo

Il `!` contrassegna un iteratore. Ne hai già incontrati tre, `until!`, `while!` e `break!`, e seguono tutti la stessa regola: **un iteratore si può chiamare solo all'interno di un ciclo.** Scrivere `counts.elt!` fuori da un ciclo è un errore.

Un iteratore chiamato all'interno di un ciclo viene interrogato per un valore a ogni giro. Quando non ne ha più, il ciclo termina immediatamente, in qualunque punto del corpo si trovi la chiamata.

## Due per iniziare

`elt!` fornisce gli elementi di un array o di una stringa, in ordine.

```sather
   loop
      #OUT + names.elt! + "\n";
   end;
```

`upto!` conta. `1.upto!(5)` fornisce 1, 2, 3, 4, 5 e poi termina il ciclo.

```sather
   loop
      total := total + 1.upto!(5);
   end;
```

Entrambi sono routine ordinarie che per caso terminano con `!`, quindi si chiamano con un punto, su un array o su un numero.

## Conservare il risultato

Il ciclo termina da solo, quindi tutto ciò che viene calcolato al suo interno va conservato in una variabile dichiarata **all'esterno**: altrimenti sparisce quando termina il ciclo.

```sather
   total ::= 0;             -- outside
   loop
      total := total + counts.elt!;
   end;
   return total;
```
