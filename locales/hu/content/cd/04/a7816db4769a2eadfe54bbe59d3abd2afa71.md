**Spoilerfigyelmeztetés: Ez a cikk spoilereket tartalmaz a Grains feladattal kapcsolatban általában, és konkrétan a Bash-kurzus Grains feladatát illetően. Ha még nem oldottad meg magad, és nem akarod, hogy megoldásokat mutassanak neked, gyere vissza, miután kész vagy vele!**

Ez az első napod egy új cégnél. Minden papírmunkát elintéztél, megismerted a csapatot, és végre eljött az idő, hogy leülj, és elkezdd olvasni azt a kódot, amin dolgozni fogsz. Nekiállsz átolvasni a különböző függvényeket, osztályokat és modulokat, és ahogy olvasol, azon kapod magad, hogy értetlenül hunyorogsz a képernyőre. Tovább olvasol, és egyetlen szó szökik ki a szádból, alig kimondva, szinte csak lehelve: „Miiiiiiicsodaaaa...”[^1] Minél tovább haladsz, annál gyakrabban megesik ez, ahogy egyre zavartabb leszel, sőt egy kicsit dühös is.

> Mi történik ebben a kódban?

Amikor egynél több ember dolgozik ugyanazon a kódon, a gondosság és a szándékosság mennyisége, ami ahhoz kell, hogy a dolgok kezelhetőek maradjanak, *jelentősen* megnő. Már nem az a helyzet, hogy a fogalom a fejedben él, és a kódnak csak meg kell valósítania azt. Most a fogalomnak *a kódban kell élnie*, ahol minden közreműködő látja, és ha kell, meg is tudja változtatni.

*Hogyan* valósítasz meg valamit, nem sokat jelent a végfelhasználónak, de *rengeteget elárul* minden mérnöknek, aki valamikor is kapcsolatba kerül a terveddel. Gyakran sokféleképp lehet elérni ugyanazt a funkcionalitást, és úgy tűnhet, bármelyik megoldás elegendő a feladat elvégzéséhez. Én azonban úgy gondolom, hogy minden egyes döntésednek legyen oka (még ha egy kis döntés is, kis okkal), és annak az oknak egy célt vagy követelményt kell közvetítenie.

Azt az elképzelést, hogy a megvalósítás részletei segítsenek a kód olvasóinak felismerni a gondolatmenetet, a célokat és a prioritásokat, **tervezési szándéknak** nevezzük. Hogyan nevezed el a változóidat, milyen paramétereket vesz fel a függvényed, és hogyan vonod el a dolgokat: mind olyan hely, ahol kifejeződhet a tervezési szándék, akár jól, akár rosszul.

Szilárdan hiszem, hogy a tervezési szándék az egyik legfontosabb dolog, amit egy mérnöki terv megvalósításakor figyelembe kell venni. Ez az egyik dolog, ami megkülönbözteti a szoftvermérnökséget a programozástól.

 > A szoftvermérnökség az, ami a programozásból lesz, amikor hozzáadod az időt és a többi programozót.
 >
 > - [Russ Cox](https://research.swtch.com/vgo-eng)

## A tervezési szándék túlmutat a szakterületeken

Gépészmérnökként dolgozom, és többnyire orvostechnikai eszközökhöz tervezek [fröccsöntő szerszámokat](https://youtu.be/WHwTHarf8Ck?t=51). Minden tervem, amint elkészül, egyenesen kimegy az ajtón a műhelybe, ahol elkezdik legyártani az összes alkatrészt, és össze is szerelik őket. Mivel ők nem tudják mindazt, ami a fejemben járt, miközben az egyes terveket készítettem, találnom kell egy módot, hogy magán a terven *megmutassam* a szándékomat.

Gyakran előfordul, hogy bizonyos jellemzők különösen kritikusak. Vagy az ügyfél mondta, hogy ott szűk tűrésekre van szüksége, vagy a szerszám illeszkedésének módja miatt kell valamiért rendkívüli pontosság. Ezért, hogy segítsek a megmunkálóknak úgy legyártani az alkatrészeket, hogy a fontos részeknél a pontosság élvezzen elsőbbséget, olyan helyeket hagyok, amelyek kifejezetten szögletesek, vagy egy bizonyos módon könnyen befoghatók a satuba. Így a számukra legkönnyebb út hozza nekem a legjobb eredményt.

Vannak olyan helyek is, ahol a méretek nem annyira kritikusak. Ha például a tervben egy lyukat csak szellőzőnyílásnak szánok, akkor szép, szokványos méretre csinálom, mondjuk 6 mm-re.

Amikor ezt a lyukat munkálják meg, és megmérik, hogy sikerült, ha olyan számot látnak, mint 5,99 mm, azt gondolják: „OK, ez valószínűleg 6 mm lett volna, szóval elég közel vagyok”, és még csak utána sem kell nézniük a méreteknek a CAD-ben vagy a műszaki rajzon. Ha viszont valami szokatlan méretet választanék, mondjuk 5,87 mm-t, akkor ránéznének, és ez lenne az első reakciójuk:

1. Jaj, ne, nagyon alulméretezett lett? 6 mm-nek kellett volna lennie?
2. (Elmennek megnézni a CAD-et, és látják, hogy a lyuk jó, csak épp szokatlan a mérete.)
3. Hmmm. Biztos vagyok benne, hogy ez a lyuk valamiért szokatlan méretű. Lehet, hogy nagyon fontos, vagy az ügyfél kért ide egy különleges lyukat. El kell mennem Ryanhez, hogy megtudjam, mi olyan fontos ebben a lyukban.
4. (CSATT! Finoman leteszik az alumíniumdarabot az asztalomra.)
5. (Megtudják, hogy ebben a lyukban semmi fontos nincs, csak egy furcsa méretet választottam, és az összes plusz munka meg aggodalom a semmiért volt.)
6. Hát ez a Ryan fickó, az aztán egy igazi jelenség. (morgás, káromkodás, morgás)

Mindez azért történik, mert a tervem minden döntése közvetít valamit azoknak, akik nézik és rajta dolgoznak, akár akarom, akár nem. *Kénytelenek* jelentést látni benne, mert ez az egyetlen információ, amire támaszkodhatnak! Ezért sokkal jobb, ha időt szánok rá, hogy *jelentéses*, **szándékos** információt tegyek a tervembe.

## A Grains feladat bemutatása

Most pedig beszéljünk arról, hogyan lehet a tervezési szándékot kifejezni a kódban, egy Exercism-feladat példáján keresztül. Nemrég egy tanulóval dolgoztam együtt a *Grains* feladat megoldásán a Bash-kurzuson. A *Grains* a [búza és sakktábla problémát](https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem) dolgozza fel. Röviden: a sakktábla első mezőjére egy búzaszem kerül. A következő mezőre kettő. Az azután következőre négy. És így tovább, minden mezőn az előző kétszerese. A tanulókat arra kérik, hogy találjanak módot az egyes mezők értékének kiszámítására, valamint a táblán lévő szemek teljes számának meghatározására.

Ez a bizonyos tanuló egy meglehetősen ötletes módszert talált ki a végösszeg kiszámítására.

```bash
bc <<< 'ibase=16;FFFFFFFFFFFFFFFF'
```

`bc` egy parancssori számológép. Átadhatsz neki aritmetikai kifejezéseket, és kiértékeli azokat, még nagyon nagy egészek és lebegőpontos számok esetén is. Van más mód is a számítások elvégzésére `bc` nélkül Bashben, de az egyszerűség kedvéért most azt nézzük meg, hogyan lehet (vagy nem lehet) a szándékot kifejezni a `bc` használata közben.

Ez a megoldás azért működik, mert az egész feladat a kettő hatványai körül forog, és ahol a kettő hatványai vannak, ott van bináris, ahol pedig bináris van, ott van hexadecimális[^2]!

Ez egy ötletes megoldás, de mit mond el nekünk a kód? Hogy itt a hexadecimális a fontos? Hogy a probléma alapvetően a 16 körül forog? Miután újra elolvastuk a feladat leírását, elég világos, hogy egyik sem áll. A tanulóval ötleteltünk néhány módszert, hogyan lehetne világosabban kifejezni a szándékot. Íme néhány, amit kitaláltunk:

### Első lehetőség: bináris

Mivel egy csomó dolog duplázódik (és így egy csomó kettőhatványunk van), nézzük meg, mi történik binárisban, hátha az segít.

---

Az első mezőn 1 szem van. Binárisban ez is `0b1` lenne (a `0b` csak azt jelenti, hogy „ez egy bináris szám”, maga a szám pedig `1`).

A második mezőn 2 szem van. Binárisban `0b10`. Az eddigi összeg 3 (azaz `0b11`).

A harmadik mezőn 4 szem van (`0b100`). Az eddigi összeg: 7 (`0b111`).

A negyedik mezőn 8 szem van (`0b1000`). Az eddigi összeg: 15 (`0b1111`).

---

Látod a mintát?

Minden mező egy újabb bináris számjegyet jelent, és ha az összeset összeadjuk, az csak csupa 1-est eredményez.

A tanuló megoldásában lecserélhetnénk az F-eket 64 darab 1-esre (egy minden mezőhöz)!

```bash
bc <<< "ibase=2;1111111111111111111111111111111111111111111111111111111111111111"
```

Inkább szándékos, mert jobban illeszkedik ahhoz, amit a probléma ad nekünk. De mi nem beszélünk robotul. Egy hosszú, gyakorlatilag megszámlálhatatlan sorozat 1-es talán nem jelent javulást.

### Második lehetőség: nyers erő

OK, akkor talán teljesen elhagyjuk a nem tízes számrendszereket. Miért ne igazítanánk a kódot ahhoz, ahogy kézzel összegeznénk a sakktáblán lévő szemek számát, megszámolva az egyes mezőkön lévő szemeket?

```bash
total=0
current_grains=1
for square in {1..64}; do
  total=$( bc <<< "$total + $current_grains" )
  current_grains=$( bc <<< "$current_grains * 2" )
done
echo "$total"
```

Ez sokkal olvashatóbb és érthetőbb. A kód világosan mutatja, hogy a sakktábla mezőinek száma meghatározó tényező, akárcsak a mezőnkénti duplázódás. Szerintem ez jobb, mint az eredeti megoldás.

Csakhogy.

Lassú. A ciklus, az összeadás, és hogy újra meg újra meghívunk egy külső parancsot? Mindez összeadódik egy kissé lassú futási idővé. Na és ez akkora probléma? Nem. Ha Bashben szkriptelsz, valószínűleg már eldöntötted, hogy nincsenek sebességkorlátjaid. De lehetne jobb? Igen.

### Harmadik lehetőség: közvetlen számítás

Szóval hogyan adjuk össze mindet iterálás nélkül?

Vegyük ugyanezen probléma egy *kisebb* változatát: egy sakktáblát 5 mezővel[^3].

Az öt mezőn a következő számú szem lenne:

```txt
---------------------
| 1 | 2 | 4 | 8 |16 |
---------------------
```

Az összeg pedig itt ez lenne: 1 + 2 + 4 + 8 + 16 = 31. Hm. A 31-ből még nem ugrik be semmi nyilvánvaló. Menjünk egy kicsit nagyobbra.

OK, akkor mi a helyzet egy 6 mezős sakktáblával? Ezúttal minden mező alá odaírom a futó összeget, hogy könnyebb legyen összeadni.

```txt
-------------------------
| 1 | 2 | 4 | 8 |16 |32 |
|   | 3 | 7 |15 |31 |63 |
-------------------------
```

Az összeg pedig: 1 + 2 + 4 + 8 + 16 + 32 = 63. Hmm... Kezdem látni a minta halvány körvonalait, de csináljunk még egyet, hogy biztosak legyünk.

7 mező:

```txt
-----------------------------
| 1 | 2 | 4 | 8 |16 |32 |64 |
|   | 3 | 7 |15 |31 |63 |127|
-----------------------------
```

1 + 2 + 4 + 8 + 16 + 32 +64 = 127. Látod? Nem cseng be valami a 31, 63, 127 értékeknél?

*Majdnem* a kettő hatványai. Valójában *eggyel kevesebbek*, mint a *következő* kettőhatvány.

Még egy példa, hogy végképp megértsük. Képzelj el egy 12 mezős sakktáblát. Ez egy, megszorozva tizenegyszer kettővel (ami a matek világában 2^11): 2048. Duplázzuk meg újra, és 4096-ot kapunk (2^12). Szóval... ha jól kaptuk el a mintát, a futó összeg *eggyel kevesebb* lesz, mint 4096, más néven 4095. És ha összeadjuk, pontosan azt is kapjuk: 1 + 2 + 4 + 8 + 16 + 32 + 64 + 128 + 256 + 512 + 1024 + 2048 = 4095.

> Másképp megfogalmazva: ha meg akarod kapni mind a `n` mező összegét, egy hatvánnyal feljebb kell lépned a kettőben, és ki kell vonnod az eredményből 1-et.

A 64. mezőn lévő szemek száma 2^63 (nullától indul az indexelés, emlékszel?). Szóóóóval, ha ki akarjuk számítani az összes szem számát az összes mezőn egészen a 64. mezőig, akkor 2^64-et kell kiszámítanunk, és levonnunk belőle 1-et.

Bumm.

Bashben ez így néz ki:

```bash
bc <<< "2^64 - 1"
```

Ez akkor válik értelmessé, ha megnézzük, mi történik binárisban. Binárisban mennyi volt mind a 64 mező összege?

```txt
0b1111...  # 64 ones
```

Mennyi a szemek száma az elméleti 65. mezőn?

```txt
0b10000... # 1 and 64 zeros
```

Hogyan jutsz el az 1-től és 64 nullától a 64 egyesig? Kivonsz 1-et.

Milyen további előnnyel jár ez? Nos, most van egy szép, olvasható kifejezésünk a végösszegre. Nem iterál, így a teljesítmény jó. És tartalmazza a 64-es számot, ami a sakktábla mezőinek száma, ami jó példa a jól jelzett **tervezési szándékra**. Ha valamiért 1000 év múlva a világ egy 7x7-es sakktáblát fogad el szabványként, az a jövőbeli mérnök (valószínűleg Bash 6.1-et használva) megnézi a szkriptet, látja, mire akartál kilyukadni, és a 64-et 49-re változtatja. Minden rendben!

## Maradjatok szándékosak, barátaim

Amikor egy megvalósításon dolgozol, könnyű összevissza dobálni a dolgokat, és rácsimpaszkodni az első működő megoldásra. Ez rendben van, amíg a problémát fedezed fel, de amint teljesen megérted a kritikus összetevőket (ha van időd rendesen kicsiszolni a dolgokat), gondoskodj róla, hogy minden algoritmus, minden változónév, sőt a fehér terület is kirajzolja a problémát, a kritikus követelményeket, és azt, hogyan illeszkednek össze a darabok.

[^1]: Lásd még [Thom Holwerda képregényét.](https://www.osnews.com/story/19266/wtfsm/)
[^2]: Ha kicsit berozsdásodtál a bináris és hexadecimális számolásban, @kytrinyx a [How to Count](https://www.amazon.com/Count-Programming-Mere-Mortals-Book-ebook/dp/B005DPIKPE) című könyvet ajánlja. Szégyentelen önreklámként: nemrég én is írtam [egy-két blogbejegyzést a binárisról és a hexadecimálisról.](https://www.assertnotmagic.com/2018/09/10/binary-hexadecimal-part-1/)
[^3]: Nem tudom, ez hogyan működne. Talán csak hagynánk, hogy a gyalogok lovagi párbajt vívjanak egymással.
