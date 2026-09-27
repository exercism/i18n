# Iteratoren

Ein Iterator ist eine Routine, deren Name auf `!` endet und die nur innerhalb einer `loop`-Schleife aufgerufen werden darf. Bei jedem Durchlauf der Schleife liefert er seinen nächsten Wert; wenn er keine Werte mehr liefert, endet die Schleife sofort.

```sather
   loop
      total := total + counts.elt!;
   end;
```

Sather hat keine `for`-Anweisung. Das hier ersetzt sie, und es ist das Merkmal, für das die Sprache bekannt ist.

## Die man früh kennen sollte

| Iterator | Liefert |
| --- | --- |
| `a.elt!` | jedes Element von `a`, der Reihe nach |
| `a.ind!` | jede Position von `a`: 0, 1, 2 … |
| `n.upto!(m)` | `n`, `n+1` … `m` |
| `n.downto!(m)` | `n`, `n-1` … `m` |
| `n.times!` | läuft `n`-mal und liefert nichts |
| `n.up!` | `n`, `n+1`, … und endet nie |
| `s.elt!` | jedes Zeichen eines Strings |

`until!`, `while!` und `break!` sind ebenfalls Iteratoren. Deshalb enden sie auf `!` und funktionieren nur innerhalb einer Schleife.

## Wo der Aufruf steht

Ein Iterator-Aufruf darf überall stehen, wo ein Ausdruck stehen darf, auch mitten in einer Bedingung:

```sather
   loop
      if counts.elt! > 10 then busy := busy + 1; end;
   end;
```

Jede *Stelle* im Programm, an der ein Iterator steht, behält ihre eigene Position. Schreibst du `counts.elt!` zweimal in einem Schleifenblock, entstehen zwei unabhängige Durchläufe durch das Array. Das ist fast nie gewollt:

```sather
   loop
      #OUT + counts.elt! + " and " + counts.elt!;   -- two separate walks
   end;
```

Frag stattdessen einmal und leg den Wert in einer Variablen ab.

## Die Schleife beenden

Die Schleife endet, sobald *irgendein* Iterator darin keine Werte mehr liefert, nicht erst, wenn alle fertig sind. Bei einem Iterator ist das offensichtlich. Bei mehreren ist es die Regel, über die jeder stolpert, und darum geht es in der nächsten Übung.

## Welchen du nehmen solltest

Nimm `elt!`, wenn du die Werte brauchst, und `ind!`, wenn du die Positionen brauchst. Greif nur dann zu `upto!` über `0 .. a.size - 1`, wenn du beides gleichzeitig brauchst oder wenn das Ergebnis eine Position statt eines Werts ist.
