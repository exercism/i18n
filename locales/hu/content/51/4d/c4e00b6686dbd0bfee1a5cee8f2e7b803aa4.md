# Bevezetés

A hashtáblák a Factorban *asszociatív tömbök*: `key/value` párok gyűjteményei, amelyekben a keresés O(1). A tágabb [`assocs`][assocs] családhoz tartoznak.

## Hashtábla-literálok

```factor
H{ { "coal" 1 } { "wood" 2 } } .
```

A `H{ }` egy üres hashtábla. A hashtáblák *módosíthatók*, nőnek és zsugorodnak, ahogy kulcsokat adsz hozzájuk és távolítasz el belőlük. Ha az eredetit érintetlenül akarod hagyni, először hívd meg a `clone`-t. Egy hashtábla kiírásakor látszanak a bejegyzései, de a sorrend nem igazodik a beszúrás sorrendjéhez. A hashtábláknak nincs meghatározott sorrendjük.

## Olvasás

Az `at` (a [`assocs`][assocs] szótárban) kiolvas egy értéket, és `f`-et ad vissza, ha hiányzik a kulcs:

```
at      ( key assoc -- value/f )
key?    ( key assoc -- ? )
```

```factor
"coal" H{ { "coal" 1 } { "wood" 2 } } at .   ! => 1
"gold" H{ { "coal" 1 } { "wood" 2 } } at .   ! => f
```

## Írás

A `set-at` hozzáad vagy felülír; a `delete-at` töröl; a `change-at` pedig lefuttat egy quotationt a jelenlegi értéken. Mindhárom *módosítja* a hashtáblát:

```
set-at     ( value key assoc -- )
delete-at  ( key assoc -- )
change-at  ( key assoc quot: ( old -- new ) -- )
```

```factor
H{ } clone 5 "coal" pick set-at .
! => H{ { "coal" 5 } }
```

## `inc-at`, a gyors számlálás

Az `inc-at` (szintén a [`assocs`][assocs] szótárban) 1-et ad hozzá a kulcs meglévő értékéhez, és ha a kulcs hiányzik, 1-ként szúrja be. Ideális a darabszámoláshoz:

```
inc-at ( key assoc -- )
```

```factor
H{ } clone "coal" over inc-at .
! => H{ { "coal" 1 } }
```

## Iteráció és lusta beszúrás

Az `assoc-each` végigmegy minden `( key value -- )` páron; a `cache` visszaadja egy kulcs értékét, és ha a kulcs hiányzik, a megadott quotation segítségével egyszer kiszámítja azt.

```
assoc-each ( assoc quot: ( key value -- ) -- )
cache      ( key assoc quot: ( key -- value ) -- value )
```

A `cache` egyetlen szóban a „keresd meg vagy hozd létre” minta. Kézenfekvő, amikor kulcsok sorozatából építesz hashtáblát, és nem akarod minden hívási helyen kezelni a hiányzó bejegyzés esetét.

## Hashtábla frissítése kulcsok sorozatán

Amikor a bemenet kulcsok sorozata, és minden kulcsra egyszer akarod frissíteni a hashtáblát, akkor a *sorozaton* iterálj az `each` szóval, és egy fried quotationnel (`'[ _ … ]`, a [`fry`][fry] szótárból) építsd bele a hashtáblát a ciklustörzsbe. Például egy kulcslista eltávolítása:

```factor
{ "wood" "iron" } H{ { "coal" 5 } { "wood" 3 } { "iron" 2 } } clone
[ '[ _ delete-at ] each ] keep .
! => H{ { "coal" 5 } }
```

A `'[ _ delete-at ]` megragadja a vermen fölötte lévő hashtáblát, így minden iterációban az `each`-nek csak a kulcsot kell megadnia. A `keep` lefuttatja a quotationt, és közben megőrzi a hashtáblát a végső `.` számára.

## Hashtábla építése sorozatból

A `map>assoc` (az [`assocs`][assocs] szótárban) leképez egy quotationt egy sorozatra, és az `( elt -- key value )` eredményeket a minta típusával megegyező assoc-ba gyűjti:

```
map>assoc ( seq quot: ( elt -- key value ) exemplar -- assoc )
```

```factor
{ "wood" } [ dup length ] H{ } map>assoc .
! => H{ { "wood" 4 } }
```

## Kulcsok, értékek és párok

A `keys` és a `values` (az [`assocs`][assocs] szótárban) csak a kulcsokat, illetve csak az értékeket adja vissza; a `>alist` a `{ key value }` párokat.

```
keys   ( assoc -- keys )
values ( assoc -- values )
>alist ( assoc -- alist )
```

```factor
H{ { "wood" 11 } { "coal" 7 } } keys .     ! the keys (order not guaranteed)
H{ { "wood" 11 } { "coal" 7 } } values .   ! the matching values
```

A `keys` és a `values` összeillik: egy adott pozícióban lévő érték az ugyanabban a pozícióban lévő kulcshoz tartozik.

A `sort-keys` (a [`sorting`][sorting] szótárban) a kulcs szerint rendezett `{ key value }` párokat adja vissza:

```factor
H{ { "wood" 11 } { "coal" 7 } } sort-keys .
! => { { "coal" 7 } { "wood" 11 } }
```

## Pároktól vissza a hashtábláig

A `>hashtable` (a [`hashtables`][hashtables] szótárban) a `>alist` inverze: bármely assoc-ot, leggyakrabban `{ key value }` párokból álló alistot, O(1) keresésű hashtáblává alakít.

```
>hashtable ( assoc -- hashtable )
```

```factor
{ { "coal" 7 } { "wood" 11 } } >hashtable .
! => H{ { "wood" 11 } { "coal" 7 } }   (entry order not guaranteed)
```

Kézenfekvő, amikor összeállítottál vagy átalakítottál egy párlistát, és vissza akarod hajtani hashtáblába, hogy kulcs alapján keresd ki a bejegyzéseket.

[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/article-fry.html
[hashtables]: https://docs.factorcode.org/content/vocab-hashtables.html
[sorting]: https://docs.factorcode.org/content/vocab-sorting.html
