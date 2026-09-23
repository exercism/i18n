# Υποδείξεις

## Γενικά

- Διάβασε για τις συμβολοσειρές στην επίσημη [τεκμηρίωση του τύπου συμβολοσειράς][string-type-documentation].
- Ρίξε μια ματιά στις [διαθέσιμες _συναρτήσεις συμβολοσειρών_][string-functions] για να ανακαλύψεις τις ενσωματωμένες λειτουργίες πάνω στις συμβολοσειρές.

## 1. Πάρε το πρώτο γράμμα του ονόματος

- Υπάρχει μια [ενσωματωμένη συνάρτηση][string-substr] για να πάρεις τον πρώτο χαρακτήρα από μια συμβολοσειρά.
- Υπάρχουν πολλές [ενσωματωμένες συναρτήσεις][string-trim] για να αφαιρέσεις κενά διαστήματα από την αρχή, το τέλος ή και τα δύο άκρα μιας συμβολοσειράς.

## 2. Μορφοποίησε το πρώτο γράμμα ως αρχικό

- Υπάρχει μια [ενσωματωμένη συνάρτηση][string-upcase] για να μετατρέψεις όλους τους χαρακτήρες μιας συμβολοσειράς στην κεφαλαία μορφή τους.
- Υπάρχει ένας [τελεστής][concat-operator] που συνενώνει δύο συμβολοσειρές.

## 3. Χώρισε το πλήρες όνομα σε όνομα και επώνυμο

- Υπάρχει μια [ενσωματωμένη συνάρτηση][string-explode] που χωρίζει μια συμβολοσειρά με βάση μια άλλη συμβολοσειρά.
- Μερικά πρώτα στοιχεία μιας λίστας μπορούν να εκχωρηθούν σε μεταβλητές με αντιστοίχιση προτύπων στη λίστα.

## 4. Βάλε τα αρχικά μέσα στην καρδιά

- Υπάρχει ειδική σύνταξη για την [επέκταση μεταβλητών][string-variables] μέσα σε μια συμβολοσειρά.
- Υπάρχει ειδική σύνταξη για να γράφεις [συμβολοσειρές πολλαπλών γραμμών][heredoc-syntax] χωρίς να χρειάζεται διαφυγή χαρακτήρων νέας γραμμής.

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
