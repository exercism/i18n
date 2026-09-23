# Υποδείξεις

## 1. Αντικατέστησε κάθε κενό που συναντάς με κάτω παύλα

- [Αυτό το σεμινάριο][chars-tutorial] είναι χρήσιμο.
- Η [τεκμηρίωση αναφοράς][chars-docs] για τους `char` βρίσκεται εδώ.
- Μπορείς να ανακτήσεις τους `char` από μια συμβολοσειρά με τον ίδιο τρόπο όπως τα στοιχεία από έναν πίνακα.
- Θα πρέπει να χρησιμοποιήσεις έναν [`StringBuilder`][string-builder] για να φτιάξεις τη συμβολοσειρά εξόδου.
- Δες [αυτή τη μέθοδο][iswhitespace] για να εντοπίζεις κενά. Θυμήσου ότι είναι στατική μέθοδος.
- Τα literals τύπου `char` περικλείονται σε μονά εισαγωγικά.

## 2. Αντικατέστησε τους χαρακτήρες ελέγχου με τη συμβολοσειρά "CTRL" με κεφαλαία γράμματα

- Δες [αυτή τη μέθοδο][iscontrol] για να ελέγξεις αν ένας χαρακτήρας είναι χαρακτήρας ελέγχου.

## 3. Μετέτρεψε το kebab-case σε camel-case

- Δες [αυτή τη μέθοδο][toupper] για να μετατρέψεις έναν χαρακτήρα σε κεφαλαίο.

## 4. Παράλειψε τα ελληνικά πεζά γράμματα

- Οι `char` υποστηρίζουν τους προεπιλεγμένους τελεστές ισότητας και σύγκρισης.

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
