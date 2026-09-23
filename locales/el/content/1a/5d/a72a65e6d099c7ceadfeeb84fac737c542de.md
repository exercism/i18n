# Υποδείξεις

## Γενικά

- Ο αριθμός των πουλιών ανά ημέρα αποθηκεύεται σε ένα [πεδίο][fields] με όνομα `birdsPerDay`.
- Ο αριθμός των πουλιών ανά ημέρα είναι ένας πίνακας που περιέχει ακριβώς 7 ακέραιους.

## 1. Έλεγξε ποιοι ήταν οι αριθμοί την προηγούμενη εβδομάδα

- Επειδή αυτή η μέθοδος _δεν_ εξαρτάται από τον αριθμό της τρέχουσας εβδομάδας, ορίζεται ως [`static` μέθοδος][static-members].
- Υπάρχουν [αρκετοί τρόποι να ορίσεις έναν πίνακα][single-dimensional-arrays].

## 2. Έλεγξε πόσα πουλιά ήρθαν σήμερα

- Θυμήσου ότι οι αριθμοί είναι ταξινομημένοι ανά ημέρα από την παλαιότερη προς την πιο πρόσφατη, με το τελευταίο στοιχείο να αντιπροσωπεύει το σήμερα.
- Η πρόσβαση στο τελευταίο στοιχείο μπορεί να γίνει είτε χρησιμοποιώντας τη (σταθερή) θέση του (θυμήσου να αρχίσεις να μετράς από το μηδέν) είτε υπολογίζοντας τη θέση του χρησιμοποιώντας το [μέγεθος του πίνακα][array-length].

## 3. Αύξησε τον σημερινό αριθμό

- Όρισε το στοιχείο που αντιπροσωπεύει τον σημερινό αριθμό ίσο με τον σημερινό αριθμό + 1.

## 4. Έλεγξε αν υπήρξε μέρα χωρίς επισκέψεις πουλιών

- Η κλάση `Array` έχει μια [ενσωματωμένη μέθοδο][array-indexof] που επιστρέφει την πρώτη θέση όπου βρίσκεται το στοιχείο, ή -1 αν δεν βρέθηκε κανένα στοιχείο που να ταιριάζει.

## 5. Υπολόγισε τον αριθμό των πουλιών που επισκέπτονται για τις πρώτες ημέρες

- Μια μεταβλητή μπορεί να χρησιμοποιηθεί για να κρατάει τον αριθμό των πουλιών που επισκέπτονται.
- Μπορείς να διατρέξεις τον πίνακα με έναν [`for` βρόχο][for-statement].
- Η μεταβλητή μπορεί να ενημερωθεί μέσα στον βρόχο.
- Θυμήσου: οι θέσεις των πινάκων ξεκινούν από το `0`.

## 6. Υπολόγισε τον αριθμό των πολυάσχολων ημερών

- Μια μεταβλητή μπορεί να χρησιμοποιηθεί για να κρατάει τον αριθμό των πολυάσχολων ημερών.
- Μπορείς να διατρέξεις τον πίνακα με έναν [`foreach` βρόχο][array-foreach].
- Η μεταβλητή μπορεί να ενημερωθεί μέσα στον βρόχο.
- Μια [εντολή συνθήκης][if-statement] μπορεί να χρησιμοποιηθεί μέσα στον βρόχο.

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
