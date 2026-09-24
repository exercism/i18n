# Névjegy

A [Pony](http://www.ponylang.org) egy objektumorientált, aktormodell-alapú, képességbiztos programozási nyelv, amelynek a fókuszában az áll, hogy a munka el legyen végezve.

Azért objektumorientált, mert osztályai és objektumai vannak, akárcsak a Pythonnak, a Javának és a C++-nak. Azért aktormodell-alapú, mert aktorai vannak (hasonlóan az Erlanghoz vagy az Akkához). Ezek úgy viselkednek, mint az objektumok, de emellett aszinkron módon is képesek kódot futtatni. Az aktorok teszik nagyszerűvé a Pony-t.

Amikor azt mondjuk, hogy a Pony képességbiztos, azon több dolgot is értünk:

- Típusbiztos. Nagyon típusbiztos. Még matematikai bizonyíték is van rá.
- Memóriabiztos. Jó, ez a típusbiztonsággal együtt jár, de így is érdekes. Nincsenek lógó mutatók, nincs puffertúlcsordulás, sőt, a nyelvben még a null fogalma sem létezik!
- Kivételbiztos. Nincsenek futásidejű kivételek. Minden kivételnek pontosan meghatározott a szemantikája, és mindig kezelve vannak.
- Adatverseny-mentes. A Ponyban nincsenek zárak vagy atomi műveletek, semmi hasonló. Ehelyett a típusrendszer fordítási időben gondoskodik róla, hogy a párhuzamos programodban soha ne alakulhasson ki adatverseny. Így rendkívül párhuzamos kódot írhatsz, és soha nem rontod el.
- Holtpont-mentes. Ez könnyű, mert a Ponyban egyáltalán nincsenek zárak! Így aztán biztosan nem kerülnek holtpontba, hiszen nem is léteznek.

Aki most ismerkedik a nyelvvel, az az [oktatóanyaggal](https://tutorial.ponylang.org/) kezdje.
