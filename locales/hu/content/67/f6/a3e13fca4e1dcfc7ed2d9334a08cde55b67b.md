# Bevezetés

## Dokumentáció

Az Elixirben a dokumentáció első osztályú állampolgár.

Két modulattribútumot szokás a kód dokumentálására használni: a `@moduledoc` attribútumot egy modul dokumentálására, és a `@doc` attribútumot az őt követő függvény dokumentálására. A `@moduledoc` attribútum általában a modul első sorában jelenik meg, a `@doc` attribútum pedig rendszerint közvetlenül egy függvénydefiníció előtt áll, vagy a függvény típusspecifikációja előtt, ha van ilyen. A dokumentációt általában többsoros stringben írjuk, heredoc szintaxissal.

Az Elixir dokumentációja [**Markdown**][markdown] formátumban íródik.

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

## Típusspecifikációk

Az Elixir dinamikusan típusos nyelv, ami azt jelenti, hogy nem végez fordítási idejű típusellenőrzéseket. A típusspecifikációk ettől függetlenül használhatók a dokumentáció egy formájaként.

Egy függvényhez a `@spec` modulattribútummal adhatunk típusspecifikációt, közvetlenül a függvénydefiníció előtt. A `@spec` után a függvény neve következik, majd zárójelben a függvény összes argumentumának típusa, vesszővel elválasztva. A visszatérési érték típusát egy kettős kettőspont `::` választja el a függvény argumentumaitól.

```elixir
@spec longer_than?(String.t(), non_neg_integer()) :: boolean()
def longer_than?(string, length), do: String.length(string) > length
```

### Típusok

A leggyakrabban használt típusok:

- Boolean: `boolean()`
- string: `String.t()`
- számok: `integer()`, `non_neg_integer()`, `pos_integer()`, `float()`
- listák: `list()`
- bármilyen típusú érték: `any()`

Néhány típus paraméterezhető is, például a `list(integer)` egész számok listája.

Típusként literálértékek is használhatók.

A típusok unióját a függőleges vonal `|` segítségével írhatjuk le. Például az `integer() | :error` jelentése: vagy egy egész szám, vagy az `:error` atom literál.

Az összes típus teljes listáját a hivatalos dokumentáció [„Typespecs” szakaszában][types] találod.

### Argumentumok elnevezése

A típusspecifikációban az argumentumokat el is nevezhetjük, ami hasznos, ha több azonos típusú argumentumot kell megkülönböztetni. Az argumentum neve, utána egy kettős kettőspont, az argumentum típusa elé kerül.

```elixir
@spec to_hex({hue :: integer, saturation :: integer, lightness :: integer}) :: String.t()
```

### Egyedi típusok

A típusspecifikációk nem korlátozódnak csupán a beépített típusokra. Egyedi típusokat a `@type` modulattribútummal definiálhatunk. Egy egyedi típus definíciója a típus nevével kezdődik, amit egy kettős kettőspont, majd maga a típus követ.

```elixir
@type color :: {hue :: integer, saturation :: integer, lightness :: integer}

@spec to_hex(color()) :: String.t()
```

Egy egyedi típust használhatunk abban a modulban, ahol definiáltuk, vagy egy másik modulból is.

[markdown]: https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax
[types]: https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax
