# Einführung

Protokolle sind ein Mechanismus, um in Elixir Polymorphismus zu erreichen, wenn sich das Verhalten je nach Datentyp unterscheiden soll.

Protokolle werden mit `defprotocol` definiert und enthalten einen oder mehrere Funktionsköpfe.

```elixir
defprotocol Reversible do
  def reverse(term)
end
```

Protokolle können mit `defimpl` implementiert werden.

```elixir
defimpl Reversible, for: List do
  def reverse(term) do
    Enum.reverse(term)
  end
end
```

Ein Protokoll kann für jeden bestehenden Datentyp von Elixir oder für ein Struct implementiert werden.

Wenn eine Protokollfunktion aufgerufen wird, wird anhand des Typs des ersten Arguments automatisch die passende Implementierung ausgewählt.
