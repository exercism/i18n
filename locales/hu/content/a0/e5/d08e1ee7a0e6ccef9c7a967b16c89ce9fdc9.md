# Bemutatás

A [SIMD][SIMD] fogalom a csomagolt lebegőpontos értékeket vezette be: több számot egyetlen `xmm` regiszterben, amelyeken sávonként és párhuzamosan végezzük a műveleteket.
Ugyanezek az `xmm` regiszterek csomagolt _egészeket_ is tárolhatnak.

## Szintaxis

A SIMD lebegőpontos modell nagy része változatlanul átvihető a csomagolt egészekre:

- Egy 128 bites regiszter sávokra oszlik
- Az utasítások az azonos pozícióban lévő sávokon párhuzamosan hajtódnak végre
- A memóriaoperandusokra ugyanazok a 16 bájtos igazítási szabályok érvényesek

A szintaxis azonban némileg eltér:

1. Egy `p` _előtag_, amely jelzi, hogy az utasítás _csomagolt_ adatokon működik.
2. Az elvégzett művelet, ugyanazzal a névvel, mint a nem SIMD (más néven _skaláris_) megfelelője (pl. `add`, `mul` stb.).
3. Egy utótag, amely az egyes sávok méretét jelzi.

A csomagolt egészeknek négy sávméretük van, és mindegyiknek megvan a saját utótagja:

| sáv szélessége | bájt | sávok 128 bitben | utótag |
|----------------|------|------------------|--------|
| byte           | 1    | 16               | b      |
| word           | 2    | 8                | w      |
| dword          | 4    | 4                | d      |
| qword          | 8    | 2                | q      |

Például:

| utasítás | jelentés                               |
|----------|----------------------------------------|
| `paddb`  | csomagolt `add`, 8 bites sávok (16 sáv) |
| `paddw`  | csomagolt `add`, 16 bites sávok (8 sáv) |
| `paddd`  | csomagolt `add`, 32 bites sávok (4 sáv) |
| `paddq`  | csomagolt `add`, 64 bites sávok (2 sáv) |

Némely utasítás az egyik méretű sávokat veszi bemenetként, a kimenete viszont más méretű.
Ugyanazt az általános konvenciót követik, de _két_ méretutótaggal.
Az első a bemeneti sáv méretét jelzi, a második a kimeneti sávét:

| utasítás  | jelentés                                           |
|-----------|----------------------------------------------------|
| `pmovsxwd` | csomagolt `movsx`, 16 bites sávokból 32 bites sávokba |
| `pmuldq`   | csomagolt `mul`, 32 bites sávokból 64 bites sávokba   |

## Memóriamozgatás

Két, egész nevet viselő utasítás 128 bitet másol egy `xmm` regiszter és a memória között:

| utasítás | leírás                                                         |
|----------|----------------------------------------------------------------|
| `movdqa` | csomagolt egészek másolása _igazított_ helyre vagy onnan       |
| `movdqu` | csomagolt egészek másolása _nem igazított_ helyre vagy onnan   |

Úgy viselkednek, mint a `movaps` és a `movups`: a `movdqa` kivételt vált ki egy nem igazított címnél, a `movdqu` viszont bármelyiket elfogadja.
Mind a négy 128 bitet másol, anélkül hogy értelmezné a tartalmukat.
Az egész nevet viselő párt megegyezés szerint használjuk egész adatokkal, nem követelmény szerint.

~~~~exercism/note
A `dq` itt a `double-qword` rövidítése, azaz 128 bit (16 bájt).
~~~~

## Összeadás és kivonás

Az összeadás és a kivonás az elnevezési szabályt követi:

```x86asm
paddb xmm0, xmm1 ; 16 lanes: each  8-bit, xmm0 += xmm1
paddw xmm2, xmm3 ;  8 lanes: each 16-bit, xmm2 += xmm3

psubd xmm4, xmm5 ;  4 lanes: each 32-bit, xmm4 -= xmm5
psubq xmm6, xmm7 ;  2 lanes: each 64-bit, xmm6 -= xmm7
```

Nincs külön előjeles és előjel nélküli változat.
A kettes komplemensben az összeadás és a kivonás ugyanazokat a biteket eredményezi, akár előjelesként, akár előjel nélküliként olvassuk a sávokat, ezért egyetlen utasítás szolgálja mindkettőt.
Az értelmezés rajtad áll, pontosan úgy, mint a skaláris `add` és `sub` esetében.

Ezek az utasítások túlcsordulás esetén **átfordulnak**, akárcsak a skaláris megfelelőik.
Egy 8 bites sáv az értékeket 256 modulusával tárolja, így a `200 + 100` `paddb` művelete `300 - 256 = 44`-et ad, és elveti azokat a biteket, amelyek nem férnek el.

Figyeld meg, hogy ezek a plusz bitek nem kerülnek át a következő sávba.
Az egyes sávokon a többitől függetlenül hajtódik végre a művelet, még akkor is, ha ugyanazt a regisztert használják.

## Telítéses összeadás és kivonás

A csomagolt egész SIMD olyan művelettel bővíti a készletet, amellyel a lebegőpontos SIMD nem rendelkezik: a [telítéses][saturation] összeadással és kivonással, amelyek az átfordulás helyett _leszorítják_ az értéket.
A sáv tartományán felüli eredmény a sáv által tárolható legnagyobb érték lesz; a tartomány alatti eredmény pedig a legkisebb.

A telítéses változatok az `s` (előjeles) vagy `us` (előjel nélküli) jelzést a méretutótag elé illesztik:

| utasítás  | jelentés                                |
|-----------|-----------------------------------------|
| `paddsb`  | `add`, telítéses, előjeles 8 bites sávok |
| `paddusb` | `add`, telítéses, előjel nélküli 8 bites sávok |
| `psubsw`  | `sub`, telítéses, előjeles 16 bites sávok |
| `psubusw` | `sub`, telítéses, előjel nélküli 16 bites sávok |

A leszorítás tartománya az adott méretű és előjelűségű egész szám teljes ábrázolható tartománya.
Egy byte esetében:

- Az előjel nélküli byte-ok a `[0, 255]` tartományba szorulnak: a `200 + 100` `paddusb` művelete `255`-öt ad, az `5 - 10` `psubusb` művelete pedig `0`-t.
- Az előjeles byte-ok a `[-128, 127]` tartományba szorulnak: a `100 + 50` `paddsb` művelete `127`-et ad.

A telítés akkor számít, amikor egy sáv korlátos mennyiséget tárol, például egy pixelcsatornát vagy egy hangmintát.
Az átfordulás egy túl fényes pixelt sötétre fordítana, a leszorítás viszont a maximális fényességen tartja, és pontosan ezt az eredményt szeretnéd.

~~~~exercism/note
Telítéses összeadás és kivonás csak byte és word sávokhoz létezik, dword és qword sávokhoz nem.
~~~~

## Szorzás

Két N bites érték szorzata 2N bites lehet, a cél sáv viszont csak N bit széles.
A SIMD műveletek úgy oldják meg ezt, hogy megadják, a szorzat melyik felét tartják meg: az alsó N bitet vagy a felső N bitet.

A 16 bites sávokhoz három utasítás tartozik:

| utasítás  | jelentés                                                      |
|-----------|--------------------------------------------------------------|
| `pmullw`  | `mul`, 16 bites sávok, az egyes szorzatok alsó 16 bitjét tartja meg |
| `pmulhw`  | `mul`, 16 bites sávok, a felső 16 bitet tartja meg, előjeles operandusok |
| `pmulhuw` | `mul`, 16 bites sávok, a felső 16 bitet tartja meg, előjel nélküli operandusok |

Egy szorzat alsó 16 bitje ugyanaz, akár előjelesként, akár előjel nélküliként olvassuk az operandusokat, ezért csak egyetlen `pmullw` létezik.

A felső 16 bit azonban az eredmény előjelűségétől függően változik.
Ezért van a felső felet szorzó műveletnek külön változata előjeles és előjel nélküli szorzásra:

1. `pmulhw`, előjeles szorzáshoz.
2. `pmulhuw`, egy plusz `u`-val, előjel nélküli szorzáshoz.

Figyeld meg a szintaxist:

1. Egy `p` a csomagolt egészhez.
2. Az elvégzett művelet: `mul`.
3. Egy `h`, ami jelzi, hogy az eredmény felső („high”) bitjeit választjuk ki.
4. Egy opcionális `u`, ha az eredményt előjel nélküliként kell értelmezni (vagyis nincs előjel-kiterjesztve).
5. Végül a `w` méretutótag, ami jelzi, hogy word (16 bites) műveletről van szó.

A csomagolt szorzás word sávokra pontosan a fenti szabályt követi.
A dword (32 bites) szorzás is követi a szabályt, de csak az alsó felet kiválasztó változat létezik: `pmulld`.

Nincs olyan dword szorzóváltozat, amely a felső biteket választaná ki.
Vannak azonban olyan változatok, amelyek _kiszélesítik_ a szorzást, és a _páros indexű_ sávok (azaz a 0. és 2. pozíciójú sávok) teljes 64 bites szorzatát tárolják:

| utasítás  | jelentés                                                                         |
|-----------|----------------------------------------------------------------------------------|
| `pmuludq` | a páros indexű 32 bites elemeket előjel nélkül szorozza 2 teljes 64 bites szorzattá |
| `pmuldq`  | a páros indexű 32 bites elemeket előjelesen szorozza 2 teljes 64 bites szorzattá   |

Figyeld meg, hogy a szintaxis `dq`-t használ, amely előtt előjel nélküli szorzásnál egy `u` is állhat.
Ennek az az oka, hogy az utasítások `dword` sávokat vesznek bemenetként, és `qword` sávokat adnak kimenetként.

## Osztás

Nincs csomagolt egész osztás.
Az ezt igénylő kód lebegőpontos értékekké alakítja a számokat, elosztja őket, majd visszaalakítja.

## Egészek kiszélesítése

A `movsx` és a `movzx` utasításnak is van csomagolt megfelelője.
Ugyanazt a szintaxist követik, amelyet azoknál az utasításoknál említettünk, amelyek bemenetének sávmérete eltér a kimenetétől:

```x86asm
pmovsxwd xmm0, xmm1   ; 4 words -> 4 dwords, sign-extended
pmovzxbw xmm0, xmm1   ; 8 bytes -> 8 words, zero-extended
```

Figyeld meg, hogy a sávok számát a nagyobb (kimeneti) szélesség határozza meg.
Az utasítás ennyi sávot olvas be a forrás alsó részéből.
Ugyanaz a szemantika, amelyet már láttunk a csomagolt `cvt` utasításoknál az egyszeres és kétszeres pontosságú lebegőpontos számok között.

## Átalakítás egészek és lebegőpontos számok között

Léteznek utasítások 32 bites előjeles egészek és lebegőpontos sávok közötti átalakításra.
A szokásos `cvt` és `cvtt` szintaxist követik, de `si` helyett a csomagolt egész jele `dq`:

```x86asm
cvtdq2ps xmm0, xmm1 ; convert 32-bit signed integers in xmm1 to 32-bit floats in xmm0
cvtdq2pd xmm2, xmm3 ; convert 32-bit signed integers in xmm3 to 64-bit floats in xmm2
cvtps2dq xmm4, xmm5 ; convert 32-bit floats in xmm5 to 32-bit signed integers in xmm4
```

~~~~exercism/caution
Azok az utasítások, amelyek a csomagolt egészek jelölésére `pi`-t használnak, a régi `mmx` regiszterekbe írnak, és az x86-64-en gyakorlatilag elavultnak számítanak.
Inkább a `dq` változatokat használd, amelyek `xmm` regisztereket használnak.
~~~~

Ugyanazok a megjegyzések érvényesek itt is, amelyeket a lebegőpontos számok és egészek közötti skaláris átalakításnál tettünk.
A lebegőpontos számokat egy MXCSR nevű speciális regiszter szerint kerekítjük, amelynek módjára egy függvény belépésekor nem számíthatsz.
Létezik egy `cvtt` változat (egy plusz `t`-vel), amely mindig levágja az eredményt.

Az is lehetséges, hogy a `round` utasítással ismert állapotba hozzuk a csomagolt lebegőpontos értékeket az átalakítás előtt.
A `round` vezérlőértéke ugyanaz, mint a skaláris `round` esetében, és a szintaxis is ugyanaz a csomagolt lebegőpontos értékeknél:

```x86asm
roundps xmm0, xmm1, 1 ; xmm0 = floor(xmm1), packed 32-bit floats
roundpd xmm2, xmm3, 2 ; xmm2 = ceil(xmm3), packed 64-bit floats
```

~~~~exercism/note
Az itt említett valamennyi utasítás teljes leírása megtalálható az [x86 utasításreferenciában][instruction-reference].

[instruction-reference]: https://www.felixcloutier.com/x86/
~~~~

[simd]: https://exercism.org/tracks/x86-64-assembly/concepts/simd
[saturation]: https://en.wikipedia.org/wiki/Saturation_arithmetic
