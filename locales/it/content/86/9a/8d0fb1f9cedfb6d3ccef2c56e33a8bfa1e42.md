# Introduzione

I protocolli sono un meccanismo per ottenere il polimorfismo in Elixir quando vuoi che il comportamento vari a seconda del tipo di dato.

I protocolli si definiscono usando `defprotocol` e contengono una o più intestazioni di funzione.

```elixir
defprotocol Reversible do
  def reverse(term)
end
```

I protocolli si possono implementare usando `defimpl`.

```elixir
defimpl Reversible, for: List do
  def reverse(term) do
    Enum.reverse(term)
  end
end
```

Un protocollo può essere implementato per qualsiasi tipo di dato esistente in Elixir o per una struct.

Quando si chiama una funzione di un protocollo, l'implementazione appropriata viene scelta automaticamente in base al tipo del primo argomento.
