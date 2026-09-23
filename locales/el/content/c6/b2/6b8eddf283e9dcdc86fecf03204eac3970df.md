# Υποδείξεις

## Γενικά

- Η Kotlin παρέχει πολλές [συναρτήσεις][ref-strings] για την εργασία με συμβολοσειρές. Ρίξε οπωσδήποτε μια ματιά στην καρτέλα `Members & Extensions`!

## 1. Πάρε το μήνυμα από μια γραμμή καταγραφής

- Υπάρχει μια [συνάρτηση][ref-string-substringAfter] για να εξάγεις το κομμάτι μιας `String` μετά από ένα δεδομένο διαχωριστικό.
- Η αφαίρεση των κενών διαστημάτων από μια `String` εξετάζεται στο [Remove All Whitespaces from a String in Kotlin][tutorial-trim-white-space].

## 2. Πάρε το επίπεδο καταγραφής από μια γραμμή καταγραφής

- Υπάρχει επίσης μια [συνάρτηση][ref-string-substringBefore] για να εξάγεις το κομμάτι μιας `String` _πριν_ από ένα δεδομένο διαχωριστικό.
- Υπάρχει ένας [τρόπος][ref-string-lowercase] να μετατρέψεις μια `String` σε πεζά γράμματα.

## 3. Αναδιαμόρφωσε μια γραμμή καταγραφής

- Τα [πρότυπα συμβολοσειρών][docs-string-template] μπορούν να γίνουν με μια [συμβολοσειρά πολλαπλών γραμμών][docs-string-multiline].

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
