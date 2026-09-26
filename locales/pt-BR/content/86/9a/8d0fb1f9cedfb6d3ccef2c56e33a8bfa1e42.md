# Introdução

Protocolos são um mecanismo para alcançar polimorfismo em Elixir quando você quer que o comportamento varie de acordo com o tipo de dados.

Os protocolos são definidos com `defprotocol` e contêm um ou mais cabeçalhos de função.

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

Um protocolo pode ser implementado para qualquer tipo de dados existente do Elixir ou para uma struct.

Quando uma função de protocolo é invocada, a implementação adequada é escolhida automaticamente com base no tipo do primeiro argumento.
