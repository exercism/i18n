# تلميحات

## عام

- الصنف [`TemporalAdjusters`][temporaladjusters-docs] (لاحظ صيغة الجمع) هو مجموعة من الطرق الساكنة التي تُرجع معدِّلات جاهزة.
- يُطبَّق المعدِّل على `LocalDate` عبر طريقته [`with()`][localdate-with]، التي تُرجع `LocalDate` جديدًا وتترك التاريخ الأصلي دون تغيير.
- لضبط التاريخ «داخل الشهر»، ابدأ من أي تاريخ في ذلك الشهر، مثلًا أول يوم منه: `LocalDate.of(year, month, 1)`.

## 1. إيجاد الموعد الثابت لعميل منتظم

- هناك [معدِّل][dayofweekinmonth-docs] يجد التكرار رقم n لأحد أيام الأسبوع في شهر التاريخ الذي يُطبَّق عليه.

## 2. إيجاد موعد آخر الشهر لعميل منتظم

- هناك [معدِّل][lastinmonth-docs] يجد آخر تكرار لأحد أيام الأسبوع في شهر التاريخ الذي يُطبَّق عليه.

## 3. إيجاد أقرب يوم متاح لعميل بدون موعد

- هناك معدِّلان ينتقلان إلى يوم أسبوع معيّن: أحدهما ينتقل دائمًا إلى تاريخ لاحق، و[الآخر][nextorsame-docs] يبقي التاريخ كما هو إن كان يطابق اليوم المطلوب أصلًا.

## 4. إيجاد يوم مسك الدفاتر

- هناك [معدِّل][lastdayofmonth-docs] ينتقل إلى آخر يوم في الشهر.
- يستطيع `LocalDate` أن يخبرك بـ[يوم الأسبوع][localdate-getdayofweek] الخاص به.
- عندما يقع آخر يوم في عطلة نهاية الأسبوع، هناك [معدِّل][previous-docs] ينتقل إلى التكرار السابق ليوم أسبوع معيّن.

## 5. إعادة استخدام قاعدة عطلة نهاية الأسبوع ليوم الدفع

- [`TemporalAdjuster`][temporaladjuster-docs] واجهة وظيفية ذات طريقة واحدة هي `adjustInto()`، لذا يمكن تنفيذها باستخدام تعبير لامبدا.
- داخل تعبير لامبدا، تُعطيك [`DayOfWeek.from()`][dayofweek-from] يوم الأسبوع للقيمة الزمنية التي يجري ضبطها.
- يمكن ربط المعدِّلات ببعضها: نتيجة تطبيق معدِّل واحد هي قيمة زمنية يمكنك تطبيق معدِّل آخر عليها.

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
