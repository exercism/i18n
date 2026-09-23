# Εισαγωγή

## Αρχικοποιητές Αντικειμένων

Οι αρχικοποιητές αντικειμένων είναι μια εναλλακτική λύση στους κατασκευαστές. Η σύνταξη φαίνεται στο παρακάτω παράδειγμα. Δίνεις μια λίστα ζευγών ονόματος-τιμής χωρισμένων με κόμμα, όπου το όνομα και η τιμή χωρίζονται με `=`, μέσα σε άγκιστρα:

```csharp
public class Person
{
    public string Name;
    public string Address;
}

var person = new Person{Name="The President", Address = "Élysée Palace"};
```

Και οι συλλογές μπορούν να αρχικοποιηθούν με αυτόν τον τρόπο. Συνήθως αυτό γίνεται με λίστες χωρισμένες με κόμμα, όπως φαίνεται εδώ:

```csharp
IList<Person> people = new List<Person>{ new Person(), new Person{Name="Joe Shmo"}};
```

Τα λεξικά χρησιμοποιούν την εξής σύνταξη:

```csharp
IDictionary<int, string> numbers = new Dictionary<int, string>{ [0] = "zero", [1] = "one"...};

// or

IDictionary<int, string> numbers = new Dictionary<int, string>{ {0, "zero" }, {1,  "one"}...};
```
