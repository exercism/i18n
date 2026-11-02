# Aide

## Généralités

- La classe [`TemporalAdjusters`][temporaladjusters-docs] (attention au pluriel) est un ensemble de méthodes statiques qui renvoient des ajusteurs prêts à l'emploi.
- Un ajusteur s'applique à un `LocalDate` avec sa méthode [`with()`][localdate-with], qui renvoie un nouveau `LocalDate` et laisse l'original inchangé.
- Pour ajuster « dans un mois », pars de n'importe quelle date de ce mois, par exemple son premier jour : `LocalDate.of(year, month, 1)`.

## 1. Trouver le rendez-vous récurrent d'un habitué

- Il existe un [ajusteur][dayofweekinmonth-docs] qui trouve la n-ième occurrence d'un jour de la semaine dans le mois de la date à laquelle on l'applique.

## 2. Trouver le rendez-vous de fin de mois d'un habitué

- Il existe un [ajusteur][lastinmonth-docs] qui trouve la dernière occurrence d'un jour de la semaine dans le mois de la date à laquelle on l'applique.

## 3. Trouver le prochain jour disponible pour un client sans rendez-vous

- Il existe deux ajusteurs qui avancent jusqu'à un jour de la semaine donné : l'un se déplace toujours vers une date ultérieure, et [l'autre][nextorsame-docs] conserve la date si elle correspond déjà.

## 4. Trouver le jour de la comptabilité

- Il existe un [ajusteur][lastdayofmonth-docs] qui se déplace jusqu'au dernier jour du mois.
- Un `LocalDate` peut te donner son [jour de la semaine][localdate-getdayofweek].
- Quand le dernier jour tombe un week-end, il existe un [ajusteur][previous-docs] qui recule jusqu'à l'occurrence précédente d'un jour de la semaine.

## 5. Réutiliser la règle du week-end pour le jour de paie

- [`TemporalAdjuster`][temporaladjuster-docs] est une interface fonctionnelle avec une seule méthode, `adjustInto()`, donc on peut l'implémenter avec une lambda.
- Dans la lambda, [`DayOfWeek.from()`][dayofweek-from] donne le jour de la semaine du temporel en cours d'ajustement.
- Les ajusteurs peuvent s'enchaîner : le résultat de l'application d'un ajusteur est un temporel auquel on peut en appliquer un autre.

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
