# Einführung

Wenn du [rekursiv][exercism-recursion] durch Enumerables (Listen, Bitstrings, Strings) gehst, gibt es oft zwei Dinge zu bedenken:

- wie viel Speicher benötigt wird, um die Kette der rekursiven Funktionsaufrufe zu speichern
- wie du die Lösung effizient aufbaust

Um diese Punkte zu bewältigen, kann ein _Akkumulator_ verwendet werden.

Ein Akkumulator ist eine Variable, die zusätzlich zu den Daten übergeben wird. Er wird verwendet, um den aktuellen Zustand der Ausführung der Funktion von Funktionsaufruf zu Funktionsaufruf weiterzugeben, bis der _Basisfall_ erreicht ist. Im Basisfall wird der Akkumulator verwendet, um den endgültigen Wert des rekursiven Funktionsaufrufs zurückzugeben.

Akkumulatoren sollten vom Autor der Funktion initialisiert werden, nicht vom Nutzer der Funktion. Um das zu erreichen, deklarierst du zwei Funktionen: eine öffentliche Funktion, die nur die notwendigen Daten als Argumente entgegennimmt und den Akkumulator initialisiert, und eine private Funktion, die zusätzlich einen Akkumulator entgegennimmt. In Elixir ist es ein übliches Muster, dem Namen der privaten Funktion `do_` voranzustellen.

```elixir
# Count the length of a list without an accumulator
def count([]), do: 0
def count([_head | tail]), do: 1 + count(tail)

# Count the length of a list with an accumulator
def count(list), do: do_count(list, 0)

defp do_count([], count), do: count
defp do_count([_head | tail], count), do: do_count(tail, count + 1)
```

Die Verwendung eines Akkumulators erlaubt es uns, rekursive Funktionen in _endrekursive_ Funktionen umzuwandeln. Eine Funktion ist endrekursiv, wenn das _Letzte_, was die Funktion ausführt, ein Aufruf ihrer selbst ist.

[exercism-recursion]: https://exercism.org/tracks/elixir/concepts/recursion
