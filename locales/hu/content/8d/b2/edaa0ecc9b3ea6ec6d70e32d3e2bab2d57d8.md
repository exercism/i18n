**Fontos: Ez az információ mára elavult. A naprakész részletekért nézd meg az [újabb blogbejegyzésünket](https://exercism.org/blog/contribution-guidelines-nov-2023).**

---

_TL;DR; Néhány hónapot arra szánunk, hogy újratervezzük az önkéntesmodellünket, és szünetet adjunk a kulcsfontosságú önkénteseinknek a közösségi hozzájárulások átnézésében.
Ha az Exercismet pusztán tanulásra vagy mentorálásra használod, itt nincs semmi, amit tudnod kellene (de ha érdekel, nyugodtan olvasd el!).
Ha kurzuskarbantartó vagy, szeretnél hozzájárulni az Exercismhez, vagy hibát/problémát szeretnél jelenteni, akkor ezt tekintsd kötelező olvasmánynak 🙂_

---

Az elmúlt 6 hónapban sok időt töltöttünk azzal, hogy az Exercism jövőjét kutattuk, és elképzeltük, milyen lenne, ha minden nyelvi kurzus a lehető legjobb formáját hozná.
Hihetetlenül büszkék vagyunk arra, amit eddig felépítettünk.
A 85 000 megírt ajánlás arról tanúskodik, milyen csodálatos munkát végzett a közösségünk a nyelvi kurzusok felépítésében, és abban, hogy mentorálással ilyen sok tanulót kísért végig rajtuk.
A legfontosabb, hogy úgy gondoljuk, még csak a felszínét karcolgatjuk annak, ami lehetséges.
Nagy terveink, reményeink és izgalmunk van azzal kapcsolatban, hogy mi mindenné válhat az Exercism.
De hogy mindezt elérjük, először meg kell oldanunk néhány alapvető problémát, amelyek a felszín alatt húzódnak.

Ezek közül is a legfontosabb az a kihívás, hogy önkéntes közösségünket egészséges és fenntartható módon tudjuk növelni.
Az Exercism több száz elkötelezett önkéntes vállán épült fel, de közülük sokan mára kiégtek, és emiatt sokan el is mentek.
Ennek számtalan oka van: egyesek közvetlenül az Exercismhez kapcsolódnak, mások az élet időnyomásához, megint mások ahhoz a háttérhez, ami mostanában a világban történik.
De számunkra teljesen világossá vált, hogy ki kell dolgoznunk és fejlesztenünk kell egy jobb módot arra, hogy együtt építsük a platformunkat.

Történelmileg úgy próbáltuk építeni az Exercismet, ahogy a nyílt forráskódú szoftverek (Open Source Software, OSS) modellje diktálja: karbantartókkal, akik a szélesebb közösség hozzájárulásait nézik át.
Ez sok problémát okozott nekünk, és frusztrációt váltott ki a karbantartókból és a közreműködőkből egyaránt.
Az alábbiakban bővebben kifejtem, ha érdekelnek a részletek, de a lényeg az, hogy a kulcsfontosságú önkénteseink most reaktív kapuőrökként töltik az idejüket ahelyett, hogy innovatív alkotók lennének.
Ez sokkal kevésbé élvezetes számukra, és azt jelenti, hogy az Exercism elveszíti azt a varázst, amit ezek az emberek korábban hoztak a platformra.

Két dolgot kell tennünk, hogy ezt rendbe hozzuk:
1. Ki kell dolgoznunk egy új önkéntesrendszert, amely jobban illik az Exercismhez, mint a hagyományos OSS-modell.
  Eddig jelentős energiát fektettünk ebbe, de nem sikerült.
  Ezért most időt szakítunk rá, hogy a következő hónapokban az önkénteseinkkel együtt rendesen megtervezzük.
2. A következő hónapokban nagyrészt szüneteltetjük a szélesebb közösség hozzájárulásait, hogy a kulcsfontosságú önkénteseink arra összpontosíthassanak, hogy úgy építsék és fejlesszék a kurzusokat, ahogy szeretnék (vagy szabadságra menjenek, ha csak egy kis lélegzetvételre vágynak!).

Remélem, hogy ha hátrébb lépünk, és ezt igazán jól megtervezzük, valamint adománygyűjtéssel bővítjük az oktatócsapatunkat, akkor az Exercismet kiváló hellyé tehetjük az önkénteskedéshez, és biztosíthatjuk a jövőjét.
Addig is ezeknek a változásoknak köszönhetően a kurzusok jobban fejlődhetnek és növekedhetnek, mint az elmúlt évben, a karbantartóink pedig nem égnek ki, hanem boldogabbnak, energikusabbnak és összetartozóbbnak érzik magukat attól, hogy az Exercismen dolgoznak.

## Kézzelfogható változások

Három kézzelfogható változást vezetünk be.

### Használd a fórumot, ne a GitHub Issues-t

Teljesen felszabadítjuk a GitHubot, hogy a karbantartóink azokkal a problémákkal foglalkozhassanak, amelyeket maguk szeretnének megoldani.
Bezárunk jó néhány problémát, amelyeket korábban azért hoztunk létre, hogy a közösség dolgozzon rajtuk (és hozzáadunk egy címkét, hogy a jövőben könnyen újranyithassuk őket, ha szeretnénk), ugyanakkor a legtöbb repóban nem engedélyezzük az új, kéretlen problémákat és PR-eket.
Ha szeretnél megvitatni vagy jelenteni valamit, kérünk, használd inkább a [fórumot](https://forum.exercism.org).
Ha kéretlen problémát vagy PR-t nyitsz, azt automatikusan bezárjuk, és a fórumra irányítunk.

### A szélesebb közösség hozzájárulásainak szüneteltetése

A kurzusok három kategóriába sorolhatók:
- Az aktív karbantartókkal rendelkező kurzusok többségénél szüneteltetjük a közösségi hozzájárulásokat, hogy a karbantartók autonómak lehessenek, vagy szünetet tarthassanak.
  (Ezeknek a kurzusoknak a karbantartói kérhetik a kötelező egy átnézésre vonatkozó követelmény eltávolítását.
  Ezért beszélj Erikkel Slacken.)
- Néhány olyan kurzus, amelynek aktív karbantartói továbbra is szívesen fogadnak közösségi hozzájárulásokat, nyitva marad (ha karbantartó vagy, és inkább ezt a módot választanád az (1) helyett, keresd fel Slacken Jonathan Middletont, hogy megbeszéljétek).
- Azoknál a kurzusoknál, ahol nincs aktív karbantartó, a kurzusfejlesztés gyakorlatilag szünetelni fog ebben az időszakban.

Minden esetben Erik és én továbbra is átnézzük a Tooling repókba érkező PR-eket, mielőtt azokat merge-eljük.

Egyetlen kivétel: továbbra is elfogadjuk a PR-eket a Megközelítésekhez és a Cikkekhez, és bevezetünk egy szervezeti szintű optimista merge-elési szabályzatot, amelynek célja, hogy az Exercism egészén feltöltsük a Megközelítések egy alapkészletét, és lehetővé tegyük a fokozatos fejlesztéseket, a következő szabályok szerint:
1. Ha a kód megoldja a feladatot, és szintaktikailag és szemantikailag is idiomatikus (vagyis úgy néz ki, mint egy $LANG kód), akkor merge-elni kell.
  Ha nem, akkor a PR szerzőjének kell javítania rajta.
2. Ha egy karbantartó változtatni szeretne a tartalmon (például hogy javítsa a tanácsokat, finomítson a dolgokon, jobb/alternatív/idiomatikusabb megközelítéseket emeljen ki), akkor azt egy újabb PR-ben kell megtenni.

### Új önkéntesrendszer tervezése

Összeállítunk egy Közösségi Testületet, hogy velünk együtt tervezze meg a jövő fenntartható, egészséges önkénteskeretrendszerét, felszabadítva ezzel az Exercismben rejlő lehetőségeket.
Ha elkötelezett vagy az Exercism jövője iránt, és szeretnél része lenni ennek a folyamatnak, vedd fel a kapcsolatot [Jonathannel](mailto:jonathan@exercism.org).

A következő hónapokban ezekkel a lépésekkel haladunk tovább.
Az időszak során mindent mérlegelni fogunk, és 2023 júniusáig új döntéseket szeretnénk hozni.
Ha bármi eszedbe jut, nyiss egy témát a [fórumon](https://forum.exercism.org)!

## Utóirat: Miért rossz az OSS-modellünk

A történelmi modellünk az OSS-modell köré épült.
Önkéntesekre támaszkodott, akik bejöttek az Exercismbe, remek munkát végeztek a kurzusok felépítésében, majd karbantartói jogosultságot kaptak, amellyel elfogadhatták a szélesebb felhasználóbázisunk hozzájárulásait, hogy azokkal fejlesszék a kurzusokat.

Bár papíron remekül hangzik, komoly problémái vannak.
A legfontosabb ezek közül, hogy azoknak, akik a legtöbb varázst adják az Exercismhez, végül nem marad idejük kódolni vagy az Exercismet alkotni, mert az idejük a közösségi hozzájárulások megválaszolásával telik.
A karbantartók szinte soha nem ezért kezdtek el az Exercismmel foglalkozni, és ezt nem élvezik.
Kicsit olyan, mintha valakit, aki imád fejleszteni, „előléptetnének” csapatvezetővé, ahol embereket irányít kódolás helyett.
Lehet, hogy akkor szép előléptetésnek tűnik, de gyakran kiderül, hogy az emberek feleannyira sem élvezik a vezetést, mint a kódolást.

Az is feltételezi, hogy a szélesebb közösség hozzájárulásainak összege nagyobb, mint amekkora egy adott karbantartó egyéni hozzájárulása egyébként lenne.
Az Exercismnél azonban ez szinte soha nem igaz.
Az Exercism összetett, az oktatás pedig nehéz, és a kettő együtt az Exercismhez való hozzájárulást is bonyolult és nehéz feladattá teszi.
Rengeteg mindent kell megtanulni és megérteni arról, hogyan működik technikailag az Exercism, és hogyan áll hozzá az oktatáshoz, így a legtöbb első hozzájárulás arról szól, hogy az emberek épp keresik az útjukat.
Ez azt jelenti, hogy a kezdeti hozzájárulásaik viszonylag kicsik, ugyanakkor szinte mindig sok munkát igényelnek az átnézés és a finomítás során.
Ez sok időt vesz igénybe a karbantartók számára.
Valójában az átnézéssel töltött teljes idő (és a szükséges kontextusváltás) miatt a karbantartó általában több energiát fektet a PR átnézésébe, mint ha egyszerűen maga készítette volna el.
Természetesen akadnak kivételek, de az esetek 99%-ában ez igaz.
Ráadásul ez gyakran még fájdalmasabb a karbantartónak, mert a PR-ban megoldott probléma nem volt valahol a prioritási listájuk elején, így végül azok a dolgok nem készülnek el, amelyekről tudják, hogy igazán nélkülözhetetlenek.

Végül az OSS-modell arra épül, hogy a közreműködők kicsiben kezdik, majd idővel elég tájékozottá és rendszeressé válnak ahhoz, hogy karbantartókká válhassanak.
Az olyan OSS-projektekben, mint a szoftverkönyvtárak, ez viszonylag jól működik (például valaki éles környezetben használ egy könyvtárat, és folyamatosan fejleszti, míg végül annyi tudása lesz, mint az eredeti alkotónak).
Az Exercismnél azonban ez egyszerűen nem történt meg.
Bár az elmúlt 12 hónapban több ezer közreműködő PR-jét merge-eltük, csak egy maroknyian váltak rendszeres közreműködővé, és még kevesebben lettek karbantartók.
Ez megint csak főként az Exercism összetettsége miatt van így, de azért is, mert ez nem egy önmagában zárt szoftver, ahol ez a modell hagyományosan működik.

Mindez hihetetlenül lehangoló a karbantartók számára, és káros az Exercismre nézve.

A kurzusok megrekedtek, és a fő önkénteseink, akik szenvedélyesen építettek, nagyrészt elveszítették ezt a szenvedélyt, amikor a munkájuk mások munkájának átnézésévé, versengő prioritások egyeztetésévé és váratlan kérések kezelésévé vált.
A v3 építése során a karbantartók viszonylagos autonómiával dolgozhattak, mert a munkájuk nagyrészt a színfalak mögött zajlott, ami hatalmas termelékenységhez vezetett, és azt jelentette, hogy a többség igazán élvezte a közreműködést.
A v3 elindítása óta, bár sok önkéntes ugyanannyi időt szán az Exercismre, ez az időszak sokkal kevésbé élvezetes és termékeny, nagyrészt azért, mert rengeteg energia ment el mások hozzájárulásainak vagy problémáinak megválaszolására.
Az önkénteseink most reaktív kapuőrökként töltik az idejüket újítók helyett, és ez sokkal kevésbé szórakoztató.

Ezek azok a kihívások, amelyeket meg kell oldanunk, és nem könnyűek.
Meg kell találnunk a módját, hogy azok, akik több száz órát szeretnének az Exercism nyelvi kurzusainak építésére fordítani, megtehessék ezt, és közben szeressék is csinálni.
Meg kell találnunk a módját, hogy a bugfixek és a kis hozzájárulások úgy kerüljenek be a kódbázisunkba, hogy ne vonják el a kulcsfontosságú önkénteseink figyelmét.
És meg kell találnunk a módját, hogy új önkénteseket csábítsunk az Exercismhez, és támogassuk őket, ha úgy döntenek, hogy hosszú távon hozzájárulnak.
Általában véve csökkentenünk kell a kapuőrködést, ugyanakkor tisztelnünk kell, hogy azoknak, akik ennyi erőfeszítést tettek a kurzusokba, határozott és nagyon is megfontolt véleményük van.
El kell érnünk, hogy élvezetes legyen irányítani és működtetni ezt az egész önkéntesrendszert.
És még egy csomó más dolgot is meg kell oldanunk.
Időbe telik majd, és kihívás lesz, de ha sikerül, fantasztikus lesz.
