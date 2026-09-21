# Bevezetés

Az absztrakt szintaxisfa (AST), más néven _quoted expression_, a kód adatként való ábrázolásának egy módja.

Az AST minden csomópontja egy háromelemű tuple.

```elixir
# AST representation of:
# 2 + 3
{:+, [], [2, 3]}
```

Az első elem, egy atom, maga a művelet. A második elem, egy keyword list, a metaadat. A harmadik elem az argumentumok listája, amely további csomópontokat tartalmaz. A literálértékek, például az egész számok, atomok és stringek, önmagukként jelennek meg az AST-ban, nem pedig háromelemű tuple-ként.

## A kód átalakítása AST-vá

Az Elixir-kód AST-vá alakítása és az AST visszaalakítása kóddá a standard könyvtár része. Az AST-okkal való munkához szükséges függvényeket a `Code` (például egy kódot tartalmazó string AST-vá alakításához) és a `Macro` (például az AST bejárásához vagy stringgé alakításához) modulban találod.

Vedd észre, hogy a standard könyvtár összes függvénye a „quoted” nevet használja az AST megjelölésére (a _quoted expression_ rövidítéseként).

A kód AST-vá alakításához használható speciális forma neve `quote`. Egy kódblokkot fogad, és visszaadja annak AST-ját.

```elixir
quote do
  2 + 3 - 1
end

# => {:-, [], [
#      {:+, [], [2, 3]},
#      1
#    ]}
```

## Felhasználási esetek

A kód AST-ként való ábrázolásának képessége az Elixir metaprogramozásának a középpontjában áll. A _makrók_, amelyek olyan Elixir-kód írását teszik lehetővé, amely Elixir-kódot állít elő, AST-kat adnak vissza kimenetként.

Az AST-k másik felhasználási területe a statikus kódelemzés. Ilyen az Exercism saját eszköze, az elemző is, amit talán már ismersz: az a kis bot, ami megjegyzéseket hagy a megoldásaidon.
