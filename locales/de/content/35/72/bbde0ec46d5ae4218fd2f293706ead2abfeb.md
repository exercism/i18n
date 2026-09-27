# Schleifen

Eine **Schleife** macht immer wieder dasselbe.

```sather
   loop
      ...
   end;
```

Für sich allein genommen hört das nie auf, also muss etwas im Inneren sie beenden.

## Ein Platz, um mitzuzählen

Eine Schleife braucht fast immer einen Wert, der sich mit der Zeit ändert. Das
ist eine **Variable**, und mit `::=` erstellst du eine:

```sather
   total ::= 0;
```

Die Variable heißt `total`, sie startet bei `0`, und Sather erkennt an der `0`,
dass sie einen `INT` enthält. Danach setzt `:=` einen neuen Wert hinein:

```sather
   total := total + 5;
```

Lies das von rechts nach links: Nimm, was `total` gerade ist, addiere 5 und
schreibe das Ergebnis zurück in `total`.

Eine so erzeugte Variable lebt bis zum Ende der Routine.

## until!

`until!` nimmt eine Frage entgegen. Bei jedem Durchlauf wird sie gestellt, und
wenn die Antwort wahr ist, stoppt die Schleife genau dort.

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

`n` zählt 1, 2, 3 ... und die Schleife endet, sobald `n` über `last` hinaus
ist. Ohne das `n := n + 1` würde die Frage ihre Antwort nie ändern und die
Schleife würde ewig laufen.

`until!` muss nicht die erste Zeile sein. Setze es dorthin, wo die Frage Sinn
ergibt: oben kann die Schleife kein einziges Mal laufen; unten läuft sie immer
mindestens einmal.

Das `!` gehört zum Namen. Sather kennzeichnet bestimmte Dinge so; was die
Kennzeichnung bedeutet, kommt später.

## break!

`break!` beendet die Schleife sofort, ohne dass eine Frage damit verbunden ist.
Es ist nützlich, wenn der Grund zum Aufhören mitten in der Arbeit auftaucht.

```sather
   loop
      if too_far then break!; end;
      ...
   end;
```

`until!` und `break!` bedeuten nur innerhalb einer `loop` etwas. Keines von
beiden lässt sich allein verwenden.
