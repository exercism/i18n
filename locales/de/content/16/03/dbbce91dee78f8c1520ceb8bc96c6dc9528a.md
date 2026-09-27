# Anleitung

Erstelle eine Implementierung der affinen Chiffre, eines alten Verschlüsselungssystems aus dem Nahen Osten.

Die affine Chiffre ist eine Art monoalphabetische Substitutionschiffre.
Jedes Zeichen wird auf sein numerisches Äquivalent abgebildet, mit einer mathematischen Funktion verschlüsselt und dann in den Buchstaben umgewandelt, der zu seinem neuen numerischen Wert gehört.
Obwohl alle monoalphabetischen Chiffren schwach sind, ist die affine Chiffre deutlich stärker als die Atbash-Chiffre, weil sie viel mehr Schlüssel hat.

[//]: # " monoalphabetic as spelled by Merriam-Webster, compare to polyalphabetic "

## Verschlüsselung

Die Verschlüsselungsfunktion lautet:

```text
E(x) = (ai + b) mod m
```

Dabei ist:

- `i` der Index des Buchstabens von `0` bis zur Länge des Alphabets minus 1.
- `m` die Länge des Alphabets.
  Für das lateinische Alphabet ist `m` gleich `26`.
- `a` und `b` Ganzzahlen, die den Verschlüsselungsschlüssel bilden.

Die Werte `a` und `m` müssen _teilerfremd_ (oder _relativ prim_) sein, damit die automatische Entschlüsselung gelingt. Das heißt, sie haben die Zahl `1` als einzigen gemeinsamen Teiler (mehr Informationen dazu findest du im [Wikipedia-Artikel über teilerfremde Zahlen][coprime-integers]).
Falls `a` nicht teilerfremd zu `m` ist, sollte dein Programm anzeigen, dass dies ein Fehler ist.
Andernfalls sollte es mit dem angegebenen Schlüssel verschlüsseln oder entschlüsseln.

Für diese Übung sind Ziffern gültige Eingaben, aber sie werden nicht verschlüsselt.
Leerzeichen und Satzzeichen sind ausgeschlossen.
Der Geheimtext wird in Gruppen fester Länge geschrieben, die durch ein Leerzeichen getrennt sind. Die traditionelle Gruppengröße sind `5` Buchstaben.
Das erschwert es, den verschlüsselten Text anhand von Wortgrenzen zu erraten.

## Entschlüsselung

Die Entschlüsselungsfunktion lautet:

```text
D(y) = (a^-1)(y - b) mod m
```

Dabei ist:

- `y` der numerische Wert eines verschlüsselten Buchstabens, also `y = E(x)`
- wichtig zu wissen: `a^-1` ist das modulare multiplikative Inverse (MMI) von `a mod m`
- das modulare multiplikative Inverse existiert nur, wenn `a` und `m` teilerfremd sind.

Das MMI von `a` ist das `x`, für das der Rest nach der Division von `ax` durch `m` gleich `1` ist:

```text
ax mod m = 1
```

Weitere Informationen dazu, wie man ein modulares multiplikatives Inverses findet und was es bedeutet, findest du im [zugehörigen Wikipedia-Artikel][mmi].

## Allgemeine Beispiele

- Die Verschlüsselung von `"test"` ergibt `"ybty"` mit dem Schlüssel `a = 5`, `b = 7`
- Die Entschlüsselung von `"ybty"` ergibt `"test"` mit dem Schlüssel `a = 5`, `b = 7`
- Die Entschlüsselung von `"ybty"` ergibt `"lqul"` mit dem falschen Schlüssel `a = 11`, `b = 7`
- Die Entschlüsselung von `"kqlfd jzvgy tpaet icdhm rtwly kqlon ubstx"` ergibt `"thequickbrownfoxjumpsoverthelazydog"` mit dem Schlüssel `a = 19`, `b = 13`
- Die Verschlüsselung von `"test"` mit dem Schlüssel `a = 18`, `b = 13` ist ein Fehler, weil `18` und `26` nicht teilerfremd sind

## Beispiel: Ein modulares multiplikatives Inverses (MMI) finden

MMI für `a = 15` finden:

- `(15 * x) mod 26 = 1`
- `(15 * 7) mod 26 = 1`, d. h. `105 mod 26 = 1`
- `7` ist das MMI von `15 mod 26`

[mmi]: https://en.wikipedia.org/wiki/Modular_multiplicative_inverse
[coprime-integers]: https://en.wikipedia.org/wiki/Coprime_integers
