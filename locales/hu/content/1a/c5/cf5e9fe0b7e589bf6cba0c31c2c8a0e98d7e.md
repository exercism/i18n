# Utasítások

Ha Raspberry Pi segítségével szeretnél valamit építeni, valószínűleg _ellenállásokat_ fogsz használni.
Ehhez a feladathoz csak három dolgot kell tudnod róluk:

- Minden ellenállásnak van egy ellenállásértéke.
- Az ellenállások kicsik, olyannyira, hogy ha rájuk nyomtatnák az ellenállásértéküket, nehéz lenne leolvasni.
  Hogy ezt a problémát megkerüljék, a gyártók színkódolt sávokat nyomtatnak az ellenállásokra, amelyek jelzik az ellenállásértéküket.
- Minden sáv egy szám egyik számjegyeként viselkedik.
  Ha például egy brown sávot (értéke 1) nyomtatnának ki, majd utána egy green sávot (értéke 5), az a 15-ös számot jelentené.
  Ebben a feladatban egy hasznos programot készítesz, hogy ne kelljen megjegyezned a sávok értékeit.
  A program bemenetként 3 színt kap, és kiadja a helyes értéket ohmban.
  A színsávok kódolása a következő:

- black: 0
- brown: 1
- red: 2
- orange: 3
- yellow: 4
- green: 5
- blue: 6
- violet: 7
- grey: 8
- white: 9

Az Ellenállás színkód duó feladatban az első két színt fejtetted meg.
Például az orange-orange a `33` főértéket adta.
A harmadik szín azt jelöli, hány nullát kell a főértékhez fűzni.
A főérték a nullákkal együtt adja meg az ohmban kifejezett értéket.
A feladat szempontjából nem számít, hogy mi is az az ohm valójában.
Például:

- az orange-orange-black 33 lenne, nulla nélkül, ami 33 ohms.
- az orange-orange-red 33 lenne 2 nullával, ami 3300 ohms.
- az orange-orange-orange 33 lenne 3 nullával, ami 33000 ohms.

(Ha a matek a te világod, a nullákra gondolhatsz úgy is, mint a 10 kitevőire.
Ha nem a matek a te világod, maradj a nulláknál.
Ez valójában ugyanaz, csak hétköznapi nyelven elmondva a matek szakzsargonja helyett.)

Ez a feladat arról szól, hogy a színeket egy felirattá alakítsd:

> „... ohms”

Tehát a `"orange", "orange", "black"` bemenetre ezt kell visszaadnia:

> „33 ohms”

A nagyobb ellenállásoknál a nagyobb ohmértéket egy [metrikus előtag][metric-prefix] jelöli, például a „kiloohms” esetében.
Ez ahhoz hasonló, mint amikor azt mondjuk, hogy „2 kilométer” a „2000 méter” helyett, vagy „2 kilogramm” a „2000 gramm” helyett.

Például a `"orange", "orange", "orange"` bemenetre ezt kell visszaadnia:

> „33 kiloohms”

[metric-prefix]: https://en.wikipedia.org/wiki/Metric_prefix
