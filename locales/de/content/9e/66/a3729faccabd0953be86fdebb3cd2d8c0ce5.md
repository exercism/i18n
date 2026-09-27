# Überblick

- Elixir ist dynamisch typisiert.
  - Der Typ einer Variable wird erst zur Laufzeit geprüft.
- Mit dem [`=`][match]-Operator für den Mustervergleich können wir einen Wert beliebigen Typs an einen Variablennamen binden:
  - Variablen können neu gebunden werden.
  - An eine Variable kann ein Wert beliebigen Typs gebunden werden.

## Module

- [Module][modules] sind die Grundlage für die Organisation von Code in Elixir.
  - Ein Modul ist für alle anderen Module sichtbar.
  - Ein Modul wird mit [`defmodule`][defmodule] definiert.

## Benannte Funktionen

- Alle [benannten Funktionen][functions] müssen in einem Modul definiert werden.

  - Benannte Funktionen werden mit [`def`][def] definiert.
  - Eine benannte Funktion kann stattdessen mit [`defp`][defp] privat gemacht werden.
  - Der Wert des letzten Ausdrucks einer Funktion wird _implizit zurückgegeben_.
  - Kurze Funktionen können auch mit einer einzeiligen Syntax geschrieben werden.

  ```elixir
  def increment(n) do
    n + 1
  end

  defp private_increment(n) do
    n + 1
  end

  def short_increment(n), do: n + 1
  ```

- Funktionen werden mit dem vollständigen Namen der Funktion zusammen mit dem Modulnamen aufgerufen.
  - Wird eine Funktion aus ihrem eigenen Modul heraus aufgerufen, kann der Modulname weggelassen werden.
- Wenn von einer benannten Funktion die Rede ist, wird oft ihre Stelligkeit angegeben.

  - Die Stelligkeit bezieht sich auf die Anzahl der Argumente, die sie akzeptiert.

  ```elixir
  # add/3, because the arity is 3
  def add(x, y, z), do: x + y + z
  ```

## Namenskonventionen

Modulnamen sollten `PascalCase` verwenden. Ein Modulname muss mit einem Großbuchstaben `A-Z` beginnen und kann Buchstaben `a-zA-Z`, Zahlen `0-9` und Unterstriche `_` enthalten.

Variablen- und Funktionsnamen sollten `snake_case` verwenden. Ein Variablen- oder Funktionsname muss mit einem Kleinbuchstaben `a-z` oder einem Unterstrich `_` beginnen, kann Buchstaben `a-zA-Z`, Zahlen `0-9` und Unterstriche `_` enthalten und darf mit einem Fragezeichen `?` oder einem Ausrufezeichen `!` enden.

## Ganzzahlen

Ganzzahlwerte werden als ganze Zahlen mit einer oder mehreren Ziffern geschrieben. Du kannst [grundlegende mathematische Operationen][operators] mit ihnen ausführen.

## Strings

[String][string]-Literale sind Zeichenketten, die in doppelte Anführungszeichen gesetzt werden.

```elixir
string = "this is a string! 1, 2, 3!"
```

## Standardbibliothek

- Die Dokumentation ist online unter [hexdocs.pm/elixir][docs] verfügbar.
- Die meisten eingebauten Datentypen haben ein entsprechendes Modul, z. B. `Integer`, `Float`, `String`, `Tuple`, `List`.
- Das Modul `Kernel` ist ein besonderes Modul.
  - Es stellt die grundlegenden Fähigkeiten bereit, auf denen der Rest der Standardbibliothek aufbaut.
  - Es wird automatisch importiert.
  - Seine Funktionen können ohne das Präfix `Kernel.` verwendet werden.

## Codekommentare

Kommentare können verwendet werden, um Notizen für andere Entwickler zu hinterlassen, die den Quellcode lesen. Einzeilige Kommentare werden in Elixir durch `#` eingeleitet.

[match]: https://elixirschool.com/en/lessons/basics/pattern_matching/
[operators]: https://hexdocs.pm/elixir/basic-types.html#basic-arithmetic
[modules]: https://elixirschool.com/en/lessons/basics/modules/#modules
[functions]: https://elixirschool.com/en/lessons/basics/functions/#named-functions
[def]: https://hexdocs.pm/elixir/Kernel.html#def/2
[defp]: https://hexdocs.pm/elixir/Kernel.html#defp/2
[defmodule]: https://hexdocs.pm/elixir/Kernel.html#defmodule/2
[string]: https://hexdocs.pm/elixir/basic-types.html#strings
[docs]: https://hexdocs.pm/elixir/Kernel.html#content
