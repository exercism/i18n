# Condizionali

```sather
   if score >= 5 then
      return "Recalled";
   else
      return "Thank you";
   end;
```

La domanda tra `if` e `then` deve essere un `BOOL`. Sather non accetta un numero lì, quindi non esiste l'abitudine in stile C di trattare lo zero come falso.

## La struttura

```sather
   if first_question then
      ...
   elsif second_question then
      ...
   elsif third_question then
      ...
   else
      ...
   end;
```

Le domande vengono poste dall'alto verso il basso e la prima che risponde vero vince. Tutto ciò che sta sotto viene saltato senza nemmeno essere valutato. Ecco perché una catena deve andare dal test più specifico al meno specifico: mettere `score >= 5` sopra `score >= 8` significa che il secondo non viene mai raggiunto.

`else` è opzionale. `elsif` può essere ripetuto tutte le volte che serve.

## I condizionali sono istruzioni, non valori

`if` di per sé non produce un valore, quindi questo non è Sather:

```sather
   -- wrong
   grade := if score > 5 then "pass" else "fail" end;
```

O restituisci un valore dall'interno di ciascun ramo, oppure assegni a una variabile all'interno di ciascun ramo.

## Quando non usarli

Una routine che risponde a una domanda dovrebbe restituire la domanda:

```sather
   -- say this
   old_enough(age : INT) : BOOL is
      return age >= 13;
   end;

   -- not this
   old_enough(age : INT) : BOOL is
      if age >= 13 then return true; else return false; end;
   end;
```

La seconda non dice nulla che la prima non dica già, con il triplo della lunghezza.

## Annidamento

Un `if` può contenerne un altro. Spesso però non è necessario: due domande che devono essere entrambe vere si possono unire con `and`, e il risultato si legge meglio.

```sather
   if score >= 8 and sings then
      return "Lead";
   end;
```
