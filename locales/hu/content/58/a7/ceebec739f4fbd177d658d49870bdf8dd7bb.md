# Utasítások

Számítsd ki a Hamming-távolságot két DNS-szál között.

A mutáció nem más, mint hiba, amely egy nukleinsav, különösen a DNS
létrehozása vagy másolása során keletkezik. Mivel a nukleinsavak
létfontosságúak a sejt működéséhez, a mutációk hatása rendszerint
végiggyűrűzik az egész sejten. Bár a mutációk technikailag hibák, egy
nagyon ritka mutáció előnyös tulajdonsággal ruházhatja fel a sejtet.
Valójában az evolúció makroszintű hatásai a sok generáción át
felhalmozódott előnyös, mikroszkopikus mutációk eredményének
tulajdoníthatók.

A nukleinsav-mutációk legegyszerűbb és leggyakoribb fajtája a
pontmutáció, amely egyetlen nukleotidon cserél ki egy bázist egy másikra.

Ha megszámoljuk a különbségeket két homológ DNS-szál között, amelyek
közös őssel rendelkező, különböző genomokból származnak, becslést kapunk
arra, hogy minimálisan hány pontmutáció történhetett a két szál közötti
evolúciós úton.

Ezt Hamming-távolságnak nevezik.

    GAGCCTACTAACGGGAT
    CATCGTAATGACGGCCT
    ^ ^ ^  ^ ^    ^^

A két DNS-szál közötti Hamming-távolság 7.

# Megvalósítási megjegyzések

A Hamming-távolság csak azonos hosszúságú szakaszokra értelmezett. Ezért
feltételezheted, hogy a Hamming-távolságot kiszámító függvényednek csak
azonos hosszúságú szakaszokat adnak át.

**Megjegyzés: ez a feladat elavult, helyette a `hamming` nevű feladat használatos.**
