# Einführung

## Verwendung

Das `use`-Makro ermöglicht es uns, unser Modul schnell um Funktionalität zu erweitern, die ein anderes Modul bereitstellt. Wenn wir ein Modul mit `use` einbinden, kann dieses Modul Code in unser Modul einfügen - es kann zum Beispiel Funktionen definieren, andere Module mit `import` oder `alias` einbinden oder Modulattribute setzen.

Wenn du jemals einen Blick in die Testdateien einiger Elixir-Übungen hier auf Exercism geworfen hast, ist dir wahrscheinlich aufgefallen, dass sie alle mit `use ExUnit.Case` beginnen. Diese einzige Codezeile macht die Makros `test` und `assert` im Testmodul verfügbar.

```elixir
defmodule LasagnaTest do
  use ExUnit.Case

  test "expected minutes in oven" do
    assert Lasagna.expected_minutes_in_oven() === 40
  end
end
```

### `__using__/1`-Makro

Was genau passiert, wenn du ein Modul mit `use` einbindest, bestimmt das `__using__/1`-Makro dieses Moduls. Es nimmt ein Argument entgegen, eine Keyword-Liste mit Optionen, und gibt einen [quotierten Ausdruck][concept-ast] zurück. Der Code in diesem quotierten Ausdruck wird in unser Modul eingefügt, wenn wir `use` aufrufen.

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

Die Optionen können beim Aufruf von `use` als zweites Argument angegeben werden, z. B. `use ExUnit.Case, async: true`. Werden sie nicht explizit angegeben, ist ihr Standardwert eine leere Liste.

## Behaviours

Behaviours ermöglichen es uns, Schnittstellen (Mengen von Funktionen und Makros) in einem _Behaviour-Modul_ zu definieren, die später von verschiedenen _Callback-Modulen_ implementiert werden können. Dank der gemeinsamen Schnittstelle können diese Callback-Module austauschbar verwendet werden.

~~~~exercism/note
Beachte die britische Schreibweise von „behaviours“.
~~~~

### Behaviours definieren

Um ein Behaviour zu definieren, müssen wir ein neues Modul erstellen und eine Liste von Funktionen angeben, die Teil der gewünschten Schnittstelle sind. Jede Funktion muss mit dem Modulattribut `@callback` definiert werden. Die Syntax ist identisch mit einer [Funktionstypspezifikation][concept-typespecs] (`@spec`). Wir müssen einen Funktionsnamen, eine Liste von Argumenttypen und alle möglichen Rückgabetypen angeben.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer
end
```

### Behaviours implementieren

Um ein vorhandenes Behaviour zu unserem Modul hinzuzufügen (ein Callback-Modul zu erstellen), verwenden wir das Modulattribut `@behaviour`. Sein Wert sollte der Name des Behaviour-Moduls sein, das wir hinzufügen.

Dann müssen wir alle Funktionen (Callbacks) definieren, die von diesem Behaviour-Modul benötigt werden. Wenn wir das Behaviour von jemand anderem implementieren, wie die eingebauten Behaviours `Access` oder `GenServer` von Elixir, finden wir die Liste aller Callbacks des Behaviours in der Dokumentation auf [hexdocs.pm][hexdocs].

Ein Callback-Modul ist nicht darauf beschränkt, nur die Funktionen zu implementieren, die Teil seines Behaviours sind. Es ist auch möglich, dass ein einzelnes Modul mehrere Behaviours implementiert.

Um zu kennzeichnen, welche Funktion von welchem Behaviour stammt, sollten wir vor jeder Funktion das Modulattribut `@impl` verwenden. Sein Wert sollte der Name des Behaviour-Moduls sein, das diesen Callback definiert.

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

### Standardimplementierungen für Callbacks

Beim Definieren eines Behaviours ist es möglich, eine Standardimplementierung eines Callbacks bereitzustellen. Diese Implementierung sollte im quotierten Ausdruck des `__using__/1`-Makros definiert werden. Damit Nutzer des Behaviour-Moduls die Standardimplementierung überschreiben können, rufe das Makro `defoverridable/1` nach der Funktionsimplementierung auf. Es akzeptiert eine Keyword-Liste mit Funktionsnamen als Schlüssel und Funktionsaritäten als Werte.

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

Beachte, dass das Definieren von Funktionen innerhalb von `__using__/1` für jeden anderen Zweck als das Definieren von Standard-Callback-Implementierungen nicht empfohlen wird, aber du kannst Funktionen jederzeit in einem anderen Modul definieren und sie im `__using__/1`-Makro importieren.

[concept-ast]: https://exercism.org/tracks/elixir/concepts/ast
[concept-typespecs]: https://exercism.org/tracks/elixir/concepts/typespecs
[hexdocs]: https://hexdocs.pm
