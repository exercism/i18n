# Bevezetés

Amikor felsorolható adatszerkezeteken (listákon, bitstringeken, stringeken) rekurzálsz, gyakran két dologra kell figyelni:

- mennyi memória szükséges a rekurzív függvényhívások láncának tárolásához
- hogyan építhető fel hatékonyan a megoldás

Ezek kezelésére használhatunk _akkumulátort_.

Az akkumulátor egy változó, amelyet az adatok mellett adunk át. Arra szolgál, hogy a függvény végrehajtásának aktuális állapotát hívásról hívásra továbbadja, amíg el nem érjük az _alapesetet_. Az alapesetben az akkumulátor segítségével adjuk vissza a rekurzív függvényhívás végső értékét.

Az akkumulátort a függvény írójának kell inicializálnia, nem a függvény felhasználójának. Ehhez deklarálj két függvényt: egy nyilvános függvényt, amely csak a szükséges adatokat veszi át argumentumként, és inicializálja az akkumulátort, valamint egy privát függvényt, amely már az akkumulátort is átveszi. Elixirben gyakori minta, hogy a privát függvény nevét `do_` előtaggal látjuk el.

```elixir
# Count the length of a list without an accumulator
def count([]), do: 0
def count([_head | tail]), do: 1 + count(tail)

# Count the length of a list with an accumulator
def count(list), do: do_count(list, 0)

defp do_count([], count), do: count
defp do_count([_head | tail], count), do: do_count(tail, count + 1)
```

Az akkumulátor használatával a rekurzív függvényeket _farokrekurzív_ függvényekké alakíthatjuk. Egy függvény akkor farokrekurzív, ha az _utolsó_ dolog, amit végrehajt, a saját magára irányuló hívás.

[exercism-recursion]: https://exercism.org/tracks/elixir/concepts/recursion
