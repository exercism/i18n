# Bemutatás

- Az Elixir dinamikusan típusos.
  - Egy változó típusa csak futásidőben derül ki.
- A [`=`][match] illesztő operátorral bármilyen típusú értéket hozzáköthetünk egy változónévhez:
  - A változók újra hozzáköthetők.
  - Egy változóhoz bármilyen típusú érték köthető.

## Modulok

- A [modulok][modules] képezik az Elixirbeli kódszervezés alapját.
  - Egy modul minden más modul számára látható.
  - Egy modult a [`defmodule`][defmodule] kulcsszóval definiálunk.

## Nevesített függvények

- Minden [nevesített függvényt][functions] egy modulban kell definiálni.

  - A nevesített függvényeket a [`def`][def] kulcsszóval definiáljuk.
  - Egy nevesített függvényt priváttá tehetünk, ha helyette a [`defp`][defp] kulcsszót használjuk.
  - Egy függvény utolsó kifejezésének értéke _implicit módon visszaadódik_.
  - A rövid függvények egysoros szintaxissal is megírhatók.

  ```elixir
  def increment(n) do
    n + 1
  end

  defp private_increment(n) do
    n + 1
  end

  def short_increment(n), do: n + 1
  ```

- A függvényeket a függvény teljes nevével, a modul nevével együtt hívjuk meg.
  - Ha a saját moduljából hívjuk meg, a modul neve elhagyható.
- Egy nevesített függvényre gyakran az aritásával hivatkozunk.

  - Az aritás a függvény által elfogadott argumentumok számát jelenti.

  ```elixir
  # add/3, because the arity is 3
  def add(x, y, z), do: x + y + z
  ```

## Elnevezési konvenciók

A modulnevek `PascalCase` írásmódot használjanak. A modulnévnek egy nagybetűvel kell kezdődnie `A-Z`, és tartalmazhat betűket `a-zA-Z`, számjegyeket `0-9` és aláhúzásokat `_`.

A változó- és függvénynevek `snake_case` írásmódot használjanak. A változó- vagy függvénynévnek egy kisbetűvel `a-z` vagy aláhúzással `_` kell kezdődnie, tartalmazhat betűket `a-zA-Z`, számjegyeket `0-9` és aláhúzásokat `_`, és végződhet kérdőjellel `?` vagy felkiáltójellel `!`.

## Egész számok

Az egész számok egy vagy több számjeggyel leírt egész értékek. [Alapvető matematikai műveleteket][operators] végezhetsz velük.

## Stringek

A [string][string] literálok kettős idézőjelek közé zárt karakterekből álló sorozatok.

```elixir
string = "this is a string! 1, 2, 3!"
```

## Standard könyvtár

- A dokumentáció online elérhető a [hexdocs.pm/elixir][docs] oldalon.
- A legtöbb beépített adattípushoz tartozik egy megfelelő modul, például `Integer`, `Float`, `String`, `Tuple`, `List`.
- A `Kernel` modul egy különleges modul.
  - Azokat az alapvető képességeket biztosítja, amelyekre a standard könyvtár többi része épül.
  - Automatikusan importálódik.
  - A függvényei a `Kernel.` előtag nélkül is használhatók.

## Kódkommentek

A kommentekkel megjegyzéseket hagyhatsz azoknak a fejlesztőknek, akik olvassák a forráskódot. Az egysoros kommenteket az Elixirben `#` előzi meg.

[match]: https://elixirschool.com/en/lessons/basics/pattern_matching/
[operators]: https://hexdocs.pm/elixir/basic-types.html#basic-arithmetic
[modules]: https://elixirschool.com/en/lessons/basics/modules/#modules
[functions]: https://elixirschool.com/en/lessons/basics/functions/#named-functions
[def]: https://hexdocs.pm/elixir/Kernel.html#def/2
[defp]: https://hexdocs.pm/elixir/Kernel.html#defp/2
[defmodule]: https://hexdocs.pm/elixir/Kernel.html#defmodule/2
[string]: https://hexdocs.pm/elixir/basic-types.html#strings
[docs]: https://hexdocs.pm/elixir/Kernel.html#content
