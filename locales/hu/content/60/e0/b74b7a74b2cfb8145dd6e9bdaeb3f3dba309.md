# Kiegészítés az utasításokhoz

## Kivételüzenetek

Néha szükség van arra, hogy [kivételt dobj](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Ilyenkor mindig adj meg egy **beszédes hibaüzenetet**, amely megmutatja, mi a hiba forrása. Ettől a kódod olvashatóbb lesz, és jelentősen megkönnyíti a hibakeresést. Ha tudod, hogy a hiba forrása egy adott típusú lesz, dönthetsz úgy, hogy a [beépített hibatípusok](https://docs.python.org/3/library/exceptions.html#base-classes) egyikét dobod, de ilyenkor is adj meg beszédes üzenetet.

Ennél a feladatnál a [raise utasítással](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) kell „dobnod” egy `ValueError`-t, ha a `prime()` függvény hibás bemenetet kap. Mivel ez a feladat csak _pozitív_ számokkal foglalkozik, minden 1-nél kisebb szám hibás. A tesztek csak akkor lesznek sikeresek, ha a `raise` utasítással `exception`-t dobsz, és üzenetet is fűzöl hozzá.

Ha üzenettel szeretnél `ValueError`-t dobni, írd le az üzenetet az `exception` típus argumentumaként:

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```
