# Introduzione

## Documentazione

In Elixir, la documentazione è un cittadino di prima classe.

Ci sono due attributi di modulo che si usano comunemente per documentare il codice: `@moduledoc` per documentare un modulo e `@doc` per documentare una funzione che segue l'attributo. L'attributo `@moduledoc` di solito compare sulla prima riga del modulo, mentre l'attributo `@doc` di solito compare subito prima della definizione di una funzione, o della specifica di tipo della funzione se ne ha una. La documentazione è comunemente scritta in una stringa multilinea usando la sintassi heredoc.

La documentazione di Elixir si scrive in [**Markdown**][markdown].

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

## Specifiche di tipo

Elixir è un linguaggio tipizzato dinamicamente, il che significa che non fornisce controlli di tipo in fase di compilazione. Le specifiche di tipo, però, si possono comunque usare come forma di documentazione.

Una specifica di tipo può essere aggiunta a una funzione usando l'attributo di modulo `@spec` subito prima della definizione della funzione. Dopo `@spec` vengono il nome della funzione e un elenco dei tipi di tutti i suoi argomenti, tra parentesi tonde e separati da virgole. Il tipo del valore restituito è separato dagli argomenti della funzione con un doppio due punti `::`.

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### Tipi

I tipi usati più comunemente sono:

- booleani: `boolean()`
- stringhe: `String.t()`
- numeri: `integer()`, `non_neg_integer()`, `pos_integer()`, `float()`
- array: `list()`
- un valore di qualsiasi tipo: `any()`

Alcuni tipi possono anche essere parametrizzati: ad esempio, `list(integer)` è un array di interi.

Anche i valori letterali possono essere usati come tipi.

Un'unione di tipi si può scrivere usando la barra verticale `|`. Ad esempio, `integer() | :error` significa un intero oppure l'atomo letterale `:error`.

Un elenco completo di tutti i tipi si trova nella [sezione "Typespecs" della documentazione ufficiale][types].

### Dare un nome agli argomenti

Anche agli argomenti di una specifica di tipo si può dare un nome, il che è utile per distinguere più argomenti dello stesso tipo. Il nome dell'argomento, seguito da un doppio due punti, va prima del tipo dell'argomento.

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### Tipi personalizzati

Le specifiche di tipo non si limitano ai tipi predefiniti. I tipi personalizzati si possono definire usando l'attributo di modulo `@type`. La definizione di un tipo personalizzato inizia con il nome del tipo, seguito da un doppio due punti e poi dal tipo stesso.

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

Un tipo personalizzato può essere usato dallo stesso modulo in cui è definito, oppure da un altro modulo.

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
