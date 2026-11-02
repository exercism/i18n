# ヒント

## 全般

- [`TemporalAdjusters`][temporaladjusters-docs]クラス（複数形であることに注意してください）は、すぐに使えるアジャスターを返す静的メソッドを集めたものです。
- アジャスターは、`LocalDate`の[`with()`][localdate-with]メソッドで適用します。このメソッドは新しい`LocalDate`を返し、元の値は変わりません。
- 「月内で」調整するには、その月の任意の日付から始めます。たとえば月初めの日を使って、`LocalDate.of(year, month, 1)`のように書きます。

## 1. 常連客の定期的な予約を見つける

- 適用した日付の月の中で、指定した曜日がn回目に現れる日を見つける[アジャスター][dayofweekinmonth-docs]があります。

## 2. 常連客の月末の予約を見つける

- 適用した日付の月の中で、指定した曜日が最後に現れる日を見つける[アジャスター][lastinmonth-docs]があります。

## 3. 飛び込み客の次の空き日を見つける

- 指定した曜日まで進めるアジャスターは2つあります。常に後の日付へ進むものと、すでにその曜日なら日付を変えない[もの][nextorsame-docs]です。

## 4. 帳簿の日を見つける

- 月末の日へ進める[アジャスター][lastdayofmonth-docs]があります。
- `LocalDate`からは[曜日][localdate-getdayofweek]を知ることができます。
- 月末の日が週末にあたる場合は、指定した曜日が前回現れた日へ戻る[アジャスター][previous-docs]があります。

## 5. 週末のルールを給料日に再利用する

- [`TemporalAdjuster`][temporaladjuster-docs]は単一のメソッド`adjustInto()`を持つ関数型インターフェースなので、ラムダで実装できます。
- ラムダの中では、[`DayOfWeek.from()`][dayofweek-from]で、調整対象の日時が何曜日かを取得できます。
- アジャスターは連鎖できます。あるアジャスターを適用した結果も日時なので、そこに別のアジャスターを適用できます。

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
