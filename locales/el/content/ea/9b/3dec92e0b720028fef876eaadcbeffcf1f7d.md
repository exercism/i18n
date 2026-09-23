# Εισαγωγή

Ένα *stream* στη Factor είναι οτιδήποτε μπορείς να διαβάσεις bytes από αυτό ή να γράψεις bytes σε αυτό. Τα αρχεία, τα sockets, τα buffer στη μνήμη και τα δικά σου προσαρμοσμένα wrappers συμμετέχουν όλα στο ίδιο μικρό [πρωτόκολλο][stream-protocol] από το [`io`][io].

Τα δύο μισά του πρωτοκόλλου είναι mixins: `input-stream` για ό,τι διαβάζεις, `output-stream` για ό,τι γράφεις. Μια κλάση εντάσσεται σε ένα (ή και στα δύο) με `INSTANCE: <class> input-stream`.

## Ανάγνωση και εγγραφή

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

Το `stream-read1` επιστρέφει το επόμενο byte (ή `f` στο τέλος του stream)· το `stream-read` διαβάζει μέχρι `n` bytes. Τα `stream-write1` και `stream-write` κάνουν το αντίστοιχο για την έξοδο. Το `stream-flush` προωθεί τα buffered δεδομένα εξόδου. Το `stream-element-type` αναφέρει αν το stream δουλεύει με ακατέργαστα bytes (`+byte+`) ή με χαρακτήρες (`+character+`).

## Καθαρισμός με το `disposable`

Τα stream κρατούν πόρους του λειτουργικού συστήματος, γι' αυτό το πρωτόκολλο συνδυάζεται με το λεξιλόγιο [`destructors`][destructors]. Ένα προσαρμοσμένο stream επεκτείνει τη γονική κλάση `disposable`:

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

Το `new-disposable` (στο `destructors`) είναι το factory: δεσμεύει το tuple και το καταχωρεί στο framework των destructors, ώστε οι εξαιρέσεις να μην μπορούν να διαρρεύσουν τον πόρο. Το `M: <class> dispose*` δηλώνει *πώς* γίνεται ο καθαρισμός· ο κώδικας του χρήστη καλεί το `dispose` (τη δημόσια λέξη), το οποίο μαρκάρει το αντικείμενο ως disposed και μετά εκτελεί το `dispose*`.

## Χρήση με εμβέλεια

Τα `with-disposal`, `with-input-stream` και `with-output-stream` εκτελούν ένα quotation με τον πόρο ανοιχτό και τον αποδεσμεύουν μόλις βγουν από αυτό:

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
