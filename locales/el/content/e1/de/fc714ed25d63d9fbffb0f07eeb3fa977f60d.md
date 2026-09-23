# Αποδόμηση και πολλαπλή ανάθεση

Η αποδόμηση αναφέρεται στην πράξη της εξαγωγής των στοιχείων μιας συλλογής, όπως ενός `Array` ή ενός `Hash`.
Οι τιμές που αποδομούνται μπορούν στη συνέχεια να ανατεθούν σε μεταβλητές μέσα στην ίδια εντολή.

Η [πολλαπλή ανάθεση][multiple assignment] είναι η δυνατότητα να αναθέτεις πολλές μεταβλητές για να αποδομήσεις τιμές μέσα σε μία εντολή.
Έτσι ο κώδικας γίνεται πιο συνοπτικός και ευανάγνωστος, και γίνεται χωρίζοντας τις μεταβλητές που θα ανατεθούν με κόμμα, όπως `first, second, third = [1, 2, 3]`.

Ο τελεστής splat (`*`) και ο διπλός τελεστής splat (`**`) χρησιμοποιούνται συχνά σε περιβάλλοντα αποδόμησης.

~~~~exercism/caution
Το `*<variable_name>` και το `**<variable_name>` δεν πρέπει να συγχέονται με το `*` και το `**`.
Ενώ το `*` και το `**` χρησιμοποιούνται για πολλαπλασιασμό και ύψωση σε δύναμη αντίστοιχα, το `*<variable_name>` και το `**<variable_name>` χρησιμοποιούνται ως τελεστές σύνθεσης και αποδόμησης.
~~~~

## Πολλαπλή ανάθεση

Η πολλαπλή ανάθεση σου επιτρέπει να αναθέτεις πολλές μεταβλητές σε μία γραμμή.
Για να χωρίσεις τις τιμές, χρησιμοποίησε κόμμα `,`:

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

Η πολλαπλή ανάθεση δεν περιορίζεται σε έναν μόνο τύπο δεδομένων:

```irb
>> x, y, z = 1, "Hello", true
=> [1, "Hello", true]
>> x
=> 1
>> y
=> 'Hello'
>> z
=> true
```

Η πολλαπλή ανάθεση μπορεί να χρησιμοποιηθεί για να ανταλλάξεις στοιχεία σε **πίνακες**.
Αυτή η πρακτική είναι αρκετά συνηθισμένη στους [αλγορίθμους ταξινόμησης][sorting algorithms].
Για παράδειγμα:

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
Αυτό είναι επίσης γνωστό ως "Parallel Assignment" και μπορεί να χρησιμοποιηθεί για να αποφύγεις μια προσωρινή μεταβλητή.
~~~~

Αν υπάρχουν περισσότερες μεταβλητές από τιμές, στις επιπλέον μεταβλητές θα ανατεθεί `nil`:

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## Αποδόμηση

Στη Ruby, είναι δυνατό να [αποδομήσεις τα στοιχεία **πινάκων**/**hash**][decompose] σε ξεχωριστές μεταβλητές.
Επειδή οι τιμές εμφανίζονται μέσα στους **πίνακες** με σειρά θέσης, ξεπακετάρονται σε μεταβλητές με την ίδια σειρά:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

Αν υπάρχουν τιμές που δεν χρειάζεσαι, μπορείς να χρησιμοποιήσεις το `_` για να δηλώσεις "συλλέχθηκε αλλά δεν χρησιμοποιείται":

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### Βαθιά αποδόμηση

Η αποδόμηση και η ανάθεση τιμών από **πίνακες** που βρίσκονται μέσα σε έναν **πίνακα** (_γνωστό και ως εμφωλευμένος πίνακας_) λειτουργεί με τον ίδιο τρόπο όπως η ρηχή αποδόμηση, αλλά χρειάζεται [έκφραση αποδόμησης με οριοθέτες (`()`)][delimited decomposition expression] για να διευκρινίσει το πλαίσιο ή τη θέση των τιμών:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

Μπορείς επίσης να ξεπακετάρεις βαθιά μόνο ένα μέρος ενός εμφωλευμένου **πίνακα**:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

Αν η αποδόμηση έχει μεταβλητές με λανθασμένη τοποθέτηση ή/και λανθασμένο αριθμό τιμών, θα πάρεις ένα **συντακτικό σφάλμα**:

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

Πειραματίσου εδώ και θα παρατηρήσεις ότι αυτό που καθορίζει είναι το πρώτο μοτίβο, όχι οι διαθέσιμες τιμές στη δεξιά πλευρά.
Το συντακτικό σφάλμα δεν σχετίζεται με τη δομή δεδομένων.

### Αποδόμηση ενός πίνακα με τον μονό τελεστή splat (`*`)

Όταν [αποδομείς έναν **πίνακα**][decompose], μπορείς να χρησιμοποιήσεις τον τελεστή splat (`*`) για να συλλάβεις τις "υπόλοιπες" τιμές.
Αυτό είναι πιο ξεκάθαρο από το να κόψεις τον **πίνακα** (_κάτι που σε ορισμένες περιπτώσεις είναι λιγότερο ευανάγνωστο_).
Για παράδειγμα, μπορούμε να εξαγάγουμε το πρώτο στοιχείο και μετά να αναθέσουμε τις υπόλοιπες τιμές σε έναν νέο **πίνακα** χωρίς το πρώτο στοιχείο:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

Μπορούμε επίσης να εξαγάγουμε τις τιμές στην αρχή και στο τέλος του **πίνακα**, ομαδοποιώντας όλες τις τιμές στη μέση:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

Μπορούμε επίσης να χρησιμοποιήσουμε το `*` στη βαθιά αποδόμηση:

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### Αποδόμηση ενός `Hash`

Η αποδόμηση ενός **hash** είναι λίγο διαφορετική από την αποδόμηση ενός **πίνακα**.
Για να μπορέσεις να ξεπακετάρεις ένα **hash**, πρέπει πρώτα να το μετατρέψεις σε **πίνακα**.
Διαφορετικά δεν θα γίνει καμία αποδόμηση:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

Για να μετατρέψεις ένα `Hash` σε **πίνακα**, μπορείς να χρησιμοποιήσεις τη μέθοδο `to_a`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

Αν θέλεις να ξεπακετάρεις τα κλειδιά, μπορείς να χρησιμοποιήσεις τη μέθοδο `keys`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

Αν θέλεις να ξεπακετάρεις τις τιμές, μπορείς να χρησιμοποιήσεις τη μέθοδο `values`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## Σύνθεση

Η σύνθεση είναι η δυνατότητα να ομαδοποιήσεις πολλές τιμές σε έναν **πίνακα** που ανατίθεται σε μια μεταβλητή.
Είναι χρήσιμη όταν θέλεις να _αποδομήσεις_ τιμές, να κάνεις αλλαγές και μετά να _συνθέσεις_ ξανά τα αποτελέσματα σε μια μεταβλητή.
Κάνει επίσης δυνατή τη συγχώνευση 2 ή περισσότερων **πινάκων**/**hash**.

### Σύνθεση ενός πίνακα με τον τελεστή splat (`*`)

Η σύνθεση ενός **πίνακα** μπορεί να γίνει με τον τελεστή splat, (`*`).
Αυτό θα πακετάρει όλες τις τιμές σε έναν **πίνακα**.

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### Σύνθεση ενός hash με τον διπλό τελεστή splat (`**`)

Η σύνθεση ενός hash γίνεται με τον διπλό τελεστή splat (`**`).
Αυτό θα πακετάρει όλα τα ζεύγη **κλειδιού**/**τιμής** από ένα hash σε ένα άλλο hash, ή θα συνδυάσει δύο hash μαζί.

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## Χρήση του τελεστή splat (`*`) και του διπλού τελεστή splat (`**`) με μεθόδους

### Σύνθεση με παραμέτρους μεθόδου

Όταν δημιουργείς μια μέθοδο που δέχεται αυθαίρετο αριθμό ορισμάτων, μπορείς να χρησιμοποιήσεις [`*arguments`][arguments] ή [`**keyword_arguments`][keyword arguments] στον ορισμό της μεθόδου.
Το `*arguments` χρησιμοποιείται για να πακετάρει αυθαίρετο αριθμό ορισμάτων θέσης (χωρίς λέξεις-κλειδιά) και
το `**keyword_arguments` χρησιμοποιείται για να πακετάρει αυθαίρετο αριθμό ορισμάτων με λέξεις-κλειδιά.

Χρήση του `*arguments`:

```irb
# This method is defined to take any number of positional arguments
# (Using the single line form of the definition of a method.)

>> def my_method(*arguments)= arguments

# Arguments given to the method are packed into an array

>> my_method(1, 2, 3)
=> [1, 2, 3]

>> my_method("Hello")
=> ["Hello"]

>> my_method(1, 2, 3, "Hello", "Mars")
=> [1, 2, 3, "Hello", "Mars"]
```

Χρήση του `**keyword_arguments`:

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

Αν η μέθοδος που όρισες δεν έχει καμία καθορισμένη παράμετρο για ορίσματα με λέξεις-κλειδιά (`**keyword_arguments` ή `<key_word>: <value>`), τότε τα ορίσματα με λέξεις-κλειδιά θα πακεταριστούν σε ένα hash και θα ανατεθούν στην τελευταία παράμετρο.

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

Τα `*arguments` και `**keyword_arguments` μπορούν επίσης να χρησιμοποιηθούν σε συνδυασμό μεταξύ τους:

```ruby
def my_method(*arguments, **keyword_arguments)
  p arguments.sum
  for (key, value) in keyword_arguments.to_a
    p key.to_s + " = " + value.to_s
  end
end


my_method(1, 2, 3, a: 1, b: 2, c: 3)
6
"a = 1"
"b = 2"
"c = 3"
```

Μπορείς επίσης να γράψεις ορίσματα πριν και μετά το `*arguments` για να επιτρέψεις συγκεκριμένα ορίσματα θέσης.
Αυτό λειτουργεί με τον ίδιο τρόπο όπως η αποδόμηση ενός πίνακα.

~~~~exercism/caution
Τα ορίσματα πρέπει να είναι δομημένα με συγκεκριμένη σειρά:

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

Αν δεν ακολουθήσεις αυτή τη σειρά, θα πάρεις ένα σφάλμα.
~~~~

```ruby
def my_method(a, b, *arguments)
  p a
  p b
  p arguments
end

my_method(1, 2, 3, 4, 5)
1
2
[3, 4, 5]
```

Μπορείς να γράψεις ορίσματα θέσης πριν και μετά το `*arguments`:

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

Μπορείς επίσης να συνδυάσεις ορίσματα θέσης, \*arguments, ορίσματα με λέξεις-κλειδιά και \*\*keyword_arguments:

```irb
>> def my_method(first, *many, last, a:, **keyword_arguments)
     p first
     p many
     p last
     p a
     p keyword_arguments
     end

>> my_method(1, 2, 3, 4, 5, a: 6, b: 7, c: 8)
1
[2, 3, 4]
5
6
{:b => 7, :c => 8}
```

Το να γράψεις τα ορίσματα σε λανθασμένη σειρά θα οδηγήσει σε σφάλμα:

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### Αποδόμηση σε κλήσεις μεθόδων

Μπορείς να χρησιμοποιήσεις τον τελεστή splat (`*`) για να ξεπακετάρεις έναν **πίνακα** ορισμάτων σε μια κλήση μεθόδου:

```ruby
def my_method(a, b, c)
  p c
  p b
  p a
end

numbers = [1, 2, 3]
my_method(*numbers)
3
2
1
```

Μπορείς επίσης να χρησιμοποιήσεις τον διπλό τελεστή splat (`**`) για να ξεπακετάρεις ένα **hash** ορισμάτων σε μια κλήση μεθόδου:

```ruby
def my_method(a:, b:, c:)
  p c
  p b
  p a
end

numbers = {a: 1, b: 2, c: 3}
my_method(**numbers)
3
2
1
```

[arguments]: https://docs.ruby-lang.org/en/master/syntax/methods_rdoc.html#label-Array-2FHash+Argument
[keyword arguments]: https://docs.ruby-lang.org/en/master/syntax/methods_rdoc.html#label-Keyword+Arguments
[multiple assignment]: https://docs.ruby-lang.org/en/master/syntax/assignment_rdoc.html#label-Multiple+Assignment
[sorting algorithms]: https://en.wikipedia.org/wiki/Sorting_algorithm
[decompose]: https://docs.ruby-lang.org/en/master/syntax/assignment_rdoc.html#label-Array+Decomposition
[delimited decomposition expression]: https://riptutorial.com/ruby/example/8798/decomposition
