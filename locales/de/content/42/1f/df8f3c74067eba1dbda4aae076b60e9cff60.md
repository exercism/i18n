# Iteratoren

Ein Array mit einem Zähler zu durchlaufen, kostet vier Zeilen Verwaltungsaufwand, bevor die eigentliche Arbeit beginnt:

```sather
   i ::= 0;
   loop
      until!(i >= counts.size);
      total := total + counts[i];
      i := i + 1;
   end;
```

Der Zähler, die Abbruchbedingung und der Schritt haben nichts mit dem Addieren von Zahlen zu tun. Ein **Iterator** erledigt alle drei.

```sather
   loop
      total := total + counts.elt!;
   end;
```

`elt!` liefert bei jedem Durchlauf ein Element und beendet die Schleife, wenn keine mehr da sind. Kein Zähler, nichts, was man falsch machen kann, und keine Möglichkeit, über das Ende des Arrays hinauszulaufen.

## Das Ausrufezeichen

Das `!` kennzeichnet einen Iterator. Dir sind schon drei begegnet, `until!`, `while!` und `break!`, und für sie gilt dieselbe Regel: **Ein Iterator darf nur innerhalb einer Schleife aufgerufen werden.** `counts.elt!` außerhalb einer Schleife zu schreiben, ist ein Fehler.

Ein Iterator, der innerhalb einer Schleife aufgerufen wird, wird bei jedem Durchlauf nach einem Wert gefragt. Wenn er keinen mehr hat, endet die Schleife sofort, egal an welcher Stelle im Schleifenblock der Aufruf steht.

## Zwei für den Anfang

`elt!` liefert die Elemente eines Arrays oder eines Strings, und zwar der Reihe nach.

```sather
   loop
      #OUT + names.elt! + "\n";
   end;
```

`upto!` zählt. `1.upto!(5)` liefert 1, 2, 3, 4, 5 und beendet dann die Schleife.

```sather
   loop
      total := total + 1.upto!(5);
   end;
```

Beide sind ganz normale Routinen, die zufällig auf `!` enden. Also werden beide mit einem Punkt aufgerufen, auf einem Array oder auf einer Zahl.

## Das Ergebnis behalten

Die Schleife endet von selbst, also muss alles, was darin berechnet wird, in einer Variable gespeichert werden, die **außerhalb** deklariert ist. Sonst verschwindet es, wenn die Schleife endet.

```sather
   total ::= 0;             -- outside
   loop
      total := total + counts.elt!;
   end;
   return total;
```
