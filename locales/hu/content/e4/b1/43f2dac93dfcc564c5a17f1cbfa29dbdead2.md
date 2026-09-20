# Utasítások

Számold meg a megszerzett pontokat egy Go-táblán.

A Go játékában (amely baduk, igo, cờ vây és wéiqí néven is ismert) pontokat úgy szerezhetsz, hogy a köveiddel teljesen körbeveszel üres metszéspontokat.
Egy játékos körbevett metszéspontjait a területének nevezzük.

Számítsd ki minden játékos területét.
Felteheted, hogy az ellenséges területen rekedt kövek már lekerültek a tábláról.

Határozd meg azt a területet, amely tartalmaz egy megadott koordinátát.

Egyszerre több üres metszéspont is körbevehető, és a körbevételnél csak a vízszintes és függőleges szomszédok számítanak.
A következő ábrán a számító kövek „O” jelölést kaptak, a nem számítók pedig „I” jelölést (figyelmen kívül hagyott).
Az üres helyek az üres metszéspontokat jelentik.

```text
+----+
|IOOI|
|O  O|
|O OI|
|IOI |
+----+
```

Pontosabban: egy üres metszéspont akkor része egy játékos területének, ha az összes szomszédja vagy az adott játékos köve, vagy olyan üres metszéspont, amely az adott játékos területének része.

További információért nézd meg a [Wikipédiát][go-wikipedia] vagy a [Sensei's Library][go-sensei] oldalt.

[go-wikipedia]: https://en.wikipedia.org/wiki/Go_%28game%29
[go-sensei]: https://senseis.xmp.net/
