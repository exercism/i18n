# Εκκεντρικό ρομπότ του πάρτι

## Ιστορία

Μια φορά κι έναν καιρό ζούσε ένας εκκεντρικός προγραμματιστής σε ένα παράξενο σπίτι με κάγκελα στα παράθυρα. Μια μέρα δέχτηκε μια δουλειά από έναν ηλεκτρονικό πίνακα αγγελιών εργασίας για να φτιάξει ένα ρομπότ του πάρτι. Το ρομπότ υποτίθεται ότι χαιρετάει τους ανθρώπους και τους βοηθάει να βρουν τη θέση τους. Η πρώτη προσθήκη ήταν πολύ τεχνική και φανέρωνε την έλλειψη ανθρώπινης επαφής του προγραμματιστή. Κάποιες από αυτές τις προσθήκες βρήκαν θέση και στην τελική έκδοση.

## Εργασίες

- Χαιρέτα κάθε άτομο με:

```
Welcome to my party, <name>!
```

- Ένας καλεσμένος που έχει τα γενέθλιά του σήμερα χαιρετάται με τον παρακάτω τρόπο, ώστε να φανεί η γνώση του ρομπότ για κάθε καλεσμένο:

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- Σε κάποιον που ζητά τη θέση του δίνονται οδηγίες για το τραπέζι του με:

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## Υλοποιήσεις

- [Go: συμβολοσειρές][implementation-go] (υλοποίηση αναφοράς)

## Αναφορά

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
