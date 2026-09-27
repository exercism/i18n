# Anleitung

Wenn du etwas mit einem Raspberry Pi bauen möchtest, wirst du wahrscheinlich _Widerstände_ verwenden.
Für diese Übung musst du nur drei Dinge über sie wissen:

- Jeder Widerstand hat einen Widerstandswert.
- Widerstände sind klein, so klein, dass es schwer zu lesen wäre, wenn man den Widerstandswert auf sie drucken würde.
  Um dieses Problem zu umgehen, drucken Hersteller farbcodierte Ringe auf die Widerstände, um ihre Widerstandswerte anzugeben.
- Jeder Ring steht für eine Ziffer einer Zahl.
  Wenn sie zum Beispiel einen Ring in der Farbe brown (Wert 1) gefolgt von einem Ring in der Farbe green (Wert 5) drucken würden, ergäbe das die Zahl 15.
  In dieser Übung erstellst du ein hilfreiches Programm, damit du dir die Werte der Ringe nicht merken musst.
  Das Programm nimmt 3 Farben als Eingabe und gibt den korrekten Wert in Ohm aus.
  Die Farbringe sind wie folgt codiert:

- black: 0
- brown: 1
- red: 2
- orange: 3
- yellow: 4
- green: 5
- blue: 6
- violet: 7
- grey: 8
- white: 9

In Widerstandsfarben-Duo hast du die ersten beiden Farben entschlüsselt.
Zum Beispiel: orange-orange ergab den Hauptwert `33`.
Die dritte Farbe steht für die Anzahl der Nullen, die zum Hauptwert hinzugefügt werden müssen.
Der Hauptwert plus die Nullen ergibt einen Wert in Ohm.
Für die Übung spielt es keine Rolle, was Ohm wirklich ist.
Zum Beispiel:

- orange-orange-black wäre 33 und keine Nullen, was 33 ohms ergibt.
- orange-orange-red wäre 33 und 2 Nullen, was 3300 ohms ergibt.
- orange-orange-orange wäre 33 und 3 Nullen, was 33000 ohms ergibt.

(Wenn Mathe dein Ding ist, kannst du die Nullen als Exponenten von 10 betrachten.
Wenn Mathe nicht dein Ding ist, bleib bei den Nullen.
Es ist wirklich dasselbe, nur in normaler Sprache statt in Mathe-Jargon.)

In dieser Übung geht es darum, die Farben in ein Label zu übersetzen:

> „... ohms“

Eine Eingabe von `"orange", "orange", "black"` sollte also Folgendes zurückgeben:

> „33 ohms“

Bei größeren Widerständen wird ein [metrisches Präfix][metric-prefix] verwendet, um eine größere Größenordnung von Ohm anzugeben, zum Beispiel „kiloohms“.
Das ist ähnlich wie „2 Kilometer“ statt „2000 Meter“ oder „2 Kilogramm“ für „2000 Gramm“.

Zum Beispiel sollte eine Eingabe von `"orange", "orange", "orange"` Folgendes zurückgeben:

> „33 kiloohms“

[metric-prefix]: https://en.wikipedia.org/wiki/Metric_prefix
