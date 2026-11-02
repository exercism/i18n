# Suggerimenti

## Generale

- La classe [`TemporalAdjusters`][temporaladjusters-docs] (nota il plurale) è una raccolta di metodi statici che restituiscono degli adjuster già pronti.
- Un adjuster viene applicato a un `LocalDate` con il suo metodo [`with()`][localdate-with], che restituisce un nuovo `LocalDate` e lascia invariato l'originale.
- Per operare «all'interno di un mese», parti da una data qualsiasi di quel mese, per esempio dal suo primo giorno: `LocalDate.of(year, month, 1)`.

## 1. Trova l'appuntamento fisso di un cliente abituale

- C'è un [adjuster][dayofweekinmonth-docs] che trova la n-esima occorrenza di un giorno della settimana nel mese della data a cui viene applicato.

## 2. Trova l'appuntamento di fine mese di un cliente abituale

- C'è un [adjuster][lastinmonth-docs] che trova l'ultima occorrenza di un giorno della settimana nel mese della data a cui viene applicato.

## 3. Trova il prossimo giorno disponibile per un cliente senza appuntamento

- Ci sono due adjuster che avanzano fino a un dato giorno della settimana: uno che si sposta sempre a una data successiva e [uno][nextorsame-docs] che mantiene la data se corrisponde già.

## 4. Trova il giorno della contabilità

- C'è un [adjuster][lastdayofmonth-docs] che si sposta all'ultimo giorno del mese.
- Un `LocalDate` può dirti il suo [giorno della settimana][localdate-getdayofweek].
- Quando l'ultimo giorno cade nel fine settimana, c'è un [adjuster][previous-docs] che torna all'occorrenza precedente di un giorno della settimana.

## 5. Riusa la regola del fine settimana per il giorno di paga

- [`TemporalAdjuster`][temporaladjuster-docs] è un'interfaccia funzionale con un solo metodo, `adjustInto()`, quindi può essere implementata con una lambda.
- All'interno della lambda, [`DayOfWeek.from()`][dayofweek-from] restituisce il giorno della settimana del valore temporale che viene adjustato.
- Gli adjuster si possono concatenare: il risultato dell'applicazione di un adjuster è un valore temporale su cui puoi applicarne un altro.

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
