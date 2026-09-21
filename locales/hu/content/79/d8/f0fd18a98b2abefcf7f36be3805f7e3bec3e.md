# Bevezetés

## A `use` használata

A `use` makróval gyorsan kiterjeszthetjük a modulunkat egy másik modul által nyújtott funkciókkal. Amikor `use`-olunk egy modult, az a modul kódot szúrhat be a modulunkba: például definiálhat függvényeket, `import`-álhat vagy `alias`-olhat más modulokat, illetve beállíthat modulattribútumokat.

Ha valaha is megnézted néhány itteni Elixir-feladat tesztfájlját az Exercismen, valószínűleg feltűnt, hogy mindegyik `use ExUnit.Case` sorral kezdődik. Ez az egyetlen kódsor teszi elérhetővé a `test` és `assert` makrókat a tesztmodulban.

```elixir
defmodule LasagnaTest do
  use ExUnit.Case

  test "expected minutes in oven" do
    assert Lasagna.expected_minutes_in_oven() === 40
  end
end
```

### A `__using__/1` makró

Az, hogy pontosan mi történik, amikor `use`-olsz egy modult, annak a modulnak a `__using__/1` makrójától függ. Ez egy argumentumot fogad, egy kulcsszólistát a beállításokkal, és egy [quoted kifejezést][concept-ast] ad vissza. A quoted kifejezésben lévő kód a `use` hívásakor bekerül a modulunkba.

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

A beállítások második argumentumként adhatók meg a `use` hívásakor, például `use ExUnit.Case, async: true`. Ha nem adjuk meg őket kifejezetten, az alapértelmezett értékük egy üres lista.

## Behaviours

A behaviour segítségével interfészeket (függvények és makrók halmazát) definiálhatunk egy _behaviour modulban_, amelyeket később különböző _callback modulok_ valósíthatnak meg. A közös interfésznek köszönhetően ezek a callback modulok felcserélhetően használhatók.

~~~~exercism/note
Figyeld meg a „behaviours” brit helyesírását.
~~~~

### Behaviour definiálása

Ahhoz, hogy definiáljunk egy behaviourt, létre kell hoznunk egy új modult, és meg kell adnunk a kívánt interfészhez tartozó függvények listáját. Minden függvényt a `@callback` modulattribútummal kell definiálni. A szintaxis megegyezik egy [függvény typespec][concept-typespecs] (`@spec`) szintaxisával. Meg kell adnunk a függvény nevét, az argumentumtípusok listáját és az összes lehetséges visszatérési típust.

```elixir
defmodule Countable do
  @callback count(collection :: any) :: pos_integer
end
```

### Behaviour megvalósítása

Ahhoz, hogy egy már meglévő behaviourt adjunk a modulunkhoz (azaz létrehozzunk egy callback modult), a `@behaviour` modulattribútumot használjuk. Az értéke annak a behaviour modulnak a neve legyen, amelyet hozzáadunk.

Ezután definiálnunk kell minden függvényt (callbacket), amelyet az adott behaviour modul megkövetel. Ha valaki más behaviourjét valósítjuk meg, például az Elixir beépített `Access` vagy `GenServer` behaviourjét, akkor a behaviour összes callbackjének listáját a [hexdocs.pm][hexdocs] dokumentációjában találjuk.

Egy callback modul nem korlátozódik arra, hogy csak a behaviourje részét képező függvényeket valósítsa meg. Egyetlen modul több behaviourt is megvalósíthat.

Hogy jelezzük, melyik függvény melyik behaviourből származik, minden függvény elé tegyük oda a `@impl` modulattribútumot. Az értéke annak a behaviour modulnak a neve legyen, amely ezt a callbacket definiálja.

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

### Alapértelmezett callback-megvalósítások

Amikor behaviourt definiálunk, lehetőség van arra, hogy egy callbackhez alapértelmezett megvalósítást adjunk. Ezt a megvalósítást a `__using__/1` makró quoted kifejezésében kell definiálni. Hogy a behaviour modul használói felülírhassák az alapértelmezett megvalósítást, a függvény megvalósítása után hívd meg a `defoverridable/1` makrót. Ez egy kulcsszólistát fogad, amelyben a kulcsok a függvénynevek, az értékek pedig a függvények aritásai.

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

Vedd figyelembe, hogy a `__using__/1`-en belül nem tanácsos függvényeket definiálni az alapértelmezett callback-megvalósításokon kívül más célra, de a függvényeket mindig definiálhatod egy másik modulban, és importálhatod őket a `__using__/1` makróban.

[concept-ast]: https://exercism.org/tracks/elixir/concepts/ast
[concept-typespecs]: https://exercism.org/tracks/elixir/concepts/typespecs
[hexdocs]: https://hexdocs.pm
