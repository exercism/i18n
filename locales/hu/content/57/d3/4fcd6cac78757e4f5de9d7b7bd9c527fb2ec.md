# Megoldás választása mentoráláshoz

[video:vimeo/595885125]()

Mentorként az első döntés, amit meg kell hoznod, hogy melyik megoldást mentorálod.

## Munka a mentorálási sorral

A mentorálásra beküldött összes megoldás listáját a [mentorálási sorban](/mentoring/queue) találod.
A felület valahogy így néz ki:

![Mentorálási sor](https://exercism-static.s3.eu-west-1.amazonaws.com/docs/mentor_queue.png)

A sor paneljének tetején egy szövegmezőt találsz, amellyel a tanuló neve szerint szűrhetsz.
Ettől jobbra a kéréseket a legrégebbi, a legutóbbi, a tanuló neve vagy a feladat neve szerint rendezheted.
A felület jobb oldalán nyelv vagy feladat neve szerint szűrhetsz.
Dönthetsz úgy is, hogy csak azokat a feladatokat jeleníted meg, amelyeket magad is megoldottál. Ez gyakran bölcs döntés, mert nehezen tudsz jó visszajelzést adni, ha magad nem küzdöttél meg a feladat megoldásával.
A függő mentorálási kérésekkel rendelkező feladatok listájával tovább szűkítheted a kérések listáját.
Ehhez válaszd ki a feladat nevét (ez a fenti képernyőfotó jobb alsó részén látható).

A fő táblázat a feladatot, a tanulót és a mentorálás kérésének időpontját mutatja.
Ha egy sor fölé viszed az egeret, több részletet látsz a tanulóról.
Láthatod a nevét, a tartózkodási helyét és a reputációját (ez jelzi, hogy maga is közreműködő vagy mentor-e), valamint azt, hogy hányszor mentorálták korábban.
Egy rövid bemutatkozást is látsz, amelyben leírja, mit szeretne kihozni a kurzusból.
Ahogy elkezdesz embereket mentorálni, azt is látni fogod, hogy mentoráltad-e már őket korábban, és hogy a kedvenceid közé tetted-e őket.

A buborékban megjelenő bemutatkozás az első támpont arról, hogy ez a tanuló való-e neked.
Illik a szakértelmed a tudásbeli hiányosságaihoz?
Ha azt írja, hogy a funkcionális programozásban szeretne jó lenni, tudsz ebben segíteni?
Ha új a nyelvben, és az alapokat szeretné megtanulni, akkor ha **bármilyen** valódi tapasztalatod van, valószínűleg tudsz segíteni. Ha viszont évek óta programozik abban a nyelvben, és a szakértői szintet célozza, akkor neked magadnak is elég biztos nyelvtudással kell rendelkezned.

Ha találtál egy megoldást, amely jól illik hozzád mentorálásra, lépjünk a következő lépésre, és nézzük meg a kódot!
Kattints hát arra a megoldásra, és lépj be a mentorálási beszélgetés felületére!

## A mentorálási beszélgetés felülete

Ebben a szakaszban valaki megoldását nézed, de még nem kötelezted el magad a mentorálása mellett.
Először lehetőséged van elolvasni a kódját, és más információkat is megnézni, mielőtt elkezdenéd.

**Ha most találkozol először ezzel a felülettel, egy kicsit nyomasztónak tűnhet, mert rengeteg az információ, de ne aggódj, hamar megismered.**

### A tanuló kódja

A képernyő bal oldalán a tanuló kódját látod.
A felület valahogy így néz ki:

<img src="https://raw.githubusercontent.com/exercism/docs/main/.imgs/mentor-discussion-area.png" height="100">

1. A bal oldal nagy részét a tanuló kódja foglalja el.
   Alapértelmezés szerint a legutóbbi iterációját látod.
   Ha több iterációt küldött be, ezek között a bal alsó sarokban lévő körökkel ellátott számokkal vagy a panel jobb alsó sarkában lévő `Previous` és `Next` gombokkal válthatsz.
   Ha csak egy iterációt küldött be, ezeket az ikonokat nem látod.

2. A tanuló kódja fölött a fülekkel válthatsz a tanuló kódja, az utasítások és a tesztek között.
   Ez hasznos, hogy felidézd, mit kellett a tanulónak megoldania ebben a feladatban.

3. Látsz egy jelzőt is arról, hogy a tesztek sikeresek vagy sikertelenek voltak (ez a bal panel jobb felső sarkában található), valamint gombokat a tanuló kódjának letöltéséhez vagy a vágólapra másolásához.
   Ha sikertelenek voltak, a jelzőre kattintva megnyílik egy ablak, amely megmutatja a tesztfutás konkrét részleteit, így láthatod, mit rontott el.

A képernyő jobb oldalán egy panel található, amely a mentorálási interakciót tartalmazza. A panel tetején három fület látsz.
A „**Beszélgetés**” fül a felhasználó adatait tartalmazza (felhasználónév, név, reputáció, személyes bemutatkozás).
Ez alatt egy hozzászólás található a felhasználótól arról, mit szeretne megtanulni ebből a konkrét megoldásból.
(Néhány régebbi megoldásnál ez hiányozhat.)
Ez kulcsfontosságú támpont arról, hogy ez a megoldás való-e neked.
Tudsz válaszolni a kérdésére?
Tudod teljesíteni a reményeit ezzel a feladattal kapcsolatban?

A második fül a „**Jegyzetfüzet**”.
Írhatsz bele kódot, hogy hivatkozhass rá a hozzászólásodban.
Segíthet azonosítani azt a kódot, amely fontos a feladat áttekintésekor.
Ez egyszerűbbé és világosabbá teheti a magyarázataidat.
Az ide írt jegyzetek csak neked szólnak, és minden alkalommal látni fogod őket, amikor az adott feladat megoldását mentorálod.

A harmadik fül neve „**Útmutató**”.
Ha erre kattintasz, néhány hasznos információt látsz:

- **A mintamegoldás.** Próbáld a tanulót efelé a megoldás felé terelni.
  Ez az a pont, ahová a tanulónak a kurzus ezen szakaszában a legjobb eljutnia.
  Előfordulhat, hogy a te megközelítésed jelentősen eltér a mintamegoldástól.
  Ez azért lehet, mert a tanulónál fejlettebb technikákat ismersz.
  Tartsd szem előtt, hogy a tanulótól csak azokat a fogalmakat várhatod el, amelyeket a feladatig vezető tanulási útvonal során megtanult.
  Vedd figyelembe ezt a tényt a visszajelzésed megfogalmazásakor, és próbáld nem elárasztani a tanulót olyan ismeretekkel, amelyekre még nem áll készen.
- **Mentorjegyzetek:** A közösség által írt jegyzetek, amelyek segítenek más mentoroknak megtalálni a feladat mentorálásának legjobb módját.
  Nagyon örülnénk, ha a tapasztalataiddal te is hozzájárulnál ezekhez a jegyzetekhez.
- **Automatikus visszajelzés:** Ez olyan visszajelzés, amelyről az elemzőink úgy ítélték meg, hogy hasznos lehet, ha átadod a tanulónak.
  Erről később még beszélünk.
- **A te megoldásod:** Egy hivatkozás a saját megoldásodra, amelyet referenciaként használhatsz, hogy hogyan oldottad meg a feladatot.

## Kezdj el mentorálni

Ha elolvastad a kódot, átnézted az útmutatót, és úgy érzed, tudsz segíteni, akkor itt az idő, hogy belevágj!
Kattints a „Mentorálás indítása” gombra, és a rendszer felkéri, hogy írd meg a visszajelzésedet.

Ezután olvasd el a [Hogyan adj kiváló visszajelzést](/docs/mentoring/how-to-give-great-feedback) című útmutatót!
