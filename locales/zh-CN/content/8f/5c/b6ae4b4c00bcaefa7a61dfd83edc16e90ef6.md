# 提示

## 通用

- [`TemporalAdjusters`][temporaladjusters-docs]类（注意是复数）是一组静态方法的集合，这些方法返回现成的调整器。
- 调整器通过[`with()`][localdate-with]方法应用到`LocalDate`上，该方法返回一个新的`LocalDate`，原对象保持不变。
- 要在“某个月内”做调整，可以从那个月里的任意一天出发，比如这个月的第一天：`LocalDate.of(year, month, 1)`。

## 1. 找到常客的固定预约

- 有一个[调整器][dayofweekinmonth-docs]，可以找出某个星期几在应用日期所在月份中的第 n 次出现。

## 2. 找到常客的月末预约

- 有一个[调整器][lastinmonth-docs]，可以找出某个星期几在应用日期所在月份中的最后一次出现。

## 3. 找到未预约顾客的下一个可用日期

- 有两个调整器可以向前移动到指定的星期几：一个总是移动到更晚的日期，另一个[调整器][nextorsame-docs]在日期已经匹配时则保持不动。

## 4. 找到记账日

- 有一个[调整器][lastdayofmonth-docs]，可以移动到该月的最后一天。
- `LocalDate`可以告诉你它的[星期几][localdate-getdayofweek]。
- 当最后一天落在周末时，有一个[调整器][previous-docs]可以退回到某个星期几的上一次出现。

## 5. 为发薪日复用周末规则

- [`TemporalAdjuster`][temporaladjuster-docs]是一个函数式接口，只有一个方法`adjustInto()`，因此可以用 lambda 来实现。
- 在 lambda 内部，[`DayOfWeek.from()`][dayofweek-from]会给出被调整的时间对象的星期几。
- 调整器可以串联使用：应用一个调整器得到的结果是一个时间对象，你可以再对它应用另一个调整器。

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
