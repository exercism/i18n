# Εισαγωγή

## Access Behaviour

Η Elixir χρησιμοποιεί _Behaviours_ για να παρέχει κοινές, γενικές διεπαφές, διευκολύνοντας παράλληλα ειδικές υλοποιήσεις για κάθε άρθρωμα που τις υλοποιεί. Ένα τέτοιο συνηθισμένο παράδειγμα είναι το _Access Behaviour_.

Το _Access Behaviour_ παρέχει μια κοινή διεπαφή για την ανάκτηση δεδομένων από μια δομή δεδομένων που βασίζεται σε κλειδιά. Το _Access Behaviour_ είναι υλοποιημένο για map και keyword lists, αλλά ας δούμε τη χρήση του στα map για να πάρουμε μια ιδέα. Το _Access Behaviour_ ορίζει ότι όταν έχεις ένα map, μπορείς να το ακολουθήσεις με _αγκύλες_ και μετά να χρησιμοποιήσεις το κλειδί για να ανακτήσεις την τιμή που σχετίζεται με αυτό το κλειδί.

```elixir
# Suppose we have these two maps defined (note the difference in the key type)
my_map = %{key: "my value"}
your_map = %{"key" => "your value"}

# Obtain the value using the Access Behaviour
my_map[:key] == "my value"
your_map[:key] == nil
your_map["key"] == "your value"
```

Αν το κλειδί δεν υπάρχει στη δομή δεδομένων, τότε επιστρέφεται το `nil`. Αυτό μπορεί να αποτελέσει πηγή ανεπιθύμητης συμπεριφοράς, επειδή δεν πετάει ένα σφάλμα. Σημείωσε ότι το ίδιο το `nil` υλοποιεί το Access Behaviour και επιστρέφει πάντα `nil` για οποιοδήποτε κλειδί.
