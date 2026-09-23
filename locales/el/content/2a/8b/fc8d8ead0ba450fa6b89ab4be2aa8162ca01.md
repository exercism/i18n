# Υποδείξεις

## Γενικά

- [Οδηγός για ημερομηνίες και ώρες από το csharp.net][csharp.net-datetimes-working-with-datetimes-time]

## 1. Ανάλυση της ημερομηνίας του ραντεβού

- Η κλάση `DateTime` έχει αρκετές μεθόδους για να [μετατρέψεις][docs.microsoft.com_parsing-date] μια `string` σε `DateTime`.

## 2. Έλεγξε αν ένα ραντεβού έχει ήδη περάσει

- Τα αντικείμενα `DateTime` μπορούν να συγκριθούν χρησιμοποιώντας τους προεπιλεγμένους [τελεστές σύγκρισης][docs.microsoft.com_datetime-operators].
- Υπάρχει μια [ιδιότητα][docs.microsoft.com_datetime-properties] για να ανακτήσεις την τρέχουσα ημερομηνία και ώρα.

## 3. Έλεγξε αν το ραντεβού είναι το απόγευμα

- Η πρόσβαση στο τμήμα της ώρας ενός αντικειμένου `DateTime` μπορεί να γίνει μέσω μιας από τις [ιδιότητες][docs.microsoft.com_datetime-properties] του.

## 4. Περιέγραψε την ώρα και την ημερομηνία του ραντεβού

- Τα tests τρέχουν σαν να τρέχουν σε μηχάνημα στις Ηνωμένες Πολιτείες, που σημαίνει ότι κατά τη μετατροπή ενός `DateTime` σε `string` θα επιστραφούν ημερομηνίες και ώρες σε αμερικανική μορφή.
- Όταν μετατρέπεις ένα στιγμιότυπο `DateTime` σε `string`, μπορείς να χρησιμοποιήσεις είτε μια [τυπική συμβολοσειρά μορφής][docs.microsoft.com_standard-date-and-time-format-strings] είτε μια [προσαρμοσμένη συμβολοσειρά μορφής][docs.microsoft.com_custom-date-and-time-format-strings].

## 5. Επίστρεψε την ημερομηνία της επετείου

- Χρησιμοποίησε έναν από τους διάφορους [κατασκευαστές][constructors] του `DateTime` για να δημιουργήσεις ένα νέο στιγμιότυπο `DateTime`.
- Μπορείς να χρησιμοποιήσεις μία από τις [ιδιότητες][docs.microsoft.com_datetime-properties] της τρέχουσας ημερομηνίας και ώρας για να πάρεις το τρέχον έτος.

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
