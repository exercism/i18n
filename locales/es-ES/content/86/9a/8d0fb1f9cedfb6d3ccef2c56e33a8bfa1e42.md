# Introducción

Los protocolos son un mecanismo para conseguir polimorfismo en Elixir cuando quieres que el comportamiento varíe según el tipo de datos.

Los protocolos se definen con `defprotocol` y contienen una o más cabeceras de función.

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

Un protocolo se puede implementar para cualquier tipo de datos de Elixir que ya exista o para un struct.

Cuando se llama a una función de un protocolo, se elige automáticamente la implementación adecuada en función del tipo del primer argumento.
