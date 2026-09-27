# Introduzione

## Use

La macro `use` ci permette di estendere rapidamente il nostro modulo con funzionalità fornite da un altro modulo. Quando usiamo `use` su un modulo, quel modulo può iniettare codice nel nostro: può ad esempio definire funzioni, fare `import` o `alias` di altri moduli, oppure impostare attributi di modulo.

Se hai mai dato un'occhiata ai file di test di alcuni esercizi di Elixir qui su Exercism, avrai probabilmente notato che iniziano tutti con `use ExUnit.Case`. Questa singola riga di codice è ciò che rende disponibili le macro `test` e `assert` nel modulo di test.

```elixir
defmodule LasagnaTest do
  use ExUnit.Case

  test "expected minutes in oven" do
    assert Lasagna.expected_minutes_in_oven() === 40
  end
end
```

### La macro `__using__/1`

Cosa succede esattamente quando usi `use` su un modulo è stabilito dalla macro `__using__/1` di quel modulo. Prende un argomento, una lista di parole chiave con le opzioni, e restituisce un'[espressione quotata][concept-ast]. Il codice di questa espressione quotata viene inserito nel nostro modulo quando chiamiamo `use`.

```elixir
defmodule ExUnit.Case do
  defmacro __using__(opts) do
    # some real-life ExUnit code omitted here
    quote do
      import ExUnit.Assertions
      import ExUnit.Case, only: [describe: 2, test: 1, test: 2, test: 3]
    end
  end
end
```

Le opzioni possono essere passate come secondo argomento quando si chiama `use`, ad esempio `use ExUnit.Case, async: true`. Quando non vengono indicate esplicitamente, il loro valore predefinito è una lista vuota.

## Behaviours

I behaviour ci permettono di definire interfacce (insiemi di funzioni e macro) in un _modulo behaviour_ che possono poi essere implementate da diversi _moduli callback_. Grazie all'interfaccia condivisa, quei moduli callback possono essere usati in modo intercambiabile.

~~~~exercism/note
Nota la grafia britannica di «behaviours».
~~~~

### Definire un behaviour

Per definire un behaviour, dobbiamo creare un nuovo modulo e specificare una lista di funzioni che fanno parte dell'interfaccia desiderata. Ogni funzione deve essere definita usando l'attributo di modulo `@callback`. La sintassi è identica a quella di una [typespec di funzione][concept-typespecs] (`@spec`). Dobbiamo specificare un nome di funzione, una lista di tipi di argomento e tutti i possibili tipi restituiti.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer
end
```

### Implementare un behaviour

Per aggiungere un behaviour esistente al nostro modulo (creare un modulo callback) usiamo l'attributo di modulo `@behaviour`. Il suo valore deve essere il nome del modulo behaviour che stiamo aggiungendo.

Poi dobbiamo definire tutte le funzioni (i callback) richieste da quel modulo behaviour. Se stiamo implementando il behaviour di qualcun altro, come i behaviour integrati di Elixir `Access` o `GenServer`, troviamo l'elenco di tutti i callback del behaviour nella documentazione su [hexdocs.pm][hexdocs].

Un modulo callback non è limitato a implementare solo le funzioni che fanno parte del suo behaviour. È anche possibile che un singolo modulo implementi più behaviour.

Per indicare da quale behaviour proviene ogni funzione, dobbiamo usare l'attributo di modulo `@impl` prima di ogni funzione. Il suo valore deve essere il nome del modulo behaviour che definisce questo callback.

```elixir
defmodule BookCollection do
  @behaviour Countable

  defstruct [:list, :owner]

  @impl Countable
  def count(collection) do
    Enum.count(collection.list)
  end

  def mark_as_read(collection, book) do
    # other function unrelated to the Countable behaviour
  end
end
```

### Implementazioni predefinite dei callback

Quando definiamo un behaviour, è possibile fornire un'implementazione predefinita di un callback. Questa implementazione va definita nell'espressione quotata della macro `__using__/1`. Per permettere a chi usa il modulo behaviour di sovrascrivere l'implementazione predefinita, chiama la macro `defoverridable/1` dopo l'implementazione della funzione. Accetta una lista di parole chiave con i nomi delle funzioni come chiavi e le arità delle funzioni come valori.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer

  defmacro __using__(_) do
    quote do
      @behaviour Countable
      def count(collection), do: Enum.count(collection)
      defoverridable count: 1
    end
  end
end
```

Tieni presente che definire funzioni dentro `__using__/1` è sconsigliato per qualsiasi scopo diverso dalla definizione di implementazioni predefinite dei callback, ma puoi sempre definire funzioni in un altro modulo e importarle nella macro `__using__/1`.

[concept-ast]: https://exercism.org/tracks/elixir/concepts/ast
[concept-typespecs]: https://exercism.org/tracks/elixir/concepts/typespecs
[hexdocs]: https://hexdocs.pm
