# Tippek

## Általános

- A [halmazok][sets] módosítható, rendezetlen gyűjtemények, amelyekben nincsenek ismétlődő elemek.
- A halmazok bármilyen adattípust tartalmazhatnak, amíg minden elemük [hashable][hashable].
- A halmazok [iterálhatók][iterable].
- A halmazokat leggyakrabban arra használjuk, hogy gyorsan eltávolítsuk az ismétlődő elemeket más gyűjteményekből, vagy hogy megnézzük, benne van-e egy elem.
- A halmazok emellett támogatják a matematikai műveleteket is, például a `union`, `intersection`, `difference` és `symmetric difference` műveletet.

## 1. Tisztítsd meg az étel hozzávalóit

- A `set()` konstruktor bármilyen [iterálható][iterable] objektumot elfogad argumentumként. A [fogalom: listák](/tracks/python/concepts/lists) iterálhatók.
- Ne feledd: a [fogalom: tuple-ök](/tracks/python/concepts/tuples) létrehozhatók `(<element_1>, <element_2>)` formában vagy a `tuple()` konstruktorral.

## 2. Koktélok és alkoholmentes koktélok

- Egy `set` akkor _diszjunkt_ egy másik halmaztól, ha a két halmaznak nincs közös eleme.
- A `set()` konstruktor bármilyen [iterálható][iterable] objektumot elfogad argumentumként. A [fogalom: listák](/tracks/python/concepts/lists) iterálhatók.
- Pythonban a [fogalom: stringek](/tracks/python/concepts/strings) összefűzhetők a `+` jellel.

## 3. Kategorizáld az ételeket

- Hasznos lehet, ha [fogalom: ciklusok](/tracks/python/concepts/loops) segítségével végigiterálsz az elérhető ételkategóriákon.
- Ha `<set_1>` minden eleme benne van `<set_2>`-ben, akkor `<set_1> <= <set_2>`.
- A `<=` operátornak megfelelő metódus a `<set>.issubset(<iterable>)`
- A [fogalom: tuple-ök](/tracks/python/concepts/tuples) bármilyen adattípust tartalmazhatnak, más tuple-öket is. A tuple-ök létrehozhatók `(<element_1>, <element_2>)` formában vagy a `tuple()` konstruktorral.
- A [fogalom: tuple-ök](/tracks/python/concepts/tuples) elemeihez balról 0-tól induló indexszámmal férhetsz hozzá, jobbról pedig -1-től induló indexszámmal.
- A `set()` konstruktor bármilyen [iterálható][iterable] objektumot elfogad argumentumként. A [fogalom: listák](/tracks/python/concepts/lists) iterálhatók.
- A [fogalom: stringek](/tracks/python/concepts/strings) összefűzhetők a `+` jellel.

## 4. Jelöld meg az allergéneket és a tiltott ételeket

- Egy halmaz _metszetét_ azok az elemek alkotják, amelyek `<set_1>`-ben és `<set_2>`-ben is benne vannak.
- A `&` operátornak megfelelő halmazmetódus a `<set>.intersection(<iterable>)`
- A [fogalom: tuple-ök](/tracks/python/concepts/tuples) elemeihez balról 0-tól induló indexszámmal férhetsz hozzá, jobbról pedig -1-től induló indexszámmal.
- A `set()` konstruktor bármilyen [iterálható][iterable] objektumot elfogad argumentumként. A [fogalom: listák](/tracks/python/concepts/lists) iterálhatók.
- A [fogalom: tuple-ök](/tracks/python/concepts/tuples) létrehozhatók `(<element_1>, <element_2>)` formában vagy a `tuple()` konstruktorral.

## 5. Állítsd össze a hozzávalók „mesterlistáját”

- A halmazok _uniója_ azt jelenti, hogy a `<set_1`> és a `<set_2>` egyetlen `set`-té egyesül.
- A `|` operátornak megfelelő halmazmetódus a `<set>.union(<iterable>)`
- Hasznos lehet, ha [fogalom: ciklusok](/tracks/python/concepts/loops) segítségével végigiterálsz a különféle ételeken.

## 6. Válogasd ki a tálcákra szánt előételeket

- Egy halmaz _különbségéről_ akkor beszélünk, amikor `<set_1>`-ből eltávolítjuk a `<set_2>` elemeit, például `<set_1> - <set_2>`.
- A `-` operátornak megfelelő halmazmetódus a `<set>.difference(<iterable>)`
- A `set()` konstruktor bármilyen [iterálható][iterable] objektumot elfogad argumentumként. A [fogalom: listák](/tracks/python/concepts/lists) iterálhatók.
- A [fogalom: lista](/tracks/python/concepts/lists) konstruktor bármilyen [iterálható][iterable] objektumot elfogad argumentumként. A halmazok iterálhatók.

## 7. Keresd meg azokat a hozzávalókat, amelyek csak egy receptben szerepelnek

- Egy halmaz _szimmetrikus differenciája_ azokból az elemekből áll, amelyek `<set_1>`-ben vagy `<set_2>`-ben szerepelnek, de **_nem mindkettőben_**.
- Egy halmaz _szimmetrikus differenciája_ ugyanaz, mint a `set` _metszetét_ kivonni a `set` _uniójából_, például `(<set_1> | <set_2>) - (<set_1> & <set_2>)`
- Több mint két `sets` _szimmetrikus differenciája_ olyan elemeket is tartalmaz, amelyek kettőnél többször ismétlődnek a bemeneti halmazokban. Az ilyen, halmazokon átívelően ismétlődő elemek eltávolításához a halmazpárok közötti _metszeteket_ ki kell vonni a szimmetrikus differenciából.
- Hasznos lehet, ha [fogalom: ciklusok](/tracks/python/concepts/loops) segítségével végigiterálsz a különféle ételeken.


[hashable]: https://docs.python.org/3.7/glossary.html#term-hashable
[iterable]: https://docs.python.org/3/glossary.html#term-iterable
[sets]: https://docs.python.org/3/tutorial/datastructures.html#sets