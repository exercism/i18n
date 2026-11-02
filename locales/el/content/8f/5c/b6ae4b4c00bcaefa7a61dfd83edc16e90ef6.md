# Υποδείξεις

## Γενικά

- Η κλάση [`TemporalAdjusters`][temporaladjusters-docs] (προσοχή στον πληθυντικό) είναι μια συλλογή στατικών μεθόδων που επιστρέφουν έτοιμους προσαρμογείς.
- Ένας προσαρμογέας εφαρμόζεται σε ένα `LocalDate` με τη μέθοδο [`with()`][localdate-with], η οποία επιστρέφει ένα νέο `LocalDate` και αφήνει το αρχικό αμετάβλητο.
- Για να προσαρμόσεις "μέσα σε έναν μήνα", ξεκίνα από οποιαδήποτε ημερομηνία αυτού του μήνα, για παράδειγμα από την πρώτη του μέρα: `LocalDate.of(year, month, 1)`.

## 1. Βρες το πάγιο ραντεβού ενός τακτικού πελάτη

- Υπάρχει ένας [προσαρμογέας][dayofweekinmonth-docs] που βρίσκει την n-οστή εμφάνιση μιας ημέρας της εβδομάδας στον μήνα της ημερομηνίας στην οποία εφαρμόζεται.

## 2. Βρες το ραντεβού τέλους του μήνα ενός τακτικού πελάτη

- Υπάρχει ένας [προσαρμογέας][lastinmonth-docs] που βρίσκει την τελευταία εμφάνιση μιας ημέρας της εβδομάδας στον μήνα της ημερομηνίας στην οποία εφαρμόζεται.

## 3. Βρες την επόμενη διαθέσιμη μέρα για πελάτη χωρίς ραντεβού

- Υπάρχουν δύο προσαρμογείς που προχωρούν σε μια δεδομένη ημέρα της εβδομάδας: ένας που πηγαίνει πάντα σε μεταγενέστερη ημερομηνία και [ένας][nextorsame-docs] που κρατά την ημερομηνία αν ταιριάζει ήδη.

## 4. Βρες την ημέρα για τα λογιστικά

- Υπάρχει ένας [προσαρμογέας][lastdayofmonth-docs] που μετακινείται στην τελευταία μέρα του μήνα.
- Ένα `LocalDate` μπορεί να σου πει την [ημέρα της εβδομάδας][localdate-getdayofweek] του.
- Όταν η τελευταία μέρα πέφτει σε Σαββατοκύριακο, υπάρχει ένας [προσαρμογέας][previous-docs] που πηγαίνει πίσω στην προηγούμενη εμφάνιση μιας ημέρας της εβδομάδας.

## 5. Χρησιμοποίησε ξανά τον κανόνα του Σαββατοκύριακου για τη μέρα πληρωμής

- Το [`TemporalAdjuster`][temporaladjuster-docs] είναι μια λειτουργική διεπαφή με μία μόνο μέθοδο, την `adjustInto()`, οπότε μπορεί να υλοποιηθεί με ένα lambda.
- Μέσα στο lambda, το [`DayOfWeek.from()`][dayofweek-from] σου δίνει την ημέρα της εβδομάδας του temporal που προσαρμόζεται.
- Οι προσαρμογείς μπορούν να συνδεθούν σε αλυσίδα: το αποτέλεσμα της εφαρμογής ενός προσαρμογέα είναι ένα temporal στο οποίο μπορείς να εφαρμόσεις άλλον προσαρμογέα.

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
