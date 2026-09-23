# Εισαγωγή

## Διεπαφές

Μια διεπαφή είναι ένας τύπος που περιέχει μέλη τα οποία ορίζουν μια ομάδα σχετιζόμενης λειτουργικότητας.
Απομακρύνει τις χρήσεις μιας κλάσης από την υλοποίηση, επιτρέποντας πολλαπλές διαφορετικές υλοποιήσεις ή υποστήριξη για κάποια γενική συμπεριφορά, όπως μορφοποίηση, σύγκριση ή μετατροπή.

Η σύνταξη μιας διεπαφής είναι παρόμοια με αυτήν μιας κλάσης, με τη διαφορά ότι οι μέθοδοι εμφανίζονται μόνο ως υπογραφή και δεν παρέχεται σώμα.

```java
public interface Language {
    String getLanguageName();
    String speak();
}

public class ItalianTraveller implements Language, Cloneable {

    // from Language interface
    public String getLanguageName() {
        return "Italiano";
    }

    // from Language interface
    public String speak() {
        return "Ciao mondo";
    }

    // from Cloneable interface
    public Object clone() {
        ItalianTraveller it = new ItalianTraveller();
        return it;
    }
}
```

Όλες οι λειτουργίες που ορίζει η διεπαφή πρέπει να υλοποιούνται από την κλάση που την υλοποιεί.

Οι διεπαφές συνήθως περιέχουν μεθόδους στιγμιοτύπων.

Ένα παράδειγμα διεπαφής που βρίσκεται στη Βιβλιοθήκη Κλάσεων της Java, εκτός από το `Cloneable` που παρουσιάστηκε παραπάνω, είναι το `Comparable<T>`.
Η διεπαφή `Comparable<T>` μπορεί να υλοποιηθεί όπου απαιτείται μια προεπιλεγμένη γενική σειρά ταξινόμησης στις συλλογές.
