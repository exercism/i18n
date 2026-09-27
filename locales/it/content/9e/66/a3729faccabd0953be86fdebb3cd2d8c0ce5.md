# Informazioni

- Elixir è un linguaggio a tipizzazione dinamica.
  - Il tipo di una variabile viene controllato solo a runtime.
- Usando l'operatore di corrispondenza [`=`][match], possiamo associare a un nome di variabile un valore di qualsiasi tipo:
  - È possibile riassociare le variabili.
  - A una variabile può essere associato un valore di qualsiasi tipo.

## Moduli

- [I moduli][modules] sono la base dell'organizzazione del codice in Elixir.
  - Un modulo è visibile a tutti gli altri moduli.
  - Un modulo si definisce con [`defmodule`][defmodule].

## Funzioni con nome

- Tutte le [funzioni con nome][functions] devono essere definite in un modulo.

  - Le funzioni con nome si definiscono con [`def`][def].
  - Una funzione con nome può essere resa privata usando [`defp`][defp].
  - Il valore dell'ultima espressione di una funzione viene _restituito implicitamente_.
  - Le funzioni brevi si possono anche scrivere con una sintassi su una sola riga.

  ```elixir
  def increment(n) do
    n + 1
  end

  defp private_increment(n) do
    n + 1
  end

  def short_increment(n), do: n + 1
  ```

- Le funzioni si chiamano usando il nome completo della funzione insieme al nome del modulo.
  - Se viene chiamata dall'interno del suo stesso modulo, il nome del modulo si può omettere.
- L'arietà di una funzione si usa spesso quando ci si riferisce a una funzione con nome.

  - L'arietà indica il numero di argomenti che accetta.

  ```elixir
  # add/3, because the arity is 3
  def add(x, y, z), do: x + y + z
  ```

## Convenzioni di denominazione

I nomi dei moduli dovrebbero usare `PascalCase`. Il nome di un modulo deve iniziare con una lettera maiuscola `A-Z` e può contenere lettere `a-zA-Z`, numeri `0-9` e underscore `_`.

I nomi delle variabili e delle funzioni dovrebbero usare `snake_case`. Il nome di una variabile o di una funzione deve iniziare con una lettera minuscola `a-z` o un underscore `_`, può contenere lettere `a-zA-Z`, numeri `0-9` e underscore `_`, e può terminare con un punto interrogativo `?` o un punto esclamativo `!`.

## Interi

I valori interi sono numeri interi scritti con una o più cifre. Su di essi puoi eseguire [operazioni matematiche di base][operators].

## Stringhe

I letterali [stringa][string] sono sequenze di caratteri racchiuse tra virgolette doppie.

```elixir
string = "this is a string! 1, 2, 3!"
```

## Libreria standard

- La documentazione è disponibile online su [hexdocs.pm/elixir][docs].
- La maggior parte dei tipi di dati integrati ha un modulo corrispondente, ad esempio `Integer`, `Float`, `String`, `Tuple`, `List`.
- Il modulo `Kernel` è un modulo speciale.
  - Fornisce le capacità di base su cui è costruito il resto della libreria standard.
  - Viene importato automaticamente.
  - Le sue funzioni possono essere usate senza il prefisso `Kernel.`.

## Commenti nel codice

I commenti possono essere usati per lasciare note agli altri sviluppatori che leggono il codice sorgente. I commenti su una sola riga in Elixir sono preceduti da `#`.

[match]: https://elixirschool.com/en/lessons/basics/pattern_matching/
[operators]: https://hexdocs.pm/elixir/basic-types.html#basic-arithmetic
[modules]: https://elixirschool.com/en/lessons/basics/modules/#modules
[functions]: https://elixirschool.com/en/lessons/basics/functions/#named-functions
[def]: https://hexdocs.pm/elixir/Kernel.html#def/2
[defp]: https://hexdocs.pm/elixir/Kernel.html#defp/2
[defmodule]: https://hexdocs.pm/elixir/Kernel.html#defmodule/2
[string]: https://hexdocs.pm/elixir/basic-types.html#strings
[docs]: https://hexdocs.pm/elixir/Kernel.html#content
