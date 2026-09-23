## Bevezetés
Sziasztok! Remélem, mindenki jól van.

Nagyon izgalmas hetek állnak mögöttünk az Exercism-nél: elindult az Exercism Premium és az Exercism Insiders. Voltak remek közösségi hívásaink is, és rengeteg fejlesztést telepítettünk az oldalra, továbbiak pedig hamarosan érkeznek. Sok mindennek örülhetünk mostanában, de semmi sem izgalmasabb annál, mint hogy beléptünk a #12in23 hatodik hónapjába! Az S-kifejezések nyara, vagy szebben rövidítve a Summer of Sexps.

Szokás szerint a programozás világának bölcs mestere, Erik csatlakozik hozzám.

Ebben a hónapban tehát öt nyelvünk van: a Clojure, a Common Lisp, az Emacs Lisp, a Racket és a Scheme. Ezek a nyelvek mind a Lisp nyelv dialektusai, ezért ahelyett, hogy ebben a videóban túl mélyen belemennénk a különbségeikbe, inkább magával a Lisppel foglalkozunk egy kicsit jobban, és azzal, mi teszi egyedivé. A végén pedig röviden áttekintjük a nyelveket.

De előbb néhány fontos tudnivaló! Ahhoz, hogy megkapd a Summer of Sexps jelvényt, júniusban bármelyik öt feladatot meg kell oldanod valamelyik ilyen nyelven.

## A jelvények

Ott van még az egész éves 12in23 jelvény. Ehhez öt kiemelt feladatot kell megoldanod az adott nyelvben. Ha ezt június után nézed, ezt a részt az év bármely szakában teljesítheted, szóval nem maradtál le semmiről. Mivel sok embernek még sosem volt dolga Lisp nyelvvel, igyekeztünk viszonylag egyszerű feladatokat választani, hogy ízelítőt adjanak abból, hogyan néz ki egy Lisp nyelv.
- **Szökőév:** logikai feltételekkel és az igaz/hamis értelmezéssel dolgozol (és opcionálisan lexical scopinggal)
- **Two-Fer:** formázz egy stringet, és dolgozz egy opcionális paraméterrel
- **Négyzetek különbsége:** hívj felhasználó által definiált függvényeket, és számolj prefix jelöléssel
- **Robotnév:** dolgozz véletlenszerűséggel, atomokkal és strukturált adatokkal
- **Zárójelek párosítása:** használj rekurziót egy string érvényesítésére

Ezek a feladatok, valamint a korábbi hónapok feladatai mind megtalálhatók a #12in23 oldalon.

## Áttekintés

Szóval, a Lisp-alapú nyelvek. Azt hiszem, kezdjük azzal, hogy egy kicsit megértsük magát a Lispt. Kezdjük egy rövid általános bevezetéssel a Lispbe.

### Lisp
- Először is érdemes megjegyezni, hogy a Lisp az egyik legrégebbi nyelv.
- John McCarthy alkotta meg a MIT-n 1958-ban, abban az időben, amikor a számítógépek még egy egész szobát betöltöttek padlótól a plafonig 🙂
- A Lisp név a LISt Processing (azaz lista-feldolgozás) rövidítése, ami jól mutatja a lista adatszerkezet fontosságát.
- Azzal a céllal tervezték, hogy AI-kutatásra használják.
- A Lisp a lambda-kalkulusra épült, amelyet Alonzo Church talált ki; ez egy formális rendszer a matematikai számítás leírására (leegyszerűsítve).

- Hihetetlenül nagy hatású nyelv, több okból is:
- Ez a második legrégebbi, még széles körben használt magas szintű programozási nyelv (a Fortran után)
- Ez volt az első magas szintű funkcionális programozási nyelv, és számos olyan tulajdonságot vezetett be, amelyeket ma a funkcionális programozáshoz kapcsolunk.
- Megjegyzendő, hogy a Lisp az imperatív programozást is támogatta
- Ez volt a legelső nyelv, amelyben szemétgyűjtő működött, így a szerzőnek nem kellett kézzel kezelnie a memóriát
- Viszonylag csekély szintaxisa és meglehetősen egyszerű szemantikája kiválóan alkalmassá teszi oktatási célokra.
- Ezért gyakran használják a Lispt (vagy inkább annak valamelyik dialektusát) a programozás tanítására
- Számos nyelvi dialektust hívott életre (és hív életre a mai napig!); ezek közül azokról lesz szó, amelyeket az Exercism támogat.
- Más szóval, a programozási nyelvek fájában külön ág van a Lisp-szerű nyelvek számára (ahogy a C-szerű nyelveknek is van egy ága).

Amikor nemrég Simon Peyton Jones-szal beszélgettem, aki a Haskell egyik megalkotója, arról beszélt, mi a különbség a Turing-gépek köré épülő nyelvek és a lambda-kalkulus köré épülő nyelvek között. Érdemes megnézni azt az interjút, ha többet szeretnél tudni erről.

### Zárójelek

Sok zárójel van a Lisp nyelvekben, de ez nem feltétlenül rossz (ahogy a sok kapcsos zárójel sem feltétlenül rossz a C-szerű nyelvekben).
A Lisp nyelvek egy olyan dolog köré épülnek, amit S-kifejezéseknek hívnak.
Az S-kifejezés (a symbolic expression, azaz szimbolikus kifejezés rövidítése; sexpr vagy sexp alakban rövidítik, és innen ered a havi kihívás neve is) olyan kifejezés, amely adatot reprezentál. Az eredeti Lisp nyelv számára találták ki őket, és az tette őket népszerűvé.
Az S-kifejezés kétféle formát ölthet:

- Atom (pl. 'x'). Gondolj rájuk úgy, mint nem egymásba ágyazott „értékekre”, vagy a fa leveleire
- Egy x . y kifejezés, ahol x és y S-kifejezések. Gondolj rájuk mint párokra, ahol y a lista következő eleme lehet (ha van), vagy a fa csomópontjai. Vedd észre, hogy ez rekurzív definíció, amely a levél szintjén ér véget. Az ilyen típusú S-kifejezéseknél általában zárójeleket használnak.


### S-kifejezések
Az S-kifejezéseket a Lispben egyszerre használják adatok és listák reprezentálására.
Ezért amikor listát definiálsz, mindig zárójeleket használsz.
Ha mindezt összevetjük azzal, hogy:
a lista a Lisp legfontosabb adatszerkezete (innen a neve),
néhány Lispben ez az egyetlen adatszerkezet,
akkor rengeteg zárójel lesz a végeredmény.
Hogy érzékeltessük, mennyire központi szerepük van a listáknak: ha meg akarsz hívni egy függvényt a Lispben, azt egy lista létrehozásával teszed.

Érdekes módon a lista első eleme (más néven a fej) a meghívott függvényt jelöli, a többi elemet (más néven a farok) pedig argumentumként adjuk át.
Ezt prefix jelölésnek nevezik (ahol az operátor megelőzi az operandusokat); elsőre kissé furcsának tűnhet, de valójában nagyon hasznos:
- Egy operátort több argumentumra is alkalmazhatsz anélkül, hogy meg kellene ismételned (pl. (+ 1 2 3))
- Az operátorok precedenciája egyértelművé válik, hiszen egy másik operátor hívásához úgyis új S-kifejezést kell definiálnod

Érdekes módon a listákat még a forráskód reprezentálására is használják, de erre később visszatérünk.

Általánosságban a legtöbb Lispnek meglehetősen minimális a szintaxisa és viszonylag egyszerű a szemantikája, ami viszonylag könnyen megtanulhatóvá teszi őket, és a kód megértése is könnyebbé válik.
Ez a minimális szintaxis azonban nem teszi őket kevésbé hatékonyakká!
E két tulajdonság ötvözése (minimális szintaxis + egyszerű szemantika) ideálissá teszi a Lispeket fordítók és értelmezők írására.
Ha valaha saját fordítót szeretnél építeni, a Lisp megírása jó választás!

### A Lisp menő tulajdonságai

Ahogy korábban említettük, a Lisp nyelvek belül ugyanazokat az adattípusokat és adatszerkezeteket használják a kód reprezentálására.
Ezt a tulajdonságot homoikonitásnak (vagy homoikonikusnak) nevezik.
Más szóval, egy nyelv akkor homoikonikus, ha a benne írt program a nyelv segítségével adatként kezelhető, így a program belső reprezentációjára pusztán a program elolvasásából következtethetünk.
Ezt a tulajdonságot gyakran úgy foglalják össze, hogy a nyelv a kódot adatként kezeli.

## Nyelvek

### Scheme
- Az 1970-es években alkotta meg Guy Steele és Gerald Sussman a MIT AI Labban.
- Egy apró Lisp-értelmező segítségével indult, hogy megértsék Carl Hewitt Actor-modelljét.
- Magát a nyelvet egy kutatási AI Memos-sorozatban mutatták be, amelyeket együttesen Lambda-dolgozatoknak neveznek.
- Ez volt az első Lisp dialektus, amely lexical scopingot használt (az értékek csak ott vannak scope-ban, ahol definiálták), és az elsők egyike volt, amely támogatta az első osztályú folytatásokat.
- Hivatalos IEEE szabvány, valamint egy de facto szabvány, a Revised Report on the Algorithmic Language Scheme (RnRS).
- Számos implementáció létezik: ChezScheme, Guile (mindkettő támogatott az Exercism-ön), MIT/GNU Scheme és Racket
- Nagyon minimális nyelv, kevés szintaxissal, de ez nem szándékos volt.
- A szerzők valami bonyolultat akartak építeni, végül azonban sokkal egyszerűbbet terveztek, mint szándékoztak
- Valódi farokrekurzió. Az iteráció idiómás módja a rekurzió.
- A Scheme optimalizálja a farokrekurzív hívásokat, hogy ne fogyasszon veremtárat vagy más erőforrásokat. Ez azt jelenti, hogy a rekurzió tetszőlegesen nagy adatokon vagy tetszőlegesen hosszú számításokhoz is használható
- Hatékony numerikus adattípusok, köztük racionális és komplex számok
- Késleltetett kiértékelés, ami hasonló a promise-okhoz.
- Hatékony makrórendszer.
- A higiénikus makrók csökkentik a váratlan eredmények valószínűségét a makrók definiálásakor.

### Common Lisp
- A Common Lisp kidolgozása 1981-ben kezdődött, miután Bob Engelmore, az ARPA egyik vezetője kezdeményezte egyetlen, közösségi szabványú Lisp dialektus létrehozását, mert a használatban lévő különféle dialektusok gyakran összeférhetetlenek voltak, ami miatt a kód és a tudás nem volt megosztható
- Az első szabvány 1984-ben, a végleges pedig 1994-ben jelent meg (nagyon stabil specifikáció)
- Mivel szabványról van szó, több implementációja létezik, például a Steel Bank Common Lisp (ez az Exercism alapértelmezettje) és a CLisp.
- Vannak kereskedelmi implementációk is, például az Allegro CL és a LispWorks, valamint az ECL (Embeddable Common Lisp), amely C-programokba ágyazható, és az ABCL, amely a Java virtuális gépen fut.
- Szabvány határozza meg (ANSI INCITS 226-1994), így a 30 évvel ezelőtt írt kód ma is gond nélkül fut
- Gazdag és bővíthető típusrendszer
- Image- és REPL-alapú fejlesztésre tervezték, így nagyon jól introspektálható.

### Emacs Lisp
- 1985-ben fejlesztették ki azzal a céllal, hogy hatékony nyelv álljon rendelkezésre egy szövegszerkesztő kiterjesztéséhez
- Dinamikusan típusos
- Az Emacs körülbelül 80%-a Emacs Lispben íródott (20%-a C-ben, teljesítménybeli okokból)
- Kicsit különbözik a többi Lisptől:
- Nincs szabványosítva, még mindig lassan fejlődik
- Nincs automatikus farokhívás-elimináció, a támogatást a named-let makró adja (amely while-ciklusrá alakítja)
- Alapértelmezésben dynamic scoping, új kódhoz a lexical scoping ajánlott
- Jó dokumentáció a szerkesztőn belül
- Többplatformos (mindenhol fut, ahol az Emacs)
- A nyelvet úgy tanulhatod meg, hogy elolvasod azon funkciók kódját, amelyeket nap mint nap használsz (Emacs Core + csomagok)
- A Common Lisp egy részhalmaza elérhető a cl-lib csomagon keresztül. Míg az Emacs Lisp meglehetősen minimalista, a Common Lisp sokkal szélesebb funkciókészlettel rendelkezik. A cl-lib csomag a CL egy részhalmazát teszi elérhetővé

### Racket
- Matthias Felleisen alapította a PLT Inc.-t, amely 1995 januárjában úgy döntött, hogy egy Scheme-alapú pedagógiai programozási környezetet fejleszt ki. Eredetileg PLT Scheme volt a neve, később Racketre keresztelték át.
- Amellett, hogy pedagógiai programozási környezet, platformként is tervezték programozási nyelvek tervezéséhez és implementálásához.
- Modern Lisp, a Scheme leszármazottja
- Támogatja a logikai programozást!
- Egyszerű, kifejező szintaxis, amely egyszerre ideális kezdőknek és hatékony a szakértők kezében
- Számos programozási paradigmát támogat: funkcionális programozás, objektumorientált programozás, design by contract, logikai programozás, metaprogramozás
- Átfogó szabványos könyvtár
- A DrRacketkel érkezik, egy komplett IDE-vel, amelyet tanuláshoz és felfedezéshez terveztek, a lehető legkevesebb vesződséggel
- Kiváló dokumentáció rengeteg háttérinformációval és példával

### Clojure
- Rich Hickey fejlesztette ki azzal a céllal, hogy egy modern Lisp legyen, amely a JVM-en fut, és kiváló párhuzamosságot kínál
- A Lisp dialektusa, de némileg különbözik a többi Lisptől: nem támogatja az implicit farokrekurziót (ne aggódj, ha nem tudod, mi ez), és a listáknál több adatszerkezete van: map-ek/set-ek/vektorok. Ezeknek az adatszerkezeteknek mind saját literál szintaxisuk van.
- Ráadásul mind megváltoztathatatlanok, mégis kiváló teljesítményt nyújtanak: az O(log32 n) keresés „gyakorlatilag” állandó idejű
- Futásidejű polimorfizmus multimethodokkal és protokollokkal
- Kiváló JVM-interoperabilitás
- A Clojure Spec adatspecifikációs rendszer (futásidejű, nem fordítási idejű), amely lehetővé teszi az adatok szerkezetének meghatározását, adatok generálását, tulajdonságalapú tesztelést és még sok mást

## Felhasználási területek

### Scheme
- Az oktatásban használják a számítástudomány tanításának segítésére (a nagy hatású Structure and Interpretation of Computer Programs Scheme-et használ).
- Az AI-ban használják. Szkriptnyelvként használják például a GIMP-ben (grafikus szerkesztő), CAD-eszközökben (számítógéppel segített tervezés), sőt filmekben is: a Final Fantasy: The Spirit Within renderelőmotorját vezérlő szkriptekben

### Common Lisp
- A Common Lispt sok helyen használják, például a mesterséges intelligenciában és a kutatásban, de kereskedelmi alkalmazásokban is: a NASA a Deep Space One űrhajó automatikus pilóta szoftverét írta Common Lispben, a Viaweb szintén Common Lispben íródott, amelyet később felvásárolt a Yahoo, és Yahoo Store! néven nevezett át, valamint a Reddit első verziója is

### Emacs Lisp
- Az Emacs Lispt hát, az Emacsban használják!
- A lényegét tekintve az Emacs egy Emacs Lisp-értelmező, amely a Lisp programozási nyelv egy dialektusa, de szövegszerkesztést támogató kiterjesztésekkel bővítve

### Racket
- Az oktatásban használják, mivel a Racketet úgy tervezték, hogy hangsúlyt fektessen a nyelvkészítés, -egyszerűsítés és -elemzés támogatására.
- A kutatásban használják, mivel bővíthető szintaxisa és szemantikája alkalmassá teszi új nyelvek és nyelvi funkciók tervezésére és prototípusának elkészítésére.
- Játékokban is használják, például John Carmack (a Doom hírnevéből) egy interaktív szkriptkörnyezetben VR-hoz, a Naughty Dog fejlesztő pedig szkripteléshez használta (például az Unchartedben). A Hacker News Arcban íródott, amely szintén egy Lisp, és maga Racketben készült.

### Clojure
- A Clojure-t sokféle dologra használják, például a Docker 2022-ben felvásárolta az Atomistot, amely egy Clojure-ben megvalósított konténerbiztonsági és -automatizálási platform.
- A világ legnagyobb Clojure-felhasználója a Nubank, egy új bank, amely néhány éve felvásárolta, és ma a Clojure alapesapatát alkalmazza.
- Széles körben használják gyors prototípus-készítésre, mivel dinamikus és rendkívül interaktív.

## Programozási szempontból
Minden nyelv támogatja a funkcionális, imperatív és szimbolikus paradigmát.
Némelyikük az OOP-t is támogatja, leginkább a Common Lisp.

A Lispek többnyire dinamikus nyelvek, bár a Racket támogatja a statikus típusozást.

Ez nem jelenti azt, hogy mindegyikük interpretált, mivel itt többféle megoldás keveredik: interpretált (fordítási lépés nélkül), bájtkódra fordított, majd interpretált, valamint közvetlenül gépi kódra fordított változatok.

### Scheme
- Minimalista, világos és egyszerű szemantikával, és kevésféle módon lehet benne kifejezéseket alkotni.
- Könnyen megtanulhatóvá teszi a nyelvet, és a kód megértését is megkönnyíti.
- Ezért a Scheme-et gyakran használják bevezető számítástudományi kurzusokon is
- Első osztályú folytatások.
- A folytatás egy program állapotának reprezentációja.
- A folytatások használhatók vezérlési folyam (például egy `return` szerkezet) vagy korutinok (amelyek lehetővé teszik a többfeladatos működést) modellezésére

### Common Lisp
- Bővíthető objektumorientált rendszer programozható metóduskombinációkkal (mind az al- és fölérendelt osztályok metódusainak összekapcsolásában, mind a before, after és around metódusok révén, amelyek lehetővé teszik a rendszerek bővítését azok módosítása nélkül)
- Programozható feltételrendszer (a „kivételek” szuperhalmaza), amely lehetővé teszi, hogy a feltételek felismerését leválasszuk a kezelésük módjáról. A feltételrendszer rugalmasabb a kivételrendszereknél, mert ahelyett, hogy két részre osztaná a felelősséget: a hibát jelző kód1 és a hibát kezelő kód2 közé, a feltételrendszer három részre bontja: a feltétel jelzésére, kezelésére és az újraindításra.
- A makrók lehetővé teszik a nyelv szintaxisának bővítését, nem csupán sablonkód generálását. Ez segít abban, hogy a nyelvet a területhez igazítsuk, nem pedig fordítva.

### Emacs Lisp
- Kiváló szerkesztőtámogatás és integráció
- Az Emacs futás közbeni testreszabására használható („olyan, mintha agyműtétet hajtanál végre magadon” :))
- Batch módban is használható, amelyben a szerkesztő szövegfeldolgozási képességei mind a rendelkezésedre állnak (például pufferek és mozgási parancsok)

### Racket
- Hatékony makrórendszer. Az olyan szintaktikai cukrok, mint a threading makrók, erre épülnek. A makrók ráadásul higiénikusak, ami egy egyszerű kérdésre ad választ: a makró kódot generál, amely máshol helyezkedik el. Amikor ez a kód kiértékelésre kerül, hogyan határozzuk meg a benne lévő azonosítók kötéseit? A higiénikus makrók csökkentik a váratlan eredmények valószínűségét a makrók definiálásakor.
- Nyelvorientált.
- A Racket tartalmazza az eszközöket saját programozási nyelv vagy DSL írásához, a Racket makróira építve.
- Számos beépített nyelv, például a typed Racket (amely statikusan ellenőrzött típusannotációkat támogat), a datalog (Prolog-szerű nyelv), amelyet a DrRacket IDE támogat, és a scribble, egy eszköz HTML vagy PDF formátumú szöveges dokumentumok készítésére
- A REPL a fejlesztési munkafolyamat központi része, nem csak dolgok kipróbálására és dokumentációkeresésre való

### Clojure
- Hatékony makrórendszer.
- Az olyan szintaktikai cukrok, mint a threading makrók, erre épülnek
- A REPL a fejlesztési munkafolyamat központi része, nem csak dolgok kipróbálására és dokumentációkeresésre való

## Melyiket próbáld ki

- Ha még sosem próbáltál Lispt, a Scheme és a Racket remek választás, mivel mindkettőnek nagyon minimális a szintaxisa.
- Ugyanakkor a Common Lispnek és a Clojure-nak is van tanulómódja, így valószínűleg ezek a legjobbak az Exercism-ön való tanuláshoz.
- Ha már használod az Emacst, az Emacs Lisp kézenfekvő választás.
- Hasonlóképpen, ha JVM-es nyelvet használsz, a Clojure kézenfekvő lehetőség.
- Az Emacs Lisp (Emacsen keresztül), a Clojure (IntelliJ-n keresztül) és a Racket (DrRacketen keresztül) mind kiváló IDE-támogatással rendelkezik.
- Persze a Common Lisphez és a Scheme-hez is vannak jó IDE-k.
- Ha igazán széles funkciókészletű Lispt szeretnél, a Common Lisp, a Clojure és a Racket igazán átfogó
- Ha egy kicsit másféle Lispt szeretnél, a Clojure szintaxisa meglehetősen egyedi egy Lisphez képest.
- Ha érdekelnek a makrók és a metaprogramozás, gyakorlatilag mindegyik jó választás! De ha új nyelveket szeretnél építeni, a Racket különösen kiváló

Persze, ha van időd, azt javaslom, próbálj ki belőlük néhányat!
És ne félj a zárójelektől! Tudom, én is féltem, ezért halogattam a Lisp tanulását jó ideig.
De gyorsan hozzászoksz majd hozzájuk, és talán meg is kedveled őket, ahogy én.
Sőt, ma már szeretem a Lisp nyelveket: minimális szintaxis, könnyű szemantika, mégis nagyon kifejezőek.
