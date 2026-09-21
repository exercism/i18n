# Utasítások

A Blorkemon™️-kártyák iránti nosztalgiád egyáltalán nem lankad, sőt már újra gyűjteni is kezdted őket, és a barátaidat is ráveszed, hogy csatlakozzanak hozzád.

Ebben a feladatban a `Set` interfészt használod majd, hogy segítsen kezelni a gyűjteményedet, hiszen a duplikált kártyák nem számítanak, amikor a célod az összes létező kártya megszerzése.

## 1. Hozz létre egy gyűjteményt

Épp most találtad meg a régi Blorkemon™️-kártya-rejtekhelyedet!
A rejtekhelyen egy csomó duplikált kártya van, szóval itt az idő, hogy egy új gyűjteményt kezdj a duplikátumok eltávolításával.

Nagyon szeretnéd, ha a barátaid is beszállnának a Blorkemon™️-őrületbe, és erre a legjobb mód, ha beindítod a gyűjteményüket azzal, hogy adsz nekik egy kártyát.

Valósítsd meg a `newCollection` metódust, amely a kártyák listáját egy `Set`-té alakítja, ami az új gyűjteményedet képviseli.

```java
GottaSnatchEmAll.newCollection(List.of("Newthree", "Newthree", "Newthree"));
// => {"Newthree"}
```

## 2. Növeld a gyűjteményt

Amint van egy gyűjteményed, az élni kezdi a saját életét, és növekednie kell.

Valósítsd meg az `addCard` metódust, amely egy új kártyát és a jelenleg gyűjtött kártyáid halmazát kapja.
A metódusnak hozzá kell adnia az új kártyát a gyűjteményhez, ha az még nincs benne, és egy `boolean` értékkel kell visszatérnie, amely megmutatja, hogy frissült-e a gyűjtemény.

```java
Set<String> collection = GottaSnatchEmAll.newCollection("Newthree");
GottaSnatchEmAll.addCard("Scientuna",collection);
// => true

collection.contains("Scientuna");
// => true
```

## 3. Kezdj el kereskedni

Nagyon szeretnéd, ha a barátaid is beszállnának a Blorkemon™️-őrületbe, szóval itt az idő, hogy elkezdj kereskedni!

Amikor barátokkal kereskedel, nem minden csere éri meg, vagy egyáltalán nem is lehetséges.
Csak akkor kereskedj, ha te és a barátod is rendelkeztek egy olyan kártyával, amivel a másik nem.

Valósítsd meg a `canTrade` metódust, amely a jelenlegi gyűjteményedet és az egyik barátod gyűjteményét kapja.
A fenti szabályok szerint egy `boolean` értékkel kell visszatérnie, amely megmutatja, hogy lehetséges-e a csere.

```java
Set<String> myCollection = Set.of("Newthree");
Set<String> theirCollection = Set.of("Scientuna");
GottaSnatchEmAll.canTrade(myCollection, theirCollection);
// => true
```

## 4. Azonosítsd a közös kártyákat

Te és a Blorkemon™️-rajongó barátaid összegyűltök, és azon töprengtek, melyik kártyák a leggyakoribbak.

Valósítsd meg a `commonCards` metódust, amely gyűjtemények listáját kapja, és visszaad egy gyűjteményt azokból a kártyákból, amelyek minden gyűjteményben megtalálhatók.

```java
GottaSnatchEmAll.commonCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Scientuna"}
```

## 5. Az összes kártya

Megvan neked és a barátaidnak együtt az összes Blorkemon™️-kártya?

Valósítsd meg az `allCards` metódust, amely gyűjtemények listáját kapja, és visszaad egy gyűjteményt az összes gyűjteményben előforduló összes különböző kártyából.

```java
GottaSnatchEmAll.allCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Newthree", "Scientuna"}
```
