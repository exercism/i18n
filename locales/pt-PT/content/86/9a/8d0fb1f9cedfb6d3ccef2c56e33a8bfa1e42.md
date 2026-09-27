# Introdução

Os protocolos são um mecanismo para alcançar polimorfismo em Elixir quando queres que o comportamento varie consoante o tipo de dados.

Os protocolos são definidos com `defprotocol` e contêm um ou mais cabeçalhos de funções.

```elixir
defprotocol Reversible do
  def reverse(term)
end
```

Os protocolos podem ser implementados com `defimpl`.

```elixir
defimpl Reversible, for: List do
  def reverse(term) do
    Enum.reverse(term)
  end
end
```

Um protocolo pode ser implementado para qualquer tipo de dados existente em Elixir ou para uma struct.

Quando uma função de protocolo é invocada, a implementação adequada é automaticamente escolhida com base no tipo do primeiro argumento.
