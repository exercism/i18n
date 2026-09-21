# Kiegészítés az utasításokhoz

## Megvalósítási megjegyzések

A tesztprogram fákat hoz létre úgy, hogy ismételten meghívja a variadikus `New` függvényt.
Például az alábbi utasítás

```go
tree := New("a",New("b"),New("c",New("d")))
```

a következő fát építi fel:

```text
      "a"
       |
    -------
    |     |
   "b"   "c"
          |
         "d"
```

Feltételezheted, hogy a tesztfákban nem lesznek ismétlődő értékek.

A tesztprogram a `Value` és a `Children` metódust használja majd a fák szétbontásához.

A fa alapvető felépítésének és szétbontásának már működnie kell, mielőtt nekilátsz a feladat érdekes részének, ezért ezt külön teszteli az első három teszt.

---

A `FromPov` és a `PathTo` metódus a feladat érdekes része.

A `FromPov` metódus egy `from` string argumentumot kap, amely az értékével jelöl ki egy csomópontot a fában.
Egy olyan fát kell visszaadnia, amelynek a gyökerében a `from` érték áll.
Módosíthatod az eredeti fát és visszaadhatod azt, vagy létrehozhatsz egy új fát és visszaadhatod azt.
Ha új fát adsz vissza, nyugodtan felhasználhatod vagy elpusztíthatod az eredetit.
Persze az a szép, ha érintetlenül hagyod.

A `PathTo` metódus két string argumentumot kap, `from` és `to` néven, amelyek az értékükkel két csomópontot jelölnek ki a fában.
A fában az első csomóponttól a másodikig vezető legrövidebb utat kell visszaadnia.
