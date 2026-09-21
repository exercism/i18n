# Bevezetés

Cairoban a tömbök olyan alapvető adatszerkezetek, amelyek azonos típusú elemek gyűjteményét tárolják strukturált módon.
A tömbökben minden elemet az indexe alapján érsz el, csakúgy, mint más programozási nyelvek listáiban, ami hatékony lekérést és módosítást tesz lehetővé.

A Cairo tömbjei módosíthatatlan adatszerkezetek.
Az elemeket csak a tömb végéhez fűzheted hozzá, vagy a tömb elejéről távolíthatod el.
Ez a kialakítás biztosítja az adatintegritást és a stabilitást, ami összhangban van a Cairo memóriakezelési megközelítésével.
A tömböket az `ArrayTrait::new()` segítségével inicializálod, és az elemek tárolásához típusra szabott deklarációkat támogatnak.
Az elemeket a `get()` vagy `at()` metódussal érheted el, illetve az `arr[index]` indexelő operátorral.
A tömb elejéről csak a `pop_front()` függvénnyel távolíthatsz el elemeket.
Ezek a tulajdonságok teszik alkalmassá a Cairo tömbjeit a strukturált adatok tárolására és kiolvasására.
