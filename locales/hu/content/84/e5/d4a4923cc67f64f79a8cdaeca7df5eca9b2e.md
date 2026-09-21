# Az utasítások kiegészítése

## A DSL leírása

Ebben a DSL-ben egy gráf egy `Graph` típusú objektum. Ez egy vagy több tuple-t tartalmazó `list`-et vár, amelyek a következőket írják le:

+ attribútumok
+ `Nodes`
+ `Edges`

A `Node` és az `Edge` implementációját a `dot_dsl.py` tartalmazza.

A DSL várt felépítéséről, valamint a várt hibatípusokról és hibaüzenetekről a `dot_dsl_test.py` tesztesetei adnak részletes felvilágosítást.


## Kivételüzenetek

Néha szükség van arra, hogy [kivételt dobj](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Amikor ezt teszed, mindig adj meg egy **beszédes hibaüzenetet**, amely megmutatja, mi a hiba forrása. Ettől a kódod olvashatóbb lesz, és a hibakeresést is jelentősen megkönnyíti. Ha tudod, hogy a hiba forrása egy adott típusú, választhatsz a [beépített hibatípusok](https://docs.python.org/3/library/exceptions.html#base-classes) közül, de ilyenkor is adj meg beszédes üzenetet.

Ez a feladat megköveteli, hogy a [raise utasítás](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) használatával „dobj” `TypeError`-t, ha egy `Graph` hibás, és `ValueError`-t, ha egy `Edge`, `Node` vagy `attribute` hibás. A tesztek csak akkor lesznek sikeresek, ha `raise`-eled a `exception`-t, és üzenetet is fűzöl hozzá.

Ha üzenettel szeretnél hibát dobni, írd az üzenetet a `exception` típus argumentumaként:

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
