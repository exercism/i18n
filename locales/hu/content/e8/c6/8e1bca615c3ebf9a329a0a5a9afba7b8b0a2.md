# Bevált gyakorlatok

## Kövesd a hivatalos bevált gyakorlatokat

A hivatalos [Dockerfile-bevált gyakorlatok](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) rengeteg hasznos tartalmat kínálnak arról, hogyan teheted jobbá a Dockerfile-jaidat.

## Teljesítmény

Elsősorban a teljesítményre érdemes optimalizálnod (különösen a tesztfuttatók esetében).
Így a tooling a lehető leggyorsabban fut, és nem fut ki az időből.

### Mérés

A végrehajtási idő gyakori mérése nagyszerű módja annak, hogy ráérezz a tooling teljesítményére.
Szokásoddá váljon, hogy egy változtatás után _és_ előtt is mérd a végrehajtási időt.
Még akkor is mérd meg a végrehajtási időt, ha „biztos” vagy benne, hogy a változtatás javítani fog a teljesítményen.

#### Szkriptek

Amikor csak lehet, írj szkripteket a teljesítmény automatikus mérésére (ezt nevezik _benchmarkingnak_ is).
Egy nagyon hasznos parancssori eszköz a [hyperfine](https://github.com/sharkdp/hyperfine), de nyugodtan használj bármit, ami a legjobban megfelel a toolingodnak.

Az újabb kurzus-tooling tárolók hozzáférnek a következő két szkripthez:

1. `./bin/benchmark.sh`: a kurzus-tooling kódjának benchmarkolása ([forráskód](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark.sh))
2. `./bin/benchmark-in-docker.sh`: a kurzus-tooling Docker image benchmarkolása ([forráskód](https://github.com/exercism/generic-test-runner/blob/main/bin/benchmark-in-docker.sh))

```exercism/note
Ha olyan kurzus-tooling tárolón dolgozol, amelyben nincsenek meg ezek a fájlok, nyugodtan másold be őket a tárolódba a fenti forráslinkek segítségével.
```

```exercism/caution
A benchmarkoló szkriptek segíthetnek megbecsülni a tooling teljesítményét.
Tartsd azonban észben, hogy az Exercism éles szerverein a teljesítmény gyakran alacsonyabb.
```

### Kísérletezz különböző alap image-ekkel

Kísérletezz különböző alap image-ekkel (pl. Alpine az Ubuntu helyett), hogy lásd, az egyik (jelentősen) felülmúlja-e a másikat.
Ha a teljesítmény nagyjából egyforma, válaszd a legkisebb image-et.

### Próbáld ki a belső hálózatot

Nézd meg, hogy javít-e a teljesítményen, ha a `none` helyett az `internal` hálózatot használod.
További információért lásd a [hálózati dokumentációt](/docs/building/tooling/docker#network).

### A build idején futó parancsokat részesítsd előnyben a futásidejűekkel szemben

A kurzus toolingja egy egyszeri, rövid életű Docker konténert futtat, amely a következő lépéseket hajtja végre.

1. Létrejön egy Docker konténer.
2. A Docker konténer a megfelelő argumentumokkal fut.
3. A Docker konténer megsemmisül.

Ezért a 2. lépésben futó kód _minden egyes tooling-futtatáskor_ lefut.
Éppen ezért nagyszerű módja a teljesítmény javításának, ha csökkented a 2. lépésben futó kód mennyiségét.
Ennek egyik módja, hogy a kódot _futásidőből_ _build időbe_ helyezed át.
Míg a futásidejű kód minden egyes tooling-futtatáskor lefut, a build idején futó kód csak egyszer fut le (amikor a Docker image felépül).

A build idején futó kód egyszer fut le, a GitHub Actions munkafolyamat részeként.
Ezért nem baj, ha a build idején futó kód (viszonylag) lassú.

#### Példa: könyvtárak előzetes fordítása

Amikor a Haskell tesztfuttatóban teszteket futtatsz, néhány alapkönyvtárat le kell fordítani.
Mivel minden tesztfutás egy friss konténerben történik, ez azt jelentette, hogy a fordítás _minden egyes tesztfutáskor_ megtörtént!
Ennek elkerülésére a [Haskell tesztfuttató Dockerfile-ja](https://github.com/exercism/haskell-test-runner/blob/5264c460054649fc672c3d5932c2f3cb082e2405/Dockerfile) a következő két parancsot tartalmazza:

```dockerfile
COPY pre-compiled/ .
RUN stack build --resolver lts-20.18 --no-terminal --test --no-run-tests
```

Először a `pre-compiled` könyvtár bekerül az image-be.
Ez a könyvtár egy tesztfeladatként van beállítva, és ugyanazoktól az alapkönyvtáraktól függ, amelyektől a tényleges feladat.
Ezután lefuttatjuk a teszteket azon a könyvtáron, ami hasonló ahhoz, ahogy egy tényleges feladat tesztjei futnak.
A tesztek futtatása azzal jár, hogy az alap lefordul, de a különbség az, hogy ez _build időben_ történik.
Az így létrejövő Docker image-ben tehát az alapkönyvtárak már le vannak fordítva.
Ez azt jelenti, hogy _futásidőben_ már nincs szükség fordításra, ami (sokkal) gyorsabb végrehajtást eredményez.

#### Példa: binárisok előzetes fordítása

Egyes nyelvek lehetővé teszik, hogy a kódot ahead-of-time vagy just-in-time fordítsd le.
Ez egy build idő kontra futásidő kompromisszum, és a teljesítmény miatt ismét a build idején történő végrehajtást részesítjük előnyben.

A [C# tesztfuttató Dockerfile-ja](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) ezt a megközelítést használja: a tesztfuttatót előre (build időben) binárisba fordítják, ahelyett hogy a kódot futásidőben just-in-time fordítanák.
Ez azt jelenti, hogy futásidőben kevesebb a munka, ami segít növelni a teljesítményt.

## Méret

Igyekezz csökkenteni az image méretét, aminek köszönhetően az:

- gyorsabban élesíthető
- csökkenti a költségeinket
- javítja az egyes konténerek indítási idejét

### Próbálj ki különböző disztribúciókat

A különböző disztribúciós image-ek mérete eltérő.
Például az `alpine:3.20.2` image **tízszer** kisebb, mint az `ubuntu:24.10` image:

```
REPOSITORY   TAG       SIZE
alpine       3.20.2    8.83MB
ubuntu       24.10     101MB
```

Általánosságban az Alpine-alapú image-ek a legkisebbek közé tartoznak, ezért sok tooling image Alpine-ra épül.

### Próbálj ki karcsúsított image-eket

Egyes image-eknek van speciális „slim” változata, amelyekből eltávolítottak néhány funkciót, így kisebb image-mérethez vezetnek.
Például a `node:20.16.0-slim` image **ötször** kisebb, mint a `node:20.16.0` image:

```
REPOSITORY   TAG            SIZE
node         20.16.0        1.09GB
node         20.16.0-slim   219MB
```

A „slim” változatok azért kisebbek, mert kevesebb funkciót tartalmaznak.
Lehet, hogy az image-ednek nincs szüksége a plusz funkciókra, és ha így van, fontold meg a „slim” változat használatát.

### A felesleges dolgok eltávolítása

Kézenfekvő, ám nagyszerű módja az image méretének csökkentésének, ha eltávolítasz mindent, amire nincs szükséged.
Ilyesmik lehetnek például:

- olyan forrásfájlok, amelyekre a bináris belőlük való felépítése után már nincs szükség
- a Docker image-től eltérő architektúrára irányuló fájlok
- dokumentáció

#### Távolítsd el a csomagkezelő fájljait

A legtöbb Docker image-nek további csomagokat kell telepítenie, amit általában egy csomagkezelővel tesznek meg.
Ezeket a csomagokat _build időben_ kell telepíteni (mivel _futásidőben_ nincs elérhető internetkapcsolat).
Ezért a csomagkezelő gyorsítótár- és nyilvántartó fájljait a további csomagok telepítése után el kell távolítani.

##### apk

Az `apk` csomagkezelőt használó disztribúciók (például az Alpine) az `apk add` használatakor a `--no-cache` kapcsolót használják a csomagok telepítéséhez:

```dockerfile
RUN apk add --no-cache curl
```

##### apt-get/apt

Az `apt-get`/`apk` csomagkezelőt használó disztribúciók (például az Ubuntu) a csomagok telepítése _után_, ugyanabban a `RUN` parancsban futtassák az `apt-get autoremove -y` és `rm -rf /var/lib/apt/lists/*` parancsokat:

```dockerfile
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
```

### Használj többlépcsős buildet

A Dockernek van egy [többlépcsős build](https://docs.docker.com/build/building/multi-stage/) nevű funkciója.
Ezek segítségével a Dockerfile-odat külön _szakaszokra_ bonthatod, és csak az utolsó szakasz kerül bele a létrejövő Docker image-be (a többi csak az utolsó szakasz felépítését segíti).
Gondolhatsz úgy minden szakaszra, mint egy saját mini Dockerfile-ra; a szakaszok különböző alap image-eket használhatnak.

A többlépcsős buildek különösen akkor hasznosak, amikor a Dockerfile-odhoz olyan csomagokat kell telepíteni, amelyekre _csak_ build időben van szükség.
Ebben az esetben a Dockerfile-od általános felépítése így néz ki:

1. Definiálj egy új szakaszt (nevezzük „build” szakasznak).
   Ezt a szakaszt _csak_ build időben fogod használni.
2. Telepítsd a szükséges további csomagokat (a „build” szakaszba).
3. Futtasd azokat a parancsokat, amelyekhez a további csomagok kellenek (a „build” szakaszon belül).
4. Definiálj egy új szakaszt (nevezzük „runtime” szakasznak).
   Ez a szakasz alkotja majd a létrejövő Docker image-et, és futásidőben hajtódik végre.
5. Másold át a 3. lépésben (a „build” szakaszban) futtatott parancsok eredményét ebbe a szakaszba (a „runtime” szakaszba).

Ezzel a felállással a további csomagok _csak_ a „build” szakaszban települnek, a „runtime” szakaszban _nem_, ami azt jelenti, hogy nem kerülnek bele a létrejövő Docker image-be.

#### Példa: fájlok letöltése

A Fortran tesztfuttatónak `curl`-re van szüksége néhány fájl letöltéséhez.
A futásidejű image-ének azonban _nincs_ szüksége a `curl`-re, ami tökéletes felhasználási esetté teszi ezt a többlépcsős buildhez.

Először a [Dockerfile-ja](https://github.com/exercism/fortran-test-runner/blob/783e228d8449143d2040e68b95128bb791833a27/Dockerfile) definiál egy szakaszt („build” néven), amelyben a `curl` csomag települ.
Ezután a curl segítségével fájlokat tölt le abba a szakaszba.

```dockerfile
FROM alpine:3.15 AS build

RUN apk add --no-cache curl

WORKDIR /opt/test-runner
COPY bust_cache .

WORKDIR /opt/test-runner/testlib
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/CMakeLists.txt
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/testlib/TesterMain.f90

WORKDIR /opt/test-runner
RUN curl -R -O https://raw.githubusercontent.com/exercism/fortran/main/config/CMakeLists.txt
```

A Dockerfile második része egy új szakaszt definiál, és a `COPY` paranccsal átmásolja a letöltött fájlokat a „build” szakaszból a saját szakaszába:

```dockerfile
FROM alpine:3.15

RUN apk add --no-cache coreutils jq gfortran libc-dev cmake make

WORKDIR /opt/test-runner
COPY --from=build /opt/test-runner/ .

COPY . .
ENTRYPOINT ["/opt/test-runner/bin/run.sh"]
```

##### Példa: könyvtárak telepítése

A Ruby tesztfuttatónak telepíteni kell a `git`, `openssh`, `build-base`, `gcc` és `wget` csomagokat, mielőtt a szükséges könyvtárait (gemeket) telepíthetné.
A [Dockerfile-ja](https://github.com/exercism/ruby-test-runner/blob/e57ed45b553d6c6411faeea55efa3a4754d1cdbf/Dockerfile) egy szakasszal kezdődik (`build` néven), amely telepíti ezeket a csomagokat (`apk add`-dal), majd telepíti a függőségeket (`bundle install`-lal):

```dockerfile
FROM ruby:3.2.2-alpine3.18 AS build

RUN apk update && apk upgrade && \
    apk add --no-cache git openssh build-base gcc wget git

COPY Gemfile Gemfile.lock .

RUN gem install bundler:2.4.18 && \
    bundle config set without 'development test' && \
    bundle install
```

Ezután definiálja azt a szakaszt, amely a létrejövő Docker image-et alkotja majd.
Ez a szakasz _nem_ telepíti azokat a függőségeket, amelyeket az előző szakasz telepített; ehelyett a `COPY` paranccsal átmásolja a telepített könyvtárakat a build szakaszból a saját szakaszába:

```dockerfile
FROM ruby:3.2.2-alpine3.18

RUN apk add --no-cache bash

WORKDIR /opt/test-runner

COPY --from=build /usr/local/bundle /usr/local/bundle

COPY . .

ENTRYPOINT [ "sh", "/opt/test-runner/bin/run.sh" ]
```

```exercism/note
A [C# tesztfuttató Dockerfile-ja](https://github.com/exercism/csharp-test-runner/blob/b54122ef76cbf86eff0691daa33c8e50bc83979f/Dockerfile) valami hasonlót csinál, csak ebben az esetben a build szakasz használhat egy létező Docker image-et, amelyben már előre telepítve vannak a könyvtárak telepítéséhez szükséges további csomagok.
```

## Tesztelés

### Használj integrációs teszteket

Az egységtesztek nagyon hasznosak lehetnek, de azt javasoljuk, hogy az [integrációs tesztek](https://en.wikipedia.org/wiki/Integration_testing) írására összpontosíts.
Legfőbb előnyük, hogy jobban tesztelik, hogyan fut a tooling éles környezetben, és így növelik a bizalmat a tooling implementációjában.

#### Használj Dockert

Ahhoz, hogy a lehető legjobban utánozzák az éles környezetet, az integrációs teszteknek _az éles környezethez hasonlóan_ kell futtatniuk a toolingot.
Ez azt jelenti, hogy felépítik a Docker image-et, majd a felépített image-et egy megoldáson futtatják, hogy ellenőrizzék a kimenetét.

#### Használj golden teszteket

Az integrációs teszteket [golden tesztként](https://ro-che.info/articles/2017-12-04-golden-tests) érdemes definiálni, amelyek olyan tesztek, ahol az elvárt kimenet egy fájlban van tárolva.
Ez tökéletes a kurzus-tooling integrációs tesztekhez, mivel a tooling kimenete is fájlokból áll.

##### Példa: tesztfuttató

Amikor a tesztfuttatót egy megoldáson futtatod, a kimenete egy `results.json` fájl.
Ezután összehasonlíthatjuk ezt a fájlt egy „ismerten jónak” (azaz „elvártnak” számító) kimeneti fájllal (`expected_results.json` néven), hogy ellenőrizzük, a tesztfuttató a szándéknak megfelelően működik-e.

## Biztonság

A biztonság a fő oka annak, hogy Docker konténereket használunk a toolingunk futtatására.

### A hivatalos image-eket részesítsd előnyben

Sok Docker image található a [Docker Hubon](https://hub.docker.com/), de igyekezz a [hivatalosakat](https://hub.docker.com/search?q=&image_filter=official) használni.
Ezeket az image-eket gondozzák, és (sokkal) kisebb az esélyük arra, hogy nem biztonságosak.

### Rögzítsd a verziókat

Annak biztosítására, hogy a buildek stabilak legyenek (azaz ne törjenek el hirtelen), mindig rögzítsd az alap image-eidet konkrét tegekhez.
Ez azt jelenti, hogy ahelyett, hogy:

```dockerfile
FROM alpine:latest
```

ezt használd:

```dockerfile
FROM alpine:3.20.2
```

Utóbbival a buildek mindig ugyanazt a verziót használják majd.

### Futtasd nem privilegizált felhasználóként

Alapértelmezés szerint sok image root jogosultságokkal rendelkező felhasználóval fut.
Fontold meg, hogy nem privilegizált felhasználóként futtatod.

```dockerfile
FROM alpine

RUN groupadd -r myuser && useradd -r -g myuser myuser

# RUN <COMMANDS THAT REQUIRE ROOT USER, E.G. INSTALLING PACKAGES>

USER myuser
```

### Frissítsd a csomagtárakat a legújabb verzióra

Szinte mindig jó ötlet a legújabb verziókat telepíteni

```dockerfile
RUN apt-get update && \
    apt-get install curl
```

### Támogasd a csak olvasható fájlrendszert

Arra biztatunk, hogy a Dockerfile-okat csak olvasható fájlrendszert feltételezve írd meg.
Az egyetlen könyvtárak, amelyekről feltételezheted, hogy írhatók:

- a megoldás könyvtára (a második argumentumként átadva)
- a kimeneti könyvtár (a harmadik argumentumként átadva)
- a `/tmp` könyvtár

```exercism/caution
Az éles környezetünk jelenleg _nem_ kényszeríti ki a csak olvasható fájlrendszert, de a jövőben lehet, hogy fogja.
Ezért az új tesztfuttató/elemző/representer alapsablonja csak olvasható fájlrendszerrel indul.
Ha nem sikerül működésre bírni a dolgokat egy csak olvasható fájlon, nyugodtan feltételezz (egyelőre) írható fájlrendszert.
```
