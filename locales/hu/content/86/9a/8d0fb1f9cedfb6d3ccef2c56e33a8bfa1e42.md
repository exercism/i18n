# Bevezetés

A protokollok olyan mechanizmust jelentenek Elixirben, amellyel polimorfizmust érhetsz el, amikor azt szeretnéd, hogy a viselkedés az adattípustól függően változzon.

A protokollokat a `defprotocol` kulcsszóval definiálod, és egy vagy több függvényfejlécet tartalmaznak.

```elixir
defprotocol Reversible do
  def reverse(term)
end
```

A protokollokat a `defimpl` kulcsszóval implementálhatod.

```elixir
defimpl Reversible, for: List do
  def reverse(term) do
    Enum.reverse(term)
  end
end
```

Egy protokollt bármely létező Elixir-adattípusra implementálhatsz, vagy egy structra is.

Amikor egy protokollfüggvényt meghívsz, a megfelelő implementáció automatikusan kiválasztódik az első argumentum típusa alapján.
