# Hinweise

## 1. Kundinnen und Kunden klassifizieren

- Die Funktionen `any()` und `all()` können hier hilfreich sein.
- Du kannst dafür eine separate Funktion definieren oder direkt eine anonyme Funktion verwenden.

## 2. Emphatische Kundinnen und Kunden herausfiltern

- Du musst das Wörterbuch filtern.
- Ein Wörterbuch iteriert standardmäßig über ein Schlüssel/Wert-`Pair`, auf dessen Felder (first/second) oder Index (1/2) du zugreifen kannst.
- Nutze deine Funktion `all_15()`.

## 3. Bewertungen in Binärwerte umwandeln

- Du brauchst eine Zuordnung von `1` zu `0` und `5` zu `1`.
- Stelle sicher, dass die Form des Ausgabe-Arrays dieselbe ist wie die Form des Eingabe-Arrays.

## 4. Bewertungen in eine Matrix umwandeln

- Das kannst du mit `mapreduce()` erledigen.
- Nutze deine Funktion `tobinary()` für (einen Teil?) der Zuordnung.
- Eine Matrix erhältst du, indem du einen Vektor von Vektoren mit `hcat()` oder `vcat()` reduzierst, je nachdem, ob die Eingabe Spalten- oder Zeilenvektoren enthält.
- Achte auf deine Ausgabe. Ist jeder Bewertungsvektor eine Zeile in der Matrix? Die Funktion `transpose()` kann dir an der einen oder anderen Stelle helfen.
