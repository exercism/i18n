# Informazioni

## Pair

Un [`Pair`][pair] è semplicemente due elementi uniti insieme.
Questi elementi vengono poi chiamati, con un po' di fantasia, `first` e `second`.

Puoi crearli con l'operatore `=>` oppure con il costruttore `Pair()`.

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

## Dict

Un `Vector` di Pair è come qualsiasi altro array: ordinato, omogeneo nel tipo e memorizzato in modo contiguo in memoria.

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

Un [`Dict`][dict] è superficialmente simile, ma la memorizzazione è ora implementata in modo da consentire un recupero rapido tramite chiave, nota come «tabella hash», anche quando il numero di voci diventa grande.

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

In altri linguaggi, qualcosa di molto simile a un `Dict` può essere chiamato dictionary (Python), Hash (Ruby) o HashMap (Java).

Per i Pair, sia isolati sia all'interno di un Vector, ci sono poche restrizioni sul tipo di ciascun componente.

Per essere validi in un `Dict`, i `Pair` devono essere coppie `key => value`, dove la `key` è «hashable».
Soprattutto, questo significa che la `key` deve essere _immutabile_, quindi `Char`, `Int`, `String`, `Symbol` e `Tuple` vanno tutti bene, mentre `Vector` non è ammesso.

Se le chiavi mutabili ti interessano, esiste un tipo separato ma molto meno comune, [`IdDict`][iddict], che può permetterlo.
Consulta il [manuale][dict] per diverse altre varianti del tipo `Dict`.

### Modificare un Dict

Le voci possono essere aggiunte, con una nuova chiave, oppure sovrascritte, con una chiave esistente.

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

Per rimuovere una voce, usa la funzione `delete!()`, che modificherà il Dict se la chiave esiste e, in caso contrario, non farà nulla in modo silenzioso.

```julia-repl
julia> delete!(pd, 'd')
Dict{Char, Int64} with 3 entries:
  'a' => 42
  'c' => 3
  'b' => 2
```

### Verificare se una chiave o un valore esiste

Esistono approcci diversi.
Per verificare una chiave, c'è la funzione `haskey()`:

```julia-repl
julia> haskey(pd, 'b')
true
```

In alternativa, cerca tra le chiavi o tra i valori:

```julia-repl
julia> 'b' in keys(pd)
true

julia> 43 in values(pd)
false

julia> 42 ∈ values(pd)
true
```

Questo rimane efficiente anche su larga scala, poiché le funzioni `keys()` e `values()` restituiscono ciascuna un iteratore con un algoritmo di ricerca veloce.


[pair]: https://docs.julialang.org/en/v1/base/collections/#Core.Pair
[dict]: https://docs.julialang.org/en/v1/base/collections/#Dictionaries
[iddict]: https://docs.julialang.org/en/v1/base/collections/#Base.IdDict
