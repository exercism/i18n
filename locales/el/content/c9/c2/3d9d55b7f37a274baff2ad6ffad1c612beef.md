# Οδηγίες

Είσαι ο διευθυντής ενός κομψού εστιατορίου που έχει ένα μεγάλο κελάρι κρασιών. Πολλοί από τους πελάτες σου είναι απαιτητικοί λάτρεις του κρασιού. Το να βρεις το σωστό μπουκάλι κρασί για έναν συγκεκριμένο πελάτη δεν είναι εύκολη υπόθεση.

Ως τεχνολογικά καταρτισμένος ιδιοκτήτης εστιατορίου, αποφάσισες να επιταχύνεις τη διαδικασία επιλογής κρασιού γράφοντας μια εφαρμογή που θα επιτρέπει στους επισκέπτες να φιλτράρουν τα κρασιά σου με βάση τις προτιμήσεις τους.

## 1. Βρες όλα τα κρασιά ενός δεδομένου χρώματος

Ένα μπουκάλι κρασί αναπαρίσταται με έναν προσαρμοσμένο τύπο, και τα κρασιά αποθηκεύονται σε μια λίστα.

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

Υλοποίησε τη συνάρτηση `wines_of_color`. Πρέπει να παίρνει μια λίστα με κρασιά και να επιστρέφει όλα τα κρασιά ενός δεδομένου χρώματος.

```gleam
wines_of_color(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  color: White
)
// -> [
//   Wine("Chardonnay", 2015, "Italy", White),
//   Wine("Pinot grigio", 2017, "Germany", White),
// ]
```

## 2. Βρες όλα τα μπουκάλια κρασιού σε μια δεδομένη χώρα

Υλοποίησε τη συνάρτηση `wines_from_country`. Πρέπει να παίρνει μια λίστα με κρασιά και να επιστρέφει όλα τα κρασιά από μια δεδομένη χώρα.

```gleam
wines_from_country(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  country: "Germany"
)
// -> [
//   Wine("Dornfelder", 2018, "Germany", Rose)
// ]
```

## 3. Βρες όλα τα κρασιά ενός δεδομένου χρώματος που εμφιαλώθηκαν σε μια δεδομένη χώρα

Υλοποίησε τη συνάρτηση `filter`. Πρέπει να παίρνει μια λίστα με κρασιά, ένα χρώμα και μια χώρα και να επιστρέφει όλα τα κρασιά του δεδομένου χρώματος που εμφιαλώθηκαν στη δεδομένη χώρα.

```gleam
filter(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  color: White
  country: "Italy"
)
// -> [
//   Wine("Chardonnay", 2015, "Italy", White),
// ]
```
