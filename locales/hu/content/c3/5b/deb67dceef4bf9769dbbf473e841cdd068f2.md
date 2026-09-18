# Bevezetés

Egy este egy régi füzetre bukkantál, amely tele volt rejtélyes firkákkal, mintha valaki megszállottan üldözött volna egy ötletet.
Az egyik oldalon egyetlen kérdés tűnt ki: **Vajon minden szám megtalálja az útját az 1-ig?**
A kérdés valamihez kapcsolódott, amit **Collatz-sejtésnek** neveznek: egy rejtvényhez, amely évtizedek óta zavarba hozza a gondolkodókat.

A szabályok megtévesztően egyszerűek voltak.
Válassz egy tetszőleges pozitív egész számot.

- Ha páros, oszd el 2-vel.
- Ha páratlan, szorozd meg 3-mal, és adj hozzá 1-et.

Ezután ismételd meg ezeket a lépéseket az eredménnyel, és folytasd így a végtelenségig.

Kíváncsian a 12-es számot választottad ki próbaként, és elkezdted az utat:

12 ➜ 6 ➜ 3 ➜ 10 ➜ 5 ➜ 16 ➜ 8 ➜ 4 ➜ 2 ➜ 1

A második számtól (6) számolva 9 lépés kellett az 1 eléréséhez, és valahányszor újra alkalmaztad a szabályokat, a szám folyton változott.
Eleinte a sorozat kiszámíthatatlannak tűnt, fel-le és mindenfelé ugrált.
A sejtés mégis azt állítja, hogy bármelyik számmal is kezded, mindig az 1-nél kötsz ki.

Lenyűgöző volt, ugyanakkor zavarba ejtő is.
Miért tűnik úgy, hogy ez mindig működik?
Lehet olyan szám, ahol a folyamat megakad, örökké ismétlődik, vagy a végtelenbe szökik?
A füzet azt sugallta, hogy ennek megoldása valami mélyreható dologra világíthat rá, és ezzel együtt hírnév, [vagyon][collatz-prize] és hely a történelemben vár arra, aki fel tudja oldani a titkait.

[collatz-prize]: https://mathprize.net/posts/collatz-conjecture/
