# Εισαγωγή

Ένα αρχείο είναι μια ροή με όνομα στον δίσκο. Το λεξιλόγιο [`io.files`][io.files]
διαβάζει και γράφει αρχεία είτε ολόκληρα, με μία μόνο κλήση, είτε σταδιακά
μέσα από μια ροή περιορισμένης εμβέλειας. Κάθε λέξη για αρχεία παίρνει μια
**κωδικοποίηση**; για κείμενο αυτή είναι σχεδόν πάντα το [`utf8`][utf8] από το
`io.encodings.utf8`.

## Ανάγνωση

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

Το `file-contents` επιστρέφει ολόκληρο το αρχείο ως μία συμβολοσειρά. Το
`file-lines` επιστρέφει τις γραμμές του ως πίνακα, χωρίς τις αλλαγές γραμμής.

## Εγγραφή

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

Και τα δύο αντικαθιστούν το αρχείο (δημιουργώντας το αν χρειάζεται). Το
`set-file-lines` γράφει ένα στοιχείο ανά γραμμή και προσθέτει τις αλλαγές
γραμμής για σένα.

## Προσάρτηση και σταδιακή είσοδος/έξοδος

Οι συνδυαστές `with-…` ανοίγουν ένα αρχείο ως την τρέχουσα ροή για ένα
quotation και το κλείνουν μετά: ένα πεδίο εμβέλειας με καταστροφέα, όπως οι
συνδυαστές ροών στο `channel-chatter`.

```
with-file-reader     ( path encoding quot -- )
with-file-writer     ( path encoding quot -- )
with-file-appender   ( path encoding quot -- )
```

```factor
USING: io io.encodings.utf8 io.files ;

"log.txt" utf8 [ "another line" print ] with-file-appender
```

[io.files]: https://docs.factorcode.org/content/vocab-io.files.html
[utf8]: https://docs.factorcode.org/content/vocab-io.encodings.utf8.html
