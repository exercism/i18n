# Utasítások

Valósítsd meg az alapvető listaműveleteket.

Funkcionális nyelvekben az olyan listaműveletek, mint a `length`, a `map` és a `reduce`, nagyon gyakoriak.
Valósíts meg egy sor alapvető listaműveletet anélkül, hogy meglévő függvényeket használnál.

A megvalósítandó műveletek pontos száma és neve kurzustól függ, hogy elkerüljük a meglévő nevekkel való ütközést, de az általad megvalósítandó általános műveletek közé tartoznak:

- `append` (_adott két lista, a második lista összes elemét fűzd az első lista végéhez_);
- `concatenate` (_adott egy sor lista, az összes lista minden elemét fűzd össze egyetlen lapos listává_);
- `filter` (_adott egy predikátum és egy lista, add vissza mindazon elemek listáját, amelyekre `predicate(item)` igaz_);
- `length` (_adott egy lista, add vissza a benne lévő elemek teljes számát_);
- `map` (_adott egy függvény és egy lista, add vissza azoknak az eredményeknek a listáját, amelyeket úgy kapsz, hogy minden elemre alkalmazod a `function(item)`-et_);
- `foldl` (_adott egy függvény, egy lista és egy kezdő akkumulátor, hajtsd (redukáld) az egyes elemeket balról az akkumulátorba_);
- `foldr` (_adott egy függvény, egy lista és egy kezdő akkumulátor, hajtsd (redukáld) az egyes elemeket jobbról az akkumulátorba_);
- `reverse` (_adott egy lista, add vissza egy listát az összes eredeti elemmel, de fordított sorrendben_).

Figyelj rá, hogy a fold függvényeknek (`foldl`, `foldr`) átadott argumentumok sorrendje nem mindegy.
