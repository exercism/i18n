# Εισαγωγή

Στη C#, μια πλειάδα είναι μια δομή δεδομένων που οργανώνει δεδομένα, περιέχοντας δύο ή περισσότερα πεδία οποιουδήποτε τύπου.

Μια πλειάδα δημιουργείται συνήθως τοποθετώντας 2 ή περισσότερες εκφράσεις χωρισμένες με κόμματα, μέσα σε ένα ζεύγος παρενθέσεων.

```csharp
string boast = "All you need to know";
bool success = !string.IsNullOrWhiteSpace(boast);
(bool, int, string) triple = (success, 42, boast);
```

Μια πλειάδα μπορεί να χρησιμοποιηθεί σε πράξεις ανάθεσης και αρχικοποίησης, ως τιμή επιστροφής ή ως όρισμα μεθόδου.

Τα πεδία εξάγονται χρησιμοποιώντας σύνταξη με τελεία. Από προεπιλογή, το πρώτο πεδίο είναι το `Item1`, το δεύτερο το `Item2`, κ.λπ. Τα μη προεπιλεγμένα ονόματα συζητούνται παρακάτω.

```csharp
// initialization
(int, int, int) vertices = (90, 45, 45);

// assignment
vertices = (60, 60, 60);

//  return value
(bool, int) GetSameOrBigger(int num1, int num2)
{
    return (num1 == num2, num1 > num2 ? num1 : num2);
}

// method argument
int Add((int, int) operands)
{
    return operands.Item1 + operands.Item2;
}
```

Τα ονόματα πεδίων όπως `Item1` κ.λπ. δεν κάνουν τον κώδικα ευανάγνωστο. Ο παρακάτω κώδικας δείχνει 2 τρόπους για να ονομάσεις τα πεδία των πλειάδων. Σημείωσε επίσης, στον παρακάτω κώδικα, ότι το `var` μπορεί να χρησιμοποιηθεί με πλειάδες και ο τύπος συμπεραίνεται. Αυτό λειτουργεί εξίσου καλά για πλειάδες με ονομασμένα και ανώνυμα πεδία.

```csharp
// name items in declaration
(bool success, string message) results = (true, "well done!");
bool mySuccess = results.success;
string myMessage = results.message;

// name items in creating expression
var results2 = (success: true, message: "well done!");
bool mySuccess2 = results2.success;
string myMessage2 = results2.message;
```
