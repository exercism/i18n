# Introducción

Los protocolos son un mecanismo para lograr polimorfismo en Elixir cuando quieres que el comportamiento varíe según el tipo de dato.

Los protocolos se definen con `defprotocol` y contienen uno o más encabezados de función.

```elixir
defprotocol Reversible do
  def reverse(term)
end
```

Los protocolos se pueden implementar con `defimpl`.

```elixir
defimpl Reversible, for: List do
  def reverse(term) do
    Enum.reverse(term)
  end
end
```

Un protocolo se puede implementar para cualquier tipo de dato existente de Elixir o para un struct.

Cuando se invoca una función de un protocolo, la implementación correspondiente se elige automáticamente según el tipo del primer argumento.
