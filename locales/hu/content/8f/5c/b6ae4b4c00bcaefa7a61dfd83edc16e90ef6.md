# Tippek

## Általános

- A [`TemporalAdjusters`][temporaladjusters-docs] osztály (figyeld a többes számot) statikus metódusok gyűjteménye, amelyek kész adjustereket adnak vissza.
- Az adjustert a `LocalDate` [`with()`][localdate-with] metódusával alkalmazzuk, ami egy új `LocalDate`-et ad vissza, az eredeti dátumot pedig változatlanul hagyja.
- Ha „egy hónapon belül” akarsz módosítani, indulj ki az adott hónap bármelyik napjából, például a hónap első napjából: `LocalDate.of(year, month, 1)`.

## 1. Egy törzsvendég rendszeres időpontjának megkeresése

- Van egy [adjuster][dayofweekinmonth-docs], amely megkeresi a hét egy adott napjának n-edik előfordulását abban a hónapban, amelybe az alkalmazott dátum esik.

## 2. Egy törzsvendég hónap végi időpontjának megkeresése

- Van egy [adjuster][lastinmonth-docs], amely megkeresi a hét egy adott napjának utolsó előfordulását abban a hónapban, amelybe az alkalmazott dátum esik.

## 3. A következő szabad nap megkeresése egy bejelentkezés nélkül érkező vendégnek

- Két adjuster is van, amely a hét egy adott napjára lép előre: az egyik mindig egy későbbi dátumra lép, a [másik][nextorsame-docs] pedig megtartja a dátumot, ha az már egyébként is egyezik.

## 4. A könyvelési nap megkeresése

- Van egy [adjuster][lastdayofmonth-docs], amely a hónap utolsó napjára lép.
- A `LocalDate` meg tudja mondani a [hét napját][localdate-getdayofweek].
- Ha az utolsó nap hétvégére esik, van egy [adjuster][previous-docs], amely visszalép a hét adott napjának legutóbbi előfordulására.

## 5. A hétvégi szabály újrafelhasználása a fizetésnaphoz

- A [`TemporalAdjuster`][temporaladjuster-docs] egyetlen absztrakt metódussal rendelkező funkcionális interfész, a metódusa az `adjustInto()`, ezért lambdával is megvalósítható.
- A lambdán belül a [`DayOfWeek.from()`][dayofweek-from] adja meg a módosítandó időpont hét napját.
- Az adjusterek láncolhatók: az egyik adjuster alkalmazásának eredménye olyan időpont, amelyre már egy másik adjustert is alkalmazhatsz.

[temporaladjusters-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html
[temporaladjuster-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjuster.html
[localdate-with]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/LocalDate.html#with(java.time.temporal.TemporalAdjuster)
[localdate-getdayofweek]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/LocalDate.html#getDayOfWeek()
[dayofweek-from]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/DayOfWeek.html#from(java.time.temporal.TemporalAccessor)
[dayofweekinmonth-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#dayOfWeekInMonth(int,java.time.DayOfWeek)
[lastinmonth-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#lastInMonth(java.time.DayOfWeek)
[nextorsame-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#nextOrSame(java.time.DayOfWeek)
[lastdayofmonth-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#lastDayOfMonth()
[previous-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#previous(java.time.DayOfWeek)
