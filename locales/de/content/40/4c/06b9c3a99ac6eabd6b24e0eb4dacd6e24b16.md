# Einführung

## Mehr über Muster

Wie du aus dem Konzept Fundamentals weißt, besteht ein AWK-Programm aus **Muster-Aktions-Paaren**.

```awk
pattern1 { action1 }
pattern2 { action2 }
...
```

### Was meinen wir mit „Muster“?

Das „Muster“ ist ein beliebiger AWK-Ausdruck.
Ob das Ergebnis des Ausdrucks als wahr gilt, entscheidet, ob die Aktion ausgeführt wird.

### Das leere Muster

Das Muster kann weggelassen werden.
In diesem Fall wird die Aktion für jeden Datensatz ausgeführt.

Wir können alle Benutzernamen in der passwd-Datei ausgeben.

```sh
awk -F: '{print $1}' /etc/passwd
```

### Reguläre Ausdrücke

AWK kann Strings mit regulären Ausdrücken vergleichen und erhält so ein boolesches Ergebnis.

Verwende den Operator `~` zum Abgleich mit regulären Ausdrücken, um ein bestimmtes Feld zu treffen. 
Dieser Operator nimmt einen String als linken Operanden und einen regulären Ausdruck als rechten Operanden.
Ein regulärer Ausdruck als Literal wird in `/`-Schrägstriche eingeschlossen.

So findest du die Benutzer in der passwd-Datei, die sich mit bash anmelden:

```sh
awk -F: '$7 ~ /bash/ {print $1}' /etc/passwd
```

`!~` ist der Operator für „regulärer Ausdruck stimmt **nicht** überein“.

Um einen regulären Ausdruck mit dem aktuellen Datensatz abzugleichen, kannst du `$0 ~ /regex/` verwenden.
Das ist so verbreitet, dass es eine Kurzform gibt: Du kannst `$0` und `~` weglassen und einfach `/regex/` schreiben

```sh
awk '/regex/' data.txt
```

~~~~exercism/note
Vergleiche diesen AWK-Einzeiler mit dem entsprechenden grep-Befehl

```sh
grep 'regex' data.txt
```

AWK gibt dir eine ganze Programmiersprache, ohne auf Prägnanz zu verzichten.
~~~~

Auf die Variante der regulären Ausdrücke in GNU AWK gehen wir in einem weiteren Konzept genauer ein.

### Ausdrücke

AWK-Ausdrücke (arithmetisch, logisch oder anderweitig) können als Muster verwendet werden.

So extrahierst du alle Benutzer mit UID 1000 oder höher:

```sh
awk -F: '$3 >= 1000' /etc/passwd
```

Erinnere dich daran, dass die falschen Werte in AWK die Zahl null und der leere String sind; alle anderen Zahlen oder Strings sind wahr.
Jeder Ausdruck, der zu einer Zahl oder einem String ausgewertet wird, kann als Muster verwendet werden.

### Funktionen

Jede [eingebaute][builtins] oder [benutzerdefinierte][] Funktion kann in einem Ausdruck und damit im Muster verwendet werden.
Ein paar Beispiele:

```awk
length($1) {print "first field is not empty"}
```
```awk
toupper(substr($1, 1, 1)) ~ /[AEIOU]/ {print "starts with a vowel"}
```

### Konstante Muster

Ein häufiges AWK-Idiom ist:

```sh
{
    xyz()   # some code that transforms each record
}
1
```

`1` ist ein wahres Muster ohne zugehörige Aktion.
Das bedeutet „gib den aktuellen Datensatz aus“.

[builtins]: https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html
[user-defined]: https://www.gnu.org/software/gawk/manual/html_node/User_002ddefined.html
