# Kiegészítés az utasításokhoz

## Kivételüzenetek

Néha kivételt kell dobnod. Ilyenkor mindig adj meg egy **beszédes hibaüzenetet**, hogy jelezd, mi a hiba forrása. Ettől olvashatóbb lesz a kódod, és ez jelentősen segít a hibakeresésben. Ha olyan helyzettel találkozol, amikor tudod, hogy a hiba forrása egy bizonyos típusú lesz, dönthetsz úgy, hogy a [beépített hibatípusok](https://docs.python.org/3/library/exceptions.html#base-classes) egyikét dobod, de ilyenkor is adj meg beszédes üzenetet.

Ennél a feladatnál a [raise utasítással](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) kell „dobnod” egy `ValueError`-t, ha a négyzet bemenete a megengedett tartományon kívül esik. A tesztek csak akkor futnak át, ha `raise`-elsz egy `exception`-t, és üzenetet is fűzöl hozzá.

Ha üzenettel együtt szeretnél `ValueError`-t dobni, írd az üzenetet a `exception` típus argumentumaként:

```python
# when the square value is not in the acceptable range        
raise ValueError("square must be between 1 and 64")
```
