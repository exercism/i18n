# A welcome IO.puts-szal végződik

A `welcome/0` függvény ne explicit módon adjon vissza `:ok`-ot, hanem implicit módon azt adja vissza, amit az `IO.puts` visszaad (ami éppen `:ok`).
