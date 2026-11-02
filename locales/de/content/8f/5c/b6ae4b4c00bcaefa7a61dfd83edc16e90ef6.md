# Hinweise

## Allgemein

- Die Klasse [`TemporalAdjusters`][temporaladjusters-docs] (beachte den Plural) ist eine Sammlung statischer Methoden, die fertige Adjuster zurückgeben.
- Ein Adjuster wird mit der Methode [`with()`][localdate-with] auf ein `LocalDate` angewendet. Sie gibt ein neues `LocalDate` zurück und lässt das ursprüngliche unverändert.
- Um „innerhalb eines Monats“ anzupassen, gehst du von einem beliebigen Datum in diesem Monat aus, zum Beispiel von seinem ersten Tag: `LocalDate.of(year, month, 1)`.

## 1. Den festen Termin einer Stammkundin finden

- Es gibt einen [Adjuster][dayofweekinmonth-docs], der das n-te Vorkommen eines Wochentags in dem Monat des Datums findet, auf das er angewendet wird.

## 2. Den Monatsende-Termin einer Stammkundin finden

- Es gibt einen [Adjuster][lastinmonth-docs], der das letzte Vorkommen eines Wochentags in dem Monat des Datums findet, auf das er angewendet wird.

## 3. Den nächsten freien Tag für einen Laufkunden finden

- Es gibt zwei Adjuster, die zu einem bestimmten Wochentag vorwärtsgehen: einen, der immer zu einem späteren Datum springt, und [einen][nextorsame-docs], der das Datum beibehält, wenn es bereits passt.

## 4. Den Buchhaltungstag finden

- Es gibt einen [Adjuster][lastdayofmonth-docs], der zum letzten Tag des Monats springt.
- Ein `LocalDate` kann dir seinen [Wochentag][localdate-getdayofweek] verraten.
- Wenn der letzte Tag auf ein Wochenende fällt, gibt es einen [Adjuster][previous-docs], der zum vorherigen Vorkommen eines Wochentags zurückgeht.

## 5. Die Wochenendregel für den Zahltag wiederverwenden

- [`TemporalAdjuster`][temporaladjuster-docs] ist ein funktionales Interface mit einer einzigen Methode, `adjustInto()`, du kannst es also mit einem Lambda implementieren.
- Innerhalb des Lambdas liefert [`DayOfWeek.from()`][dayofweek-from] den Wochentag des Temporals, das gerade angepasst wird.
- Adjuster lassen sich verketten: Das Ergebnis eines Adjusters ist ein Temporal, auf das du einen weiteren Adjuster anwenden kannst.

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
