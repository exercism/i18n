# Εισαγωγή

Η "Στατιστική" είναι ένα μεγάλο και σύνθετο αντικείμενο με πολλές πτυχές.

Κάποιες πτυχές της θίχτηκαν στην έννοια [`Randomness`][randomness], που είναι ένα ξεχωριστό αλλά σχετικό αντικείμενο.

Στην απλούστερη μορφή της, η στατιστική μπορεί να περιλαμβάνει τρόπους για να συνοψίζεις μια συλλογή δεδομένων που μπορείς να διατρέξεις σε μία μόνο τιμή.
Όσοι πρωτοέρχονται στη Julia μπορεί να εκπλαγούν με το πόσο λίγες συναρτήσεις είναι ενσωματωμένες στη γλώσσα από προεπιλογή:

- [`sum`][sum], για να προσθέτεις αριθμούς.
- [`min`][min] και [`max`][max], για να παίρνεις τις ακραίες τιμές των παραμέτρων που δίνονται.
- [`extrema`][extrema], για να παίρνεις την πλειάδα (min, max) μιας συλλογής που μπορείς να διατρέξεις.
- [`length`][length], για να μετράς όλες τις τιμές.
- [`count`][count], για να μετράς μόνο τις τιμές που πληρούν κάποιο κριτήριο.

```julia-repl
julia> v = collect(1:0.2:3)
11-element Vector{Float64}:
 1.0
 1.2
 ... # display truncated
 3.0

julia> mean(v)
2.0

julia> extrema(v)
(1.0, 3.0)

julia> length(v)
11

julia> min('g', 'a', 'c')
'a': ASCII/Unicode U+0061 (category Ll: Letter, lowercase)

julia> count(isodd, 1:5)  # 1, 3, and 5 are odd
3
```

Αυτό το περιορισμένο σύνολο συναρτήσεων είναι μια σκόπιμη απόφαση για να περιοριστεί ο όγκος της βασικής γλώσσας Julia, μεταφέροντας άλλες συναρτήσεις σε μια σειρά από άλλα modules και πακέτα.

## Το module `Statistics`

Ως μέρος της πρότυπης βιβλιοθήκης, το [`Statistics`][statistics] είναι πιθανότατα προεγκατεστημένο, οπότε το μόνο που χρειάζεται είναι να προσθέσεις `using Statistics` στην αρχή του προγράμματος για να έρθει στον χώρο ονομάτων.

Αυτό το module περιέχει το επόμενο επίπεδο κοινών συναρτήσεων, που πιθανότατα χρησιμοποιούνται ευρέως από ένα υποσύνολο προγραμματιστών.

Πολλές από τις συναρτήσεις στο `Statistics` προϋποθέτουν κάποιες βασικές γνώσεις του αντικειμένου.
Τα πιο απλά παραδείγματα περιλαμβάνουν:

- [`mean`][mean], που πολλοί θα την έλεγαν μέσο όρο (ίδιο αποτέλεσμα με `sum / length`).
- [`median`][median], η μεσαία τιμή μετά την ταξινόμηση.
- [`std`][std], [τυπική απόκλιση][stddev]: ένα μέτρο του πόσο απλωμένες είναι οι τιμές.
- [`var`][var], διακύμανση: το τετράγωνο της `std`, που γενικά υπολογίζεται πιο γρήγορα.

Κάθε συνάρτηση έχει συνήθως διάφορες επιλογές, και υπάρχουν _πολλές_ ακόμη συναρτήσεις, οπότε ρίξε μια ματιά στην [τεκμηρίωση][statistics] αν σε ενδιαφέρει.

## Άλλα πακέτα

Όπως μπορείς να φανταστείς, η στατιστική είναι ένας μεγάλος τομέας χρήσης της Julia, και υπάρχουν πολλά διαθέσιμα πακέτα για πιο εξειδικευμένη δουλειά.

Η ομάδα JuliaStats διατηρεί, πολύ εξυπηρετικά, μια [διαδικτυακή λίστα][juliastats].

[statistics]: https://docs.julialang.org/en/v1/stdlib/Statistics/
[randomness]: https://exercism.org/tracks/julia/concepts/randomness
[sum]: https://docs.julialang.org/en/v1/base/collections/#Base.sum
[min]: https://docs.julialang.org/en/v1/base/math/#Base.min
[max]: https://docs.julialang.org/en/v1/base/math/#Base.max
[extrema]: https://docs.julialang.org/en/v1/base/collections/#Base.extrema
[length]: https://docs.julialang.org/en/v1/base/collections/#Base.length
[count]: https://docs.julialang.org/en/v1/base/collections/#Base.count
[mean]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.mean
[median]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.median
[std]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.std
[var]: https://docs.julialang.org/en/v1/stdlib/Statistics/#Statistics.var
[stddev]: https://en.wikipedia.org/wiki/Standard_deviation
[juliastats]: https://juliapackages.com/u/juliastats
