# Bevezetés

A Cairo szótárai kulcs-érték párok tárolására és visszakeresésére kínálnak lehetőséget, hasonlóan más programozási nyelvek hashmapjeihez vagy szótáraihoz.
A Cairo egyedi memóriamodellje és a számítási bizonyítékok létrehozásában játszott szerepe miatt azonban a színfalak mögött egészen másképp működnek: $O(n)$ komplexitású műveleteket kínálnak, és egy „squashing” nevű folyamaton keresztül automatikusan érvényesítik őket.
Ha hatékony Cairo-programot szeretnél írni, elengedhetetlen megértened, miben térnek el a Cairo szótárai a más nyelvekbeli megfelelőiktől.
