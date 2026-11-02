# 提示

## 一般

- [`TemporalAdjusters`][temporaladjusters-docs]類別（注意是複數）是一組靜態方法，會回傳現成的調整器。
- 調整器會透過`LocalDate`的[`with()`][localdate-with]方法套用到某個日期上，這個方法會回傳一個新的`LocalDate`，原本的日期則保持不變。
- 如果要在「同一個月內」調整，就從那個月裡的任何一天開始，例如該月的第一天：`LocalDate.of(year, month, 1)`。

## 1. 找出常客固定的預約時間

- 有一個[調整器][dayofweekinmonth-docs]可以找出套用日期所屬月份中，某個星期幾的第 n 次出現。

## 2. 找出常客每月最後一次的預約時間

- 有一個[調整器][lastinmonth-docs]可以找出套用日期所屬月份中，某個星期幾的最後一次出現。

## 3. 為臨時客找出下一個可預約的日子

- 有兩個調整器可以往前推進到指定的星期幾：一個總是移到更晚的日期，而[另一個][nextorsame-docs]則在日期已經符合時保持原樣。

## 4. 找出記帳日

- 有一個[調整器][lastdayofmonth-docs]會移到該月的最後一天。
- `LocalDate`可以告訴你它是[星期幾][localdate-getdayofweek]。
- 當最後一天落在週末時，有一個[調整器][previous-docs]會往回移到某個星期幾的前一次出現。

## 5. 把週末規則重用到發薪日

- [`TemporalAdjuster`][temporaladjuster-docs]是一個只有單一方法`adjustInto()`的函式介面，因此可以用 lambda 實作。
- 在 lambda 內部，[`DayOfWeek.from()`][dayofweek-from]會取得被調整的時間物件是星期幾。
- 調整器可以串接起來：套用一個調整器之後的結果，就是一個可以再套用另一個調整器的時間物件。

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
