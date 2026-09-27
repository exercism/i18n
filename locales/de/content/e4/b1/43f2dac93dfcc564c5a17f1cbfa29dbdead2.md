# Anleitung

Zähle die gewerteten Punkte auf einem Go-Brett.

Im Spiel Go (auch bekannt als Baduk, Igo, cờ vây und Wéiqí) gewinnst du Punkte, indem du leere Schnittpunkte vollständig mit deinen Steinen umschließt.
Die umschlossenen Schnittpunkte eines Spielers werden als sein Territorium bezeichnet.

Berechne das Territorium jedes Spielers.
Du kannst davon ausgehen, dass alle Steine, die im feindlichen Territorium gestrandet sind, bereits vom Brett genommen wurden.

Bestimme das Territorium, das eine angegebene Koordinate enthält.

Es können mehrere leere Schnittpunkte gleichzeitig umschlossen sein, und für das Umschließen zählen nur horizontale und vertikale Nachbarn.
Im folgenden Diagramm sind die Steine, die zählen, mit „O“ markiert und die Steine, die nicht zählen, mit „I“ (ignoriert).
Leere Stellen stehen für leere Schnittpunkte.

```text
+----+
|IOOI|
|O  O|
|O OI|
|IOI |
+----+
```

Genauer gesagt gehört ein leerer Schnittpunkt zum Territorium eines Spielers, wenn alle seine Nachbarn entweder Steine dieses Spielers oder leere Schnittpunkte sind, die zum Territorium dieses Spielers gehören.

Weitere Informationen findest du bei [Wikipedia][go-wikipedia] oder in [Sensei's Library][go-sensei].

[go-wikipedia]: https://en.wikipedia.org/wiki/Go_%28game%29
[go-sensei]: https://senseis.xmp.net/
