# Mentorálási tippek

## Mentorálási jegyzetek

A mentorálás egyik legnagyobb segítsége lehet, ha van egy fájlod, amelyben minden általad mentorált feladathoz jegyzeteket vezetsz.
Talán azt tapasztalod, hogy sok megoldás ugyanazokból a javaslatokból profitál, így ha jegyzeteket vezetsz, nem kell fejből újra és újra leírnod ugyanazokat a javaslatokat.
Ráadásul, ha egy helyen vannak a javaslataid, idővel folyamatosan finomíthatod őket, hogy világosabbak legyenek.

Ha nem vagy biztos benne, hogyan kezdd el a jegyzeteidet, a kurzushoz tartozó feladatnál találhatsz egy `mentoring.md` fájlt az [exercism/website-copy/tracks][website-copy] alatt.
Ha létezik, tartalmazhat példákat ésszerű megoldásokra, valamint gyakori javaslatokat és beszélgetési pontokat, amelyek további eszmecserét ösztönöznek.
Ha nem létezik, érdemes lehet visszatérned és létrehoznod egyet, miután elkészítetted a saját jegyzetfájlodat ehhez a feladathoz.

Az is lehet, hogy jelenleg csak egy nyelvet mentorálsz, de a jövőben többet is mentorálhatsz.
Segíthet, ha a mentorálási jegyzeteidet kurzus és feladatnév szerint is rendszerezed, mivel a különböző kurzusok valószínűleg különböző javaslatokat igényelnek ugyanahhoz a feladathoz.

A mentorálási jegyzetek hasznosak, akár gyakran, akár ritkán mentorálod a feladatot.
Ha gyakran mentorálod a feladatot, rengeteg gépeléstől kímél meg, hiszen csak be kell másolnod a jegyzeteidből.
Ha ritkán mentorálod a feladatot, emlékeztethet azokra a javaslatokra, amelyeket elfelejthettél az elmúlt hetek vagy hónapok során, mióta utoljára mentoráltad.

Teljesen rendben van, ha a mentorálási jegyzetek mentoronként eltérnek.
Íme egy módja annak, hogyan építheted fel őket, de nem ez az _egyetlen_ mód.

Gratulálj a mentoráltnak, hogy átment a teszteken (ha átment rajtuk).

Ha a feladat már néhány napja a mentorálási sorban várakozik, talán érdemes kitérned rá valami ilyesmivel:

>Sajnálom, hogy kicsit sokáig tartott, míg valaki válaszolt neked.
>Jelenleg hiány van aktív JavaScript-mentorokból a `Resistor Color Duo` feladatnál.

Sorold fel pontokba szedve, mi tetszik a mentorált megoldásában.
Például:

- Tetszik, hogy ez a megoldás tömör és olvasható.

- Tetszik az `indexOf` használata.

- Tetszik, hogy a `(first * 10) + second` megközelítést használja, elkerülve az oda-vissza alakítást szám és string között.

- Tetszik, hogy nem használ ciklust/iterációt.

- Tetszik a destrukturált paraméter.

Ezután következhetnek a gyakran használt javaslataid.

~~~~exercism/note
Nagyon hasznos lehet a mentoráltnak, ha minden újonnan bemutatott nyelvi funkcióhoz adsz egy linket.
Például:

>Ehhez a feladathoz nem szükséges, de talán érdemes lehet a függvényt [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)né alakítanod.
~~~~

Bár nem akarjuk elárulni a megoldást, néha a mentorált a példából tanul a legjobban.
Ha egy kódrészletet egy összecsukott részletekblokkba teszel, az szolgáltathatja ezt a példát, amelyet a mentorált kedvére kinyithat vagy sem.
Például:

&lt;details&gt;&lt;summary&gt;Spoiler példa&lt;/summary&gt;

&lt;pre&gt;

export const decodedValue = ([firstColor, secondColor]) =>
  COLORS.indexOf(firstColor) * 10 + COLORS.indexOf(secondColor)

&lt;/pre&gt;

&lt;/details&gt;

A jegyzeteid vége felé beilleszthetsz egy linket egy közzétett megoldásra, amely teljes egészében megtestesíti a javaslataidat.

A jegyzeteid legaljára érdemes lehet bővebb magyarázatokat tenned, amelyeket a mentoráltak néha kérnek.
Ezek a magyarázatok nem gyakran kerülnek elő, de mégis jó lehet lejegyezni őket, amikor először használod őket, így legközelebb, ami hetek vagy hónapok múlva is lehet, nem kell a nulláról kitalálnod a magyarázatot.
Például néha egy mentorált megkérdezi, hogyan működne a szorzásos megközelítés a Resistor Color Duo esetében, ha a fekete lenne az első sáv egy vezető nulla miatt:

>A fekete első sávként való használata jó szempont, úgyhogy nézzük meg.
>Az ellenállás színe az ellenállás ohmértékét hivatott kifejezni,
>és egy vezető nullát nem használnánk több sávos ellenállásnál.
>Tehát a fekete nem lehetne az első sáv.
>Ráadásul a `parseInt` vagy a `Number` is eltávolítja a vezető nullát.

A mentorálási jegyzetekben tárolható adatoknak egy választható kategóriája a különböző megoldásokhoz vagy megközelítésekhez tartozó benchmarkok nyilvántartása.

## Benchmarkolás

A mentoráltak gyakori aggodalma, hogy mennyire teljesítményképes a megoldásuk.
Ez különösen igaz az olyan „alacsony szintű” nyelvekre, mint a C, C++, Go és Rust.
Amellett, hogy mennyire idiómatikus a kódjuk, más nyelvek mentoráltjai is gyakran aggódnak a kódjuk hatékonysága miatt.

~~~~exercism/note
A benchmarkolás nem olyasmi, amit egy mentortól _elvárnak_.
A mentoráltakat viszont gyakran kifejezetten lenyűgözi, hogy megoldásuk benchmarkja hogyan viszonyul más megközelítésekhez.
~~~~

A Go különösen barátságos kurzus a benchmarkoláshoz, mivel a benchmarkok gyakran szerepelnek a tesztfájlban.
Más nyelveknél kutatásra lehet szükség ahhoz, hogy kiderítsd, melyik módszer válna be neked a legjobban.
Ha például csak az online szerkesztőt használod, akkor olyan helyet keresel, ahol online futtathatsz benchmarkokat.
Például a [JSBench.me][jsbench-me] egy online benchmarkoló JavaScripthez.

Ha helyben futtatod a kódot, akkor letölthetsz olyan benchmarkoló szoftvert, amelyet a gépeden futtathatsz.
Például a Rust használhatja a [Criterion][criterion]t, vagy a [cargo bench][cargo-bench]et [benchmark tesztekkel][rust-benchmark-tests].

Legalább néhány módja van a benchmarkok nyomon követésének.
Az egyik mód, ha folyamatosan vezetsz egy listát mindarról, amit benchmarkolsz, de az kezelhetetlenné válhat, ha a lista hosszúra nyúlik.
Egy másik mód, ha reprezentatív benchmarkok listáját vezeted a különböző megközelítésekhez.
A mentoráltak gyakran szeretnék látni a gyorsabb megközelítések kódját, így ha egy gyorsabb megközelítés közzé van téve, valószínűleg nagyra értékelik, ha megadod a linkjét.

~~~~exercism/caution
Ha linket adsz egy általad benchmarkolt megoldáshoz, feltétlenül a közzétett megoldásra mutató linket add meg, ne a mentorálási beszélgetésre mutatót.
Nem minden mentorált megoldás lesz közzétéve.
~~~~

## Nem feladatspecifikus mentorálási jegyzetek

Lehetnek a nyelvnek olyan funkciói, amelyekkel több feladatnál is foglalkozol.
Amikor épp át szeretnél másolni egy javaslatot az egyik fájlból a másikba, talán gondold meg, hogy inkább külön fájlba teszed.
A javaslat egy helyen tartásának ismét az az előnye, hogy könnyebb idővel finomítani.
Az is könnyebbé teszi a megtalálását, amikor olyan feladatnál használod, ahol még nem használtad korábban.
Ahelyett, hogy azon próbálnál emlékezni, melyik feladatnál említetted a javaslatot korábban, egyenesen a javaslat saját fájljához ugorhatsz.

## Amikor a mentoráltnak kérdése van

A mentoráltakat arra biztatjuk, hogy határozzák meg, mit várnak a mentorálási beszélgetéstől.
Ezt gyakran kérdés formájában fogalmazzák meg.
Ha a kérdésre nem tudod a választ, és nem is érdekel, nyugodtan hagyd a mentorálási kérést egy másik mentornak.

Ha nem tudod a választ, de szeretnéd megtalálni, akkor a legjobb talán az, ha nem veszed fel a mentorálási kérést, amíg meg nem tanultad a választ.
Ha addigra eltűnik a mentorálási kérés, legalább tanultál valamit, és nem várakoztattad a mentoráltat.

Ez alól kivétel lehet, ha a mentorálási kérés már napok óta vagy annál is tovább a sorban várakozik.
Ebben a helyzetben érdemes lehet felvenned a mentorálási kérést, és megadnod, amilyen visszajelzést tudsz, és jelezned a mentoráltnak, hogy visszatérsz a kérdésére.
Természetesen fontos, hogy ezt be is tartsd, akár úgy, hogy tájékoztatod a mentoráltat a válaszról, akár úgy, hogy tudtára adod, nem találtad meg.
Ha nem találtad meg a választ, hasznos lehet a mentoráltnak, ha leírod, milyen módokon próbáltad megtalálni a választ.
A mentorált más módokat is javasolhat a válasz megtalálására.
Ketten együtt talán meg is találjátok a választ.

Ha kimerítettél minden általad ismert módot a válasz megtalálására, javasolhatod a mentoráltnak, hogy zárja le a beszélgetést, és küldje be újra a kérését, hátha egy másik mentor meg tudja adni a választ.
Ha szeretné, a mentorált beírhat a lezárt beszélgetésbe, hogy megossza veled a választ, amint megtudja.
És ehhez hasonlóan, ha később te tudod meg a választ, visszatérhetsz a lezárt beszélgetéshez, és értesítheted a mentoráltat.

Ha tudod a választ, és szeretnél foglalkozni vele, arra érdemes a tanuló megoldásáról szóló elismerés és a más megközelítésekre vonatkozó javaslatok közé illesztened.

### Hibás kód

A kód kétféleképpen hibázhat: vagy azért, mert nem megy át minden teszten, vagy azért, mert nem fordul le, vagy nem felel meg az értelmezőnek.

A különböző mentorok hajlandósága és/vagy türelme eltérő lehet a hibás kóddal való foglalkozásra, ami némileg attól is függhet, hogyan kerül eléd, mivel a hibás kódot nem mindig ugyanúgy tárják eléd.

Néha egy mentorált azt mondja, kipróbált egy másik megközelítést, és az nem működött, majd megkérdezi, miért nem.
Lehet, hogy a kódot meg sem adja, vagy gyakorlatilag olvashatatlan hozzászólásban teszi közzé egy iteráció helyett.

A webes szerkesztőben tesztelt megoldást csak akkor lehet mentorálási kéréshez beküldeni, ha minden teszten átment.
Ennek egyik oka, hogy a mentor a meglévő, működő kód javításaira vagy más megközelítésekre vonatkozó javaslatokra összpontosíthasson.
A kód _Debugolás_ nem feltétlenül olyasmi, amit egy mentor szeretne vagy elvárnak tőle.
Egy hibás megoldást azonban az Exercism CLI-n keresztül be lehet küldeni mentorálási kérésként, a tanuló pedig segítséget kérhet a megoldásához.

Ha a hibás kódot nem adták meg, és a leírt hibás megközelítés nem hangzik jónak, elég lehet azt javasolni, hogy a hibás megközelítés helyett egy olyan másik megközelítést válasszon, amely sem nem a hibás, sem nem az általa használt, átment megközelítés.
Vagy elég lehet elmagyarázni, miért jobb az általa használt megközelítés a hibásnál, anélkül hogy belemennél a hibás megközelítés hibájának részleteibe.

Például gyakori eset, hogy a mentoráltak megszenvednek a Robot Name feladattal.
Vagy a tesztek futnak ki az időből, vagy nem sikerül elég nevet generálniuk, és szeretnék tudni, hogyan javítsák.
Ha van hozzá hajlandóságod és türelmed, természetesen elemezheted a kódjukat, és javasolhatod, hogyan orvosolják a problémát.
Vagy elmagyarázhatod, hogy a véletlenszerűen generált nevek ellenőrzése annál több ütközést okoz, minél több nevet generálnak, és javasolhatod, hogy egy másik megközelítés lehet a nevek sorrendben történő generálása, majd összekeverése.

Ha a hibás kódot egy gyakorlatilag olvashatatlan hozzászólásba illesztették be, érdemes lehet megadnod, amilyen visszajelzést tudsz a működő megoldásról, és javasolhatod, hogy a hozzászólásban lévő kódot küldjék be egy másik iterációként.
Azt is javasolhatod, hogy a mentorált ezután nézze meg a hibás iteráció hibáit, útmutatóként arra, hol van a probléma.

Ha a kód egy hibás iterációban van, hasznos lehet a mentoráltat arra irányítani, hogy nézze meg a tesztfutás hibáit.
Egyes nyelveknél egy kicsit több útmutatásra van szükség a hibák vagy a teszteredmények olvasásához, mint másoknál.
Hasznos lehet a hibák egy vagy több részét idézni, és elmagyarázni a tanulónak, mit jelentenek.

Végső soron nem a mentor felelőssége, hogy kijavítsa a mentorált hibás kódját, de a mentor, ha szeretné, javasolhat módokat a mentoráltnak, hogy maga javítsa ki.

## A sor folytonosságának kezelése

Előfordulhat, hogy csatlakozol egy kurzus mentorálásához, de soha nem látsz feladatot a sorában, amit mentorálhatnál.
Azt hiheted, valami nincs rendben, de erre legalább néhány ok létezik.
Az egyik ok az lehet, hogy egyelőre nem kérnek mentorálást a kurzuson.
Néha előfordulhat, hogy egy kurzuson inaktív időszakok vannak.
Egy másik ok, hogy más mentorok esetleg már felveszik a kéréseket, mielőtt meglátnád őket.
Ez valószínűleg egy népszerű kurzusnál fordul elő, amelynek sok aktív mentora van.

Ha sok kérés van a sorban, néhány módon közelíthetsz a mentorálásukhoz.
Dolgozhatsz a legrégebbitől a legújabbig, így azokkal foglalkozol először, akik a legtöbbet vártak.
Vagy választhatod azt, hogy a legújabbtól a legrégebbi felé haladsz, különösen ha a legrégebbiek már hosszú ideje várnak.
Így azoknak, akik mostanában aktívak voltak, nem kell megvárniuk, míg a lemaradást feldolgozod.

Ha ugyanahhoz a feladathoz több kérés is van, érdemes lehet azonos feladatok kötegeiben haladni a fókusz megőrzése érdekében, ahelyett hogy A feladattól B feladatig, majd vissza A-hoz ugrálnál.

Előfordulhat, hogy egy olyan feladat kérése, amely nem érdekel, már napok vagy hetek óta ott ül.
Választhatod azt, hogy nem foglalkozol vele, abban a reményben, hogy egy másik mentor felveszi, vagy ez motivációt adhat arra, hogy magad is kipróbáld a feladatot.
Egy dolog, ami hasznos lehet, hogy ránézel a beküldött megoldásra.
Lehet, hogy olyan megközelítést használ, amelyre nem gondoltál, és ez a megközelítés vonzóbbá teheti számodra a feladat megoldását.
De ha megnézed a kódot, és még mindig nem érdekel a feladat megoldása, azzal nem ártasz senkinek.
Attól, hogy ránézel egy mentorálási kérésre, még nem kell a „Mentorálás indítása” gombra kattintanod.

[website-copy]: https://github.com/exercism/website-copy/tree/main/tracks
[jsbench-me]: https://jsbench.me/
[criterion]: https://crates.io/crates/criterion
[cargo-bench]: https://doc.rust-lang.org/cargo/commands/cargo-bench.html
[rust-benchmark-tests]: https://doc.rust-lang.org/unstable-book/library-features/test.html
