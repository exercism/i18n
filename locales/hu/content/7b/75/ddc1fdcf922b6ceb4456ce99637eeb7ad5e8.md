# Tuple-ök

A [tuple][tuple] elemek véges, rendezett listája, amely változtathatatlan.
A tuple-ökben minden pozíciónak rögzített típusa van.
Ez pedig azt jelenti, hogy a fordító tudja, melyik pozíción milyen típus áll.
A tuple-ön belül az egyes pozíciók típusa eltérő lehet, de a típusokat fordításkor ismerni kell.

## Tuple létrehozása

Attól függően, hogy a tuple értékeinek típusai fordítás közben megállapíthatók-e, a tuple többféleképpen is létrehozható.
Ha az értékek fordításkor ismertek, a tuple a tuple literál szintaxisával hozható létre, egyébként explicit módon kell deklarálni őket.
Az is fontos, hogy az értékek típusai egyezzenek a tuple-ben megadott típusokkal, és hogy az értékek száma megegyezzen a megadott típusok számával.
Íme egy példa a tuple literál szintaxissal történő definiálásra:

```crystal
tuple = {1, "foo", 'c'} # Tuple(Int32, String, Char)
```

A tuple-t a `Tuple` osztály segítségével is létrehozhatod.

```crystal
tuple = Tuple(Int32, String, Char).new(1, "foo", 'c')
```

Vagy explicit módon megadhatod a tuple-t felvevő változó típusát is.

```crystal
tuple : Tuple(Int32, String, Char) = {1, "foo", 'c'}
```

A tuple típusának explicit megadása azért lehet hasznos, mert így egy pozícióhoz uniótípust rendelhetsz.
Ez azt jelenti, hogy egy pozíció több típust is felvehet.

```crystal
tuple : Tuple(Int32 | String, String, Char) = {1, "foo", 'c'}
```

## Átalakítás

### Tuple létrehozása tömb alapján

A `Tuple` osztály `from` metódusával tuple-t hozhatsz létre egy tömbből.
Ehhez meg kell adni a tuple típusát.

```crystal
array = [1, "foo", 'c']
tuple = Tuple(Int32, String, Char).from(array)
```

### Átalakítás tömbbé

A `to_a` metódussal tuple-t alakíthatsz tömbbé.
A kapott tömb elemtípusa a tuple egyes mezői típusainak uniója.

```crystal
tuple = {1, "foo", 'c'}
array = tuple.to_a
array # => [1, "foo", 'c']
```

## Elemek elérése

A tömbökhöz hasonlóan a tuple-ök indexelése nullától indul, vagyis az első elem a 0. indexen van.
A tömböktől eltérően azonban minden elem típusa rögzített, és fordításkor ismert, ezért a tuple indexelésekor az elem típusa a pozíciótól függ.
Egy tuple adott eleméhez a `[]` operátorral férhetsz hozzá.

```crystal
array = [1, "foo", 'c']
array[0]         # => 1
typeof(array[0]) # => Int32 | String | Char

tuple = {1, "foo", 'c'}
tuple[0]         # => 1
typeof(tuple[0]) # => Int32
```

A tömbök elemeinek eléréséhez képest egy másik különbség: ha az index meg van adva, a fordító ellenőrzi, hogy az a tuple határain belül van-e.
Így futásidejű hiba helyett fordítási hibát kapsz.

```crystal
tuple = {1, "foo", 'c'}
tuple[3]
# => Error: index out of bounds for Tuple(Int32, String, Char) (3 not in -3..2)
```

Ha viszont az index egy változóban van, a fordító fordításkor nem tudja ellenőrizni, hogy az a tuple határain belül esik-e, ilyenkor futásidejű hibát kapsz.

## Résztuple

Egy tuple résztuple-jét a `[]` operátor és egy tartomány segítségével kaphatod meg.
A visszakapott érték egy új tuple, amely a megadott tartomány elemeit tartalmazza.
A tartományt fordításkor kell megadni, különben a fordító nem tudja megállapítani a résztuple elemeinek típusát.
Ez azt jelenti, hogy a tartománynak tartományliterálnak kell lennie, nem pedig változóba mentett értéknek.

```crystal
tuple = {1, "foo", 'c'}
subtuple = tuple[0..1] # Tuple(Int32, String)

i = 0..1
tuple[i]
# Error: Tuple#[](Range) can only be called with range literals known at compile-time
```

## Mikor érdemes tuple-t használni

A tuple-ök akkor hasznosak, ha rögzített számú értéket szeretnél egy csoportba foglalni, és ezek típusai fordításkor ismertek.
Ennek oka, hogy a tuple-ök a változtathatatlanságuk miatt kevesebb memóriát igényelnek, és gyorsabbak a tömböknél.
Egy másik felhasználási eset, amikor egy metódus több értéket ad vissza.
Ez különösen akkor hasznos, ha az értékek típusa eltérő, hiszen a tuple minden pozíciója más típusú lehet.

Tuple-t akkor ne használj, ha olyan adatszerkezetre van szükség, amely méretében nőhet vagy csökkenhet, vagy amelyet gyakran módosítani kell.

[tuple]: https://crystal-lang.org/reference/syntax_and_semantics/literals/tuple.html
