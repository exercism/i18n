# Υποδείξεις

## Γενικά

- Όλα τα μέρη αυτής της άσκησης βασίζονται σε πράξεις bit.
  - Το [Πρόγραμμα Μάθησης][concept-bitwise-operations] του Exercism προσφέρει μια ήπια εισαγωγή.
  - Οι [τελεστές bit][ref-bitwise-operators] αναφέρονται στο εγχειρίδιο της Julia.
  - Το `Base` περιέχει διάφορες χρήσιμες συναρτήσεις που σχετίζονται με bit, όπως τις [count_ones()][count_ones] και [trailing_zeros()][trailing_zeros].
- Οι δοκιμές προσπαθούν να μην επιβάλλουν συγκεκριμένους τύπους, αλλά η άσκηση αφορά ανυπόγραφα byte και οι τιμές [`UInt8`][uint8] είναι σχετικά εύκολες στην κατανόηση.
  - Τα ορίσματα και οι τιμές επιστροφής είναι `Vector{UInt8}`,
  - Οι τιμές `UInt8` είναι χρήσιμες για μάσκες bit και ενδιάμεσες τιμές.
- Οι δεκαδικοί αριθμοί θα αποσπούσαν την προσοχή, οπότε προτίμησε δεκαεξαδικά (`0xFF`) ή δυαδικά (`0b11111111`) για τα κυριολεκτικά `UInt8`.
  - Η συνάρτηση [`bitstring()`][bitstring] μπορεί να φανεί χρήσιμη στο debugging, καθώς παράγει μια δυαδική μορφή αναγνώσιμη από τον άνθρωπο.
- Ένα ακατέργαστο μήνυμα έρχεται ως διάνυσμα από τμήματα των 8 bit και πρέπει να μετατραπεί σε τμήματα των 7 bit στα bit υψηλότερης τάξης, συν ένα bit ισοτιμίας ως LSB.
  - Χρησιμοποίησε μάσκες bit με `&` ή `|` για να απομονώσεις τα bit που θέλεις.
  - Οι τελεστές ολίσθησης αριστερά (`<<`) και λογικής ολίσθησης δεξιά (`>>>`) είναι σημαντικοί.
  - Σχεδίασε έναν τρόπο να μεταφέρεις τα πλεονάζοντα bit στον επόμενο γύρο επεξεργασίας.
  - Η μεταφορά κάνει δύσκολο τον χειρισμό των byte εισόδου ανεξάρτητα το ένα από το άλλο, οπότε η χρήση βρόχου (ή ίσως η αναδρομή) είναι πιθανώς ευκολότερη από την προσπάθεια χρήσης συναρτήσεων ανώτερης τάξης.
  - Τα κωδικοποιημένα μηνύματα είναι συνήθως μεγαλύτερα (περισσότερα byte) από το ακατέργαστο μήνυμα, ώστε να χωράει ένα bit ισοτιμίας ανά byte.


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
