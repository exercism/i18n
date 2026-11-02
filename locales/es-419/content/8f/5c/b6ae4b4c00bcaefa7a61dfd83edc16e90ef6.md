# Pistas

## General

- La clase [`TemporalAdjusters`][temporaladjusters-docs] (ojo con el plural) es una colección de métodos estáticos que devuelven ajustadores ya listos.
- Un ajustador se aplica a un `LocalDate` con su método [`with()`][localdate-with], que devuelve un nuevo `LocalDate` y deja intacto el original.
- Para ajustar «dentro de un mes», parte de cualquier fecha de ese mes, por ejemplo su primer día: `LocalDate.of(year, month, 1)`.

## 1. Encuentra la cita fija de un cliente habitual

- Hay un [ajustador][dayofweekinmonth-docs] que encuentra la n-ésima aparición de un día de la semana en el mes de la fecha a la que se aplica.

## 2. Encuentra la cita de fin de mes de un cliente habitual

- Hay un [ajustador][lastinmonth-docs] que encuentra la última aparición de un día de la semana en el mes de la fecha a la que se aplica.

## 3. Encuentra el próximo día disponible para un cliente sin cita

- Hay dos ajustadores que avanzan hasta un día de la semana dado: uno que siempre pasa a una fecha posterior y [otro][nextorsame-docs] que mantiene la fecha si ya coincide.

## 4. Encuentra el día de la contabilidad

- Hay un [ajustador][lastdayofmonth-docs] que pasa al último día del mes.
- Un `LocalDate` puede decirte su [día de la semana][localdate-getdayofweek].
- Cuando el último día cae en fin de semana, hay un [ajustador][previous-docs] que retrocede a la aparición anterior de un día de la semana.

## 5. Reutiliza la regla del fin de semana para el día de pago

- [`TemporalAdjuster`][temporaladjuster-docs] es una interfaz funcional con un solo método, `adjustInto()`, así que se puede implementar con una lambda.
- Dentro de la lambda, [`DayOfWeek.from()`][dayofweek-from] te da el día de la semana del temporal que se está ajustando.
- Los ajustadores se pueden encadenar: el resultado de aplicar un ajustador es un temporal al que puedes aplicar otro ajustador.

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
