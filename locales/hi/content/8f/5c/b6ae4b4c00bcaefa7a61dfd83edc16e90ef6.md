# संकेत

## सामान्य

- [`TemporalAdjusters`][temporaladjusters-docs] क्लास (ध्यान दीजिए, यह बहुवचन है) ऐसे स्टैटिक मेथड का संग्रह है जो तैयार ऑडजस्टर लौटाते हैं।
- किसी ऑडजस्टर को `LocalDate` पर उसके [`with()`][localdate-with] मेथड से लगाया जाता है। यह मेथड एक नई `LocalDate` लौटाता है और मूल तारीख को बदलता नहीं।
- "महीने के अंदर" ऑडजस्ट करना हो तो उस महीने की किसी भी तारीख से शुरू कीजिए, जैसे उसके पहले दिन से: `LocalDate.of(year, month, 1)`।

## 1. किसी नियमित ग्राहक का तय अपॉइंटमेंट ढूँढिए

- एक [ऑडजस्टर][dayofweekinmonth-docs] है जो उस तारीख के महीने में सप्ताह के किसी दिन की n-वीं बार पड़ने वाली तिथि ढूँढता है, जिस तारीख पर उसे लगाया गया है।

## 2. किसी नियमित ग्राहक का महीने का अंतिम अपॉइंटमेंट ढूँढिए

- एक [ऑडजस्टर][lastinmonth-docs] है जो उस तारीख के महीने में सप्ताह के किसी दिन की अंतिम बार पड़ने वाली तिथि ढूँढता है, जिस तारीख पर उसे लगाया गया है।

## 3. वॉक-इन के लिए अगला उपलब्ध दिन ढूँढिए

- दो ऑडजस्टर ऐसे हैं जो सप्ताह के किसी दिए गए दिन तक आगे बढ़ते हैं: एक हमेशा आगे की तारीख पर ले जाता है, और [दूसरा][nextorsame-docs] तारीख पहले से मेल खाती हो तो उसे वही रहने देता है।

## 4. बुककीपिंग का दिन ढूँढिए

- एक [ऑडजस्टर][lastdayofmonth-docs] है जो महीने के अंतिम दिन पर ले जाता है।
- कोई `LocalDate` आपको अपना [सप्ताह का दिन][localdate-getdayofweek] बता सकती है।
- जब महीने का अंतिम दिन वीकेंड पर पड़े, तो एक [ऑडजस्टर][previous-docs] है जो सप्ताह के उस दिन की पिछली बार पड़ने वाली तिथि पर वापस ले जाता है।

## 5. वीकेंड वाला नियम वेतन के दिन के लिए दोबारा इस्तेमाल कीजिए

- [`TemporalAdjuster`][temporaladjuster-docs] एक फंक्शनल इंटरफेस है जिसमें सिर्फ एक मेथड, `adjustInto()`, है, इसलिए इसे लैम्डा से लागू किया जा सकता है।
- लैम्डा के अंदर, [`DayOfWeek.from()`][dayofweek-from] उस टेम्पोरल के सप्ताह का दिन बताता है जिसे ऑडजस्ट किया जा रहा है।
- ऑडजस्टरों को एक के बाद एक जोड़ा जा सकता है: एक ऑडजस्टर लगाने पर जो टेम्पोरल मिलता है, उस पर आप दूसरा ऑडजस्टर लगा सकते हैं।

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
