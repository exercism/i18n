# Bevezetés

A Common Lispben az időt négyféleképpen ábrázolják, amelyek közül itt kettővel foglalkozunk.

- A universal time abszolút idő: egy egész szám, amely az `1900-01-01T00:00:00Z` óta eltelt másodpercek számát jelöli (ez 1900. január 1-jén éjfél UTC szerint).
- A decoded time egy 9 értékből álló tuple, amelyek együtt egy adott naptári időpontot írnak le: másodperc, perc, óra, a hónap napja, hónap, év, a hét napja, nyári időszámítás jelző, időzóna.
(Részletesen lentebb tárgyaljuk.)

## Universal time

Az aktuális universal time lekéréséhez a `get-universal-time` vagy a `get-decoded-time` függvényt használjuk.
Az előbbi az `1900-01-01T00:00Z` óta eltelt másodperceket adja vissza, az utóbbi pedig ugyanezeket az adatokat dekódolt formában.

## Decoded time

A `decode-universal-time` és az `encode-universal-time` az idővel való munka elsődleges függvényei.
Az előbbi egy universal time-ot kap, és a decoded time értékét [multiple-values][concept-multiple-values] formájában adja vissza, az utóbbi pedig a decoded time értékeit fogadja argumentumként, és egy universal time-ot ad vissza.

Mindkettő fogad egy opcionális időzóna-argumentumot.
Az időzóna formátumát lásd lentebb.

A decoded time értékek halmaza:

- *másodperc*: 0 és 59 közötti egész szám
- *perc*: 0 és 59 közötti egész szám
- *óra*: 0 és 23 közötti egész szám
- *a hónap napja*: 1 és 31 közötti egész szám (a felső határ persze nyilván a hónaptól és az évtől függ)
- *hónap*: 1 és 12 közötti egész szám
- *év*: az évet jelző egész szám.
- *a hét napja*: 0 és 6 közötti egész szám. A 0 a hétfőt jelenti, az 1 a keddet stb. ... a 6 a vasárnapot.
- *nyári időszámítás jelző*: igaz érték esetén a nyári időszámítás van érvényben.
- *időzóna*: -24 és 24 közötti óraszám, amely az UTC-től való eltérést jelöli.
A szám racionális szám, és a `1/3600` többszörösének kell lennie.

```lisp
(encode-universal-time 1 2 3 4 5 2000 0) ; => 3166398121
(decode-universal-time 3166398121)       ; => 1
                                         ;    2
                                         ;    3
                                         ;    4
                                         ;    5
                                         ;    2000
                                         ;    3 (Thursday)
                                         ;    NIL
                                         ;    0
(decode-universal-time 2208988800) ; => 0
                                   ;    0
                                   ;    0
                                   ;    1
                                   ;    1
                                   ;    1970
                                   ;    3
                                   ;    NIL
                                   ;    0
```

[concept-multiple-values]: /tracks/common-lisp/concepts/multiple-values
