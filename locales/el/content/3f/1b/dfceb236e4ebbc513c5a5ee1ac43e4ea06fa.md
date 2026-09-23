# Σχετικά

## Pairs

Ένα [`Pair`][pair] είναι απλώς δύο στοιχεία ενωμένα μεταξύ τους.
Τα στοιχεία αυτά ονομάζονται, με λίγη φαντασία, `first` και `second`.

Μπορείς να τα δημιουργήσεις είτε με τον τελεστή `=>` είτε με τον κατασκευαστή `Pair()`.

```julia-repl
julia> p1 = "k" => 2
"k" => 2

julia> p2 = Pair("k", 2)
"k" => 2

# Both forms of syntax give the same result
julia> p1 == p2
true

# Each component has its own separate type
julia> dump(p1)
Pair{String, Int64}
  first: String "k"
  second: Int64 2

# Get a component using dot syntax
julia> p1.first
"k"

julia> p1.second
2
```

## Dicts

Ένα `Vector` από Pairs είναι σαν κάθε άλλον πίνακα: διατεταγμένο, ομοιογενές ως προς τον τύπο και αποθηκευμένο συνεχόμενα στη μνήμη.

```julia-repl
julia> pv = ['a' => 1, 'b' => 2, 'c' => 3]
3-element Vector{Pair{Char, Int64}}:
 'a' => 1
 'b' => 2
 'c' => 3

# Each pair is a single entry
julia> length(pv)
3
```

Ένα [`Dict`][dict] μοιάζει επιφανειακά, αλλά πλέον η αποθήκευση βασίζεται σε μια υλοποίηση που επιτρέπει γρήγορη ανάκτηση με βάση το κλειδί και είναι γνωστή ως "πίνακας κατακερματισμού", ακόμη και όταν ο αριθμός των καταχωρίσεων μεγαλώνει πολύ.

```julia-repl
julia> pd = Dict('a' => 1, 'b' => 2, 'c' => 3)  # or Dict(pv) gives same result
Dict{Char, Int64} with 3 entries:
  'a' => 1
  'c' => 3
  'b' => 2

julia> pd['b']
2

# Key must exist
julia> pd['d']
ERROR: KeyError: key 'd' not found

# Generators are accepted in the constructor (and note the unordered output)
julia> Dict(x => x^2 for x in 1:5)
Dict{Int64, Int64} with 5 entries:
  5 => 25
  4 => 16
  2 => 4
  3 => 9
  1 => 1

julia> Dict(x => 1 / x for x in 1:5)
Dict{Int64, Float64} with 5 entries:
  5 => 0.2
  4 => 0.25
  2 => 0.5
  3 => 0.333333
  1 => 1.0
  ```

Σε άλλες γλώσσες, κάτι πολύ παρόμοιο με ένα `Dict` μπορεί να ονομάζεται dictionary (Python), Hash (Ruby) ή HashMap (Java).

Για τα Pairs, είτε μεμονωμένα είτε μέσα σε ένα Vector, υπάρχουν λίγοι περιορισμοί ως προς τον τύπο κάθε component.

Για να είναι έγκυρο σε ένα `Dict`, το `Pair` πρέπει να είναι ένα ζεύγος `key => value`, όπου το `key` είναι "κατακερματίσιμο".
Το πιο σημαντικό είναι ότι αυτό σημαίνει πως το `key` πρέπει να είναι _αμετάβλητο_, οπότε τα `Char`, `Int`, `String`, `Symbol` και `Tuple` είναι όλα εντάξει, αλλά το `Vector` δεν επιτρέπεται.

Αν τα μεταβλητά κλειδιά σου είναι σημαντικά, υπάρχει ένας ξεχωριστός αλλά πολύ λιγότερο συνηθισμένος τύπος [`IdDict`][iddict] που μπορεί να το επιτρέψει.
Δες το [εγχειρίδιο][dict] για αρκετές ακόμη παραλλαγές του τύπου `Dict`.

### Τροποποίηση ενός Dict

Οι καταχωρίσεις μπορούν να προστεθούν, με ένα νέο κλειδί, ή να αντικατασταθούν, με ένα κλειδί που υπάρχει ήδη.

```julia-repl
julia> pd
Dict{Char, Int64} with 3 entries:
  'a' => 1
  'c' => 3
  'b' => 2

# Add
julia> pd['d'] = 4
4

# Overwrite
julia> pd['a'] = 42
42

julia> pd
Dict{Char, Int64} with 4 entries:
  'a' => 42
  'c' => 3
  'd' => 4
  'b' => 2
```

Για να αφαιρέσεις μια καταχώριση, χρησιμοποίησε τη συνάρτηση `delete!()`, η οποία θα αλλάξει το Dict αν το κλειδί υπάρχει και, αλλιώς, δεν θα κάνει τίποτα σιωπηλά.

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### Έλεγχος αν υπάρχει ένα κλειδί ή μια τιμή

Υπάρχουν διαφορετικοί τρόποι.
Για να ελέγξεις ένα κλειδί, υπάρχει η συνάρτηση `haskey()`:

```julia-repl
julia> haskey(pd, 'b')
true
```

Εναλλακτικά, αναζήτησε είτε τα κλειδιά είτε τις τιμές:

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

Αυτό παραμένει αποδοτικό σε μεγάλη κλίμακα, καθώς οι συναρτήσεις `keys()` και `values()` επιστρέφουν η καθεμία έναν iterator με γρήγορο αλγόριθμο αναζήτησης.


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
