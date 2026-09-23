# Εισαγωγή

Όπως και άλλες γλώσσες, η Go παρέχει επίσης μια εντολή `switch`.
Οι εντολές switch είναι ένας πιο σύντομος τρόπος για να γράψεις μεγάλες εντολές `if ... else if`.
Για να φτιάξεις ένα switch, ξεκινάς χρησιμοποιώντας τη λέξη-κλειδί `switch` ακολουθούμενη από μια τιμή ή μια έκφραση.
Στη συνέχεια δηλώνεις καθεμία από τις συνθήκες με τη λέξη-κλειδί `case`.
Μπορείς επίσης να δηλώσεις μια περίπτωση `default`, που θα εκτελεστεί όταν καμία από τις προηγούμενες συνθήκες `case` δεν ταιριάζει:

```go
operatingSystem := "windows"

switch operatingSystem {
case "windows":
    // do something if the operating system is windows
case "linux":
    // do something if the operating system is linux
case "macos":
    // do something if the operating system is macos
default:
    // do something if the operating system is none of the above
} 
```

Ένα ενδιαφέρον στοιχείο των εντολών switch είναι ότι η τιμή μετά τη λέξη-κλειδί `switch` μπορεί να παραλειφθεί, και μπορείς να έχεις boolean συνθήκες για κάθε `case`:

```go
age := 21

switch {
case age > 20 && age < 30:
    // do something if age is between 20 and 30
case age == 10:
    // do something if age is equal to 10
default:
    // do something else for every other case
}
```
