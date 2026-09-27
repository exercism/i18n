# Cicli

Un **ciclo** ripete la stessa cosa più e più volte.

```sather
   loop
      ...
   end;
```

Da solo non si ferma mai, quindi qualcosa al suo interno deve farlo terminare.

## Un posto per tenere il conto

Un ciclo ha quasi sempre bisogno di un valore che cambia mentre procede. È una
**variabile**, e `::=` ne crea una:

```sather
   total ::= 0;
```

La variabile si chiama `total`, parte da `0`, e Sather deduce dallo `0` che
contiene un `INT`. Dopo di che, `:=` ci mette un nuovo valore:

```sather
   total := total + 5;
```

Leggilo da destra a sinistra: prendi il valore che `total` ha adesso, aggiungi
5 e rimetti il risultato in `total`.

Una variabile creata così vive fino alla fine della routine.

## until!

`until!` accetta una domanda. A ogni giro la domanda viene posta, e quando la
risposta è vera il ciclo si ferma lì per lì.

```sather
   sum_to(last : INT) : INT is
      total ::= 0;
      n ::= 1;
      loop
         until!(n > last);
         total := total + n;
         n := n + 1;
      end;
      return total;
   end;
```

`n` conta 1, 2, 3 ... ed il ciclo termina la prima volta che `n` supera
`last`. Senza `n := n + 1` la domanda non cambierebbe mai risposta e il ciclo
andrebbe avanti all'infinito.

`until!` non deve per forza essere la prima riga. Mettilo dove la domanda ha
senso: in cima, il ciclo può non essere eseguito nemmeno una volta; in fondo,
viene eseguito sempre almeno una volta.

Il `!` fa parte del nome. Sather contrassegna così certe cose; il significato
di questo segno arriverà più avanti.

## break!

`break!` termina il ciclo immediatamente, senza nessuna domanda. È utile quando
il motivo per fermarsi salta fuori nel mezzo del lavoro.

```sather
   loop
      if too_far then break!; end;
      ...
   end;
```

`until!` e `break!` hanno senso solo all'interno di un `loop`. Nessuno dei due
può essere usato da solo.
