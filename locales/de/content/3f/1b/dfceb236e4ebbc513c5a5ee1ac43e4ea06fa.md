# About

## Pairs

Ein [`Pair`][pair] besteht einfach aus zwei zusammengefügten Elementen.
Diese Elemente heißen dann fantasievoll `first` und `second`.

Du erstellst sie entweder mit dem Operator `=>` oder mit dem Konstruktor `Pair()`.

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

Ein `Vector` aus Pairs ist wie jedes andere Array: geordnet, homogen im Typ und zusammenhängend im Speicher abgelegt.

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

Ein [`Dict`][dict] ist oberflächlich ähnlich, doch die Speicherung ist so umgesetzt, dass ein schneller Zugriff über den Schlüssel möglich ist. Das nennt man eine „Hash-Tabelle", und es funktioniert auch dann noch, wenn die Zahl der Einträge groß wird.

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

In anderen Sprachen heißt etwas sehr Ähnliches wie ein `Dict` vielleicht Wörterbuch (Python), Hash (Ruby) oder HashMap (Java).

Bei Pairs, ob einzeln oder in einem Vector, gibt es nur wenige Einschränkungen für den Typ der einzelnen Komponenten.

Um in einem `Dict` gültig zu sein, muss das `Pair` ein Paar `key => value` sein, wobei der `key` „hashbar" sein muss.
Vor allem bedeutet das, dass der `key` _unveränderlich_ sein muss. `Char`, `Int`, `String`, `Symbol` und `Tuple` sind also alle in Ordnung, aber `Vector` ist nicht erlaubt.

Wenn dir veränderliche Schlüssel wichtig sind, gibt es den separaten, aber viel selteneren Typ [`IdDict`][iddict], der das erlaubt.
Im [Handbuch][dict] findest du mehrere andere Varianten des Typs `Dict`.

### Ein Dict ändern

Einträge kannst du mit einem neuen Schlüssel hinzufügen oder mit einem vorhandenen Schlüssel überschreiben.

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

Um einen Eintrag zu entfernen, verwendest du die Funktion `delete!()`. Sie ändert das Dict, wenn der Schlüssel existiert, und tut ansonsten stillschweigend nichts.

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### Prüfen, ob ein Schlüssel oder Wert existiert

Dafür gibt es verschiedene Möglichkeiten.
Um einen Schlüssel zu prüfen, gibt es die Funktion `haskey()`:

```julia-repl
julia> haskey(pd, 'b')
true
```

Alternativ kannst du entweder die Schlüssel oder die Werte durchsuchen:

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

Das bleibt auch bei großen Datenmengen effizient, denn die Funktionen `keys()` und `values()` geben jeweils einen Iterator mit einem schnellen Suchalgorithmus zurück.


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
