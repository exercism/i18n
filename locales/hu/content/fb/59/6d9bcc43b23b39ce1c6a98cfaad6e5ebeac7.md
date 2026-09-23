# Objektumorientált október

## Bevezetés

Sziasztok! Remélem, jól vagy. Mozgalmas hónapunk volt szeptemberben. Rengeteg új fejlesztést és funkciót hoztunk az oldalra, nagyrészt a mentorálás és a hozzá kapcsolódó folyamatok javítására összpontosítva. Ennek eredményeként most kétszer annyi mentorálási kérés fut be, mint 4 héttel ezelőtt ilyenkor, ami remek dolog. Ha még nem próbáltad, hogy egy mentor átnézze a kódodat, mindenképp tedd meg: ez egy fantasztikus módja a tanulásnak. És ha másokon szeretnél segíteni, rengeteg kérés vár rád a mentorálási sorokban. A Közreműködés menüben a Mentorálás linkre kattintva jelentkezhetsz mentornak! Emellett egy nagy adatbázisfrissítést is végrehajtottunk MySQL 5.6-ról MySQL 8-ra, amit felvettem, és elérhető az Insiders szekcióban. Tehát ha Insider vagy, és még nem nézted meg, mindenképp nézd meg!

Akkor térjünk rá a #12in23-ra. Szeptember érdekes hónap volt, a tömör, velős nyelveket fedeztük fel. Ebben a hónapban a másik irányba megyünk, és sokkal nagyobb fenevadakat veszünk szemügyre. Az objektumorientált nyelvekre összpontosítunk, konkrétan ezekre: C#, Crystal, Java, Pharo, Ruby és PowerShell. A Pharóról és a Javáról már beszéltünk, májusban, illetve augusztusban, így ezekre most nem térünk ki újra ebben a videóban. De ha érdekel a bevezető ezekhez a nyelvekhez, nézd meg a korábbi hónapok videóit. Ebben a videóban viszont a C#-ot, a Crystalt, a Rubyt és a PowerShellt járjuk körbe, és szokás szerint Erik vezet majd végig minket azon, mi teszi ezeket a nyelveket érdekessé és egyedivé.

## A jelvények

Ahogy mindig, az Objektumorientált október jelvényt most is megszerezheted, ha bármelyik 5 feladatot teljesíted ezeken a nyelveken. Ott van még az egész éves jelvény is, amelyért tudom, hogy sokan dolgoztok. Ehhez 5 kiemelt feladatot kínálunk, amelyeket érdemes megoldanod, és mindegyik kiválóan alkalmas arra, hogy objektumorientált módon oldd meg. Ezek a következők:

- **Bináris keresőfa**: számok beszúrása és keresése egy bináris fában
- **Körkörös puffer**: egy végponttól végpontig összekapcsolt adatszerkezet megvalósítása
- **Óra**: olyan óra megvalósítása, amely dátumok nélkül kezeli az időpontokat
- **Mátrix**: egy stringként ábrázolt mátrix sorainak és oszlopainak visszaadása
- **Egyszerű titkosítás**: egy helyettesítő titkosítás megvalósítása

## Áttekintések

### C#
- 2000-ben fejlesztette ki Anders Hejlsberg a Microsoftnál
- A nyelvnek és a virtuális gépnek hivatalos specifikációja van. 2002-ben hivatalos ECMA-szabvány, 2003-ban pedig ISO-szabvány lett
- A fordító, a .NET Framework (szabványos könyvtár) és a Visual Studio (szerkesztő) kezdetben zárt forráskódú volt, de a fordítót és a .NET Frameworköt 2014-ben nyílt forráskódúvá tették
- Bár sok szintaxist megoszt a Javával (amely néhány évvel korábban jelent meg), a C# nem volt a Java egy az egyben másolata (pl. támogatja a tulajdonságokat, az értéktípusokat, és nincsenek benne ellenőrzött kivételek)
- Bytecode-ra fordít, és a .NET 7 óta a gépi kódra fordítás is támogatott (még mindig fejlesztik)
- Rengeteg szoftverben használják, a weboldalaktól a beágyazott rendszerekig, az alkalmazásoktól (Xamarin) a játékokig (Unity)

### Crystal
- A Crystalt Ary Borenszweig (akinek van fiókja az Exercism-ön), Juan Wajnerman és Brian Cardiff fejlesztette ki (eredetileg Joy volt a neve, de 3 nappal később Crystalre keresztelték :))
- Úgy tervezték, hogy a Ruby eleganciáját és termelékenységét hozza, egy modern fordított nyelv sebességével, hatékonyságával és típusbiztonságával.
- Nyílt forráskódú nyelv, amelyet a Manas szervezet fejleszt.
- Az 1.0-s verzió 2021-ben jelent meg.
- Az LLVM segítségével gépi kódra fordít (a Rusthoz hasonlóan)
- A fordítót kezdetben Rubyban írták, de később önmagát fordító verzióra állították át
- A Nikola kamiongyártó cég, a Manas és mások használják, többnyire weboldalakhoz, de felhőszolgáltatásokhoz, parancssori alkalmazásokhoz és szkriptekhez is

### PowerShell
- A Microsoftnál Jeffrey Snover vezette csapat építette, és eredetileg 2006-ban jelent meg.
- A fejlesztést az Intel indította el, amely a KornShell szkriptjeiket a Sun RISC-ről egy másik platformra akarta átvinni, hogy segítse a processzoraik fejlesztését. Végül az Intel más platformot választott, de a Microsoft folytatta az új shelljük, a PowerShell fejlesztését, mivel az lehetőséget kínált a Windows rendszeradminisztrációjának javítására (ami akkoriban nem volt valami fényes, és gyakran grafikus felületeket igényelt)
- A szintaxisa a KornShellből merített ihletet, de a PHP-ból, a Perl-ből és másokból is
- Az első verzió csak .NET Frameworkön futott, ami azt jelentette, hogy csak Windowson működött. A PowerShell 6.0 viszont (amely 2018-ban jelent meg) .NET Core-on futott, ami platformfüggetlen és nyílt forráskódú.
- Elsősorban rendszeradminisztrációra használják, de parancssori segédeszközök vagy más eszközök köré írt wrapperek készítésére is. Mi rengeteget használtuk arra, hogy tömegesen dolgozzunk az Exercism repóival

### Ruby
- Yukihiro Matsumoto (azaz Matz) fejlesztette ki, és először 1995-ben jelent meg
- Matz egy rendes objektumorientált szkriptnyelvvel akart dolgozni, de nem tetszettek neki a létező lehetőségek (például a Perl és a Python), ezért új nyelvet épített: a Rubyt
- Matz így írja le a Rubyt: a magja egy egyszerű Lisp nyelv, a Smalltalkéhoz hasonló objektumrendszerrel, magasabb rendű függvények ihlette blokkokkal és a Perlhez hasonló gyakorlati hasznossággal.
- Általában értelmezve fut, de gépi kódra is fordítható just-in-time módon
- A hivatalos értelmező mellett vannak alternatív implementációk is, például a JRuby (a JVM-en fut), a Rubinius (LLVM-et használ) és a YJIT, egy just-in-time fordító, amely a hivatalos telepítőcsomag részeként érkezik
- Többnyire weboldalakban használják (a Ruby on Rails segítségével), például a GitHub, a Stripe, a Shopify és még sokan mások (köztük az Exercism és az Exercism fórum!). A Rubyt automatizálásra is használják

## És programozási szempontból miben térnek el?

Mind objektumorientált nyelvek, bár nem mindegyik ugyanúgy valósítja meg (pl. a Crystal és a Ruby a Smalltalk üzenetküldő modelljét használja a metódusok meghívására).

### C#
- Erős és statikus típusú
- Az imperatív és deklaratív paradigmákat is támogatja, és egyre inkább funkcionálissá válik

### Crystal
- Erős és statikus típusú (a Rubytól eltérően)
- A funkcionális és imperatív programozást is támogatja

### PowerShell
- Erős típusú
- Az imperatív és funkcionális programozást, valamint a pipeline-alapú programozást is támogatja.

### Ruby
- Dinamikus típusú
- A funkcionális és imperatív programozást is támogatja

Mindezek ellenére ezek a nyelvek elsősorban objektumorientált nyelvek.

## Mi teszi nagyszerűvé ezeket a nyelveket?

### C#
- (Szinte) mindenhol fut, beleértve a Xamarinen keresztüli alkalmazásokat is. Eredetileg csak Windowson futott, amiből megszületett a Mono, egy ingyenes és nyílt forráskódú, platformfüggetlen C#-fordító- és futtatókörnyezet-implementáció. 2015-ben bemutatták a .NET Core-t, amely teljesen platformfüggetlen és nyílt forráskódú volt.
- Általános célú: szinte bármilyen feladatra használható, beleértve az alkalmazásokat, weboldalakat és játékokat
- Kifejező: viszonylag kevés C#-kóddal sokat lehet elérni. A LINQ különösen nagy termelékenységnövelő, és nagyon élvezetes vele dolgozni
- Kiváló tooling, mind az IDE-khez, mind más eszközökhöz, például build rendszerekhez. Míg a Visual Studio csak Windowson fut, a JetBrains Rider és a VS Code platformfüggetlen
- A .NET Compiler Platform (amit gyakran Roslynnak neveznek) fantasztikus módja a C#-kód elemzésének, átalakításának és generálásának (kiterjedten használjuk a C# tesztfuttatóban, elemzőben és representerben)
- A dokumentáció kiterjedt, részletes és jól megírt
- Nagy közösség: rengeteg erőforrás elérhető, többek között blogok, fórumok és még sok más

### Crystal
- Elegáns és olvasható szintaxis, ami könnyen olvashatóvá és írhatóvá teszi a Crystal-kódot
- Kifejező. A Rubyhoz hasonlóan a Crystal is nagyon kifejező, kevés kóddal sokat lehet elérni. Ez részben a kiváló és kiterjedt szabványos könyvtárnak köszönhető.
- Gyors. A statikus típusozás lehetővé teszi az LLVM-mel történő hatékony gépi kódra fordítást, egyszerű memóriakezeléssel egy szemétgyűjtőn keresztül.
- Nagyszerű objektumorientált megvalósítás. Minden objektum, beleértve az osztályokat és az olyan primitív típusokat is, mint a számok és a Boolean-ok
- Minden benne van, nagy szabványos könyvtár, beépített formázó, sablonmotor, tesztkeretrendszer és még sok más
- Interoperabilitás. Könnyű együttműködés a C könyvtárakkal
- Platformfüggetlen: Linuxon, macOS-en és Windowson fut, bár a Windows egyelőre nem elsőrangú állampolgár

### PowerShell
- Nagy tudású: a PowerShell hatékony eszköz a rendszergazdák számára. Jól integrálódik sok más rendszerrel, például a Windows operációs rendszerrel (összetevők, szolgáltatások és beállítások), valamint más Microsoft-termékekkel, mint az Exchange, a SharePoint, az Azure stb. Számos más technológiával is együtt tud működni, például REST API-kkal, adatbázisokkal, webszolgáltatásokkal és még sok mással.
- Elérhetőség: a PowerShell minden modern Windows operációs rendszeren előre telepítve van, és bármely .NET-et futtató rendszerre telepíthető (beleértve a macOS-t, a Linuxot és sok Unix rendszert)
- Biztonság: a PowerShell olyan funkciókat tartalmaz, amelyekkel biztosíthatók a szkriptek, és korlátozható a futtatásuk aláírt szkriptek és végrehajtási szabályzatok alapján. Ez kulcsfontosságú az automatizálási folyamataid biztonságának garantálásához.
- Grafikus felület: kombinálhatod más keretrendszerekkel, például a Windows Forms-szal vagy a Windows Presentation Foundationnel, hogy grafikus felületeket tervezz és építs a PowerShell-szkriptjeidhez, felhasználóbarátabbá téve azokat.
- Pipeline: a unix rendszereken használt Bashhez hasonlóan a PowerShell lehetővé teszi a parancsmagok összefűzését bonyolult műveletek és feladatok elvégzéséhez, az egyik parancsmag kimenetét egy másik bemeneteként átadva

### Ruby
- Elegáns és olvasható szintaxis, ami könnyen olvashatóvá és írhatóvá teszi a Ruby-kódot
- Kifejező. A Ruby nagyon kifejező nyelv, kevés kóddal sokat lehet elérni. Ez részben a kiváló és kiterjedt szabványos könyvtárnak köszönhető
- Hatalmas ökoszisztéma, rengeteg elérhető könyvtárral (gem)
- Nagyszerű objektumorientált megvalósítás. Minden objektum, beleértve az osztályokat és az olyan primitív típusokat is, mint a számok és a Boolean-ok.
- Pragmatikus. A Ruby és a legtöbb könyvtára nagyon pragmatikus, a valós problémák megoldására összpontosít.
- Interoperabilitás. Könnyű együttműködés a C könyvtárakkal, amit gyakran használnak, amikor a teljesítmény különösen fontos. Például a Nokogiri gem lehetővé teszi az XML-lel való nagy teljesítményű munkát azáltal, hogy C könyvtárakat csomagol be a nehéz munka elvégzéséhez
- Sok innováció történik. Például a Stripe megépítette a Sorbet-et, egy Ruby típusellenőrzőt, a Shopify kifejlesztette a YJIT-et, egy Just-In-Time fordítót Rubyhoz (a Ruby 3.1+ része), és dolgoznak a WASM-támogatáson

## Kiemelkedő tulajdonságok

### C#
- Kiváló teljesítmény, különösen egy menedzselt nyelvhez képest. Mind a nyelv, mind a futtatókörnyezet rengeteg funkcióval rendelkezik a teljesítmény javítására, például a Span<T> típus és a CPU-intrinsic-ekhez való hozzáférés (mint az AVX utasítások). A CLR egy érett, stabil és rendkívül nagy teljesítményű virtuális gép, amelyet folyamatosan fejlesztenek
- Hatalmas ökoszisztéma, rengeteg elérhető könyvtárral. Ezek a könyvtárak, akárcsak a C#, érettek, stabilak és teljes körűek
- Modern és fejlődő: a nyelv és a futtatókörnyezet továbbra is fejlődik, a nyelvet nagyon rendszeresen frissítik, hogy modernebb legyen. Példák erre:
- async/await az egyszerű egyidejűséghez
- span<T> a hatékony memóriahasználathoz
- Nullázható referenciatípusok (megoldva a milliárd dolláros tévedést)
- A futtatókörnyezetet is rendszeresen frissítik, például a .NET AOT, amellyel közvetlenül gépi kódra lehet fordítani
- Kevésbé sok alternatíva, mint sok más nyelvnél/ökoszisztémánál. A legtöbb célra elég az alapértelmezett, Microsoft által biztosított megoldásokat használni, amelyek gyakran az IDE-t is tartalmazzák. Ezt egyesek hátránynak is tarthatják, de nagyszerű lehet, különösen amikor valaki most kezd el egy nyelvvel ismerkedni

### Crystal
- A két világ legjobbja. A globális típuskövetkeztetés és az uniótípusok kombinációja miatt a Crystal dinamikus típusú nyelvnek tűnik, ahol gyakran kevés típust kell megadni, mégis egy statikusan típusos nyelv teljesítményét és további biztonsági garanciáit nyújtja (beleértve a nil ellenőrzését fordításkor)
- Metaprogramozás. A Ruby dinamikus, futásidejű metaprogramozása helyett a Crystalban makrók vannak, amelyek fordításkor futnak. A makrók AST-csomópontokon dolgoznak, és kódot állítanak elő. Meglehetősen könnyű definiálni és használni őket. Az Embedded Crystal (ECR) egy beépített sablonmotor, amely makrók segítségével ágyaz be Crystal-kódot más szövegbe
- Kiváló egyidejűség. Az egyidejűség könnyen használható egy Go-hoz hasonló modellel, amely fibereket (könnyűsúlyú végrehajtási egységeket) használ, amelyek csatornákon keresztül kommunikálnak
- Termelékeny és szórakoztató. A Rubyt híresen a termelékenységre és a fejlesztői boldogságra tervezték, elegáns, olvasható szintaxissal és remek ergonómiával. Mivel a Crystal szintaxisa és tervezése nagyon hasonlít a Rubyéhoz, ez a Crystalra is igaz (érdekesség: jó néhány Ruby-kód érvényes Crystal-kód is egyben).

### PowerShell

- Parancsmagok: a PowerShell parancsmagokat (ejtsd: „command-lets”) használ építőelemekként. Ezek kicsi, feladatorientált parancsok, amelyek meglévő funkciókat csomagolnak be, és egységes (például a Get-Help bármely parancsmag súgójának megjelenítéséhez), rendszergazdabarát felületet nyújtanak a rendszergazdák számára. Számos „háttérrendszerhez” léteznek parancsmagok, például az összes .NET-osztályhoz, a Windows Management Instrumentation-höz, az Azure-hoz és még sok máshoz. A parancsmagok bármely .NET-nyelven definiálhatók, és nagyon deklaratív módon írhatók le, a paraméterek, azok érvényesítése, követelményei (required true/false), alternatív (switch) nevei stb. könnyedén megadhatók.
- Objektumorientált: a PowerShellben szinte minden egy objektum, sok különböző tulajdonsággal. A fájlok, folyamatok, beállításjegyzék-kulcsok, sőt az olyan egyszerű adattípusok is, mint a string és a szám, mind objektumként kezeltek, ez a megközelítés leegyszerűsíti a különböző adattípusokkal és szolgáltatásokkal való munkát és interakciót. Nagyon ismerős lesz mindenkinek, aki dolgozott már .NET-tel
- Távoli felügyelet: támogatja a Windows szerverek és rendszerek, sőt az Azure, AWS és GCP felhőerőforrásainak távoli felügyeletét, ami elengedhetetlen a nagyszabású automatizálás és élesítések kezeléséhez.
- Bővíthető: remek beépített modulrendszerrel rendelkezik, emellett egyedi parancsmagokat, függvényeket és modulokat hozhatsz létre, és más programozási nyelvekkel és könyvtárakkal is dolgozhatsz, hogy szükség szerint tovább bővítsd a képességeit.

### Ruby

- Termelékeny és szórakoztató. A Rubyt híresen a termelékenységre és a fejlesztői boldogságra tervezték. Bár nehéz számszerűsíteni, azoknak az embereknek a lelkesedése, akik használták a Rubyt, magáért beszél
- Metaprogramozás. A Ruby rendkívül dinamikus, és lehetővé teszi a futásidejű metaprogramozást. Akár meglévő osztályok monkey patchelése, akár metódusok dinamikus hozzáadása vagy meghívása, a Ruby mindent lefed
- A Ruby on Rails egy fantasztikus, teljes körű keretrendszer weboldalak építéséhez. Beépítve tartalmaz sablonozást, gyorsítótárazást, ActiveRecordet (az adatbázissal objektumokon keresztüli interakció módját), migrációkat, scaffoldinget, WebSocketeket és még sok mást.

## Melyiket válaszd

- Ha ismered az objektumorientált programozást, de egy másfajta megközelítését is látnád, próbáld ki a Pharót
- Ha ismered a Javát vagy a C#-ot, de egy ideje nem nyúltál hozzájuk, adj nekik még egy esélyt. Mindkét nyelv sokat fejlődött, nézd meg azokat a csillogó új funkciókat!
- A C# és a Java (valamint kisebb mértékben a Ruby) is remek választás, ha munkát keresel, mivel ezek a munkaadók által legkeresettebb nyelvek közé tartoznak
- Ha ismered a Rubyt, próbáld ki a Crystalt, hogy lásd, milyen lenne egy statikusan típusos Ruby
- Ha szereted a dinamikus nyelveket, de közben kiváló teljesítményt is szeretnél, nézd meg a Crystalt
- Ha ismered a Basht vagy a Windows batch-fájlokat, próbáld ki a PowerShellt egy másfajta, objektumorientált shell-szkriptelési megközelítésért
- Ha általában szereted a szkriptnyelveket, a Ruby, a Crystal és a PowerShell is jó választás
- A Pharo, a Crystal és a Ruby remek választás, ha egy kis metaprogramozást szeretnél (a C# is kap néhány metaprogramozási funkciót)
- Ha szeretnéd megtapasztalni, milyen egy olyan nyelvben programozni, amelyet nem szöveges fájlok támasztanak alá, próbáld ki a Pharót és annak egyedi és hatékony IDE-jét
- Ha szeretsz weboldalakat építeni, a Ruby a Ruby on Rails keretrendszerével érdemes kipróbálásra
