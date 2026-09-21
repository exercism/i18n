# Monitorroham

Egy ABC Corp nevű szoftvercég alkalmazottja vagy, ahol 97-en dolgoznak. Az újonnan bérelt irodában viszont csak 65 fülke van. Minden dolgozó az új irodában szeretne dolgozni, mert minden fülkében a legmodernebb monitorok vannak. A HR-osztályt elárasztották az ilyen kérések, ezért a digitális üzemeltetési csapat segítségével kidolgozott egy fülkeelosztási rendszert.

Minden fülkéhez hozzárendeltek egy számot 1-től 65-ig. Azoknak a dolgozóknak, akik az új irodában szeretnének dolgozni, minden hétköznap reggel 7:30-ig kell elküldeniük a fülkékre vonatkozó elosztási kéréseiket. Egy dolgozó csak egy elosztási kérést küldhet. Egy ilyen kérésben pedig csak egy fülkeszám szerepelhet.

## Problémameghatározás

A HR-osztály a következőket teszi minden fülkeelosztási kérés esetén:

- Ha a kért fülke elérhető, hozzárendeli a kérelmezőhöz.
- Ha a kért fülke már foglalt, elutasítja a kérést.

Te vagy a digitális üzemeltetési csapat azon tagja, aki ezt az elosztási folyamatot automatizálja. A bemenet egy `int[]` request, amely az összes, reggel 7:30-ig beküldött dolgozói kérést tartalmazza. A tömb minden eleme egy fülkeszámot jelöl. A feladatod, hogy visszaadj egy `int[]` tömböt a kiosztott fülkék hozzárendelt számaival. Ezután rendezd a fülkeszámokat növekvő sorrendbe.

## Korlátok

- 0 <= a bemeneti tömb mérete <= 97
- A bemeneti tömb minden eleme 1 és 65 között lesz, a határokat beleértve

## 1. példa

- Bemenet: `65 1 56`
- Kimenet: `1 56 65`

## 2. példa

- Bemenet: `5 6 18 56 18 8 1`
- Kimenet: `1 5 6 8 18 56`
- Magyarázat: Két kérés érkezett a 18-as fülkére
