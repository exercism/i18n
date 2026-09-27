# Einführung

## Dokumentation

In Elixir ist Dokumentation ein zentraler Bestandteil der Sprache.

Es gibt zwei Modulattribute, mit denen du deinen Code üblicherweise dokumentierst: `@moduledoc` für die Dokumentation eines Moduls und `@doc` für die Dokumentation einer Funktion, die auf das Attribut folgt. Das Attribut `@moduledoc` steht meist in der ersten Zeile des Moduls, und `@doc` steht meist direkt vor einer Funktionsdefinition oder vor der Typspezifikation der Funktion, falls sie eine hat. Die Dokumentation wird üblicherweise in einem mehrzeiligen String mit der Heredoc-Syntax geschrieben.

Elixir-Dokumentation wird in [**Markdown**][markdown] geschrieben.

```elixir
defmodule String do
  @moduledoc """
  Strings in Elixir are UTF-8 encoded binaries.
  """

  @doc """
  Converts all characters in the given string to uppercase according to `mode`.

  ## Examples

      iex> String.upcase("abcd")
      "ABCD"

      iex> String.upcase("olá")
      "OLÁ"
  """
  def upcase(string, mode \\ :default)
end
```

## Typspezifikationen

Elixir ist eine dynamisch typisierte Sprache. Das bedeutet, dass sie keine Typprüfung zur Kompilierzeit bietet. Trotzdem kannst du Typspezifikationen als eine Form der Dokumentation verwenden.

Du kannst einer Funktion eine Typspezifikation hinzufügen, indem du das Modulattribut `@spec` direkt vor die Funktionsdefinition schreibst. Auf `@spec` folgen der Funktionsname und, in runden Klammern, eine durch Kommas getrennte Liste aller Typen seiner Argumente. Der Typ des Rückgabewerts wird mit einem doppelten Doppelpunkt `::` von den Argumenten der Funktion getrennt.

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### Typen

Zu den am häufigsten verwendeten Typen gehören:

- boolesche Werte: `boolean()`
- Strings: `String.t()`
- Zahlen: `integer()`, `non_neg_integer()`, `pos_integer()`, `float()`
- Listen: `list()`
- ein Wert beliebigen Typs: `any()`

Einige Typen können auch parametrisiert werden. `list(integer)` ist zum Beispiel eine Liste von Ganzzahlen.

Auch Literalwerte kannst du als Typen verwenden.

Eine Vereinigung von Typen schreibst du mit dem Pipe-Zeichen `|`. `integer() | :error` bedeutet zum Beispiel entweder eine Ganzzahl oder das Atom-Literal `:error`.

Eine vollständige Liste aller Typen findest du im [Abschnitt „Typespecs" in der offiziellen Dokumentation][types].

### Argumente benennen

Argumente in der Typspezifikation kannst du auch benennen. Das ist nützlich, um mehrere Argumente desselben Typs zu unterscheiden. Der Argumentname steht, gefolgt von einem doppelten Doppelpunkt, vor dem Typ des Arguments.

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### Eigene Typen

Typspezifikationen sind nicht auf die eingebauten Typen beschränkt. Eigene Typen definierst du mit dem Modulattribut `@type`. Eine Definition eines eigenen Typs beginnt mit dem Namen des Typs, gefolgt von einem doppelten Doppelpunkt und dann dem Typ selbst.

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

Einen eigenen Typ kannst du im selben Modul verwenden, in dem er definiert ist, oder in einem anderen Modul.

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
