# Introduction

Les protocoles sont un mécanisme qui permet d'obtenir du polymorphisme en Elixir lorsqu'on veut que le comportement varie selon le type de données.

Les protocoles se définissent avec `defprotocol` et contiennent un ou plusieurs en-têtes de fonction.

```elixir
defprotocol Reversible do
  def reverse(term)
end
```

On peut implémenter les protocoles avec `defimpl`.

```elixir
defimpl Reversible, for: List do
  def reverse(term) do
    Enum.reverse(term)
  end
end
```

On peut implémenter un protocole pour n'importe quel type de données existant en Elixir, ou pour un _struct_.

Quand on appelle une fonction de protocole, l'implémentation appropriée est automatiquement choisie en fonction du type du premier argument.
