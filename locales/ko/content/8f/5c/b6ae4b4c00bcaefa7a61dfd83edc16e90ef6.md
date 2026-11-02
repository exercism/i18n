# 힌트

## 일반

- [`TemporalAdjusters`][temporaladjusters-docs] 클래스는 이름이 복수형이라는 점에 주의해요. 이 클래스는 미리 만들어 둔 조정자를 반환하는 정적 메서드를 모아 놓은 곳이에요.
- 조정자는 [`with()`][localdate-with] 메서드로 `LocalDate`에 적용하는데, 이 메서드는 새로운 `LocalDate`를 반환하고 원래 값은 그대로 둬요.
- "한 달 안에서" 조정하려면 그 달의 아무 날짜에서 시작하면 돼요. 예를 들어 그 달의 첫날인 `LocalDate.of(year, month, 1)`에서 시작해요.

## 1. 단골의 정기 예약 날짜 찾기

- 적용한 날짜가 속한 달에서 특정 요일이 몇 번째로 나타나는지 찾아주는 [조정자][dayofweekinmonth-docs]가 있어요.

## 2. 단골의 월말 예약 날짜 찾기

- 적용한 날짜가 속한 달에서 특정 요일이 마지막으로 나타나는 날을 찾아주는 [조정자][lastinmonth-docs]가 있어요.

## 3. 예약 없이 방문한 손님이 이용할 수 있는 다음 날 찾기

- 주어진 요일로 앞으로 이동하는 조정자가 두 개 있어요. 하나는 항상 더 늦은 날짜로 이동하고, [다른 하나][nextorsame-docs]는 날짜가 이미 그 요일이면 그대로 둬요.

## 4. 장부 정리 날 찾기

- 그 달의 마지막 날로 이동하는 [조정자][lastdayofmonth-docs]가 있어요.
- `LocalDate`는 자신의 [요일][localdate-getdayofweek]을 알려줄 수 있어요.
- 마지막 날이 주말에 걸리면, 그 요일이었던 이전 날짜로 거슬러 이동하는 [조정자][previous-docs]가 있어요.

## 5. 주말 규칙을 급여일에 다시 사용하기

- [`TemporalAdjuster`][temporaladjuster-docs]는 `adjustInto()`라는 메서드 하나만 가진 함수형 인터페이스라서 람다로 구현할 수 있어요.
- 람다 안에서 [`DayOfWeek.from()`][dayofweek-from]은 조정 대상이 되는 시간 값의 요일을 알려줘요.
- 조정자는 연이어 붙일 수 있어요. 한 조정자를 적용한 결과가 또 다른 조정자를 적용할 수 있는 시간 값이 되기 때문이에요.

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
