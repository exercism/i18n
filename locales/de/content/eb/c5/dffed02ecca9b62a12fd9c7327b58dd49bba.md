# Anleitung

Implementiere grundlegende Listenoperationen.

In funktionalen Sprachen sind Listenoperationen wie `length`, `map` und `reduce` sehr verbreitet. Implementiere eine Reihe grundlegender Listenoperationen, ohne vorhandene Funktionen zu verwenden.

Die genaue Anzahl und die Namen der Operationen, die du implementieren sollst, hängen vom jeweiligen Track ab, damit es keine Konflikte mit vorhandenen Namen gibt. Die allgemeinen Operationen, die du implementierst, sind:

- `append` (_füge bei zwei gegebenen Listen alle Elemente der zweiten Liste ans Ende der ersten Liste an_);
- `concatenate` (_kombiniere bei einer Reihe von Listen alle Elemente aller Listen zu einer einzigen flachen Liste_);
- `filter` (_gib bei einem Prädikat und einer Liste die Liste aller Elemente zurück, für die `predicate(item)` True ist_);
- `length` (_gib bei einer Liste die Gesamtzahl der darin enthaltenen Elemente zurück_);
- `map` (_gib bei einer Funktion und einer Liste die Liste der Ergebnisse zurück, die du erhältst, wenn du `function(item)` auf alle Elemente anwendest_);
- `foldl` (_wenn du eine Funktion, eine Liste und einen Anfangswert für den Akkumulator hast, falte (reduziere) jedes Element von links in den Akkumulator_);
- `foldr` (_wenn du eine Funktion, eine Liste und einen Anfangswert für den Akkumulator hast, falte (reduziere) jedes Element von rechts in den Akkumulator_);
- `reverse` (_gib bei einer Liste eine Liste mit allen ursprünglichen Elementen zurück, aber in umgekehrter Reihenfolge_).

Beachte, dass die Reihenfolge, in der die Argumente an die fold-Funktionen (`foldl`, `foldr`) übergeben werden, wichtig ist.
