# Einführung

Eine Gleitkommazahl ist eine Zahl mit null oder mehr Ziffern hinter dem Dezimaltrennzeichen. Beispiele sind `-2.4`, `0.1`, `3.14`, `16.984025` und `1024.0`.

Verschiedene Gleitkommatypen können unterschiedlich viele Ziffern nach dem Trennzeichen speichern. Man nennt das ihre Genauigkeit.

C# hat drei Gleitkommatypen:

- `float`: 4 Bytes (Genauigkeit: ca. 6-9 Ziffern). Schreibweise: `2.45f`.
- `double`: 8 Bytes (Genauigkeit: ca. 15-17 Ziffern). Das ist der gebräuchlichste Typ. Schreibweise: `2.45` oder `2.45d`.
- `decimal`: 16 Bytes (Genauigkeit: 28-29 Ziffern). Wird normalerweise verwendet, wenn man mit Geldbeträgen arbeitet, da seine Genauigkeit zu weniger Rundungsfehlern führt. Schreibweise: `2.45m`.

Wie man sieht, kann jeder Typ eine unterschiedliche Anzahl von Ziffern speichern. Das bedeutet, dass beim Versuch, PI in einem `float` zu speichern, nur die ersten 6 bis 9 Ziffern gespeichert werden (wobei die letzte Ziffer gerundet wird).
