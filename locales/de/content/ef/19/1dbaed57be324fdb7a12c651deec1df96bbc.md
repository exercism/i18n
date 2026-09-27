# Einführung

## Reguläre Ausdrücke

Reguläre Ausdrücke (Regex) sind ein mächtiges Werkzeug für die Arbeit mit Strings in Elixir. Reguläre Ausdrücke in Elixir folgen der **PCRE**-Spezifikation (**P**erl **C**ompatible **R**egular **E**xpressions). String-Muster, die die Bedeutung des regulären Ausdrucks darstellen, werden zuerst kompiliert und dann verwendet, um einen String ganz oder teilweise zu matchen.

In Elixir ist der gebräuchlichste Weg, reguläre Ausdrücke zu erstellen, das `~r`-Sigil. Sigils bieten _syntaktischen Zucker_ als Abkürzung für häufige Aufgaben in Elixir. Um ein _String-Literal_ zu matchen, können wir den String selbst als Muster nach dem Sigil verwenden.

```elixir
~r/test/
```

Der `=~/2`-Operator ist nützlich, um mit einer Regex einen String zu matchen und ein `boolean`-Ergebnis zu erhalten.

```elixir
"this is a test" =~ ~r/test/
# => true
```

Zwei Anmerkungen zur Verwendung von Sigils:

- je nach deinen Anforderungen können viele verschiedene Trennzeichen statt `/` verwendet werden
- String-Muster sind bereits _escaped_; wenn du das Muster als String schreibst und keinen Regex verwendest, musst du Backslashes (`\`) _escapen_

### Zeichenklassen

Wenn du einen Zeichenbereich mit eckigen Klammern `[]` angibst, definierst du eine _Zeichenklasse_. Sie matcht genau ein Zeichen aus der Menge der Zeichen in der Klasse. Du kannst auch einen Zeichenbereich wie `a-z` angeben, solange Anfang und Ende einen zusammenhängenden Bereich von Codepunkten darstellen.

```elixir
regex = ~r/[a-z][ADKZ][0-9][!?]/
"jZ5!" =~ regex
# => true
"jB5?" =~ regex
# => false
```

_Kurzschreibweisen für Zeichenklassen_ machen das Muster kompakter. Zum Beispiel:

- `\d` Kurzform für `[0-9]` (jede Ziffer)
- `\w` Kurzform für `[A-Za-z0-9_]` (jedes „Wort“-Zeichen)
- `\s` Kurzform für `[ \t\r\n\f]` (jedes Whitespace-Zeichen)

Wenn eine _Kurzschreibweise für Zeichenklassen_ außerhalb eines Sigils verwendet wird, muss sie escaped werden: `"\\d"`

### Alternativen

_Alternativen_ verwenden `|` als Sonderzeichen, um auszudrücken, dass das eine _oder_ das andere gematcht wird

```elixir
regex = ~r/cat|bat/
"bat" =~ regex
# => true
"cat" =~ regex
# => true
```

### Quantoren

_Quantoren_ erlauben ein sich wiederholendes Muster im Regex. Sie wirken auf die Gruppe, die vor dem Quantor steht.

- `{N, M}` wobei `N` die minimale Anzahl an Wiederholungen und `M` die maximale ist
- `{N,}` matcht `N` oder mehr Wiederholungen
  - `{0,}` kann auch als `*` geschrieben werden: null oder mehr Wiederholungen matchen
  - `{1,}` kann auch als `+` geschrieben werden: eine oder mehr Wiederholungen matchen
- `{,N}` matcht bis zu `N` Wiederholungen

### Gruppen

Runde Klammern `()` werden verwendet, um _Gruppen_ und _Captures_ zu kennzeichnen. Die Gruppe kann in manchen Fällen auch _gecaptured_ werden, um sie zur weiteren Verwendung zurückzugeben. In Elixir können diese benannt oder unbenannt sein. Captures werden benannt, indem du `?<name>` nach der öffnenden Klammer anhängst. Gruppen funktionieren als eine Einheit, zum Beispiel wenn ein _Quantor_ folgt.

```elixir
regex = ~r/(h)at/
Regex.replace(regex, "hat", "\\1op")
# => "hop"

regex = ~r/(?<letter_b>b)/
Regex.scan(regex, "blueberry", capture: :all_names)
# => [["b"], ["b"]]
```

### Anker

_Anker_ werden verwendet, um den regulären Ausdruck an den Anfang oder das Ende des Strings zu binden, der gematcht werden soll:

- `^` verankert am Anfang des Strings
- `$` verankert am Ende des Strings

### Interpolation

Da `~r` eine Abkürzung für `"pattern" |> Regex.escape() |> Regex.compile!()` ist, kannst du auch String-Interpolation verwenden, um ein Regex-Muster dynamisch aufzubauen:

```elixir
anchor = "$"
regex = ~r/end of the line#{anchor}/
"end of the line?" =~ regex
# => false
"end of the line" =~ regex
# => true
```
