# Οδηγίες

Η ποδοσφαιρική μας ομάδα [exercise:csharp/football-match-reports]() απογειώνεται στα πρωταθλήματα και έχεις προσκληθεί να κάνεις κι άλλη δουλειά, αυτή τη φορά στο σύστημα εκτύπωσης δελτίων ασφαλείας.

Η ιεραρχία κλάσεων του προσωπικού υποστήριξης είναι η εξής

```
TeamSupport (interface)
├ Chairman
├ Manager
└ Staff (abstract)
    ├ Physio
    ├ OffensiveCoach
    ├ GoalKeepingCoach
    └ Security
        ├ SecurityJunior
        ├ SecurityIntern
        └ PoliceLiaison
```

Μια πλήρης υλοποίηση της ιεραρχίας παρέχεται ως μέρος του πηγαίου κώδικα της άσκησης.

Όλα τα δεδομένα που περνούν στον δημιουργό δελτίων ασφαλείας έχουν επικυρωθεί και είναι εγγυημένο ότι δεν είναι null.

## 1. Πάρε το όνομα εμφάνισης για ένα μέλος της ομάδας υποστήριξης, αρκεί να είναι μέλος του προσωπικού

Υλοποίησε τη μέθοδο `SecurityPassMaker.GetDisplayName()`. Θα πρέπει να επιστρέφει την τιμή του πεδίου `Title` για στιγμιότυπα όλων των κλάσεων που κληρονομούν από την `Staff` και, σε διαφορετική περίπτωση, "Too Important for a Security Pass".

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. Προσάρμοσε το όνομα εμφάνισης για την ομάδα ασφαλείας

Τροποποίησε τη μέθοδο `SecurityPassMaker.GetDisplayName()`. Θα πρέπει να συμπεριφέρεται όπως στην Εργασία 1, με τη διαφορά ότι αν το μέλος του προσωπικού ανήκει στην ομάδα ασφαλείας (είτε είναι τύπου `Security` είτε κάποιας παράγωγης κλάσης της), τότε μετά τον τίτλο θα πρέπει να εμφανίζεται το κείμενο " Priority Personnel".

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Physio());
// => "The Physio"
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior Priority Personnel"
```

## 3. Χαρακτήρισε ως προσωπικό προτεραιότητας μόνο τα κύρια μέλη της ομάδας ασφαλείας

Τροποποίησε τη μέθοδο `SecurityPassMaker.GetDisplayName()`. Θα πρέπει να συμπεριφέρεται όπως στην Εργασία 2, με τη διαφορά ότι το κείμενο " Priority Personnel" δεν θα πρέπει να εμφανίζεται για στιγμιότυπα τύπου `SecurityJunior`, `SecurityIntern` και `PoliceLiaison`.

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
