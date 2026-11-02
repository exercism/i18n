# Підказки

## Загальне

- Клас [`TemporalAdjusters`][temporaladjusters-docs] (звернімо увагу на множину) містить набір статичних методів, які повертають готові коригувачі.
- Коригувач застосовують до `LocalDate` за допомогою його методу [`with()`][localdate-with], який повертає новий `LocalDate`, а оригінал лишає без змін.
- Щоб скоригувати дату в межах місяця, почнімо з якоїсь дати цього місяця, наприклад з його першого дня: `LocalDate.of(year, month, 1)`.

## 1. Знайти постійний запис клієнта

- Є [коригувач][dayofweekinmonth-docs], який знаходить n-те входження дня тижня в місяці тієї дати, до якої його застосовано.

## 2. Знайти запис клієнта на останній день місяця

- Є [коригувач][lastinmonth-docs], який знаходить останнє входження дня тижня в місяці тієї дати, до якої його застосовано.

## 3. Знайти наступний вільний день для клієнта без запису

- Є два коригувачі, які переносять дату вперед на заданий день тижня: один завжди переходить на пізнішу дату, а [другий][nextorsame-docs] лишає дату без змін, якщо вона вже припадає на цей день.

## 4. Знайти день для бухгалтерії

- Є [коригувач][lastdayofmonth-docs], який переносить дату на останній день місяця.
- `LocalDate` може підказати свій [день тижня][localdate-getdayofweek].
- Якщо останній день припадає на вихідні, є [коригувач][previous-docs], який переносить дату назад на попереднє входження заданого дня тижня.

## 5. Використати правило вихідних ще раз для дня зарплати

- [`TemporalAdjuster`][temporaladjuster-docs] - це функціональний інтерфейс з єдиним методом `adjustInto()`, тож його можна реалізувати лямбдою.
- Усередині лямбди [`DayOfWeek.from()`][dayofweek-from] повертає день тижня того часового значення, яке коригують.
- Коригувачі можна зчіплювати в ланцюжок: результат застосування одного коригувача - це часове значення, до якого можна застосувати наступний коригувач.

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
